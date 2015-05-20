define(function () {
	var Utils = function () {
		return {
			getById: function (elemId) {
				var result = document.getElementById(elemId);
				if (!result) {
					result = false;
					console.error("Utils.getById() | Element with id '" + elemId + "' does not exist.");
				}
				return result;
			},

			addClass: function (elem, className) {
				if (new Utils().hasClass(elem, className) == false) {
					elem.className = elem.className + ' ' + className;
				}
			},

			removeClass: function (elem, className) {
				var currentClasses = elem.className.split(' ');
				for (var i = currentClasses.length - 1; i >= 0; i--) {
					if (currentClasses[i] == className) {
						currentClasses.splice(i, 1);
					}
				}
				elem.className = currentClasses.join(" ");
			},
			hasClass: function (elem, className) {
				var currentClasses = elem.className.split(' ');
				var hasClass = false;
				for (var i = currentClasses.length - 1; i >= 0; i--) {
					if (currentClasses[i] == className) {
						hasClass = true;
					}
				}
				return hasClass;
			},

			getByClass : function (className, findIn) {
				var results,
					elem = findIn ? findIn : document;
				if (elem.querySelectorAll) {
					results = elem.querySelectorAll('.' + className);
				} else if (elem.getElementsByClassName) {
					results = elem.getElementsByClassName(className);
				} else {
					var elements = elem.getElementsByTagName('*'),
						i = 0,
						l = elements.length;
					results = [];
					for (i; i < l; i++) {
						if (hasClass(elements[i], className)) {
							results.push(elements[i]);
						}
					}
				}
				return results;
			},


			getElementStyle: function (element, styleProp) {
				return (element.currentStyle) ? element.currentStyle[styleProp] : (window.getComputedStyle) ? document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp) : 'unknown';
			},




			/**/
			mergeObjects: function (obj1, obj2) {
				for (var prop in obj2) {
					obj1[prop] = obj2[prop];
				}
				return obj1;
			},
			sortObjectOnValues: function (obj) {
				var sortable = [],
					prop, i, l, newObj;
				for (prop in obj) {
					sortable.push([prop, obj[prop]]);
				}
				l = sortable.length;
				sortable.sort(function (a, b) {
					if (a[1] < b[1]) return -1;
					if (a[1] > b[1]) return 1;
					return 0;
				});
				newObj = {};
				for (i = 0; i < l; i++) {
					newObj[sortable[i][0]] = sortable[i][1];
				}
				return newObj;
			},


			/**/
			setCookie: function (c_name, value, expiredays) {
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + expiredays);
				document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/";
			},
			getCookie: function (c_name) {
				var c_start,
					c_end;
				if (document.cookie.length > 0) {
					c_start = document.cookie.indexOf(c_name + "=");
					if (c_start != -1) {
						c_start = c_start + c_name.length + 1;
						c_end = document.cookie.indexOf(";", c_start);
						if (c_end == -1) {
							c_end = document.cookie.length;

						}
						return unescape(document.cookie.substring(c_start, c_end));
					}
				}
				return false;
			},
		}
	}
	return Utils;
});