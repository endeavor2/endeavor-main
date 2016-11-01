const User = require('./../model/userModel');
const Interest = require('./../model/interestModel');
const Project = require('./../model/projectModel');
const User_Interest = require('./../model/userInterestModel');
const Project_Interest = require('./../model/projectInterestModel');
const User_Project = require('./../model/userProjectModel');



function getUserData (user, cb) {
  const id= user.id;
  const username = user.username;
  const email_address = user.emails[0].value;

  User.findOrCreate({where: { id: id, username: username, email_address: email_address}})
  .spread((user, created) => {
      cb(user)
    })
}

function getRelatedProjects (username, callback) {
  User.hasMany(User_Project, {foreignKey: 'user_id'});
  Project.hasMany(User_Project, {foreignKey: 'project_id'});
  User_Project.belongsTo(User, {foreignKey: 'user_id'});
  User_Project.belongsTo(Project, {foreignKey: 'project_id'});

  // For reference: https://github.com/sequelize/sequelize/issues/1775
  User_Project.findAll({include: [{ "model": User, "where" : { "username": username } }, Project ]})
  .then((userOptions) => {
    const mappedProjects = userOptions.map( ele => {
      // Destructure project object
      const {id, name, description, github_link} = ele.dataValues.project;
      return {id, name, description, github_link};
    });
    return userOptions.length ? callback(mappedProjects) : callback([]);
  });
}

function getRelatedInterests (username, callback) {
  User.hasMany(User_Interest, {foreignKey: 'user_id'});
  Interest.hasMany(User_Interest, {foreignKey: 'interest_id'});
  User_Interest.belongsTo(User, {foreignKey: 'user_id'});
  User_Interest.belongsTo(Interest, {foreignKey: 'interest_id'});

  // For reference: https://github.com/sequelize/sequelize/issues/1775
  User_Interest.findAll({include: [{ "model": User, "where" : { "username": username } }, Interest ]})
  .then((userOptions) => {
    const mappedInterests = userOptions.map( ele => {
      // Destructure interest object
      const {id, keyword} = ele.dataValues.interest;
      return {id, keyword};
    });
    return userOptions.length ? callback(mappedInterests) : callback([]);
  });
}

function getProjectInfo (name, callback) {
  Project.findOne({where: { name: name}}).then((data) => {
    return data ? callback(data.dataValues) : callback(data);
  });
}

function getProjectUsers (name, callback) {
  User.hasMany(User_Project, {foreignKey: 'user_id'});
  Project.hasMany(User_Project, {foreignKey: 'project_id'});
  User_Project.belongsTo(User, {foreignKey: 'user_id'});
  User_Project.belongsTo(Project, {foreignKey: 'project_id'});

  // For reference: https://github.com/sequelize/sequelize/issues/1775
  User_Project.findAll({include: [{ "model": Project, "where" : { "name": name } }, User ]})
  .then((userOptions) => {
    const mappedUsers = userOptions.map( ele => {
      // Destructure Project object
      const {id, username, email_address} = ele.dataValues.user;
      return {id, username, email_address};
    });
    return userOptions.length ? callback(mappedUsers) : callback([]);
  });
}

function getProjectInterests (name, callback) {
  Interest.hasMany(Project_Interest, {foreignKey: 'interest_id'});
  Project.hasMany(Project_Interest, {foreignKey: 'project_id'});
  Project_Interest.belongsTo(Interest, {foreignKey: 'interest_id'});
  Project_Interest.belongsTo(Project, {foreignKey: 'project_id'});

  // For reference: https://github.com/sequelize/sequelize/issues/1775
  Project_Interest.findAll({include: [{ "model": Project, "where" : { "name": name } }, Interest ]})
  .then((userOptions) => {
    const mappedUsers = userOptions.map( ele => {
      // Destructure Project object
      const {id, keyword} = ele.dataValues.interest;
      return {id, keyword};
    });
    return userOptions.length ? callback(mappedUsers) : callback([]);
  });
}

function getSuggestedProjects (username, callback) {
  getRelatedInterests(username, (interests) => {

    console.log('interests', interests);
    const interestArr = interests.map((interest) => {
      return interest.keyword;
    });
    console.log('interestArr', interestArr);

    Interest.hasMany(Project_Interest, {foreignKey: 'interest_id'});
    Project.hasMany(Project_Interest, {foreignKey: 'project_id'});
    Project_Interest.belongsTo(Interest, {foreignKey: 'interest_id'});
    Project_Interest.belongsTo(Project, {foreignKey: 'project_id'});
    Project_Interest.findAll({include: [{ "model": Interest, "where" : { "keyword": interestArr } }, Project ]})
    .then((userOptions) => {
      console.log('userOptions', userOptions);
      const mappedUsers = userOptions.map( ele => {
        // Destructure Project object
        const {id, name, description, github_link} = ele.dataValues.project;
        return {id, name, description, github_link};
      });
      // Remove duplictes
      const obj = {};
      mappedUsers.forEach((val) => {
        obj[val.id] = val;
      });
      const arr = [];
      for (let prop in obj) {
        arr.push(obj[prop]);
      }
      return userOptions.length ? callback(arr) : callback([]);
    });
  })
}

module.exports = {
  getUserData,
  getRelatedProjects,
  getRelatedInterests,
  getProjectInfo,
  getProjectUsers,
  getProjectInterests,
  getSuggestedProjects
};
