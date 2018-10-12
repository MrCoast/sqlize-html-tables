module.exports = function (grunt) {
    'use strict';

    var params = params || {};

    grunt.initConfig({
        params,

        clean: [
            'dist',
        ],

        run: {
            'build-dev-dll': {
                cmd: 'npm',
                args: ['run', 'build-dev-dll'],
            },
            'build-prod': {
                cmd: 'npm',
                args: ['run', 'build-prod'],
            },
        },

        eslint: {
            options: {
                cache: false,
            },
            config: [
                'Gruntfile.js',
                'config/webpack/**/*.js',
                'config/karma/**/*.js',
            ],
            test: [
                'test/custom/**/*.js',
                'test/spec/**/*.js',
                'test/entrypoint.js',
                'test/helpers/**/*.js',
                'test/stubs/**/*.js',
            ],
            src: [
                'src/**/*.js',
                'src/**/*.jsx',
                '!src/3d/UnityObject2.js',
            ],
        },

        tslint: {
            source: {
                src: [
                    'src/**/*.ts',
                    'src/**/*.tsx',
                ],
            },
            config: {
                src: [
                    'config/**/*.ts',
                ],
            },
            typings: {
                src: [
                    'typings/*.d.ts',
                ],
            },
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-run');

    /**
     * Override the default task to prompt what to do
     */
    grunt.registerTask('default', 'Default task', function () {
        grunt.log.writeln('');
        grunt.log.writeln('Did you want to do one of these?');
        grunt.log.writeln(' "grunt setup" to set up local dependencies');
        grunt.log.writeln(' "grunt build" to do a complete build');
        grunt.log.writeln('');
        grunt.fail.fatal('Nothing to do. Run \'grunt --help\' for available tasks.');
    });

    /**
     * Task to run jshint
     */
    grunt.registerTask('lint', [
        'eslint',
        'tslint',
    ]);

    grunt.registerTask('lint:fix', function () {
        grunt.config('eslint.options.fix', true);
        grunt.config('tslint.options.fix', true);
        grunt.task.run('lint');
    });

    /**
     * Task to set up local dependencies
     */
    grunt.registerTask('setup', [
        'clean',
    ]);

    /**
     * Task to build the project for distribution
     */
    grunt.registerTask('build', [
        'run:build-prod',
    ]);
};
