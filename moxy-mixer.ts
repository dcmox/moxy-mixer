const REGEX_VARS = /(?:let|var|const|function|class|get|set|static) ([_a-zA-Z0-9]+)/g
const REGEX_GLOBALS = /(document|Object|console|window|String|Array)\.([a-zA-Z0-9_]+)/g
const REGEX_METHODS = /\.([a-zA-Z0-9_]+)?/g
const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const shuffle = (s: string) =>
	s
		.split('')
		.sort((a: any, b: any) =>
			Math.floor(Math.random() * 2) + 1 > 1 ? 1 : -1,
		)
		.join('')

const mix = (js: string) => {
	let tokens: any = []
	// Randomize our charset for use
	let cs: string = shuffle(CHARSET)

	// Replace variables, eg: var message = 'test' -> var a = 'test' or function displayMessage -> function b
	const r = new RegExp(REGEX_VARS)
	let match
	// tslint:disable-next-line: no-conditional-assignment
	while ((match = r.exec(js)) !== null) {
		// console.log(match)
		if (match[1].length === 1) {
			cs = cs
				.split('')
				.splice(cs.indexOf(match[1]) + 1)
				.join('')
			continue
		}
		tokens.push({ value: match[1], type: 'var' })
	}
	tokens.sort((a: any, b: any) => (a.value.length > b.value.length ? -1 : 1))

	// Replace globals like document|Object|console|window.method, eg: document.getElementById -> h
	const rg = new RegExp(REGEX_GLOBALS)
	const tkg = []
	while ((match = rg.exec(js)) !== null) {
		// console.log(match)
		tkg.push({ value: match[0], type: 'fn' })
	}
	tkg.sort((a: any, b: any) => (a.value.length > b.value.length ? -1 : 1))
	tokens.push(...tkg)

	// Replace methods, eg. str.toString() -> str[x]()
	const rm = new RegExp(REGEX_METHODS)
	const tk = []
	while ((match = rm.exec(js)) !== null) {
		tk.push({ value: match[0], type: 'method' })
	}
	tk.sort((a: any, b: any) => (a.value.length > b.value.length ? -1 : 1))
	tokens.push(...tk)

	// Remove duplicates
	tokens = tokens.filter(
		(t: any, i: number) =>
			tokens.findIndex(fi => fi.value === t.value) === i,
	)

	tokens.forEach((token: any, i: number) => {
		const r = cs[i]
		js = processToken(token, r, js)
		if (token.type === 'fn') {
			js = `const ${r} = ${token.value}\n` + js
		} else if (token.type === 'method') {
			js = `const ${r} = '${token.value.slice(1)}'\n` + js
		}
	})
	// Replace strings with hex encoded values
	js = processToken(null, cs[tokens.length] + cs[tokens.length + 1], js)
	js = `const ${cs[tokens.length + 1]} = decodeURIComponent\n` + js
	js =
		`const ${cs[tokens.length]} = (s) => s[${
			cs[tokens.length + 1]
		}("%72%65%70%6c%61%63%65")](/\\x([0-9a-f]{2})/g, (_, _p) => String[${
			cs[tokens.length + 1]
		}("%66%72%6f%6d%43%68%61%72%43%6f%64%65")](parseInt(_p, 16)))\n` + js

	// Final replace to minify
	return js
	// .replace(/\t/g, '')
	// .replace(/\r\n/g, '\n')
	// .replace(/{\n/g, '{')
	// .replace(/}\n/g, '}')
	// .replace(/\n/g, ';')
	// .replace(/;;/g, ';')
}
// tslint:disable: quotemark
const processToken = (token: any, r: string, js: string) => {
	let idx: number = 0
	const len: number = token?.value.length
	const pos = {
		open: -1,
		close: -1,
	}

	while (true) {
		if (['"', "'", '`'].indexOf(js[idx]) > -1) {
			if (pos.open === -1) {
				pos.open = idx
			} else if (pos.close === -1) {
				if (
					token === null &&
					js.slice(pos.open + 1, idx).indexOf('${') === -1
				) {
					if (Math.floor(Math.random() * 2) + 1 > 1) {
						const encoded =
							r[r.length - 1] +
							"('" +
							js
								.slice(pos.open + 1, idx)
								.split('')
								.map(c => '%' + c.charCodeAt(0).toString(16))
								.join('')
								.toString() +
							"')"
						js = js.slice(0, pos.open) + encoded + js.slice(idx + 1)

						idx += encoded.length - (idx - pos.open)
					} else {
						const encoded =
							r[0] +
							"('" +
							js
								.slice(pos.open + 1, idx)
								.split('')
								.map(e => '\\x' + e.charCodeAt(0).toString(16))
								.join('') +
							"')"
						js = js.slice(0, pos.open) + encoded + js.slice(idx + 1)
						idx += encoded.length - (idx - pos.open)
					}
				}
				pos.open = -1
			}
		} else if (token) {
			const isInterpolatedVar =
				js.slice(idx - 2, idx) === '${' && js[idx + len] === '}'
			if (pos.open === -1 || isInterpolatedVar) {
				if (js.slice(idx, idx + len) === token.value) {
					if (token.type === 'method') {
						js = js.slice(0, idx) + `[${r}]` + js.slice(idx + len)
					} else {
						js = js.slice(0, idx) + r + js.slice(idx + len)
					}
				}
			}
		}
		idx++
		if (idx > js.length) {
			break
		}
	}
	return js
}

module.exports = mix
