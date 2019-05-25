//  ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
// ██╔════╝ ██╔══██╗██║   ██║████╗  ██║╚══██╔══╝
// ██║  ███╗██████╔╝██║   ██║██╔██╗ ██║   ██║
// ██║   ██║██╔══██╗██║   ██║██║╚██╗██║   ██║
// ╚██████╔╝██║  ██║╚██████╔╝██║ ╚████║   ██║
//  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝

/**
 * File: Gruntfile.js
 * Author: Tommy Gingras
 * Date: 2018-07-08
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    jslint: {
      server: {
        src: [
          'Gruntfile.js',
          'routes/**/*.js',
          'test/**/*.js',
          'actions/**/*.js',
          'middleware/**/*.js',
          'models/**/*.js',
          'config/**/*.js',
          'bin/**/*.js',
          'defaults/**/*.js',
        ],
        directives: {
          node: true,
          todo: true,
        },
        options: {
          edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
          junit: 'out/server-junit.xml', // write the output to a JUnit XML
          log: 'out/server-lint.log',
          jslintXml: 'out/server-jslint.xml',
          errorsOnly: true, // only display errors
          failOnError: false, // defaults to true
          checkstyle: 'out/server-checkstyle.xml', // write a checkstyle-XML
        },
      },
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip',
        },
        files: [
          {
            src: [
              'public/**',
              'apidoc/**',
              'locales/**',
              'ssl/**',
              'actions/**',
              'bin/www',
              'config/**',
              'middleware/**',
              'models/**',
              'routes/**',
              'uploads/**/default.png',
              'defaults/**/*.js',
              'app.js',
              'package.json',
              '.ebextensions/**',
              '.elasticbeanstalk/**',
            ],
            dest: '/',
          },
        ],
      },
      test: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip',
        },
        files: [
          {
            src: [
              'public/**',
              'apidoc/**',
              'locales/**',
              'ssl/**',
              'actions/**',
              'bin/www',
              'config/**',
              'middleware/**',
              'models/**',
              'routes/**',
              'uploads/**/default.png',
              'defaults/**/*.js',
              'app.js',
              'package.json',
              '.ebextensions/**',
              '.elasticbeanstalk/**',
              'test/**/*.js',
            ],
            dest: '/',
          },
        ],
      },
    },

    nsp: {
      package: grunt.file.readJSON('package.json'),
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              'public/**',
              'apidoc/**',
              'locales/**',
              'ssl/**',
              'actions/**',
              'bin/www',
              'config/**.js',
              'config/routes.json',
              'config/db_models_overwrite.json',
              'config/production.json',
              'middleware/**',
              'models/**',
              'routes/**',
              'uploads/**/default.png',
              'defaults/**/*.js',
              'app.js',
              'package.json',
              '.ebextensions/**',
              '.elasticbeanstalk/**',
            ],
            dest: 'dist/',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nsp');

  grunt.registerTask('package', ['compress:dist']);
  grunt.registerTask('package-4-test', ['compress:test']);
  grunt.registerTask('package-4-prod', ['copy:main']);
  grunt.registerTask('check', ['jslint:server']);
  grunt.registerTask('security', ['nsp:package', 'jslint:all']);
};
