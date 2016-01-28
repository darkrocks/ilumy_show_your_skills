module.exports = function ($http) {
  return {
    addRandomMeetings: function (count, topic) {
      return $http.post('/api/meetings', {
        random: count,
        topic:topic
      });
    },
    getMeetingsCount: function () {
      return $http.get('/api/meetings/count')
        .then(function (result) {
          return result.data;
        });
    },
    getUpcomingMeetings: function (count) {
      return $http.get('/api/meetings')
        .then(function (result) {
          return result.data;
        });
    }
  };
};
