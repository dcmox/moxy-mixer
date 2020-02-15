let msg = 'hello world!'

let testMsg = 'this is a test msg to see if it replaces'

function displayMessage(msg) {
	console.log(msg.toString())
}

const a = () => 'test'

function displayExclamation(msg) {
	console.log(msg + '!')
}

const di = () => {
	return 'boo'
}

const tx = msg => `${msg}!!`

displayMessage(msg)
displayExclamation(tx(msg))
console.log(di())
console.log(a())

function testfn() {
	console.log('HELLO WORLD!!!!')
}

testfn()

class Test {
	constructor() {
		console.log('constructor test')
	}
	hello() {
		console.log('hi there')
	}
	get test() {
		return 1
	}
	static blah() {
		console.table(['woah', 'this', 'is', 'cool'])
	}
}

var test = new Test()
test.hello()
console.log(test.test)

Test.blah()
