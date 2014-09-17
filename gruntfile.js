module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'css/master.css' : 'css/master.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        uncss: {
            dist: {
                files:[
                    {src:'index.html', dest:'css/master.css'}
                ]
            }
        },
        cssmin: {
            dist: {
                files: [
                    {src:'css/master.css', dest:'css/master.css'}
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default',[ 'cssmin','watch']);
}