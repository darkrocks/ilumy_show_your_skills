'use strict';
var arrayShuffle = require('array-shuffle');

module.exports = {
  generateRandomMeetings: generateRandomMeetings,
  getDateInFuture: getDateInFuture
};

/**
 * Returns data in future created by adding days and hours to current date
 * @param days
 * @param hours
 * @returns {Date}
 */
function getDateInFuture(days, minutes) {
  var d = new Date();
  if (days) {
    d.setDate(d.getDate() + days);
  }

  if (minutes) {
    d.setTime(d.getTime() + (minutes*60*1000));
  }

  return d;
}

/**
 * Generates specified count of random meetings with random persons from the list for given topic
 * @param count
 * @param topic
 * @param persons
 * @returns {Array}
 */
function generateRandomMeetings(count, topic, persons) {
  let meetings = [];

  for (let i = 0; i < count; i++) {
    let meeting = {
      topic: topic
    };

    // random start date
    const days = Math.round(Math.random() * 365);
    const minutesStart = Math.floor(Math.random() * 60) + 1;
    const start = getDateInFuture(days, minutesStart);
    meeting.start = start;

    // random end date, after 8 hours max
    const minutesEnd = minutesStart + Math.floor(Math.random() * 8 * 60) + 1;
    const end = getDateInFuture(days, minutesEnd);
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
