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

function getUserData (cookieId, cb) {
  return User.findOne({where: { id: cookieId }});
}


module.exports = {
  createProjects,
  setUserData,
  getUserData
};
