function getCurrentDatePlusDays(days) {
  var d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

module.exports = [
  {
    topic: 'meeting-day-after-tomorrow',
    start: getCurrentDatePlusDays(2)
  },
  {
    topic: 'meeting-after-3-days',
    start: getCurrentDatePlusDays(3)
  },
  {
    topic: 'meeting-tomorrow',
    start: getCurrentDatePlusDays(1)
  },
  {
    topic: 'meeting-yesterday',
    start: getCurrentDatePlusDays(-1)
  }
];
