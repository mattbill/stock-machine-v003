module.exports = function() {
    var config = {
        dev: './public/dev',
        prod: {
            css: './public/prod/css',
            fonts: './public/prod/fonts',
            html: './public/prod/modules',
            js: './public/prod/scripts'
        },
        tmp: './tmp',
        bowerCssFiles: [
            './public/dev/bower_components/bootstrap/dist/css/*.min.css'
        ],
        bowerJsFiles: [
            './public/dev/bower_components/jquery/dist/jquery.min.js',
            './public/dev/bower_components/jquery-ui/jquery-ui.min.js',
            './public/dev/bower_components/bootstrap/dist/js/bootstrap.min.js',
            './public/dev/bower_components/angular/angular.min.js',
            './public/dev/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './public/dev/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './public/dev/bower_components/angular-ui-sortable/sortable.min.js',
            './public/dev/bower_components/angular-smart-table/dist/smart-table.min.js',
            './public/dev/bower_components/highcharts/highcharts.js',
            './public/dev/bower_components/lodash/dist/lodash.js'
        ],
        clean: [
            './public/prod/**',
            './tmp/**'
        ],
        cssFiles: [
            './public/dev/bower_components/font-awesome/css/font-awesome.min.css',
            './tmp/less.css'
        ],
        fontFiles: [
            './public/dev/bower_components/font-awesome/fonts/**'
        ],
        htmlFiles: [
            './public/dev/modules/**/*.html'
        ],
        jsFiles: [
            './public/dev/modules/**/*.js'
        ],
        lessFiles: [
            './public/dev/css/*.less'
        ],
        typeScriptFiles: [
            './public/dev/modules/**/*.ts'
        ],
        typeScriptDest: './public/dev/modules'
    };
    return config;
};
