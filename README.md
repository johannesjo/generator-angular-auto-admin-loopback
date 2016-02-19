# generator aaal (angular auto admin loopback)
`generator-aaal` is a Yeoman generator, which provides you with a angular based crud-interface with is automatically created based on your model definitions. You can drop it in in your existing loopback app, even drop it in your existing angular frontend app.

## getting started
[Check out the pre built example](https://github.com/johannesjo/angular-auto-admin-looopback)! 

## manually building a new app
[Create loopback app](http://loopback.io/getting-started/) for your api if not done so and create some models
```
npm install -g strongloop bower yo
slc loopback 
slc loopback:model yourFirstModel
```

1. install generators 
```
npm install -g generator-moda generator-aaal
```

2. create basic front-end via [generator-moda](https://github.com/johannesjo/generator-modular-angular)
```
cd client
# create .yo-rc.json if not present
echo "{}" > .yo-rc.json
yo moda my-admin
```
3. Cancel gulp and drop in the aaal components
```
# install bower deps
bower install -S ngtoast angular-schema-form angular-smart-table ui.bootstrap angular-ui-tinymce ngstorage angular-schema-form-datepicker bootstrap-css-only
# drop in aaal
yo aaal
```
4. Inject frontend files and build css
```
gulp injectAll && gulp buildStyles
```

6. Update your _app.js (client/app/scripts/_app.js) with the aaap-depdency, e.g.:
```
(function() {
    'use strict';

    angular
        .module('myAdmin', [
            'ngAnimate',
            'ngAria',
            'ngResource',
            'ui.router',
            // insert here or somewhere else
            'aaal'
  ]);
})();  
```

6. update the path from which static files are serverd in your server/middleware.json
```
 "files": {
    "loopback#static": {
      "params": "$!../client/app"
    }
  }
```
7. Run the server
```
# cd to server dir
cd ..
node  .
```

8. Navigate to http://localhost:3000/index.html#/login log yourself in with one of your loopback users and enjoy.

## adding it to your existing angular frontend
1 .Install generator
```
npm install -g generator-aaal
```
2. Cd to your frontend directory and run the generator
```
yo aaal
```
3. Cancel gulp and drop in the aaal components
```
# install bower deps
bower install -S ngtoast angular-schema-form angular-smart-table ui.bootstrap angular-ui-tinymce ngstorage angular-schema-form-datepicker bootstrap-css-only
```
4. Inject all the files in your aaal directory.
5. Update your angular module with the aaap-depdency, e.g.:
```
(function() {
    'use strict';

    angular
        .module('myAdmin', [
            'ngAnimate',
            'ngAria',
            'ngResource',
            'ui.router',
            // insert here or somewhere else
            'aaal'
  ]);
})();  
```
6. Have fun!
