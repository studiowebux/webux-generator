# Studio Webux NodeJS Framework - Backend

The backend structure

## .ebextensions

this folder contains the definition to deploy the application on AWS Elastic Bean Stalk.
You have to export the backend in a zip file, I recommend to use grunt to do so.

```bash
grunt package
```

## .tmp

This folder contains the uploaded files during the development phase.

## actions

this folder contains all the modules definition and logics for each routes

## apidoc

this folder is created when the documentation is generated. You can see the API documentation using the index.html

## bin

it contains only one file, but that file is the entrypoint for the backend.
you can run the application by doing :

```bash
npm start
or
node bin/www
```

## config

All the configurations are stored in that folder.
the file config.js call the appropriate configuration file.
For production it will be better to modify that logic to store the variable in the env.
the db_models_overwrite.json file define the order that the default data will be loaded in the database.
the db.js file establish a connection to the MongoDB database and configure the required settings.
the routes.json file contains the routes definition for the applications.
all others .json files are use for different environment. like development, test and production.

## default

this folder allows us to create default entries in the database, so we can delete everything in the database each time we restart the server and we will always start fresh. Using mongo-in-memory allows to start fresh and easily.

## locales

this folder contains the text linked with tag, unfortunately, we have to translate manually each tag.
Each time a new tag is used, the entry is added automatically in each defined languages.

## log

this folder contains the backend logs

## middleware

this folder contains the tools that help us to create the application

## models

these folders are used for MongoDB

### model

this folder contains the database model definition, these files allow us to interact with the database.

### schema

this folder have the document definition for mongoDB, all the schemas can be customized.

## routes

The routes definitions are defined here, each routes are linked with middlewares and actions

## ssl

this folders contains three things,

- ssl.crt
- ssl.key
  these files are use to start the backend using https
- root_ca_cert.crt
  that file is used to communicate with a LDAP server.

## test

the test.js file is an orchastrator to launch test.

### cases

This folder contain the tests for each components,
Add xx\_ before each file name to determine the order to execute the sequence.

## uploads

In production, if you want to store the uploaded file locally you can put them here.

## validations

This folder allow us to define validation schema for our routes, that way we can simplify the verification of the input reeived by the user. the error are automatically managed.

## /

### .dockerignore

this file can be modify to add/remove files/folders from the docker image

### app.js

this file contains all the logics from the application, when the app start, bin/www call this file.

### Dockerfile

This is the recipe to create the backend image.

### Dockerfile-test.yml

This is the recipe to execute the tests using a docker image

### Gruntfile

this file contains recipes to automate some tasks like creating a zip file with the useful files and folders for a production deployment.

### package\*\*.json

these files contain the dependencies for the whole application.

### report.html

this file is created when npm test is launched to store the results.
