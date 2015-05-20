/*
 object-traverse v0.1.0
 [url]https://github.com/nervgh/object-traverse[/url]
 */
!function(a){"use strict";function b(a){return a instanceof Object}function c(a){return"number"==typeof a&&!h(a)}function d(a,c,d,e,f,h){var i=[[],0,g(a).sort(),a],j=[];do{var k=i.pop(),l=i.pop(),m=i.pop(),n=i.pop();for(j.push(k);l[0];){var o=l.shift(),p=k[o],q=n.concat(o),r=c.call(d,k,p,o,q,m);if(r!==!0){if(r===!1){i.length=0;break}if(!(m>=h)&&b(p)){if(-1!==j.indexOf(p)){if(f)continue;throw new Error("Circular reference")}if(!e){i.push(n,m,l,k),i.push(q,m+1,g(p).sort(),p);break}i.unshift(q,m+1,g(p).sort(),p)}}}}while(i[0])}function e(a,b,e,g,h,i){var j=b,k=e,l=1===g,m=!!h,n=c(i)?i:f;d(a,j,k,l,m,n)}var f=100,g=Object.keys,h=a.isNaN;Object.traverse=e}(window);

// ---------------------------

function copy(any) {
    return JSON.parse(JSON.stringify(any));
}

function isString(any) {
    return typeof any === 'string';
}

function isNumberLikeString(string) {
    return /^\d+(.\d+)?$/.test(string);
}

// ---------------------------

var data = {
    delivery: ["7", "24", "35"],
    mode: "0",
    page: "1",
    price: ["0", "33800"]
};

console.log('before', copy(data));

Object.traverse(data, function(node, value, key) {
    if (isString(value) && isNumberLikeString(value)) {
        node[key] = Number(value);
    }
});

console.log('after', copy(data));

(function(window) {
    'use strict';

    var Blob = window.Blob;
    var File = window.File;
    var FileList = window.FileList;
    var FormData = window.FormData;

    var isSupported = (Blob && File && FileList && FormData);
    var toString = Object.prototype.toString;
    var forEach = Array.prototype.forEach;
    var map = Array.prototype.map;

    if (!isSupported) return;

    /**
     * Returns type of anything
     * @param {Object} any
     * @returns {String}
     */
    function getType(any) {
        return toString.call(any).slice(8, -1);
    }
    /**
     * Converts path to FormData name
     * @param {Array} path
     * @returns {String}
     */
    function toName(path) {
        var array = map.call(path, function(value) {
            return '[' + value + ']';
        });
        array[0] = path[0];
        return array.join('');
    }

    /**
     * Converts object to FormData
     * @param {Object} object
     * @returns {FormData}
     */
    function toFormData(object) {
        var form = new FormData();
        var cb = function(node, value, key, path) {
            var type = getType(value);

            switch (type) {
                case 'Array':
                    break; // step into
                case 'Object':
                    break; // step into
                case 'FileList':
                    forEach.call(value, function(item, index) {
                        var way = path.concat(index);
                        var name = toName(way);
                        form.append(name, item);
                    });
                    return true; // prevent step into
                case 'File':
                    var name = toName(path);
                    form.append(name, value);
                    return true; // prevent step into
                case 'Blob':
                    var name = toName(path);
                    form.append(name, value, value.name);
                    return true; // prevent step into
                default:
                    var name = toName(path);
                    form.append(name, value);
                    return true; // prevent step into
            }
        };

        Object.traverse(object, cb, null, null, true);

        return form;
    }

    // export
    Object.toFormData = toFormData;

}(window));