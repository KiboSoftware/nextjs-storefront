const { contentstack } = require('../config/config.js')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const configPath = path.join(__dirname, '../config/contentstack.config.json')
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf8'))
configFile.target_stack = contentstack.apiKey

fs.writeFile(configPath, JSON.stringify(configFile), (err, res) => {
  if (err) console.log(err)
})

const commandsToExecute = `csdx cm:stacks:import -c  "${configPath}" `
exec(commandsToExecute)
