define(function() {

    var App = function(el) {
        this.el = el;
    };

    App.prototype.render = function() {
        this.el.html('require.js up and running');
    };

    return App;

});
