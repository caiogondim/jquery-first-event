'use strict'

var assert = chai.assert

beforeEach(function() {
    $('body *').remove()
})

it('should fire callback with `firstOn` before others', function() {
    var eventsOrder = []

    $('<p>').appendTo('body')

    $('p')
        .on('click', function() {
            eventsOrder.push('vanilla 1')
        })
        .on('click', function() {
            eventsOrder.push('vanilla 2')
        })
        .firstOn('click', function() {
            eventsOrder.push('first event')
        })
        .trigger('click')

    assert.deepEqual(eventsOrder, ['first event', 'vanilla 1', 'vanilla 2'])
})

it('should work with multiple selector', function() {
    var eventsOrder = []

    $('<p>').appendTo('body')
    $('<div>').appendTo('body')
    $('<span>').appendTo('body')

    $('p, div, span')
        .on('click', function() {
            eventsOrder.push('vanilla 1')
        })
        .on('click', function() {
            eventsOrder.push('vanilla 2')
        })
        .firstOn('click', function() {
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
        'vanilla 2',
    ])
})
