define(
    [
        'js/wubiloop/application/Sandbox',
        'js/wubiloop/model/WebServiceIO',
        'js/wubiloop/controller/IndexPageController'
    ],

    /**
     *
     * @param Sandbox
     * @param WebServiceIO
     * @param IndexPageController
     */
    function (Sandbox,
              WebServiceIO,
              IndexPageController
              //
    ) {

        var el = document.getElementById('application');
        var sandbox = new Sandbox();
        var model = new WebServiceIO();


        var pageCtrl = new IndexPageController();
        pageCtrl.initialize(el, sandbox, model);
    }
);