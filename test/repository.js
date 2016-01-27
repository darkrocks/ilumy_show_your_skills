require('should');
const db = require('../lib/repository/db');
var meetingsRepo = require('../lib/repository/meetings');
var meetingFixtures = require('./fixtures/meetings');

const meetingCollection = db().collection('meetings');


describe('Repository tests', function () {
  describe('Meetings', function () {

    before(function (done) {
      meetingCollection.insert(meetingFixtures, done);
    });

    after(function (done) {
      var fixtureMeetingsTopics = meetingFixtures.map((meeting) => meeting.topic);
      meetingCollection.remove({ topic: { $in: fixtureMeetingsTopics } }, done);
    });

    describe('findUpcoming() function', function () {
      it('should return 3 upcoming meetings', function (done) {
        meetingsRepo.findUpcoming(null, function (err, items) {
          if (err) {
            return done(err);
          }
          items.should.be.instanceof(Array).and.have.lengthOf(3);
          done();
        });
      });

      it('should return meetings sorted by date ascending', function (done) {
        meetingsRepo.findUpcoming(null, function (err, items) {
          if (err) {
            return done(err);
          }
          items[0].topic.should.equal('meeting-tomorrow');
          items[1].topic.should.equal('meeting-day-after-tomorrow');
          items[2].topic.should.equal('meeting-after-3-days');
          done();
        });
      });

      it('should limit results', function (done) {
        meetingsRepo.findUpcoming(2, function (err, items) {
          if (err) {
            return done(err);
          }
          items.should.be.instanceof(Array).and.have.lengthOf(2);
          items[0].topic.should.equal('meeting-tomorrow');
          items[1].topic.should.equal('meeting-day-after-tomorrow');
          done();
        });
      });
    });

    describe('insert() function', function () {
      it('inserts items into database', function (done) {
        done();
        //meetingsRepo.insert(meetingsToBeInserted, function (err) {
        //  if (err) {
        //    return done(err);
        //  }
        //
        //
        //});
      });
    });
  });
});
