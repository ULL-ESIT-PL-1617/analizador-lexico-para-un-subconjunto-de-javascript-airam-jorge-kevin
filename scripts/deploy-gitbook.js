var ghPages = require('gh-pages');
var path    = require('path');
var config = require('../package.json');

var repoUrl = config.repository.url;

console.log("Deploying Gitbook on gh-pages branch");
ghPages.publish(path.join(__dirname, '/../public'), {
    repo: repoUrl,
    message: 'Auto generated commit for gh-pages.',
    logger: log,
}, log);

function log(m) { if(m) console.log(m); }
