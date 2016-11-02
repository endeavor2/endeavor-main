const request = require('request');
const databaseCtrl = require('./databaseCtrl');

function getGitHubData(higherReq, higherRes) {
  let searchTerms = higherReq.body.join(' ');
  request({
      url: `https://api.github.com/search/repositories?q="${searchTerms}"+language:javascript&pushed:>=2016-10-31&forked:false&size:<1000`,
      headers: { 'user-agent': 'endeavor' },
      json: true
  }, (err, response, body) => {
    console.log('there are ', body.items.length, ' items');
    let dataToStore = [];
    body.items.forEach((item) => {
      let newObj = {};
      newObj.id = item.id;
      newObj.name = item.name;
      newObj.url = item.url;
      newObj.description = item.description;
      dataToStore.push(newObj);
    });
    console.log(dataToStore);
    res.json(dataToStore);
    // databaseCtrl.createProjects(dataToStore);
  })
};

module.exports = {
  getGitHubData
};
