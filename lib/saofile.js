const { dirname, join, relative } = require('path')
const validate = require('validate-npm-package-name')

const cwtTemplateDir = join(('template/package.json'))
const templateDir = join('template/')

module.exports = {
  prompts: require('./prompts'),
  templateData(){
    const { options = {} } = this.sao.opts
  },
  actions(){
    const validation = validate(this.answers.name)
    validation.warnings && validation.warnings.forEach((warn) => {
      console.warn('Warning:', warn)
    })
    validation.errors && validation.errors.forEach((err) => {
      console.error('Error:', err)
    })
    validation.errors && validation.errors.length && process.exit(1)
    
    const actions = [{
      type: 'add',
      files: '**',
      templateDir: join(templateDir)
    }]

    return actions
  },
  async completed(){
    this.gitInit()
    await this.npmInstall()

    const chalk = this.chalk
    const isNewFolder = this.outDir !== process.cwd()
  }
}