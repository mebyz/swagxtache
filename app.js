YAML = require('yamljs');
Mustache = require('mustache');

nativeObject = YAML.load('api.yaml');


console.log(nativeObject);


var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};
 
var output = Mustache.render("{{title}} spends {{calc}}", view);

console.log(output);
