define(['../../event/Dispatcher',
        '../../event/Event',
        '../../net/loader/LoaderEvents',
        '../../net/loader/LoaderResponseContext',
        'jquery',
        'js/libs/object-to-formdata-master/src/to-formdata'
    ],
    function (Dispatcher, Event, LoaderEvents, LoaderResponseContext) {
        return function () {
            var _loader = null,
                _reponse = null,
                _reponseContext = null,
                _construct = function () {
                    new Dispatcher().decorate(_public)
                    _public.setLog(true);
                    return _public;
                },

                _onFail = function (response) {
                    _handleResponse(response, LoaderResponseContext.FAIL);
                    _public.notify(new Event(LoaderEvents.FAIL, _reponse));
                },
                _onError = function (response, statusText) {
                    if (statusText == 'abort') {
                        _handleResponse(response, LoaderResponseContext.ABORT);
                        _public.notify(new Event(LoaderEvents.ABORT, _reponse));
                    } else if (statusText == 'parsererror') {
                        console.error('Invalid json', response);
                        //
                        _handleResponse(response, LoaderResponseContext.ERROR);
                        _public.notify(new Event(LoaderEvents.ERROR, _reponse));
                    } else {
                        _handleResponse(response, LoaderResponseContext.ERROR);
                        _public.notify(new Event(LoaderEvents.ERROR, _reponse));
                    }
                },
                _onSuccess = function (response) {
                    _handleResponse(response, LoaderResponseContext.SUCCESS);
                    _public.notify(new Event(LoaderEvents.SUCCESS, _reponse));
                },

                _handleResponse = function (response, context) {
                    _reponse = response;
                    _reponseContext = context;
                    _loader = null;
                },

                /*_serializeObject = function (data, formData, name) {
                    if (!formData) {
                        formData = new FormData();
                    }
                    if (!name) {
                        name = '';
                    }
                    for (var d in data) {
                        if (data[d] instanceof FileList) {
                            var files = data[d];
                            for (var i = 0; i < files.length; i++) {
                                var file = files[i];
                                formData.append(name + d + '[]', file, file.name);
                            }
                        } else {
                            formData.append(name + d, data[d]);
                        }
                    }
                    return formData;
                },*/

                _public = {
                    load: function (url, data, method) {

                        var sData = Object.toFormData(data);
                        //var sData = _serializeObject(data);
                        //console.log(sData);
                        //alert();
                        var loaderMethod = method || "GET";
                        var loaderOptions = {

                            url: url,
                            data: loaderMethod == "POST" ? sData : data,
                            type: loaderMethod.toLowerCase(),

                            //dataType: "jsonp",
                            //jsonpCallback:_onSuccess,
                            //processData: false,
                            //crossDomain: true,
                            //jsonp: false,

                            /*crossDomain: true,*/
                            /*client_id: "testclient",*/
                            /*password: "testpass",*/
                            /*xhrFields: {
                                withCredentials: true
                            },
                             */

                            fail: _onFail,
                            error: _onError,
                            success: _onSuccess
                        };
                        if (loaderMethod == "POST") {
                            loaderOptions.processData = false;
                            loaderOptions.contentType = false;
                        }

                        _loader = $.ajax(loaderOptions);
                    },
                    abort: function () {
                        if (_loader) {
                            _loader.abort();
                        }
                    },
                    getResponse: function () {
                        return _reponse;
                    },
                    getResponseContext: function () {
                        return _reponseContext;
                    }
                };
            return _construct();
        }
    }
);