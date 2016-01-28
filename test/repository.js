'use strict';
// write test data to the testing database to make whole process simplier
process.env.NODE_ENV = 'test';

require('should');

const db = require('../lib/repository/db');
const meetingsRepo = require('../lib/repository/meetings');
const meetingFixtures = require('./fixtures/meetings');
const meetingCollection = db().collection('meetings');

describe('Repository tests', function () {
  describe('Meetings', function () {

    before(function (done) {
      meetingCollection.insert(meetingFixtures, done);
    });

    after(function (done) {
      meetingCollection.remove({}, done);
    });

    describe('insert() function', function () {

      const testMeetings = [
        {
          topic: 'insert-test-1'
        },
        {
          topic: 'insert-test-2'
        }
      ];

      var testMeetingsTopics = testMeetings.map((meeting) => meeting.topic);

      after(function (done) {
        meetingCollection.remove({topic: {$in: testMeetingsTopics}}, done);
      });

      it('inserts items into database', function (done) {
        meetingsRepo.insert(testMeetings)
          .then(() => {
            meetingCollection.find({topic: {$in: testMeetingsTopics}}, (err, items) => {
              if (err) {
                return done(err);
              }

              items.should.be.instanceof(Array).and.have.lengthOf(2);
              done();
            });
          })
          .catch(done);
      });
    });

    describe('findUpcoming() function', function () {
      it('should return 3 upcoming meetings', function (done) {
        meetingsRepo.findUpcoming(null)
          .then((items) => {
            items.should.be.instanceof(Array).and.have.lengthOf(3);
            done();
          })
          .catch(done);
      });

      it('should return meetings sorted by date ascending', function (done) {
        meetingsRepo.findUpcoming(null)
          .then((items) => {
            items[0].topic.should.equal('meeting-tomorrow');
            items[1].topic.should.equal('meeting-day-after-tomorrow');
            items[2].topic.should.equal('meeting-after-3-days');
            done();
          })
          .catch(done);
      });

      it('should limit results', function (done) {
        meetingsRepo.findUpcoming({
          limit: 2
        })
          .then((items) => {
            items.should.be.instanceof(Array).and.have.lengthOf(2);
            items[0].topic.should.equal('meeting-tomorrow');
            items[1].topic.should.equal('meeting-day-after-tomorrow');
            done();
          })
          .catch(done);

      });

      it('should search for person', function (done) {
        meetingsRepo.findUpcoming({
          limit: 1,
          persons: ['Arnold']
        })
          .then((items) => {
            items.should.be.instanceof(Array).and.have.lengthOf(1);
            items[0].topic.should.equal('meeting-after-3-days');
            done();
          })
          .catch(done);
      });
    });
  });
});
