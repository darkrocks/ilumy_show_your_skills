const persons = [
  'Chuck',
  'Arnold',
  'Jackie',
  'Bruce',
  'Sylvester',
  'Wesley',
  'Mel',
  'Dolph',
  'Harrison',
  'Jean-Claude'
];

/**
 * Emulates persons repository
 * For simplicity I don't put persons into database. This method emulates database call.
 * @type {{findAll: Function}}
 */
module.exports = {
  /**
   * Returs all persons
   * @param callback
   */
  findAll: function(callback) {
    setImmediate(() => {
      callback(null, persons);
    });
  }
}
