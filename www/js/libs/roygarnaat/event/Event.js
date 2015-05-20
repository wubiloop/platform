define(function () {
	var Event = function (type, data) {

		if (typeof type == "undefined") {
			console.error('Event(evtType, data) | eventType is undefined. Click data (if available) for tracking the error -> ', data);
		}

		var _type = type; // type is set in constructor
		var _target = null; // set by dispatcher on dispatcher.notify()
		var _data = data || null; // Custom data object to parse data

		var _public = {
			type: _type,
			target: _target,
			data: _data
		};
		return _public;
	};
	//
	return Event;
});