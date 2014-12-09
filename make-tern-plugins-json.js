/**
 * Look inside `./metadata` folder for `*.metadata.json` files
 * and list them inside `plugins.json`
 * as `name` and `metadataurl` pairs
 * 
 * version 0.2
 * @author Paul Verest
 * 
 * see 
 * https://github.com/marijnh/tern/issues/424
 * https://github.com/angelozerr/tern.java/pull/190
 * 
{
 "tern-closure": {
  "label": "Closure",
  "homepage": "https://developers.google.com/closure/library/",
  "repository": {
   "type": "git",
   "url": "https://github.com/google/tern-closure"
  }
 },
 "node-express": {
  "label": "Express",
  "homepage": "http://expressjs.com/",
  "description": "Add express web application framework for node support. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
  "repository": {
   "type": "git",
   "url": "https://github.com/angelozerr/tern-node-express.git"
  },
  "category": "node"
 }
}
 * 
 */

var metadataFolder = './metadata';
var suffix = '.metadata.json';
var repositoryFile = 'plugins.json';
var folderUrl = 'https://raw.githubusercontent.com/angelozerr/tern.java/master/core/tern.core/metadata/';

var fs = require('fs');

var ternRepository = {};

var filenames = fs.readdirSync(metadataFolder);

var counter = 0;

for (var i in filenames){
	var file = filenames[i];
	// skip if not endsWith '.metadata.json'
	if (file.indexOf(suffix, file.length - suffix.length) == -1){
		continue;
	}
	counter++;
	//console.log(file);
	
	var metadata = require (metadataFolder+'/'+file);
	//console.log(metadata);
	var entry = {};
	//entry.name = metadata.name;
	entry.label = metadata.label;
	entry.homepage = metadata.homepage;
	entry.description = metadata.description;
	entry.repository = metadata.repository;
	//see metadataurl discussed https://github.com/angelozerr/tern.java/pull/191
	entry.metadataurl = folderUrl+file;

//	var entryRoot = {};
//	entryRoot[metadata.name] = entry;
//	ternRepository.push(entryRoot);
	
	ternRepository[metadata.name] = entry;
};

//console.log(ternRepository);

fs.writeFileSync('./'+repositoryFile, JSON.stringify(ternRepository,null,2) );

console.log('Finished processing '+counter+' entries. Check '+repositoryFile+' file');
