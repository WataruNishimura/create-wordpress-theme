const path = require('path')
const fs = require('fs')
const cac = require('cac')
const chalk = require('chalk')
const sao = require('sao')
const { version } = require('../package.json')

const generator = path.resolve(__dirname, './')

const cli = cac('create-wordpress-theme')

cli
  .command('[outDir]','Generate wordpress theme developping envionment to given directory.')
  .option('--answers <json>', 'Skip all the prompts and use the provided answers')
  .action((outDir=".",options) => {
  //commandline main
  const files = fs.existsSync(outDir) ? fs.readdirSync(outDir) : []
  console.log(chalk`{green create-wordpress-theme v${version}}`)
  if(files.length) {
    return console.log(chalk.red(`Can't create ${outDir} because there's already a non-empty directory ${outDir} existing in path.`))
  }  console.log(chalk`✨  Generating Wordpress theme in {cyan ${outDir}}`)
  sao({ generator, outDir, options })
      .run()
      .catch((err) => {
        console.trace(err)
        process.exit(1)
      })
})

cli.help()

cli.version(version)

cli.parse()