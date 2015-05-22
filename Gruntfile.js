module.exports = function(grunt) {

	grunt.initConfig({
		jasmine: {
			client: {
				src: 'client/js/**/*.js',
				options: {
					specs: 'client/test/**/*Spec.js',
					vendor: [
						'client/vnd/jquery/dist/jquery.js',
						'client/vnd/angular/angular.js',
						'client/vnd/angular-route/angular-route.js',
						'client/vnd/angular-mocks/angular-mocks.js',
						'client/vnd/bootstrap/dist/js/bootstrap.js'
					]
				}
	    	}
	    },

	    watch: {
	    	scripts: {
				files: ['client/js/**/*.js'],
				tasks: ['jasmine'],
				options: {
					spawn: false,
				},
  			},
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
			},
    
			files: {
				src: ['client/js/**/*.js']
			},
    	},

		uglify: {
			my_target: {
				files: {
					'build/js/bookstore.min.js': [
						'client/vnd/jquery/dist/jquery.js',
						'client/vnd/angular/angular.js',
						'client/vnd/angular-route/angular-route.js',
						'client/vnd/angular-mocks/angular-mocks.js',
						'client/vnd/bootstrap/dist/js/bootstrap.js',
						'client/js/**/*.js'
					]
				},

				options: {
					mangle: false
				}
			}
		},

		clean: {
			build: ['build']
		},

	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['jasmine']);
}