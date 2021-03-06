const request = require('request');

function getGitHubData(higherReq, higherRes) {
  console.log('the users request ', higherReq.body);
  request({
      url: `https://api.github.com/search/repositories?q="${higherReq.body.searchTerms}"+language:javascript&pushed:>=2016-10-31&forked:false&size:<1000`,
      headers: { 'user-agent': 'endeavor' },
      json: true
  }, (err, response, body) => {
    if(err) console.log(err)
    else {
      let dataToStore = [];
      body.items.forEach((item) => {
        let newObj = {};
        newObj.id = item.id;
        newObj.name = item.name;
        newObj.url = item.html_url;
        newObj.description = item.description;
        dataToStore.push(newObj);
      });
      console.log(dataToStore);
      higherRes.json(dataToStore);
    }
  })
};

module.exports = {
  getGitHubData
};
