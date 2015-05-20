define(
    [
        'underscore',
        'joii'
    ],
    /**
     *
     * @returns {Class}
     */
    function (_
              //
    ) {

        'use strict';

        /**
         *
         */
        return new Class({
            /**
             *
             * @param el
             * @private
             */
            __construct: function () {
                //..
            },

            /**
             *
             */
            initialize: function () {
                console.error('AbstractViewController.initialize() | This is an abstract function. Please override in derived class.');
            },

            /**
             *
             * @param obj
             * @returns {*}
             */
            cloneObject: function (obj) {
                return _.clone(obj);
            },

            /**
             *
             * @param arr
             * @returns {*}
             */
            arrayKeys: function (arr) {
                return _.keys(arr);
            },

            /**
             *
             * @param html
             * @param data
             * @returns {*}
             */
            template: function (html, data) {
                return _.template(html, data);
            }
        });
    }
);