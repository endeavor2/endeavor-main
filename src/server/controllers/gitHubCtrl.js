const request = require('request');
const bodyParser = require('body-parser');
const databaseCtrl = require('./databaseCtrl');

function getGitHubData(req, res, next) {
    request({
        url: 'https://api.github.com/search/repositories?q=pushed:">=2016-10-01"&size:"<=100"&language:javascript',
        headers: { 'user-agent': 'endeavor' },
        json: true
    }, (err, response, body) => {
      let results = body.items.slice(0,200);
      let dataToStore = [];
      results.forEach((result) => {
        let newObj = {};
        newObj.id = result.id;
        newObj.name = result.name;
        newObj.url = result.url;
        newObj.description = result.description;
        dataToStore.push(newObj);
      })
      res.json(results);
      databaseCtrl.createProjects(dataToStore);
    })
};

module.exports = {
  getGitHubData
};
