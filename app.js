if (!process.argv[2]) {
	console.log('empty path for yaml file !')
	process.exit(1);
}
if (!process.argv[3]) {
	console.log('empty path for mustache file !')
	process.exit(1);
}
if (!process.argv[4]) {
	console.log('empty path for output file !')
	process.exit(1);
}

var YAML = require('yamljs');
var Mustache = require('mustache');
var fs = require('fs');

var yamlPath = process.argv[2];
var templatePath = process.argv[3];
var outPath = process.argv[4];

console.log('load '+yamlPath);
nativeObject = YAML.load(yamlPath);

var paths = nativeObject["paths"];
var view = { operations:[] };

for(var index in paths){

	var path= paths[index];
	for(var method in path){
		var operation = { httpMethod: method, path:index};
		var pathargs= path[method];

		for(var patharg in pathargs){
			var val=pathargs[patharg];
			switch(patharg) {
				case 'summary': operation.summary=val; break;
				case 'operationId': operation.operationId=val; break;
			}
		}
		view.operations.push({operation:operation});
	}
}
fs.readFile(templatePath, function (err, data) {
	if (err) {
		console.log('error loading mustache file ! ('+templatePath+')')
		process.exit(1);
	}
  	var output = Mustache.render(data.toString(), view);
	fs.writeFile(outPath, output, function(err) {
	    if(err) {
			console.log('error writing output file ! ('+outPath+')')
			process.exit(1);
	    }
	    console.log(outPath+" was saved!");
	}); 
});
