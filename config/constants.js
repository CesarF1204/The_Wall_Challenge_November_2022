const {load} = require('js-yaml');
const {readFileSync} = require('fs');

let Constants = {};

try{
    let env_file = 'development.env.yml';

    let fileContents = readFileSync(__dirname+'/'+env_file, 'utf8');
    let data = load(fileContents);

    for(let key in data){
        Constants[key] = data[key];
    }

}
catch(error){
    console.log('Error loading yml file', error);
    process.exit(1);
}

module.exports = Constants;