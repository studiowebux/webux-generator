# JWT

this section is used to set the

- secret - AccessToken Secret key
- refreshTokenSecret
  The time to live of both token
- tokenLike - by default the accessToken is valid for 15 minutes
- refreshTokenLife - by default the refreshToken is valid for 1 day

# application_id

this setting is used when multiple backend are define to create a cluster, we can easily know which one is in error because the logs are tag with that ID.

# host

From where the backend is launched

# origin

define who can access the application A.K.A cors.

# port

define the listening port for the backend

# socketio

Not Used for now...

# version

it defines from where the application can be reached.
e.g : https://localhost:1337/api/v1

# path

this is the absolute path to access the application
e.g /path/to/working/Node-framework/backend
do not add the trailing slash !

# Author

you or me or whatever

# Project

the project name

# ver

the version of your build

# enterprise

who are you ?

# sslkey

the relative path from the path defined previously
e.g /ssl/ssl.key

# sslcrt

the relative path from the path defined previously
e.g /ssl/ssl.crt

# morgan

this tool is used to logged the access
you can change the

- type
- filename
- rotate
- path
  by default the path and filename are /log/access.log
  the log are cleared everyday and we take the combined model to saw more details.

# logger

## logstash

logstash is optional but allow to store the logs to a remote server.

- enabled - true or false
- port
- name
- host
  name is the application name, e.g backend-1
  host is the logstash IP/DNS

# proxy_list

this setting is used because the backend will be behind a nginx service

# bodyParser

it contains the body parser details

- extended
- limit - this is the file upload limit, don't forget to update your nginx configuration too.

# authentication

all authentications services are defined here

## global parameters

- accountActivationRequired - this setting enable the email sent when a new user has created an account. by default the newly created account will be disabled.
- autoLoginOnSignUp - the user will be automatically sign in after a sign up

## passwordStrategy

you can specify a regex to enforce the password security, this is totally optional

## ldap

configure your ldap server to interact with your server

## facebook

configure facebook to enable the login with facebook

# sm

this contain the configuration to send email

# authy

this feature is used to enable the double-authentication in the application by using the twilio service

# disableAuth

this setting enabled or disabled the authy feature

# redis

it allows to configure redis and get it working, this setting is mandatory.

# db

it define the mongoDB setting

- local - true or false, this feature enable or disable mongo-in-memory
- defaultValues - true or false, this feature enable or disable the default Values import on each npm start
- debug - true or false, to see every request from the backend to mongoDB
- overwrite - true or false, to take in consideration the overwrite.json file. otherwise it loads the defaultValues without order.

# locales

define the default language and which languages can be used.

# i18n

- directory - where the tags/texts are store, by default in /locales
- cookie which cookie is used to store the user language
- autoReload - each time a tag that doesn't not exist is triggered, this tag is automatically added in the file
- syncFiles - each time a .json file is updated, for all language an update is made to sync all the tags.

# fileUpload

define the filesize limit and the express upload parameters

- destination - by default the files are stored in .tmp/
- size - this setting is use to resize the uploaded picture

# cache

if the express cache is enable or not on the system
