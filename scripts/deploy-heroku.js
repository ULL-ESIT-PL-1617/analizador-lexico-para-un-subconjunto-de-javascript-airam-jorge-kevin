var path = require('path');
var exec = require('child_process').execSync;

console.log("Deploying on Heroku.");
console.log('Be sure you used "heroku login" first and added the remote tagged as heroku.');
var answer = require('cli-interact').getYesNo('Continue');

if (answer) {
    console.log("Pushing to heroku master");
    exec('git push heroku master', {stdio: [0,1,2]});
}
