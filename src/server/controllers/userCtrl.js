const databaseCtrl = require('./databaseCtrl');

function getUserInfoController (req, res) {
  const username = req.params.user;
  databaseCtrl.getUserData(username, (userData) => res.json(userData));
}

function getRelatedProjectsController (req, res) {
  const username = req.params.user;
  databaseCtrl.getRelatedProjects(username, (projectData) => res.json(projectData));
}

function getRelatedInterestsController (req, res) {
  const username = req.params.user;
  databaseCtrl.getRelatedInterests(username, (projectData) => res.json(projectData));
}

function getProjectInfoController (req, res) {
  const project = req.params.project;
  databaseCtrl.getProjectInfo(project, (projectData) => res.json(projectData));
}

function getProjectUsersController (req, res) {
  const project = req.params.project;
  console.log('project', project);
  databaseCtrl.getProjectUsers(project, (projectData) => res.json(projectData));
}

function getProjectInterestsController (req, res) {
  const project = req.params.project;
  databaseCtrl.getProjectInterests(project, (projectData) => res.json(projectData));
}

function getSuggestedProjectsController (req, res) {
  const user = req.params.user;
  databaseCtrl.getSuggestedProjects(user, (projectData) => res.json(projectData));
}

module.exports = { 
  getUserInfoController,
  getRelatedProjectsController,
  getRelatedInterestsController,
  getProjectInfoController,
  getProjectUsersController,
  getProjectInterestsController,
  getSuggestedProjectsController
};