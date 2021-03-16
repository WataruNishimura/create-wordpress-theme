module.exports = {
  /**
   * @module apply
   * @name apply
   * @param {Object} pkg package.json parsed to Object
   * @param {Object} generator saojs generator which includes answers as Object
   */
  apply(pkg, generator) {
    const { linter = [], stylesheet = [] } = generator.answers;
    const eslint = linter.includes('eslint');
    const prettier = linter.includes('prettier');
    const stylelint = linter.includes('stylelint');
    const scss = stylesheet.includes('scss');
    const css = stylesheet.includes('scss');

    if (!eslint) {
      delete pkg.devDependencies.eslint;
      delete pkg.devDependencies['eslint-config-prettier'];
    }

    if (!stylelint) {
      delete pkg.devDependencies['stylelint'];
    }

    return pkg;
  },
};
