
define(
    [
        'js/libs/roygarnaat/net/urlrequest/URLRequest',
        'js/libs/roygarnaat/net/urlrequest/URLRequestMethod',
        'js/libs/roygarnaat/net/urlrequest/URLRequestEvents'
    ],
    function (URLRequest,
              URLRequestMethod,
              URLRequestEvents
              //
    ) {

        'use strict';

        /*
         *
         * Purpose: (HTTP) loader API for Abstract service
         *
         * */
        return function (url, params, method, onComplete, onError, onFail, onAbort, scope) {

            var _loader = null,// Loader util. Instance of URLRequest

                /**
                 *
                 * @returns {{execute: Function, abort: Function, getLoader: Function}}
                 * @private
                 */
                _construct = function () {

                    //Create loader in advance. (see _public.execute())
                    _loader = new URLRequest();

                    return _public;
                },

                /**
                 *
                 * @private
                 */
                _removeLoaderHandlers = function () {
                    if (_loader) {
                        _loader.listenerRemove(URLRequestEvents.SUCCESS, _onSuccess, _public);
                        _loader.listenerRemove(URLRequestEvents.FAIL, _onFail, _public);
                        _loader.listenerRemove(URLRequestEvents.ABORT, _onAbort, _public);
                    }
                },

                /**
                 *
                 * @private
                 */
                _addLoaderHandlers = function () {
                    if (_loader) {
                        _loader.listenerAdd(URLRequestEvents.SUCCESS, _onSuccess, _public);
                        _loader.listenerAdd(URLRequestEvents.FAIL, _onFail, _public);
                        _loader.listenerAdd(URLRequestEvents.ABORT, _onAbort, _public);
                    }
                },

                /**
                 *
                 * @param e
                 * @private
                 */
                _onAbort = function (e) {
                    _removeLoaderHandlers();
                    //Call abort callback
                    if (onAbort) {
                        onAbort.apply(scope, [e]);
                    } else {
                        console.info(' HTTPCall._onAbort | A call was aborted but there was no abortHandler defined', e);
                    }
                },

                /**
                 *
                 * @param e
                 * @private
                 */
                _onFail = function (e) {
                    _removeLoaderHandlers();

                    //Call fail callback
                    if (onFail) {
                        onFail.apply(scope, [e]);
                    } else {
                        console.info(' HTTPCall._onFail | A call has failed but there was no failHandler defined', e);
                    }
                },

                /**
                 *
                 * @param e
                 * @private
                 */
                _onSuccess = function (e) {
                    _removeLoaderHandlers();

                    //If the response contains errors
                    if (e.data.errors) {

                        //Call error callback
                        if (onError) {
                            onError.apply(scope, [e.data.data, e.data.errors]);
                        } else {
                            console.info(' HTTPCall._onSuccess | The result of a call contains errors but there was no errorHandler defined', e);
                        }

                    } else {

                        //console.log(e.data);
                        //Call success callback
                        if (onComplete) {
                            onComplete.apply(scope, [e.data.data]);
                        } else {
                            console.info(' HTTPCall._onSuccess | A call was successful but there was no successHandler defined', e);
                        }
                    }
                },


            /*
             * Closure public
             * */
                _public = {

                    /**
                     *
                     */
                    execute: function () {

                        //Execute loader with vars and reguest method
                        if (_loader) {

                            //Add loader event listeners
                            _addLoaderHandlers(); // << -- Please leave this call inside this execute method. (Model pickups need to be handled first. So they depend on this timing)

                            _loader.execute(url, params, method);
                        }
                    },

                    /**
                     *
                     */
                    abort: function () {
                        if (_loader) {
                            _loader.abortLoader();
                        }
                    },

                    /**
                     *
                     * @returns {*|boolean}
                     */
                    getLoader: function () {
                        return _loader || false;
                    }
                };

            //
            return _construct();
        }
    }
);