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

function saveProject(req, res) {
  databaseCtrl.saveProject(req.body, req.cookies.cookieId)
  .then( (data) => {
    res.json(data);
  });
}

module.exports = {
  loginUser,
  getUserInfo,
  getProjects,
  saveProject
};
