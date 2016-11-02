const databaseCtrl = require('./databaseCtrl');
const gitHubCtrl = require('./gitHubCtrl');

function loginUser (req, res) {
  console.log('THIS IS THE PASSPORT STUFF', req.user);
  databaseCtrl.setUserData(req.user, (userData) => {
    res.cookie('cookieId', userData.id, { maxAge: 900000, httpOnly: true })
    res.redirect('/');
  });
}

function getUserInfo (req, res) {
  databaseCtrl.getUserData(req.cookies.cookieId)
  .then( (userData) => {
    console.log(userData);
    res.json(userData);
  });
}


function getProjects(req, res) {
  gitHubCtrl.getGitHubData(req, res);
}

function getUserProjects(req, res) {
  databaseCtrl.getUserProjects(req.body)
  .then( (data) => {
    res.json(data);
  });
}

function saveProject(req, res) {
  console.log('This is the project to save ', req.body);
  databaseCtrl.saveProject(req.body, req.cookies.cookieId)
  .then( (data) => {
    res.json(data);
  });
}

function deleteProject(req, res) {
  console.log('This is the project to delete ', req.body);
  databaseCtrl.deleteProject(req.body.id, req.cookies.cookieId)
  .then( (data) => {
    res.json(data);
  });
}

module.exports = {
  loginUser,
  getUserInfo,
  getProjects,
  getUserProjects,
  saveProject,
  deleteProject
};
