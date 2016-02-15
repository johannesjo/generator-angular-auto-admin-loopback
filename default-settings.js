module.exports = {
    testSuffix: '.spec',
    testPassOnDefault: true,
    stylePrefix: '_',
    editorCommand: 'idea',
    uiRouter: true,
    baseState: 'private.',
    moduleName: 'aaal',
    pathOutputStyle: 'dasherize',
    routesFile: 'app/scripts/aaal/routes.js',
    pathToModels: '../common/models',
    fileExt: {
        script: '.js',
        tpl: '.html',
        style: '.scss'
    },
    dirs: {
        app: 'app/aaal',
        appModules: 'scripts',
        routes: 'aaal/routes'
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