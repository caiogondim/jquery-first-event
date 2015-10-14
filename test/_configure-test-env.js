'use strict'

var jsdom = require('jsdom')
var chai = require('chai')
global.assert = chai.assert

// Configure jsdom
if (!global.document) {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
}
if (!global.jQuery) {
  global.jQuery = require('jquery')(document.defaultView)
  global.$ = global.jQuery
}

require('../src/index.js')
