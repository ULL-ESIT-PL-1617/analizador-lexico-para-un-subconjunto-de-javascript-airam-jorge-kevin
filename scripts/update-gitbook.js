var fs   = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var config = require('../package.json');

var gBookURL = config.repository.gitbookUrl;
var docs = path.join(__dirname, '../docs');

var rmDir = function (dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return; }
    if (files.length > 0) {
        for (var i = 0; i < files.length; ++i) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                rmDir(filePath);
            }
        }
    }
    fs.rmdirSync(dirPath);
}

if (fs.existsSync(docs)) {
    console.log("Removing old docs");
    rmDir(docs);
}

console.log("Creating docs");
fs.mkdirSync(docs);
console.log("Accesing docs");
process.chdir(docs);

if (!fs.existsSync(path.join(docs, '/.git'))) {
    console.log("Git init");
    exec('git init', {stdio:[0,1,2]});
}

console.log("Trying to add remote");
try {
    exec('git remote add gbook ' + gBookURL, {stdio:[0,1,2]});
} catch (e) {}

console.log("Trying to pull from remote");
exec('git pull gbook master', {stdio:[0,1,2]});
