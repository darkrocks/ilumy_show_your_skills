'use strict';

module.exports = {
  index: function (req, res) {
    res.sendfile('../../build/index.html');
  }
}
