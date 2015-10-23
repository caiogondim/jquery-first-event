/* global describe, beforeEach, it, $, assert */

'use strict'

var jsdom = require('mocha-jsdom')
var fs = require('fs')
var chai = require('chai')
global.assert = chai.assert

;['1.11.3'].forEach(function (jQueryVersion) {
  describe('firstDelegate jQuery v' + jQueryVersion, function () {
    jsdom({
      src: [
        fs.readFileSync('./test/jquery/jquery-' + jQueryVersion + '.js', 'utf-8'),
        fs.readFileSync('./src/index.js')
      ]
    })

    beforeEach(function () {
      $('body *').remove()
    })

    it('should fire callbacks before others', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')

      $(document)
        .delegate('p', 'click', function () {
          eventsOrder.push('vanilla 1')
        })
        .delegate('p', 'click', function () {
          eventsOrder.push('vanilla 2')
        })
        .firstDelegate('p', 'click', function () {
          eventsOrder.push('first event')
        })

      $('p').trigger('click')

      assert.deepEqual(eventsOrder, ['first event', 'vanilla 1', 'vanilla 2'])
    })

    it('should work with multiple events', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')

      $(document)
        .delegate('p', 'mouseup mousedown', function (event) {
          eventsOrder.push('vanilla ' + event.type)
        })
        .firstDelegate('p', 'mouseup mousedown', function (event) {
          eventsOrder.push('first event ' + event.type)
        })

      $('p')
        .trigger('mousedown')
        .trigger('mouseup')

      assert.deepEqual(eventsOrder, [
        'first event mousedown',
        'vanilla mousedown',
        'first event mouseup',
        'vanilla mouseup'
      ])
    })
  })
})
