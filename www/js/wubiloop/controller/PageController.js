define(
    [
        'text!js/wubiloop/view/page-index.html',
        'js/wubiloop/controller/AbstractViewController',
        'joii'
    ],
    function (viewTemplate,
              AbstractViewController
              //
    ) {
        return Class({
            'extends': AbstractViewController
        }, {

            /**
             *
             */
            el: null,

            /**
             *
             */
            sandbox: null,

            /**
             *
             */
            model: null,

            /**
             *
             */
            initialize: function (el, sandbox, model) {
                this.checkAndAssign('el', el);
                this.checkAndAssign('sandbox', sandbox);
                this.checkAndAssign('model', model);
            },

            /**
             *
             * @param memberName
             * @param value
             * @returns {boolean}
             */
            checkAndAssign: function (memberName, value) {
                //
                if (value) {
                    this[memberName] = value;
                    return true
                }
                //
                return false;
            },
        });
    }
);