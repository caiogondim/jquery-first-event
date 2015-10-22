/* global jQuery */
;(function ($) {
  'use strict'

  // Helpers
  // -------

  function splitEventsString (str) {
    return str.split(' ')
  }

  // jQuery methods
  // --------------

  $.fn.firstOn = $.fn.firstBind = function (eventsType, callback) {
    $.fn.on.apply(this, arguments)

    var eventsTypeArr = splitEventsString(eventsType)

    return this.each(function (i, el) {
      var events = $._data(el, 'events')

      // For every event listener attached, put it as first on the queue
      $.each(eventsTypeArr, function (i, eventType) {
        events[eventType].unshift(events[eventType].pop())
      })
      $._data(el, 'events', events)
    })
  }

  $.fn.firstDelegate = function () {
    var args = $.makeArray(arguments)
    var eventsString = args[1]

    if (!eventsString) {
      return this
    }

    $.fn.delegate.apply(this, arguments)

    var eventsArray = splitEventsString(eventsString)

    this.each(function (i, el) {
      var events = $._data(el, 'events')

      $.each(eventsArray, function (i, event) {
        events[event].unshift(events[event].pop())
      })
      $._data(el, 'events', events)
    })

    return this
  }

  $.fn.firstOne = function () {
    var args = $.makeArray(arguments)
    var eventsString = args[0]

    $.fn.one.apply(this, args)

    var eventsArray = splitEventsString(eventsString)

    this.each(function (i, el) {
      var events = $._data(el, 'events')

      $.each(eventsArray, function (i, event) {
        events[event].unshift(events[event].pop())
      })
    })

    return this
  }

  if (typeof $.fn.live === 'function') {
    $.fn.firstLive = function () {
      var args = $.makeArray(arguments)
      var eventsString = args[0]

      $.fn.live.apply(this, args)

      var eventsArray = splitEventsString(eventsString)
      var events = $._data(document, 'events').live

      // Put the recently added event listeners on the beginning of the array
      $.each(eventsArray, function (i, event) {
        events.unshift(events.pop())
      })

      return this
    }
  }
}(jQuery))
