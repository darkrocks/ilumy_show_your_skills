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
    })
 }
};

function logError(err) {
 console.error('An error occurred: ' + JSON.stringify(err));
}
