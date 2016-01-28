var moment = require('moment');

module.exports = function ($scope, dataService) {
  $scope.model = {};
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
  }
};

function logError(err) {
 console.error('An error occurred: ' + JSON.stringify(err));
}

function formatMeeting(meeting) {
  var format = 'MMMM Do YYYY, h:mm:ss a';
  meeting.start = moment(meeting.start).format(format);
  meeting.end = moment(meeting.end).format(format);
  return meeting;
}

function getAverageAmountOfPeople(meetings) {
  var totalPeople = 0;
  meetings.forEach(function (meeting) {
    totalPeople += meeting.persons.length;
  });
  return totalPeople / meetings.length;
}
