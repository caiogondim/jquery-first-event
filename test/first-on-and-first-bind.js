/* global describe, beforeEach, it, $, assert */

'use strict'

require('./_configure-test-env')

describe('firstOn and firstBind', function () {
  beforeEach(function () {
    $('body *').remove()
  })

  // `firstOn` and `firstBind` should behave the same
  ;['firstOn', 'firstBind'].forEach(function (method) {
    it('should fire callback before others', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')

      $('p')
        .on('click', function () {
          eventsOrder.push('vanilla 1')
        })
        .on('click', function () {
          eventsOrder.push('vanilla 2')
        })[method]('click', function () {
          eventsOrder.push('first event')
        })
        .trigger('click')

      assert.deepEqual(eventsOrder, ['first event', 'vanilla 1', 'vanilla 2'])
    })

    it('should work with multiple selectors', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')
      $('<div>').appendTo('body')
      $('<span>').appendTo('body')

      $('p, div, span')
        .on('click', function () {
          eventsOrder.push('vanilla 1')
        })
        .on('click', function () {
          eventsOrder.push('vanilla 2')
        })[method]('click', function () {
          eventsOrder.push('first event')
        })
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
        'vanilla 2'
      ])
    })

    it('should work with multiple events', function () {
      var eventsOrder = []

      $('<p>').appendTo('body')

      $('p')
        .on('mouseup mousedown', function (event) {
          eventsOrder.push('vanilla ' + event.type)
        })[method]('mouseup mousedown', function (event) {
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
