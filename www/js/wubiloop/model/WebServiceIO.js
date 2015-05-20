define(
    [
        'js/wubiloop/model/ApiPromise',
        'joii'
        //
    ],
    /**
     *
     * @param ApiPromise
     * @returns {Class}
     */
    function (ApiPromise
              //
    ) {

        'use strict';

        /**
         *
         */
        return new Class({
            /**
             *
             * @param data
             * @param onSuccess
             * @param onError
             * @param onFail
             * @param onAbort
             * @param scope
             * @returns {ApiPromise}
             */
            createPromise: function (url, data, method, onSuccess, onError, onFail, onAbort, scope) {
                return new ApiPromise(url, data, method, onSuccess, onError, onFail, onAbort, scope);
            }
        });
    }
);