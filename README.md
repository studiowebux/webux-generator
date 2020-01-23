# Webux Lab API Generator

This project allows to generate

- Empty application
- CRUD module
- Standalone resource
- Standalone model

# Installation

Install the package globally,

```
npm install -g @studiowebux/generator
```

Install the package

```bash
npm install @studiowebux/generator
cd node_modules/@studiowebux/generator
```

# Usage

## Package installed globally

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

## Package isn't installed globally

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

# License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
