'use strict';
var arrayShuffle = require('array-shuffle');

module.exports = {
  generateRandomMeetings: generateRandomMeetings,
  getDateInFuture: getDateInFuture
};

function getDateInFuture(days, hours) {
  var d = new Date();
  if (days) {
    d.setDate(d.getDate() + days);
  }

  if (hours) {
    d.setTime(d.getTime() + (hours*60*60*1000));
  }

  return d;
}

function generateRandomMeetings(count, topic, persons) {
  let meetings = [];

  for (let i = 0; i < count; i++) {
    let meeting = {
      topic: topic
    };

    // random count of days
    const days = Math.round(Math.random() * 100);
    const start = getDateInFuture(days);
    meeting.start = start;

    // random hours from 1 to 8
    const hours = Math.floor(Math.random() * 8) + 1;
    const end = getDateInFuture(days, hours);
    meeting.end = end;

    // random count of persons from 1 to 10
    const countOfPersons = Math.floor(Math.random() * persons.length) + 1;
    let randomPersons = [];
    const shuffledPersons = arrayShuffle(persons);
    for (let i = 0; i < countOfPersons; i++) {
      randomPersons.push(shuffledPersons[i]);
    }

    meeting.persons = randomPersons;
    meetings.push(meeting);
  }

  return meetings;
}
