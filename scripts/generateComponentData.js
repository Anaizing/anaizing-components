var fs = require('fs'); // * file system reading (comes with node)
var path = require('path'); // * working with paths (comes with node)
var chalk = require('chalk'); // * color the command line output
var parse = require('react-docgen').parse; // * pull the metadata out of our components code
var chokidar = require('chokidar'); // * watch files and allows us to run a function in a cross platform way

// * declaring 3 important paths, the path to our example folder, 
// * to our source code and the path we'd like to output our metadata file.
var paths = {
    examples: path.join(__dirname, '../src', 'docs', 'examples'),
    components: path.join(__dirname, '../src', 'components'),
    output: path.join(__dirname, '../config', 'componentData.js')
};

//* this process will optionally watch for changes in our files, if the watch mode
//* is enabled we'll use chokidar to watch our example paths and our components
//* and if they change we'll regenerate our metadata else we'll call generate just one time
const enableWatchMode = process.argv.slice(2) == '--watch';
if (enableWatchMode) {
    // Regenerate component metadata when components or examples change.
    chokidar.watch([paths.examples, paths.components]).on('change', function (event, path) {
        generate(paths);
    });
} else {
    // Generate component metadata
    generate(paths);
}

//* the generate func keeps track of an array of errors, if any occur we get a list of directories
//* that are within our components folder, we map over those directories and get component data for each
//* folder. Wrapping it in a try catch in case we make any syntax error, this allows create-react's error handling 
//* to handle any errors that occur. This way our process will continue to run even if we make a typo
function generate(paths) {
    var errors = [];
    var componentData = getDirectories(paths.components).map(function (componentName) {
        try {
            return getComponentData(paths, componentName);
        } catch (error) {
            errors.push('An error occurred while attempting to generate metadata for ' + componentName + '. ' + error);
        }
    });
    //* Once we get the array of comp data we write that array here to our output file
    writeFile(paths.output, "module.exports = /* eslint-disable */ " + JSON.stringify(errors.length ? errors : componentData));
}

//* What this fun does is it reads the file and gets the content out of that file, then it calls parse
//* Parse is a function that comes with react-doc-gen, which basically reads the content of our src code and 
//* gives us metadata on its description, on its props, then we also take the content of that file and put it in
//* a property called code, so now we have metadata about the component, including not just decription of props 
//* but of the src code itself. Finally we store a list of examples using the getExampleData func.
function getComponentData(paths, componentName) {
    var content = readFile(path.join(paths.components, componentName, componentName + '.js'));
    var info = parse(content);
    return {
        name: componentName,
        description: info.description,
        props: info.props,
        code: content,
        examples: getExampleData(paths.examples, componentName)
    }
}

//* getExampleData works similarly to getComponentData, the main difference being that in the examples we dont have
//* the same props since an example only needs a name, a description and the code. Again using react-doc-gen to get 
//* the metadata on the examples that we create
function getExampleData(examplesPath, componentName) {
    var examples = getExampleFiles(examplesPath, componentName);
    return examples.map(function (file) {
        var filePath = path.join(examplesPath, componentName, file);
        var content = readFile(filePath);
        var info = parse(content);
        return {
            // By convention, component name should match the filename.
            // So remove the .js extension to get the component name.
            name: file.slice(0, -3),
            description: info.description,
            code: content
        };
    });
}

//* the rest of the functions are wrappers for node functionality
//* getting a list of files
function getExampleFiles(examplesPath, componentName) {
    var exampleFiles = [];
    try {
        exampleFiles = getFiles(path.join(examplesPath, componentName));
    } catch (error) {
        console.log(chalk.red(`No examples found for ${componentName}.`));
    }
    return exampleFiles;
}

//* getting a list of directories
function getDirectories(filepath) {
    return fs.readdirSync(filepath).filter(function (file) {
        return fs.statSync(path.join(filepath, file)).isDirectory();
    });
}

//* getting a list of files
function getFiles(filepath) {
    return fs.readdirSync(filepath).filter(function (file) {
        return fs.statSync(path.join(filepath, file)).isFile();
    });
}

//* a function to write a file to a file path
function writeFile(filepath, content) {
    fs.writeFile(filepath, content, function (err) {
        err ? console.log(chalk.red(err)) : console.log(chalk.green("Component data saved."));
    });
}

//* a function to read a file.
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}