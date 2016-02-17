module.exports = {
    addTestFiles: true,
    addStyleFiles: true,
    testSuffix: '.spec',
    testPassOnDefault: true,
    stylePrefix: '_',
    editorCommand: 'idea',
    baseState: 'private.',
    moduleName: 'aaal',
    pathOutputStyle: 'dasherize',
    routesFile: 'app/scripts/aaal/aaal-routes.js',
    slcServiceCommandArgs: ['../server/server.js', 'app/scripts/aaal/lb-services-s.js'],
    pathToModels: './../common/models',
    fileExt: {
        script: '.js',
        tpl: '.html',
        style: '.scss'
    },
    modelListSettings: {
        additionalFields: {
            '*': {
                updatedAt: {
                    type: 'date',
                    readonly: true
                },
                createdAt: {
                    type: 'date',
                    readonly: true
                }
            }
        }
    },
    dirs: {
        app: 'app',
        basePath: 'scripts/aaal',
        routes: 'routes',
        components: 'components'
    },
    subGenerators: {
        overview: {
            stateSuffix: 'List',
            subRoute: 'list',
            suffix: '-list-c',
            nameSuffix: 'ListCtrl'
        },
        edit: {
            stateSuffix: 'Edit',
            subRoute: 'edit',
            suffix: '-edit-c',
            nameSuffix: 'EditCtrl'
        },
        preview: {
            stateSuffix: 'View',
            subRoute: 'view',
            suffix: '-view-c',
            nameSuffix: 'ViewCtrl'
        }
    }
};