//command prompt settings as Object
module.exports = [
  {
    name: 'name',
    message: 'Project name:',
    default: '{outFolder}',
  },
  {
    name: 'pm',
    message: 'Package manager:',
    choices: [
      { name: 'Npm', value: 'npm' },
      { name: 'Yarn', value: 'yarn' },
    ],
    type: 'list',
    default: 'npm',
  },
  {
    name: 'wptemp',
    message: 'Template you use:',
    choices: [
      { name: 'Category', value: 'category' },
      { name: 'Single', value: 'single' },
      { name: 'archive', value: 'archive' },
    ],
    type: 'checkbox',
  },
  {
    name: 'stylesheet',
    message: 'Stylesheet language you use (Default is vanila CSS):',
    choices: [{ name: 'Sass(SCSS)', value: 'scss' }],
    type: 'checkbox',
  },
  {
    name: 'linter',
    message: 'Linting tools:',
    type: 'checkbox',
    choices: [
      { name: 'ESLint', value: 'eslint' },
      { name: 'Prettier', value: 'prettier' },
      { name: 'StyleLint', value: 'stylelint' },
    ],
  },
];
