requirejs.config({
    paths: {
        'jquery': '../lib/jquery',
        'underscore': '../lib/underscore'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

define(['argue', 'jquery'], function (__, $) {
    var app = new __($('body'));
    app.doc();
});
