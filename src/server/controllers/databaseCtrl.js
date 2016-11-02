const User = require('./../model/userModel');
const Interest = require('./../model/interestModel');
const Project = require('./../model/projectModel');
const User_Interest = require('./../model/userInterestModel');
const Project_Interest = require('./../model/projectInterestModel');
const User_Project = require('./../model/userProjectModel');

function setUserData (user, cb) {
  const id= user.id;
  const username = user.username;
  const email_address = user.emails[0].value;
  const name= user._json.name;
  const company= user._json.company;
  const bio= user._json.bio;
  const url= user._json.avatar_url;

  User.findOrCreate({where: { id: id, username: username, email_address: email_address, name: name, company: company, bio: bio, url: url}})
  .spread((user, created) => {
      cb(user)
    })
}

function createProjects (projects) {
  Project.bulkCreate(projects)
    .then(function(err, response) {
      if (err) {
        // console.log(err);
      } else {
        res.json(response);
      }
    })
}

function getUserData (cookieId) {
  var userData = { user: {}, projects: [] };
  return User.findOne({where: { id: cookieId }})
  .then( (user) => {
    userData.user = user;
    if(user !== null && user.projects !== null) {
      return Promise.all(user.projects.map((project) => {
        return Project.findOne( { where: {id: project}});
      }));
    }
    else {
      return [];
    }
  })
  .then( (projects) => {
    userData.projects = projects;
    return userData;
  })
}

function getUserProjects (user) {
  return Promise.all(user.projects.map((project) => {
    return Project.findOne( { where: {id: project}});
  }));
}

function saveProject (project, userId) {
  User.findOne( { where: {id: userId } } )
  .then( (user) => {
    let allProjects = user.projects === null ? [] : user.projects;
    allProjects.push(project.id);
    User.update({ projects: allProjects }, { where: {id: userId}});
  });
  return Project.findOrCreate( { where: { id: project.id, name: project.name, url: project.url, description: project.description }});
}

function deleteProject (projectId, userId) {
  console.log('project ', projectId, ' user ', userId);
  return User.findOne( { where: {id: userId } } )
  .then( (user) => {
    let allProjects = [];
    user.projects.forEach( (ele) => {
      if(ele !== Number(projectId)) allProjects.push(ele);
    })
    return User.update({ projects: allProjects }, { where: {id: userId}});
  })
}


module.exports = {
  createProjects,
  setUserData,
  getUserData,
  getUserProjects,
  saveProject,
  deleteProject
};
