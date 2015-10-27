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

  function makeLastEventListenerFirst (opts) {
    // For jQuery >= 1.7, the event data structure can be obtained by
    // `$._data(el, 'events')`. All delegated event listeners will be in the
    // same array as regular event listeners. You have to check the `delegateCount`
    // property. If > 0, then there is delegated events on this element. The
    // first event listeners will always be the delegated ones.
    //
    // Eg.:
    //   {
    //     "click": [
    //       {
    //         "type": "click",
    //         "origType": "click",
    //         "guid": 6,
    //         "selector": "span",
    //         "needsContext": false,
    //         "namespace": ""
    //       },
    //       {
    //         "type": "click",
    //         "origType": "click",
    //         "guid": 2,
    //         "namespace": ""
    //       },
    //       {
    //         "type": "click",
    //         "origType": "click",
    //         "guid": 5,
    //         "namespace": ""
    //       },
    //       delegateCount: 1
    //     ]
    //   }

    // For jQuery < 1.7, the event data structure can be obtained by
    // `$._data(el, 'events')`. All delegated event listeners will be inside an
    // array on the `live` object key.
    //
    // Eg.:
    //   {
    //     "live": [
    //       {
    //         "selector": "p",
    //         "origType": "click",
    //         "preType": "click",
    //         "namespace": "click.p",
    //         "type": "live",
    //         "guid": 4
    //       }
    //     ],
    //     "click": [
    //       {
    //         "selector": "p",
    //         "origType": "click",
    //         "preType": "click",
    //         "namespace": "p",
    //         "type": "click",
    //         "guid": 1
    //       }
    //     ]
    //   }

    var elements = opts.elements
    var events = opts.events
    var isDelegated = opts.isDelegated || false

    elements.each(function (i, element) {
      var eventsListeners = getEventListeners({el: element})

      $.each(events, function (i, event) {
        if (isJqueryVersionLessThan1dot7()) {
          if (isDelegated) {
            eventsListeners.live.unshift(eventsListeners.live.pop())
          } else {
            eventsListeners[event].unshift(eventsListeners[event].pop())
          }
        } else {
          var curEventListeners = eventsListeners[event]
          var delegatedListeners = curEventListeners.slice(0, curEventListeners.delegateCount)
          var vanillaListeners = curEventListeners.slice(curEventListeners.delegateCount)

          if (isDelegated) {
            delegatedListeners.unshift(delegatedListeners.pop())
            Array.prototype.splice.apply(
              curEventListeners,
              [0, curEventListeners.delegateCount].concat(delegatedListeners)
            )
          } else {
            vanillaListeners.unshift(vanillaListeners.pop())
            Array.prototype.splice.apply(
              curEventListeners,
              [curEventListeners.delegateCount, vanillaListeners.length].concat(vanillaListeners)
            )
          }
        }
      })
    })
  }

  function isJqueryVersionLessThan1dot7 () {
    var jQueryVersion = $.fn.jquery.split('.')
    var jQueryVersionMajor = Number(jQueryVersion[0])
    var jQueryVersionMinor = Number(jQueryVersion[1])

    return (jQueryVersionMajor === 1 && jQueryVersionMinor < 7)
  }

  // jQuery methods
  // --------------

  $.fn.firstOn = function () {
    if (typeof $.fn.on !== 'function') {
      throw new Error(
        '`firstOn` needs the method `on` and this jQuery version doesn\'t support it'
      )
    }

    var args = $.makeArray(arguments)

    $.fn.on.apply(this, args)

    var eventsString = args[0]

    makeLastEventListenerFirst({
      elements: this,
      events: splitEventsString(eventsString)
    })

    return this
  }

  $.fn.firstBind = function () {
    var args = $.makeArray(arguments)
    var eventsString = args[0]

    $.fn.bind.apply(this, args)

    makeLastEventListenerFirst({
      elements: this,
      events: splitEventsString(eventsString)
    })

    return this
  }

  $.fn.firstDelegate = function () {
    var args = $.makeArray(arguments)
    var eventsString = args[1]

    if (!eventsString) {
      return this
    }

    $.fn.delegate.apply(this, arguments)

    makeLastEventListenerFirst({
      elements: this,
      events: splitEventsString(eventsString),
      isDelegated: true
    })

    return this
  }

  $.fn.firstOne = function () {
    var args = $.makeArray(arguments)
    var eventsString = args[0]

    $.fn.one.apply(this, args)

    makeLastEventListenerFirst({
      elements: this,
      events: splitEventsString(eventsString)
    })

    return this
  }

  $.fn.firstLive = function () {
    if (typeof $.fn.live !== 'function') {
      throw new Error(
        '`firstLive` needs the method `live` and this jQuery version doesn\'t support it'
      )
    }

    var args = $.makeArray(arguments)
    var eventsString = args[0]

    $.fn.live.apply(this, args)

    makeLastEventListenerFirst({
      elements: $(document),
      events: splitEventsString(eventsString),
      isDelegated: true
    })

    return this
  }
}(jQuery))
