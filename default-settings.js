module.exports = {
    addTestFiles: true,
    addStyleFiles: true,
    testSuffix: '.spec',
    testPassOnDefault: true,
    stylePrefix: '_',
    editorCommand: 'idea',
    uiRouter: true,
    baseState: 'private.',
    moduleName: 'aaal',
    pathOutputStyle: 'dasherize',
    routesFile: 'app/scripts/aaal/aaal-routes.js',
    pathToModels: './../common/models',
    fileExt: {
        script: '.js',
        tpl: '.html',
        style: '.scss'
    },
    dirs: {
        app: 'app/scripts/aaal',
        appModules: 'app/scripts',
        routes: 'app/scripts/aaal/routes'
    },
    subGenerators: {
        overview: {
            stateSuffix: 'List',
            subRoute: 'list',
            suffix: '-list-c',
            nameSuffix: 'ListCtrl',
            createDirectory: true
        },
        edit: {
            stateSuffix: 'Edit',
            subRoute: 'edit',
            suffix: '-edit-c',
            nameSuffix: 'EditCtrl',
            createDirectory: true
        }
    }
};