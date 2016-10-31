const model = require('../model/model.js');

function getUserInfoController (req, res) {
  const username = req.params.user;
  model.getUserData(username, (userData) => res.json(userData));
}

function getRelatedProjectsController (req, res) {
  const username = req.params.user;
  model.getRelatedProjects(username, (projectData) => res.json(projectData));
}

function getRelatedInterestsController (req, res) {
  const username = req.params.user;
  model.getRelatedInterests(username, (projectData) => res.json(projectData));
}

function getProjectInfoController (req, res) {
  const project = req.params.project;
  model.getProjectInfo(project, (projectData) => res.json(projectData));
}

function getProjectUsersController (req, res) {
  const project = req.params.project;
  console.log('project', project);
  model.getProjectUsers(project, (projectData) => res.json(projectData));
}

function getProjectInterestsController (req, res) {
  const project = req.params.project;
  model.getProjectInterests(project, (projectData) => res.json(projectData));
}

function getSuggestedProjectsController (req, res) {
  const user = req.params.user;
  model.getSuggestedProjects(user, (projectData) => res.json(projectData));
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