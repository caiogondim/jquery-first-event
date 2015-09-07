/* global chai, $, describe, it, beforeEach */

'use strict'

var assert = chai.assert

describe('firstOne', function () {
  beforeEach(function () {
    $('body *').remove()
  })

  it('should fire callback before others', function () {
    var eventsOrder = []

    $('<p>').appendTo('body')

    $('p')
      .on('click', function () {
        eventsOrder.push('vanilla 1')
      })
      .on('click', function () {
        eventsOrder.push('vanilla 2')
      })
      .firstOne('click', function () {
        eventsOrder.push('first event')
      })
      .trigger('click')

    assert.deepEqual(eventsOrder, ['first event', 'vanilla 1', 'vanilla 2'])
  })

  it('should fire callback only once', function () {
    var eventsOrder = []

    $('<p>').appendTo('body')

    $('p')
      .one('click', function () {
        eventsOrder.push('vanilla 1')
      })
      .one('click', function () {
        eventsOrder.push('vanilla 2')
      })
      .firstOne('click', function () {
        eventsOrder.push('first event')
      })
      .trigger('click')
      .trigger('click')
      .trigger('click')

    assert.deepEqual(eventsOrder, ['first event', 'vanilla 1', 'vanilla 2'])
  })

  it('should work with multiple selectors', function () {
    var eventsOrder = []

    $('<p>').appendTo('body')
    $('<div>').appendTo('body')
    $('<span>').appendTo('body')

    $('p, div, span')
      .one('click', function () {
        eventsOrder.push('vanilla 1')
      })
      .one('click', function () {
        eventsOrder.push('vanilla 2')
      })
      .firstOne('click', function () {
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
      'vanilla 2'
    ])
  })

  it('should work with multiple events', function () {
    var eventsOrder = []

    $('<p>').appendTo('body')

    $('p')
      .one('mouseup mousedown', function (event) {
        eventsOrder.push('vanilla ' + event.type)
      })
      .firstOne('mouseup mousedown', function (event) {
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
