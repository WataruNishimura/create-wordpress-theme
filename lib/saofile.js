const path = require('path');
//package name validation
const validate = require('validate-npm-package-name');
const pkg = require('./package');

module.exports = {
  prompts: require('./prompts'),
  templateData() {
    const pm = this.answers.pm === 'yarn' ? 'yarn' : 'npm';
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run';
    const wpTemplate = this.answers.wptemp;
    const linter = this.answers.linter;
    const eslint = this.answers.linter.includes('eslint');
    const prettier = this.answers.linter.includes('prettier');
    const stylelint = this.answers.linter.includes('stylelint');
    const category = this.answers.wptemp.includes('category');
    const single = this.answers.wptemp.includes('single');
    const archive = this.answers.wptemp.includes('archive');
    const scss = this.answers.stylesheet.includes('scss');

    const { cliOptions = {} } = this.sao.opts;

    return {
      pm,
      pmRun,
      wpTemplate,
      linter,
      category,
      single,
      archive,
      cliOptions,
      eslint,
      prettier,
      stylelint,
      scss,
    };
  },
  actions() {
    //package name validation area
    const validation = validate(this.answers.name);
    validation.warnings &&
      validation.warnings.forEach((warn) => {
        console.warn('Warning:', warn);
      });
    validation.errors &&
      validation.errors.forEach((err) => {
        console.error('Error:', err);
      });
    validation.errors && validation.errors.length && process.exit(1);

    const actions = [];

    // Default files
    actions.push({
      type: 'add',
      files: [
        'index.php',
        'functions.php',
        'footer.php',
        'header.php',
        'search.php',
        '404.php',
        'home.php',
        'style.css',
        'package.json',
      ],
      templateDir: path.resolve(__dirname, '../template/'),
    });

    if (this.answers.wptemp !== 'none') {
      // Optional files
      actions.push({
        type: 'add',
        files: ['category.php', 'archive.php', 'single.php'],
        filters: {
          'category.php': 'wptemp.includes("category")',
          'archive.php': 'wptemp.includes("archive")',
          'single.php': 'wptemp.includes("single")',
        },
        templateDir: path.resolve(__dirname, '../template/'),
      });
    }

    actions.push({
      type: 'add',
      files: ['_.eslintrc.js', '_stylelint.config.js'],
      filters: {
        '_.eslintrc.js': 'linter.includes("eslint")',
        '_stylelint.config.js': 'linter.includes("stylelint")',
      },
      templateDir: path.resolve(__dirname, '../template/'),
    });

    actions.push({
      type: 'move',
      patterns: {
        '_.eslintrc.js': '.eslintrc.js',
        '_stylelint.config.js': 'stylelint.config.js',
      },
    });

    const generator = this;
    actions.push({
      type: 'modify',
      files: 'package.json',
      handler(data) {
        return { ...data, ...pkg.load(generator) };
      },
    });

    actions.push({
      type: 'modify',
      files: 'index.php',
      handler(data) {
        return data;
      },
    });

    actions.push({
      type: 'modify',
      files: 'style.css',
      handler(data) {
        return data;
      },
    });

    actions.push({
      type: 'add',
      files: 'package.json',
      templateDir: this.outDir,
    });

    return actions;
  },
  async completed() {
    this.gitInit();

    await this.npmInstall({ npmClient: this.answers.pm });

    const chalk = this.chalk;
    //const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run';

    console.log(
      chalk`\n🎉  {bold Successfully created wordpress theme} {cyan ${this.answers.name}}\n`
    );
  },
};
