define(
    [
        'js/wubiloop/model/HTTPCall',
        'joii'
        //
    ],
    /**
     *
     * @returns {Class}
     */
    function (HTTPCall
              //
    ) {

        'use strict';

        /**
         *
         */
        return new Class({

            /**
             *
             */
            loader: null,

            /**
             *
             */
            options: null,

            /**
             *
             * @param data
             * @param onSuccess
             * @param onError
             * @param onFail
             * @param onAbort
             * @param scope
             * @private
             */
            __construct: function (url, data, method, onSuccess, onError, onFail, onAbort, scope) {
                this.options = {
                    url: url,
                    data: data,
                    method: method,
                    onSuccess: onSuccess,
                    onError: onError,
                    onFail: onFail,
                    onAbort: onAbort,
                    scope: scope
                };
            },

            /**
             *
             */
            execute: function () {
                this.loader = new HTTPCall(
                    this.options.url,
                    this.options.data,
                    this.options.method || 'GET',
                    this.options.onSuccess,
                    this.options.onError,
                    this.options.onFail,
                    this.options.onAbort,
                    this.options.scope
                );
                this.loader.execute();
            }
        });
    }
);