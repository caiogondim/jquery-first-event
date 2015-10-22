/* global jQuery */
;(function ($) {
  'use strict'

  // Helpers
  // -------

  function splitEventsString (str) {
    return str.split(' ')
  }

  function getEventListeners (args) {
    var el = args.el

    if (isJqueryVersionLessThan1dot7()) {
      return $(el).data('events')
    } else {
      return $._data(el, 'events')
    }
  }

  function isJqueryVersionLessThan1dot7 () {
    var jQueryVersion = $.fn.jquery.split('.')
    var jQueryVersionMajor = Number(jQueryVersion[0])
    var jQueryVersionMinor = Number(jQueryVersion[1])

    return (jQueryVersionMajor === 1 && jQueryVersionMinor < 7)
  }

  // jQuery methods
  // --------------

  if (typeof $.fn.on === 'function') {
    $.fn.firstOn = function () {
      var args = $.makeArray(arguments)

      $.fn.on.apply(this, args)

      var eventsString = args[0]
      var eventsArray = splitEventsString(eventsString)

      return this.each(function (i, el) {
        var eventsListeners = getEventListeners({el: el})

        if (isJqueryVersionLessThan1dot7()) {
          // var events = $._data(el, 'events')

          // $.each(eventsTypeArr, function (i, eventType) {
          //   events[eventType].unshift(events[eventType].pop())
          // })
          // $._data(el, 'events', events)
        } else {
          $.each(eventsArray, function (i, event) {
            var curEventListeners = eventsListeners[event]
            var delegatedListeners = curEventListeners.slice(0, curEventListeners.delegateCount)

            curEventListeners.unshift(curEventListeners.pop())

            Array.prototype.splice.apply(curEventListeners, [0, curEventListeners.delegateCount].concat(delegatedListeners))
          })
        }
      })
    }
  }

  $.fn.firstBind = function () {
    var args = $.makeArray(arguments)

    $.fn.bind.apply(this, args)

    var eventsString = args[0]
    var eventsArray = splitEventsString(eventsString)

    return this.each(function (i, el) {
      var eventsListeners = getEventListeners({el: el})

      if (isJqueryVersionLessThan1dot7()) {
        // var events = $._data(el, 'events')

        // $.each(eventsTypeArr, function (i, eventType) {
        //   events[eventType].unshift(events[eventType].pop())
        // })
        // $._data(el, 'events', events)
      } else {
        $.each(eventsArray, function (i, event) {
          var curEventListeners = eventsListeners[event]
          var delegatedListeners = curEventListeners.slice(0, curEventListeners.delegateCount)

          curEventListeners.unshift(curEventListeners.pop())

          Array.prototype.splice.apply(curEventListeners, [0, curEventListeners.delegateCount].concat(delegatedListeners))
        })
      }
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
      var eventsListeners = getEventListeners({el: document})

      if (isJqueryVersionLessThan1dot7()) {
        $.each(eventsArray, function (i, event) {
          eventsListeners.live.unshift(eventsListeners.live.pop())
        })
      } else {
        $.each(eventsArray, function (i, event) {
          var curEventListeners = eventsListeners[event]
          var delegatedListeners = curEventListeners.slice(0, curEventListeners.delegateCount)

          delegatedListeners.unshift(delegatedListeners.pop())

          Array.prototype.splice.apply(curEventListeners, [0, curEventListeners.delegateCount].concat(delegatedListeners))
        })
      }

      return this
    }
  }
}(jQuery))
