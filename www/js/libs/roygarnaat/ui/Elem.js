define([
		'../utils/Utils',
		'../event/Dispatcher',
		'../event/Event',
		'./UIEvents',

		'fastclick'
],
	function (
		Util,
		Dispatcher,
		Event,
		UIEvents
	) {
		var Elem = function (elem) {
			var u = new Util(),
				_dispatcher = new Dispatcher(),
				_elem,

				_construct = function () {
					_dispatcher.decorate(_public);
					_setupElement();
					return _public;
				},

				_setupElement = function () {
					if (typeof elem == 'undefined' || elem == null) {
						console.error("elem is undefined.");
						return;
					}

					_elem = elem;

					if (window.addEventListener) {
						FastClick.attach(_elem);
					}

					_elem.onmouseover = _onMouseOver;
					_elem.onmouseout = _onMouseOut;
					_elem.onmousedown = _onMouseDown;
					_elem.onmouseup = _onMouseUp;
					_elem.onclick = _onClick;
					_elem.oninput = _onInput;

					_elem.onfocus = _onFocus;
					_elem.onblur = _onBlur;

					/*if(_elem.ontouchstart){
				_elem.ontouchstart = _onClick;
			}*/

					/*_elem.onfocus = function (e) {
				//alert(e);
			}*/
				},

				_destruct = function () {
					_dispatcher.free(_public);
					_destructElement();
					return true;
				},

				_destructElement = function () {
					_elem.onmouseover = null;
					_elem.onmouseout = null;
					_elem.onmousedown = null;
					_elem.onmouseup = null;
					_elem.onclick = null;
					_elem.ontouchstart = null;
					_elem.oninput = null;
					_elem.onfocus = null;
					_elem.onblur = null;

					_elem = null;
				},

				_onMouseOver = function (evt) {
					_public.notify(new Event(UIEvents.MOUSE_OVER));
				},

				_onMouseOut = function (evt) {
					_public.notify(new Event(UIEvents.MOUSE_OUT));
				},

				_onMouseDown = function (evt) {
					_public.notify(new Event(UIEvents.MOUSE_DOWN));
				},

				_onMouseUp = function (evt) {
					_public.notify(new Event(UIEvents.MOUSE_UP));
				},

				_onClick = function (e) {
					var evt = new Event(UIEvents.CLICK);
					evt.data = {
						nativeEvent: e
					};
					_public.notify(evt);
				},

				_onInput = function (e) {
					var evt = new Event(UIEvents.INPUT);
					evt.data = {
						nativeEvent: e
					};
					_public.notify(evt);
				},

				_onFocus = function (e) {
					var evt = new Event(UIEvents.FOCUS);
					evt.data = {
						nativeEvent: e
					};
					_public.notify(evt);
				},

				_onBlur = function (e) {
					var evt = new Event(UIEvents.BLUR);
					evt.data = {
						nativeEvent: e
					};
					_public.notify(evt);
				},

				_public = {

					destruct: function () {
						return _destruct();
					},

					getElem: function () {
						return _elem;
					},

					disable: function () {
						_elem.style.opacity = 0.1;
					},
					enable: function () {
						_elem.style.opacity = 1;
					}
				};
			return _construct();
		};
		return Elem;
	});