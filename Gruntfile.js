module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg:  grunt.file.readJSON('package.json'),
    jshint: {
      files: ['*.js', '!*.min.js'],
    },
    uglify: {
      files: {
        src:  'jquery.loadingdots.js',
        dest: 'jquery.loadingdots.min.js'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'uglify']);

};