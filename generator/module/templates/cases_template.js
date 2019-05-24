// ████████╗███████╗███████╗████████╗███████╗
// ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
//    ██║   █████╗  ███████╗   ██║   ███████╗
//    ██║   ██╔══╝  ╚════██║   ██║   ╚════██║
//    ██║   ███████╗███████║   ██║   ███████║
//    ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝

/**
 * File: {{filename}}.js
 * Author: {{author}}
 * Date: {{date}}
 * License: {{license}}
 */

 'use strict';

// Authorize Self Sign Certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Write your test cases here.

module.exports = (chai, server) => {
  try {
    const config  = require('../../config/config'),
          logger  = require('../../middleware/logger'),
          should  = chai.should(),
          expect  = chai.expect;

    // define your global variable here
    let accessToken = null; // to perform logged in actions.

    describe('{{filename}}', () => {

      describe('GET all {{actions}} /{{action}}/', () => { // /api/{{action}}
        it('it should return all available {{action}} and return 200', (done) => {
          try {
            chai.request(server)
            .get(config.version + '/{{action}}/')
            .end((err, res) => {
              if(res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('devMessage', 0);
                expect(res.body.{{actions}}).to.exist;
              }
              done(err);
            });
          } catch (e){
            logger.error(e)
            done(e);
          }

        });

      }); // END {{action}}/

      describe('GET one {{action}} /{{action}}/:id', () => { // /api/{{action}}/:id
        it('it should return the {{action}} and return 200', (done) => {
          try {
            chai.request(server)
            .get(config.version + '/{{action}}/' + AN_ID) // specify your id
            .end((err, res) => {
              if(res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message');
                expect(res.body.{{action}}).to.exist;
              }
              done(err);
            });
          } catch (e){
            logger.error(e)
            done(e);
          }

        });

      }); // END {{action}}/:id

      describe('POST one {{action}} as admin /{{action}}/', () => { // /api/{{action}}
        // Get a valid token.
        beforeEach((done) => {
          const login = {
            email: "admin@webuxlab.com",
            password: "webuxlab"
          };
          try {
            chai.request(server)
            .post(config.version + '/auth/signin')
            .send(login)
            .end((err, res) => {
              if(res){
                accessToken = res.body.accessToken;
              }
              done(err);
            });
          } catch (e){
            console.error(e)
            done(e);
          }
        });

        it('it should create the {{action}} and return 201', (done) => {
          try {
            const new{{action}} = {
              {{action}}:{
                // put your action structure with datas.
              }
            };
            chai.request(server)
            .post(config.version + '/{{action}}/')
            .set("Authorization", 'Bearer ' + accessToken)
            .send(new{{action}})
            .end((err, res) => {
              if(res){
                res.should.have.status(201);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message');
                expect(res.body.{{action}}).to.exist;
              }
              done(err);
            });
          } catch (e){
            logger.error(e)
            done(e);
          }

        });

      }); // END {{action}}/



      describe('PUT one {{action}} as admin /{{action}}/:id', () => { // /api/{{action}}/:id
        // Get a valid token.
        beforeEach((done) => {
          const login = {
            email: "admin@webuxlab.com",
            password: "webuxlab"
          };
          try {
            chai.request(server)
            .post(config.version + '/auth/signin')
            .send(login)
            .end((err, res) => {
              if(res){
                accessToken = res.body.accessToken;
              }
              done(err);
            });
          } catch (e){
            console.error(e)
            done(e);
          }
        });

        it('it should update the {{action}} and return 200', (done) => {
          try {
            const update{{action}} = {
              {{action}}:{
                // put your action structure with datas.
              }
            };
            chai.request(server)
            .put(config.version + '/{{action}}/' + AN_ID) //Put the resource ID here.
            .set("Authorization", 'Bearer ' + accessToken)
            .send(update{{action}})
            .end((err, res) => {
              if(res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message');
                expect(res.body.{{action}}).to.exist;
              }
              done(err);
            });
          } catch (e){
            logger.error(e)
            done(e);
          }

        });

      }); // END {{action}}/:id

      describe('DELETE one {{action}} as admin /{{action}}/:id', () => { // /api/{{action}}/:id
        // Get a valid token.
        beforeEach((done) => {
          const login = {
            email: "admin@webuxlab.com",
            password: "webuxlab"
          };
          try {
            chai.request(server)
            .post(config.version + '/auth/signin')
            .send(login)
            .end((err, res) => {
              if(res){
                accessToken = res.body.accessToken;
              }
              done(err);
            });
          } catch (e){
            console.error(e)
            done(e);
          }
        });

        it('it should delete the {{action}} and return 204', (done) => {
          try {
            chai.request(server)
            .delete(config.version + '/{{action}}/' + AN_ID) // Put an id here
            .set("Authorization", 'Bearer ' + accessToken)
            .end((err, res) => {
              if(res){
                res.should.have.status(204);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('message');
              }
              done(err);
            });
          } catch (e){
            logger.error(e)
            done(e);
          }

        });

      }); // END {{action}}/:id
    });
  } catch(e){
    console.error(e);
    process.exit(6);
  }
}
