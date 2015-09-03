;(function($) {
    'use strict'

    $.fn.firstOn = function(eventType, callback) {
        $.fn.on.apply(this, arguments)

        return this.each(function(i, el) {
            var events = $._data(el, 'events')
            events[eventType].unshift(events[eventType].pop())
            $._data(el, 'events', events)
        })
    }
}(jQuery));
