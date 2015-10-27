/* global describe, beforeEach, $, it, assert, expect */

'use strict'

var jsdom = require('mocha-jsdom')
var fs = require('fs')
var chai = require('chai')
global.assert = chai.assert
global.expect = chai.expect

// `live` was removed on jQuery 1.9

;[
  '1.4.4',
  '1.5.2',
  '1.6.4',
  '1.7.2',
  '1.8.3'
].forEach(function (jQueryVersion) {
  describe('firstLive jQuery v' + jQueryVersion, function () {
    jsdom({
      src: [
        fs.readFileSync('./test/jquery/jquery-' + jQueryVersion + '.js', 'utf-8'),
        fs.readFileSync('./src/index.js')
      ]
    })

    beforeEach(function () {
      $('body *').remove()
    })

    it('should fire callback before others', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')

      $('p')
        .live('click', function () {
          eventsOrder.push('vanilla 1')
        })
        .live('click', function () {
          eventsOrder.push('vanilla 2')
        })
        .firstLive('click', function () {
          eventsOrder.push('first event')
        })
        .trigger('click')

      assert.deepEqual(eventsOrder, ['first event', 'vanilla 1', 'vanilla 2'])
    })

    it('should work with multiple selectors', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')
      $('<div>').appendTo('body')

      $('p, div, span')
        .live('click', function () {
          eventsOrder.push('vanilla 1')
        })
        .live('click', function () {
          eventsOrder.push('vanilla 2')
        })
        .firstLive('click', function () {
          eventsOrder.push('first event')
        })
        .trigger('click')
        .trigger('click')
        .trigger('click')

      assert.deepEqual(eventsOrder, [
        'first event',
        'vanilla 1',
        'vanilla 2',
        'first event',
        'vanilla 1',
        'vanilla 2',
        'first event',
        'vanilla 1',
        'vanilla 2',
        'first event',
        'vanilla 1',
        'vanilla 2',
        'first event',
        'vanilla 1',
        'vanilla 2',
        'first event',
        'vanilla 1',
        'vanilla 2'
      ])
    })

    it('should work with multiple events', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')

      $('p')
        .live('mouseup mousedown', function (event) {
          eventsOrder.push('vanilla ' + event.type)
        })
        .firstLive('mouseup mousedown', function (event) {
          eventsOrder.push('first event ' + event.type)
        })
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

;[
  '1.9.1',
  '1.10.2',
  '1.11.3',
  '2.0.3',
  '2.1.4'
].forEach(function (jQueryVersion) {
  describe('firstLive jQuery v' + jQueryVersion, function () {
    jsdom({
      src: [
        fs.readFileSync('./test/jquery/jquery-' + jQueryVersion + '.js', 'utf-8'),
        fs.readFileSync('./src/index.js')
      ]
    })

    it('should throw error', function () {
      expect(function () {
        $('p').firstLive('click', $.noop)
      })
      .to.throw(
        '`firstLive` needs the method `live` and this jQuery version doesn\'t support it'
      )
    })
  })
})
