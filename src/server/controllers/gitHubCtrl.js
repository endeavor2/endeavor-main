const request = require('request');
const bodyParser = require('body-parser');
// Github creds
var GITHUB_CLIENT_ID = "91216db770ffe6520a38";
var GITHUB_CLIENT_SECRET = "16f85dea805ab29c26321008f96b5d3813bbbc04";


function getGitHubData(req, res, next) {
    request({
        url: 'https://api.github.com/search/repositories?q=pushed:">=2016-10-01"&language:javascript&fork:false&sort=stars&order=desc',
        headers: { 'user-agent': 'endeavor' },
        json: true
    }, (err, response, body) => {
      res.json(body);
    })
  };


module.exports = {
  getGitHubData
};
