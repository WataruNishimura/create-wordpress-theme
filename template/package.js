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

    if (!eslint) {
      delete pkg.devDependencies.eslint;
    }

    if (eslint && !prettier) {
      delete pkg.devDependencies['eslint-config-prettier'];
    }

    if (!prettier) {
      delete pkg.devDependencies['prettier'];
    }

    if (stylelint && !scss) {
      delete pkg.devDependencies['stylelint-scss'];
    }

    if (!stylelint) {
      delete pkg.devDependencies['stylelint'];
      delete pkg.devDependencies['stylelint-config-standard'];
      delete pkg.devDependencies['stylelint-config-wordpress'];
      delete pkg.devDependencies['stylelint-scss'];
    }

    return pkg;
  },
};
