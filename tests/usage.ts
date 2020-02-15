const MoxyMixer = require('../moxy-mixer')

const fs = require('fs')
const testFile = fs.readFileSync('./tests/test.js').toString()

console.log(MoxyMixer(testFile))

fs.writeFileSync('./tests/output.js', MoxyMixer(testFile))

console.log('===================')

// tslint:disable-next-line: no-eval
eval(MoxyMixer(testFile))
