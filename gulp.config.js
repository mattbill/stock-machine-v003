module.exports = function() {
    var config = {
        temp: './app/static/dist',
        css: [
            './app/static/dev/css/*.css',
            './app/static/bower_components/bootstrap/dist/css/*.min.css',
            "!./app/static/dev/css/print.css"
        ],
        js: [
            './app/static/bower_components/jquery/dist/jquery.min.js',
            './app/static/bower_components/jquery-ui/jquery-ui.min.js',
            './app/static/bower_components/bootstrap/dist/js/bootstrap.min.js',
            './app/static/bower_components/angular/angular.min.js',
            './app/static/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './app/static/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './app/static/bower_components/angular-ui-sortable/sortable.min.js',
            './app/static/bower_components/angular-smart-table/dist/smart-table.min.js',
            './app/static/bower_components/highcharts/highcharts.js',
            './app/static/bower_components/lodash/dist/lodash.js'
        ]
    };
    return config;
}