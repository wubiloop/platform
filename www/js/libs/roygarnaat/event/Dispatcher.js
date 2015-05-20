define(
	function () {

		var Dispatcher = function () {
			var _doLog = false,
				_observers = {},
				_listenerHas = function (evtType, handler, scope) {

					if (typeof _observers[evtType] == "undefined") {
						/*console.log(_observers);
						alert(evtType);*/
						return false;
					}

					/*
					console.log(_observers);
					alert();
					*/

					var l = _observers[evtType].length - 1,
						i = l;
					for (i; i >= 0; i--) {

						if (_observers[evtType][i].type == evtType && _observers[evtType][i].handler == handler /*&& _observers[evtType][i].signature == String(handler)*/) {
							return true;
						}
					}
					return false;
				},
				_listenerRemove = function (evtType, handler, scope) {
					//console.log(_observers);
					if (typeof _observers[evtType] == "undefined") {
						//onsole.error('Dispatcher._listenerRemove(evtType, handler, scope) | eventType is undefined. Handler method for tracking the error -> ', handler, handler, scope);
						return false;
					}
					var found = false;
					var l = _observers[evtType].length - 1,
						i = l;
					for (i; i >= 0; i--) {
						if (_observers[evtType][i].type == evtType && _observers[evtType][i].handler == handler && _observers[evtType][i].signature == String(handler) /*&& _observers[evtType][i].scope == scope*/) {
							_observers[evtType].splice(i, 1);
							found = true;
							break;
						}
					}
					if (found == false ){
						//console.error('Dispatcher._listenerRemove(evtType, handler, scope) | event registry could not be removed because it cannot be found -> ', evtType, handler, scope);
						return false;
					}else{
						//console.info('Dispatcher._listenerRemove(evtType, handler, scope) | Removed event listener', evtType, handler, scope);
						return true;
					}
				},
				_listenerAdd = function (evtType, handler, scope) {

					if (typeof evtType == "undefined") {
						console.error('Dispatcher.listenerAdd(evtType, handler, scope) | eventType is undefined. Handler method for tracking the error -> ', handler);
					}
					if (typeof _observers[evtType] == "undefined") {
						_observers[evtType] = [];
					}

					_observers[evtType].push({
						type: evtType,
						handler: handler,
						scope: scope,
						signature: String(handler),
					});
				},
				_notify = function (evtObj) {

					if (typeof evtObj.type == "undefined") {
						console.error('Dispatcher.notify(evtObj) | eventType is undefined. Click data (if available) for tracking the error -> ', data);
						return false;
					}

					var listener,
						evtType = evtObj.type;

					if (_doLog) {
						console.log(evtType);
					}
					if (_observers[evtType]) {
						for (listener in _observers[evtType]) {
							if (evtObj.type == _observers[evtType][listener].type) {


								var scope = _observers[evtType][listener].scope || _observers[evtType][listener].handler;
								evtObj.target = this;
								_observers[evtType][listener].handler.call(scope, evtObj);
							}
						}
					}
				},

				_removeAllListeners = function () {
					for (var o in _observers) {
						var observerTypes = _observers[o];
						for (var t in observerTypes) {
							//console.log(observerTypes[t].type);
							_listenerRemove(observerTypes[t].type, observerTypes[t].handler);
						}
					}
				},

				_decorate = function (obj) {
					obj.listenerHas = _listenerHas;
					obj.listenerAdd = _listenerAdd;
					obj.listenerRemove = _listenerRemove;
					obj.notify = _notify;
					obj.removeAllListeners = _removeAllListeners;
					obj.unDecorate = _unDecorate;
					obj.setLog = _public.setLog;
					return obj;
				},

				_unDecorate = function (obj) {

					delete obj.listenerHas;
					delete obj.listenerAdd;
					delete obj.listenerRemove;
					delete obj.notify;
					delete obj.removeAllListeners;
					delete obj.unDecorate;
					delete obj.setLog;

					/*
			obj.listenerHas = null;
			obj.listenerAdd = null;
			obj.listenerRemove = null;
			obj.notify = null;
			obj.removeAllListeners = null;
			obj.unDecorate = null;
			*/
				},

				_public = {
					listenerRemove: function (evtType, handler, scope) {
						_listenerRemove.call(_public, evtType, handler, scope);
					},
					listenerAdd: function (evtType, handler, scope) {
						_listenerAdd.call(_public, evtType, handler, scope);
					},
					listenerHas: function (evtType, handler, scope) {
						_listenerHas.call(_public, evtType, handler, scope);
					},
					notify: function (evtObj) {
						_notify.call(this, evtObj);
					},

					decorate: _decorate,
					unDecorate: _unDecorate,

					setLog: function (doLog) {
						_doLog = doLog;
					}
				};
			return _public;
		};
		return Dispatcher;
	}
);