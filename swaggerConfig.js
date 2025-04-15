const YAML = require('yamljs');
const path = require('path');

const swaggerSpecs = YAML.load(path.join(__dirname, './docs/swagger.yaml'));

module.exports = swaggerSpecs;
