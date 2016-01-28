module.exports = function (grunt) {
  // load plugins
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

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
    },
    browserify: {
      dist: {
        files: {
          'build/js/bundle.js': ['lib/public/js/app.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['lib/public/index.html'], dest: 'build/index.html'},
          {src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: 'build/css/bootstrap.min.css'},
          {expand: true, flatten: true, src: ['lib/public/views/**'], dest: 'build/views/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['lib/public/css/**'], dest: 'build/css/', filter: 'isFile'},
        ]
      }
    }
  });

  grunt.registerTask('test', 'mochacli:all')
  grunt.registerTask('build', ['browserify', 'copy:main'])
};
