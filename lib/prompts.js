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
];
