;(function($) {
    'use strict'

    function splitEventsType(str) {
        return str.split(' ')
    }

    $.fn.firstOn = function(eventsType, callback) {
        $.fn.on.apply(this, arguments)

        var eventsTypeArr = splitEventsType(eventsType)

        return this.each(function(i, el) {
            var events = $._data(el, 'events')

            // For every event listener attached, put it as first on the queue
            $.each(eventsTypeArr, function(i, eventType) {
                events[eventType].unshift(events[eventType].pop())
            })
            $._data(el, 'events', events)
        })
    }
}(jQuery));
