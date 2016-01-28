'use strict';

require('should');
var utils = require('../lib/utils');

describe('Utils tests', function () {
  describe('generateRandomMeetings() function', function () {
    it('generates random meetings with specified count', function (done) {
      var meetings = utils.generateRandomMeetings(10, 'test-meeting', ['arnold', 'bruce', 'chuck']);
      meetings.should.be.instanceof(Array).and.have.lengthOf(10);
      meetings[0].topic.should.be.equal('test-meeting');
      meetings[0].persons.should.be.instanceof(Array);
      (meetings[0].persons.length).should.be.above(0);
      meetings[0].start.should.not.be.equal(meetings[0].end);
      meetings[0].start.should.not.be.equal(meetings[1].start);

      done();
    });
  });
});
