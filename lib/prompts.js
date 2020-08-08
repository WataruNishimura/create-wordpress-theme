module.exports = [
  {
    name: 'name',
    message: 'Project name:',
    default: '{outFolder}'
  },
  {
    name: 'pm',
    message: 'Package manager:',
    choices: [
      { name: 'Npm', value: 'npm' },
      { name: 'Yarn', value: 'yarn' }
    ],
    type: 'list',
    default: 'npm'
  }
]