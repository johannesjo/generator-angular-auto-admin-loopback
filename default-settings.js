module.exports = {
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
        controller: {
            suffix: '-c',
            nameSuffix: 'Ctrl',
            globalDir: '',
            createDirectory: true
        }
    }
};