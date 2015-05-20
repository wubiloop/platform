define(
    [
        'text!js/wubiloop/view/page-index.html',
        'js/wubiloop/controller/PageController',
        'joii'
    ],
    function (viewTemplate,
              PageController
              //
    ) {
        return Class({
            'extends': PageController
        }, {
            /**
             *
             */
            initialize: function (el, sandbox, model) {
                this.super('initialize', el, sandbox, model);
                this.loadData();
            },
            /**
             *
             */
            loadData: function () {

                //
                var params = {};

                //
                this.model.createPromise(
                    'http://wubiloop.com/api/v1',
                    params,
                    null,
                    this.onDataLoadSuccess,
                    this.onDataLoadError,
                    this.onDataLoadFail,
                    this.onDataLoadAbort,
                    this
                ).execute();
            },
            /**
             *
             * @param response
             */
            onDataLoadAbort: function (response) {
                alert('aborted');
            },
            /**
             *
             * @param response
             */
            onDataLoadFail: function (response) {
                alert('failed');
            },
            /**
             *
             * @param data
             * @param errors
             */
            onDataLoadError: function (data, errors) {
                alert('error :(');
            },
            /**
             *
             * @param data
             */
            onDataLoadSuccess: function (data) {

                //
                console.log(data);

                //
                var viewData = {
                    // ..
                };

                //
                this.el.innerHTML = this.template(viewTemplate, viewData);
            }
        });
    }
);