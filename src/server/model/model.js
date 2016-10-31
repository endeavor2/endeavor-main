const Sequelize = require('sequelize');
const sequelize = new Sequelize('endeavor', 'dan', 'hello', {

  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.TEXT
  },
  email_address: {
    type: Sequelize.TEXT
  },
  password: {
    type: Sequelize.TEXT
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

const Project = sequelize.define('project', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  github_link: {
    type: Sequelize.TEXT
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

const Interest = sequelize.define('interest', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  keyword: {
    type: Sequelize.TEXT
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

// Join tables
const User_Interest = sequelize.define('user_interest', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  interest_id: {
    type: Sequelize.INTEGER
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

const User_Project = sequelize.define('user_project', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  project_id: {
    type: Sequelize.INTEGER
  },
  like: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

const Project_Interest = sequelize.define('project_interest', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  project_id: {
    type: Sequelize.INTEGER
  },
  interest_id: {
    type: Sequelize.INTEGER
  },
  createdAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
 updatedAt: {
   type: Sequelize.DATE,
   default: Date.now
 },
});

sequelize.sync({
  logging: console.log,
  force: true // true will drop the table and rebuild (for dev)
}).then(() => {
  const users = [
    {
      username: 'hoon',
      email_address: 'patrick@email.com',
      password: 'a'
    },
    {
      username: 'nick',
      email_address: 'patrick@email.com',
      password: 'a'
    },
    {
      username: 'dan',
      email_address: 'patrick@email.com',
      password: 'a'
    },
    {
      username: 'patrick',
      email_address: 'patrick@email.com',
      password: 'a'
    },
  ];

  const projects = [
    {
      name: 'farmville',
      description: 'Build a farm',
      github_link: 'http://www.google.com'
    },
    {
      name: 'Hackernews',
      description: 'Software engineering blog.',
      github_link: 'http://www.google.com'
    },
    {
      name: 'Website',
      description: 'Build a website',
      github_link: 'http://www.google.com'
    },
  ];

  const interests = [
    {
      keyword: 'Javascript',
    },
    {
      keyword: 'React',
    },
    {
      keyword: 'ES6',
    },
  ];

  const user_interests = [
    {  user_id: '1',
      interest_id: '1'
    },
    {  user_id: '1',
      interest_id: '2'
    },
    {  user_id: '2',
      interest_id: '3'
    },
    {  user_id: '3',
      interest_id: '1'
    },
    {  user_id: '3',
      interest_id: '3'
    },
    {  user_id: '4',
      interest_id: '2'
    },
  ];
  const user_projects = [
    {  user_id: '1',
      project_id: '1'
    },
    {  user_id: '1',
      project_id: '2'
    },
    {  user_id: '2',
      project_id: '3'
    },
    {  user_id: '3',
      project_id: '1'
    },
    {  user_id: '3',
      project_id: '3'
    },
    {  user_id: '4',
      project_id: '2'
    },
  ];
  const project_interests = [
    {  interest_id: '1',
      project_id: '1'
    },
    {  interest_id: '1',
      project_id: '2'
    },
    {  interest_id: '2',
      project_id: '3'
    },
    {  interest_id: '3',
      project_id: '1'
    },
    {  interest_id: '3',
      project_id: '3'
    },
  ];

  User.bulkCreate(users, {validate: true})
  .catch((err) => {
    console.log('Create Error: ', err);
  });

  Project.bulkCreate(projects, {validate: true})
  .catch((err) => {
    console.log('Create Error: ', err);
  });

  Interest.bulkCreate(interests, {validate: true})
  .catch((err) => {
    console.log('Create Error: ', err);
  });

  User_Interest.bulkCreate(user_interests, {validate: true})
  .catch((err) => {
    console.log('Create Error: ', err);
  });

  User_Project.bulkCreate(user_projects, {validate: true})
  .catch((err) => {
    console.log('Create Error: ', err);
  });

  Project_Interest.bulkCreate(project_interests, {validate: true})
  .catch((err) => {
    console.log('Create Error: ', err);
  });

  // getRelatedProjects('patrick', () => {});

});


function getUserData (username, callback) {
  User.findOne({where: { username: username}}).then((data) => {
    return data ? callback(data.dataValues) : callback(data);
  });
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
  // User.hasMany(User_Project, {foreignKey: 'user_id'});
  // Project.hasMany(User_Project, {foreignKey: 'project_id'});
  // User_Project.belongsTo(User, {foreignKey: 'user_id'});
  // User_Project.belongsTo(Project, {foreignKey: 'project_id'});

  // // For reference: https://github.com/sequelize/sequelize/issues/1775
  // User_Project.findAll({include: [{ "model": User, "where" : { "username": username } }, Project ]})
  // .then((userOptions) => {
  //   const mappedProjects = userOptions.map( ele => {
  //     // Destructure project object
  //     const {id, name, description, github_link} = ele.dataValues.project;
  //     return {id, name, description, github_link};
  //   });
  //   return userOptions.length ? callback(mappedProjects) : callback([]);
  // });
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
