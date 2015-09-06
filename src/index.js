;(function($) {
    'use strict'

    function splitEventsString(str) {
        return str.split(' ')
    }

    $.fn.firstOn = $.fn.firstBind = function(eventsType, callback) {
        $.fn.on.apply(this, arguments)

        var eventsTypeArr = splitEventsString(eventsType)

        return this.each(function(i, el) {
            var events = $._data(el, 'events')

            // For every event listener attached, put it as first on the queue
            $.each(eventsTypeArr, function(i, eventType) {
                events[eventType].unshift(events[eventType].pop())
            })
            $._data(el, 'events', events)
        })
    }

    $.fn.firstDelegate = function() {
        var args = $.makeArray(arguments)
        var eventsString = args[1]

        if (!eventsString) {
            return this
        }
        
        $.fn.delegate.apply(this, arguments)

        var eventsArray = splitEventsString(eventsString)

        this.each(function(i, el) {
            var events = $._data(el, 'events')

            $.each(eventsArray, function(i, event) {
                events[event].unshift(events[event].pop())
            })
            $._data(el, 'events', events)
        })

        return this
    }
}(jQuery));
