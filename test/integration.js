'use strict';
// write test data to the testing database to make whole process simplier
process.env.NODE_ENV = 'test';

var request = require('supertest');
require('should');

var app = require('../lib/app');
const db = require('../lib/repository/db');
const meetingCollection = db().collection('meetings');

describe('Integration tests', function () {
  describe('POST /api/meetings', function () {
    it('returns 400 status when random parameter is not specified', function (done) {
      request(app)
        .post('/api/meetings')
        .expect(400)
        .end(function (err, res) {
          if (err) throw err;
          res.body.should.have.property('error', 'random parameter is required');
          done();
        });
    });

    it('returns 400 status when random parameter is not an integer', function (done) {
      request(app)
        .post('/api/meetings')
        .send({
          random: 'abc'
        })
        .expect(400)
        .end(function (err, res) {
          if (err) throw err;
          res.body.should.have.property('error', 'random parameter should be an integer');
          done();
        });
    });

    it('returns 400 status when topic is not specified', function (done) {
      request(app)
        .post('/api/meetings')
        .send({
          random: 10
        })
        .expect(400)
        .end(function (err, res) {
          if (err) throw err;
          res.body.should.have.property('error', 'topic parameter is required for random meetings generation');
          done();
        });
    });

    describe('', function () {
      after(function (done) {
        meetingCollection.remove({}, done);
      });

      it('inserts specified number of random meetings into database', function (done) {
        request(app)
          .post('/api/meetings')
          .send({
            random: 10,
            topic: 'test-meeting'
          })
          .expect(201)
          .end(function (err, res) {
            if (err) throw err;
            meetingCollection.count({}, function (err, count) {
              if (err) throw err;
              count.should.be.equal(10);
              done();
            });
          });
      });
    });
  });
});
