const path = require('path');
//package name validation
const validate = require('validate-npm-package-name');

module.exports = {
  prompts: require('./prompts'),
  templateData() {
    const pm = this.answers.pm === 'yarn' ? 'yarn' : 'npm';
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run';
    const wpTemplate = this.answers.wptemp;
    const category = this.answers.wptemp.includes('category');
    const single = this.answers.wptemp.includes('single');
    const archive = this.answers.wptemp.includes('archive');

    const { cliOptions = {} } = this.sao.opts;

    return {
      pm,
      pmRun,
      wpTemplate,
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
      ],
      templateDir: path.resolve(__dirname, '../template/'),
    });

    // Optional files
    actions.push({
      type: 'add',
      files: '*',
      filters: {
        'category.php': 'wptemp.includes("category")',
        'archive.php': 'wptemp.includes("archive")',
        'single.php': 'wptemp.includes("single")',
      },
      templateDir: path.resolve(__dirname, '../template/'),
    });

    actions.push({
      type: 'modify',
      files: 'package.json',
      handler(data) {
        return { ...data };
      },
    });

    actions.push({
      type: 'modify',
      files: 'style.css',
      handler(data) {
        return { ...data };
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
    const isNewFolder = this.outDir !== process.cwd();
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run';

    console.log();
  },
};
