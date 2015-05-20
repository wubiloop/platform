define(
	[
		'../../event/Dispatcher',
		'../../event/Event'
	],
	function (Dispatcher, Event) {
		var WebSocketConnection = function () {

			var _url = '',

				_protocols = '',
				_webSocket = null,
				_connectedCounter = 0,

				_construct = function () {
					return new Dispatcher().decorate(_public);
				},

				_createConnection = function (url, protocols) {
					_url = url;

					if (_protocolsStringValid(protocols)) {
						_protocols = protocols;
					}

					if (_webSocketsAvailable()) {
						try {
							_webSocket = new WebSocket(_url);
							_webSocket.onopen = _onSocketOpen;
							_webSocket.onmessage = _onSocketMessage;
							_webSocket.onerror = _onSocketError;
							_webSocket.onclose = _onSocketClose;

							/*console.log(_webSocket.readyState);
							switch (_webSocket.readyState) {
							case WebSocket.CONNECTING:
								// do something
								break;
							case WebSocket.OPEN:
								// do something
								break;
							case WebSocket.CLOSING:
								// do something
								break;
							case WebSocket.CLOSED:
								// do something
								break;
							default:
								// this never happens or we are targetting the wrong protocol in the cfg :(
								break;
							}
							*/
						} catch (e) {
							console.error("WebSocketConnection._createConnection() | Invalid url string was passed. Or the port is blocked by another program");
							return;
						}
					} else {
						console.info("WebSockets not available in this browser");
					}
				},

				_destroySocket = function () {
					if (_webSocket) {
						_webSocket.onopen = null;
						_webSocket.onmessage = null;
						_webSocket.onerror = null;
						_webSocket.onclose = null;
						_webSocket = null;
					}
				},

				_webSocketsAvailable = function () {
					
					if (!window.WebSocket) {
						window.WebSocket = window.MozWebSocket ? window.MozWebSocket : undefined;
					}
					return ("WebSocket" in window);
				},

				_protocolsStringValid = function (sProtocols) {
					return (sProtocols instanceof String && sProtocols.length > 0);
				},


				_onSocketOpen = function (e) {
					if (_webSocket.readyState != WebSocket.OPEN) {
						// Something is wrong
						console.error("WebSocketConnection._onSocketOpen(e) | _websocket.readyState may only be WebSocket.OPEN(1)");
						return;
					}

					_connectedCounter++;
					if (_connectedCounter == 1) {
						_public.notify(new Event(WebSocketConnection.events.CONNECTED, {}));
					} else {
						_public.notify(new Event(WebSocketConnection.events.RECONNECTED, {}));
					}
				},
				
				_onSocketMessage = function (e) {
					var jsonData = {};
					try {
						jsonData = JSON.parse(e.data);
					} catch (e) {
						console.error('WebSocketConnection._onSocketMessage() | Could not parse received data to JSON');
					}
					_public.notify(new Event(WebSocketConnection.events.RECEIVED, jsonData));
				},
				
				_onSocketError = function (e) {
					var eventData = e;
					_public.notify(new Event(WebSocketConnection.events.ERROR, eventData));
				},
				
				_onSocketClose = function (e) {
					var eventData = e;
					_public.notify(new Event(WebSocketConnection.events.DISCONNECTED, e));
					_destroySocket();
				},

				_public = {
					connect: function (url, protocols) {
						_public.notify(new Event(WebSocketConnection.events.CONNECTING, {}));
						_createConnection(url, protocols);
					},
					reconnect: function () {
						_public.notify(new Event(WebSocketConnection.events.RECONNECTING, {}));
						_public.connect(_url, _protocols);
					},
					disconnect: function () {
						_public.notify(new Event(WebSocketConnection.events.DISCONNECTING, {}));

						// TO DO: Fix close bug! this call will not end up in onSocketClose for some reason
						if (!_webSocket) {
							console.error("WebSocketConnection.disconnect() | _webSocket is NULL so it cannot be closed");
						} else {
							_webSocket.close();
						}

						//_public.notify(new Event(WebSocketConnection.events.DISCONNECTED));
					},
					send: function (socketMsg) {
						_public.notify(new Event(WebSocketConnection.events.SENDING, socketMsg));

						//console.log(socketMsg);
						//socketMsg['Sec-WebSocket-Key'] = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
						_webSocket.send(JSON.stringify(socketMsg));
					},

					getReadyState: function () {
						var sWebsocketReadyState = false;
						if(_webSocket){
							sWebsocketReadyState = _webSocket.readyState;
						};
						
						return sWebsocketReadyState;
					}
				};
			return _construct();
		};

		WebSocketConnection.events = {

			CONNECTING: 'WebSocketConnection.events.CONNECTING',
			CONNECTED: 'WebSocketConnection.events.CONNECTED',

			RECONNECTING: 'WebSocketConnection.events.RECONNECTING',
			RECONNECTED: 'WebSocketConnection.events.RECONNECTED',

			DISCONNECTING: 'WebSocketConnection.events.DISCONNECTING',
			DISCONNECTED: 'WebSocketConnection.events.DISCONNECTED',

			SENDING: 'WebSocketConnection.events.SENDING',
			RECEIVED: 'WebSocketConnection.events.RECEIVED',

			ERROR: 'WebSocketConnection.events.ERROR'
		};
		
		return WebSocketConnection;
	}
);