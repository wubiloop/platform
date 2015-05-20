define(['../../event/Dispatcher',
		'../../event/Event',
		'../../net/loader/Loader',
		'../../net/loader/LoaderEvents',
	   	'../../net/urlrequest/URLRequestEvents',
	   	'../../net/urlrequest/URLRequestMethod'],

	function (Dispatcher, Event, Loader, LoaderEvents, URLRequestEvents, URLRequestMethod) {
		var cls = function () {
			var _loader = null,
				_responseData = null,
				_construct = function () {
					new Dispatcher().decorate(_public)
					//_public.setLog(true);
					return _public;
				},

				_addLoaderHandlers = function (loader) {
					loader.listenerAdd(LoaderEvents.ABORT, _onAbort);
					loader.listenerAdd(LoaderEvents.FAIL, _onFail);
					loader.listenerAdd(LoaderEvents.ERROR, _onError);
					loader.listenerAdd(LoaderEvents.SUCCESS, _onSuccess);
				},

				_removeLoaderHandlers = function (loader) {
					loader.listenerRemove(LoaderEvents.ABORT, _onAbort);
					loader.listenerRemove(LoaderEvents.FAIL, _onFail);
					loader.listenerRemove(LoaderEvents.ERROR, _onError);
					loader.listenerRemove(LoaderEvents.SUCCESS, _onSuccess);
				},

				_onAbort = function (e) {
					_removeLoaderHandlers(e.target);
					_public.notify(new Event(URLRequestEvents.ABORT));
				},

				_onFail = function (e) {
					_removeLoaderHandlers(e.target);
					_public.notify(new Event(URLRequestEvents.FAIL));
				},

				_onError = function (e) {
					_removeLoaderHandlers(e.target);

					//FAIL is the correct event to broadcast here. Please leave it like this! :)

					_public.notify(new Event(URLRequestEvents.FAIL));
				},

				_onSuccess = function (e) {
					_removeLoaderHandlers(e.target);
					_processResponseData(e.data);
				},

				_processResponseData = function (rData) {
					_responseData = rData;
					_public.notify(new Event(URLRequestEvents.SUCCESS, _responseData));
				},

				_public = {
					execute: function (url, data, method) {
						_loader = new Loader();
						_addLoaderHandlers(_loader);
						_loader.load(url, data, method);
					},

					abortLoader: function () {
						_loader.abort();
					}
				};
			return _construct();
		}
		return cls;
	}
);