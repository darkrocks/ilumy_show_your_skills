var moment = require('moment');

module.exports = function ($scope, dataService) {
  refreshModel();

  $scope.addRandomMeetings = function () {
    if (!$scope.model.randomMeetingTopic) {
      return;
    }

    dataService.addRandomMeetings(5000, $scope.model.randomMeetingTopic)
      .then(function () {
        refreshModel();
      }, logError);
  };

  function refreshModel() {
    if (!$scope.model) {
      $scope.model = {};
    }

    dataService.getMeetingsCount()
      .then(function (count) {
        $scope.model.meetingsCount = count;
      }, logError);

    dataService.getUpcomingMeetings(20)
      .then(function (meetings) {

        meetings = meetings.map(formatMeeting);

        $scope.model.upcomingMeetings = meetings.slice(0, 5);

        $scope.model.averageAmountOfPeople = getAverageAmountOfPeople(meetings);
      }, logError);

    dataService.getPersons()
      .then(function (persons) {
        persons = persons.map(function (person) {
          person.meeting = formatMeeting(person.meeting);
          return person;
        });

        $scope.model.persons = persons;
      }, logError);
  }
};

function logError(err) {
 console.error('An error occurred: ' + JSON.stringify(err));
}

function formatMeeting(meeting) {
  if (!meeting) return null;
  var format = 'MMMM Do YYYY, h:mm:ss a';
  meeting.start = moment(meeting.start).format(format);
  meeting.end = moment(meeting.end).format(format);
  return meeting;
}

function getAverageAmountOfPeople(meetings) {
  if (!meetings || !meetings.length) return 0;
  var totalPeople = 0;
  meetings.forEach(function (meeting) {
    totalPeople += meeting.persons.length;
  });
  return totalPeople / meetings.length;
}
