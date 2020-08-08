const path = require('path')
const validate = require('validate-npm-package-name')

module.exports = {
  prompts: require('./prompts'),
  templateData(){
    const pm = this.answers.pm === 'yarn' ? 'yarn' : 'npm'
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'
    const { options = {} } = this.sao.opts

    return {
      pm,
      pmRun
    }
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
      templateDir: path.resolve(__dirname, '../template/')
    }]

    actions.push({
      type: 'modify',
      files: 'package.json',
      handler (data) {
        return { ...data}
      }
    })

    actions.push({
      type: 'add',
      files: 'package.json',
      templateDir: this.outDir
    })

    return actions
  },
  async completed(){
    this.gitInit()
    await this.npmInstall({ npmClient: this.answers.pm })

    console.log(path.resolve(__dirname, '../template/'))

    const chalk = this.chalk
    const isNewFolder = this.outDir !== process.cwd()
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'
  }
}