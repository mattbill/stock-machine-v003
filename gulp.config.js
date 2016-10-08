module.exports = function() {
    var config = {
        dev: './app/static/dev',
        prod: {
            css: './app/static/prod/css',
            fonts: './app/static/prod/fonts',
            html: './app/static/prod/modules',
            js: './app/static/prod/scripts'
        },
        tmp: './tmp',
        bowerCssFiles: [
            './app/static/dev/bower_components/bootstrap/dist/css/*.min.css'
        ],
        bowerJsFiles: [
            './app/static/dev/bower_components/jquery/dist/jquery.min.js',
            './app/static/dev/bower_components/jquery-ui/jquery-ui.min.js',
            './app/static/dev/bower_components/bootstrap/dist/js/bootstrap.min.js',
            './app/static/dev/bower_components/angular/angular.min.js',
            './app/static/dev/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './app/static/dev/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './app/static/dev/bower_components/angular-ui-sortable/sortable.min.js',
            './app/static/dev/bower_components/angular-smart-table/dist/smart-table.min.js',
            './app/static/dev/bower_components/highcharts/highcharts.js',
            './app/static/dev/bower_components/lodash/dist/lodash.js'
        ],
        clean: [
            './app/static/prod/**',
            './tmp/**'
        ],
        cssFiles: [
            './app/static/dev/bower_components/font-awesome/css/font-awesome.min.css',
            './tmp/less.css'
        ],
        fontFiles: [
            './app/static/dev/bower_components/font-awesome/fonts/**'
        ],
        htmlFiles: [
            './app/static/dev/modules/**/*.html'
        ],
        jsFiles: [
            './app/static/dev/modules/**/*.js'
        ],
        lessFiles: [
            './app/static/dev/css/*.less'
        ]
    };
    return config;
}