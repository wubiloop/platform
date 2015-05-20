require.config({

    baseUrl: "./",

    urlArgs: "bust=" + new Date().getTime(),

    paths: {
        text: 'js/libs/requirejs/text/text',
        joii: 'js/libs/joii/src/joii',
        jquery: 'js/libs/jquery/2.1.1/jquery-2.1.1',
        fastclick: 'js/libs/fastclick/lib/fastclick',
        greensock: 'js/libs/greensock/src/minified/TweenMax.min',
        underscore: 'js/libs/underscore/amdjs-underscore/underscore'
    }
});
require(['js/wubiloop/application/Bootstrapper']);