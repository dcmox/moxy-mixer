'use strict'
exports.__esModule = true
exports.elem = function(type, attributes, props) {
	var elem = document.createElement(type)
	if (attributes) {
		Object.keys(attributes).forEach(function(attr) {
			return elem.setAttribute(attr, attributes[attr].toString())
		})
	}
	if (props) {
		Object.keys(props).forEach(function(prop) {
			return (elem[prop] = props[prop].toString())
		})
	}
	return elem
}
exports.svge = function(type, attributes, props) {
	var elem = document.createElementNS('http://www.w3.org/2000/svg', type)
	if (attributes) {
		Object.keys(attributes).forEach(function(attr) {
			return elem.setAttribute(attr, attributes[attr].toString())
		})
	}
	if (props) {
		Object.keys(props).forEach(function(prop) {
			return (elem[prop] = props[prop].toString())
		})
	}
	return elem
}
