const Datastore = require('nedb-promise');
const co = require('co')
const dbDir = process.env.DB_DIR || `${__dirname}/data`;
const modelMap = new Map();
exports.model = function (modelName) {
  if (modelMap.has(modelName)) {
    return modelMap.get(modelName);
  } else {
    tb = new Datastore({ filename: `${dbDir}/db.${modelName}`, autoload: true });
    modelMap.set(modelName, tb);
    return tb;
  }
}