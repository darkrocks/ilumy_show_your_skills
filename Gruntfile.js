module.exports = function (grunt) {
  // load plugins
  grunt.loadNpmTasks('grunt-mocha-cli');

  // config
  grunt.initConfig({
    mochacli: {
      options: {
        recursive: true,
        files: 'test/'
      },
      all: {
        options: {
          reporter: 'spec'
        }
      }
    }
  });

  grunt.registerTask('test', 'mochacli:all')
};
