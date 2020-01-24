# Webux Lab API Generator

This project allows to generate

- Empty application
- CRUD module
- Standalone resource
- Standalone model

# Installation

Install the package globally,

```bash
npm install -g @studiowebux/generator
```

Install the package

```bash
npm install @studiowebux/generator
cd node_modules/@studiowebux/generator
```

# Usage

## The Module is installed globally

From anywhere, launch

```bash
webux generate app
or
webux generate module
or
webux generate resource
or
webux generate model
```

Answer the questions to get an app, a module, a model or a resource.

## The Module isn't installed globally

From the project directory, launch

How to generate an empty app  
`npm run generate-app`  
How to generate an empty module  
`npm run generate-module`  
How to generate an empty resource  
`npm run generate-resource`  
How to generate an empty model  
`npm run generate-model`

# Customization

In the template folders, you can edit everything to get what you need.  
The structure file in both folder contains the project architecture.

# Known Bugs / Limitations

- There is a limitation when creating new resources with the generator, if their is multiple resources under the same folder, it will create new path for every resources and causes an invalid configuration
  > Unfortunately, the solution is to edit the config/routes.js file manually.

# License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
