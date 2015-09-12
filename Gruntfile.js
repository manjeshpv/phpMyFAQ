/**
 * phpMyFAQ Gruntfile.js
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @category  phpMyFAQ
 * @package   Development
 * @author    Thorsten Rinne <thorsten@phpmyfaq.de>
 * @copyright 2013-2015 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/2.0/ Mozilla Public License Version 2.0
 * @link      http://www.phpmyfaq.de
 * @since     2013-06-23
 */

/*global module:false, require:false */

module.exports = function(grunt) {

    'use strict';

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        //
        // Metadata.
        //
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! phpMyFAQ v<%= pkg.version %> - <%= pkg.homepage %> - Copyright (c) 2001 - <%= grunt.template.today("yyyy") %> Thorsten Rinne and phpMyFAQ Team */\n',
        bumpup: {
            files: ['package.json', 'bower.json', 'composer.json']
        },

        //
        // Task configuration.
        //
        copy: {
            tinymce: {
                files: [
                    {
                        expand: true,
                        src: 'components/tinymce/tinymce.min.js',
                        flatten: true,
                        dest: 'phpmyfaq/admin/assets/js/editor'
                    },
                    {
                        expand: true,
                        cwd: 'components/tinymce/js/tinymce/plugins/',
                        src: '**',
                        dest: 'phpmyfaq/admin/assets/js/editor/plugins/'
                    },
                    {
                        expand: true,
                        cwd: 'components/tinymce/js/tinymce/skins/',
                        src: '**/*.!(less)',
                        dest: 'phpmyfaq/admin/assets/js/editor/skins/'
                    },
                    {
                        expand: true,
                        cwd: 'components/tinymce/js/tinymce/themes/',
                        src: '**',
                        dest: 'phpmyfaq/admin/assets/js/editor/themes/'
                    }
                ]
            },
            fontawesome: {
                files: [
                    {
                        expand: true,
                        cwd: 'components/font-awesome/fonts/',
                        src: '**',
                        dest: 'phpmyfaq/admin/assets/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'components/font-awesome/fonts/',
                        src: '**',
                        dest: 'phpmyfaq/assets/template/default/fonts/'
                    }
                ]
            },
            highlightjs: {
                files: [
                    {
                        expand: true,
                        src: 'components/highlightjs/highlight.pack.js',
                        flatten: true,
                        dest: 'phpmyfaq/assets/js/libs'
                    },
                    {
                        expand: true,
                        src: 'components/highlightjs/styles/default.css',
                        flatten: true,
                        dest: 'phpmyfaq/assets/js/libs'
                    }
                ]
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'components/jquery/dist/jquery.js',
                    'components/bootstrap/js/tooltip.js',
                    'components/bootstrap/js/transition.js',
                    'components/bootstrap/js/alert.js',
                    'components/bootstrap/js/button.js',
                    'components/bootstrap/js/collapse.js',
                    'components/bootstrap/js/dropdown.js',
                    'components/bootstrap/js/modal.js',
                    'components/bootstrap/js/popover.js',
                    'components/bootstrap/js/tab.js',
                    'components/typeahead.js/dist/typeahead.bundle.js',
                    'components/handlebars/handlebars.js',
                    'phpmyfaq/assets/js/autosave.js',
                    'phpmyfaq/assets/js/typeahead.js',
                    'phpmyfaq/assets/js/functions.js'
                ],
                dest: 'phpmyfaq/assets/js/phpmyfaq.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            frontend: {
                files: { 'phpmyfaq/assets/js/phpmyfaq.min.js': [ '<%= concat.dist.dest %>' ] }
            }
        },
        jshint: {
            jshintrc: '.jshintrc',
            gruntfile: {
                src: 'Gruntfile.js'
            },
            beforeconcat: [
                'phpmyfaq/admin/assets/js/*.js',
                'phpmyfaq/assets/js/autosave.js',
                'phpmyfaq/assets/js/functions.js'
            ]
        },
        less: {
            development: {
                banner: '<%= banner %>',
                files: {
                    'phpmyfaq/admin/assets/css/style.css': 'phpmyfaq/admin/assets/less/style.less',
                    //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/less/style.rtl.less',
                    'phpmyfaq/assets/template/default/css/style.css': 'phpmyfaq/assets/template/default/less/style.less'
                    //'phpmyfaq/assets/template/default/css/style.rtl.css': 'phpmyfaq/assets/template/default/less/style.rtl.less'
                }
            },
            production: {
                files: {
                    'phpmyfaq/admin/assets/css/style.css': 'phpmyfaq/admin/assets/less/style.less',
                    //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/less/style.rtl.less',
                    'phpmyfaq/assets/template/default/css/style.css': 'phpmyfaq/assets/template/default/less/style.less'
                    //'phpmyfaq/assets/template/default/css/style.rtl.css': 'phpmyfaq/assets/template/default/less/style.rtl.less'
                },
                compress: true
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '<%= banner %>',
                    keepSpecialComments: 0
                },
                files: {
                    'phpmyfaq/admin/assets/css/style.min.css': 'phpmyfaq/admin/assets/css/style.css',
                    //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/css/style.rtl.css',
                    'phpmyfaq/assets/template/default/css/style.min.css': ['phpmyfaq/assets/template/default/css/style.css']
                    //'phpmyfaq/assets/template/default/css/style.rtl.min.css': ['phpmyfaq/assets/template/default/css/style.rtl.css']
                }
            }
        },
        modernizr: {
            dist: {
                devFile: 'components/modernizr/modernizr.js',
                outputFile: 'phpmyfaq/assets/js/modernizr.min.js',
                files: {
                    src: [
                        'phpmyfaq/assets/js/{,*/}*.js',
                        'phpmyfaq/assets/template/default/css/{,*/}*.css'
                    ]
                },
                uglify: true
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile'],
                options: {
                    reload: true
                }
            },
            css: {
                files: ['phpmyfaq/admin/assets/less/*.less', 'phpmyfaq/assets/template/default/less/*.less'],
                tasks: ['less', 'cssmin'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['copy', 'jshint', 'concat', 'uglify', 'less:development', 'cssmin', 'modernizr']);

    // Build task
    grunt.registerTask('build', ['copy', 'concat', 'uglify', 'less:production', 'cssmin', 'modernizr']);

    // Watcher
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};
