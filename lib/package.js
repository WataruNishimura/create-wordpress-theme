const { sortByKey } = require('./util');

module.exports = {
  requireFile(filename) {
    try {
      return require(filename);
    } catch (error) {
      return {};
    }
  },
  requireJSON(filename) {
    return JSON.parse(JSON.stringify(this.requireFile(filename)));
  },
  loadPackage(generator) {
    const pkg = this.requireJSON('../template/package.json');
    const pkgHandler = this.requireFile('../template/package.js');
    return pkgHandler.apply ? pkgHandler.apply(pkg, generator) : pkg;
  },
  load(generator) {
    const pkg = this.loadPackage(generator);
    pkg.dependencies = sortByKey(pkg.dependencies);
    pkg.devDependencies = sortByKey(pkg.devDependencies);
    return pkg;
  },
};
