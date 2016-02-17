'use strict';

angular.module('<%= moduleName %>')
    .config(function(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'tinymce',
            templateUrl: '<%=fullComponentsPath%>/formly-components/tinymce/formly-tinymce-tpl.html',

            wrapper: ['bootstrapLabel']
        });
    });
