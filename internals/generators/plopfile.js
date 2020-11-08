const shell = require('shelljs')
const componentGenerator = require('./component/index.js')
// const containerGenerator = require('./container/index.js');

/**
 * Every generated backup file gets this extension
 */

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  // plop.setGenerator('container', containerGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const { data } = config
    shell.exec(`npm run prettify -- "${data.path}"`, { silent: true })
    return ''
  })
}
