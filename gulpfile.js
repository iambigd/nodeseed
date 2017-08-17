'use strict';  
  
//引入 gulp 和 nodemon livereload 插件  
var gulp       = require('gulp');  
var nodemon    = require('gulp-nodemon');  
var livereload = require('gulp-livereload')

// 一些文件的路径  
var paths = {  
    client: [  
    'public/javascripts/**/*.js',  
    'public/stylesheets/**/*.css'  
    ],  
    server: {  
        index: 'app.js'  
    }  
};  
  
// nodemon 的配置  
var nodemonConfig = {  
    script : paths.server.index,  
    ignore : [  
        "tmp/**",  
        "public/**",  
        "views/**"  
    ],  
    env    : {  
        "NODE_ENV": "development"  
    }  
};  

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

// 使用nodemone run server 
gulp.task('nodemon', ['livereload'], function(cb) {

	var started = false;

    return nodemon(nodemonConfig).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});;  
});  
  
// live reload監聽 
gulp.task('livereload', function() { 

    livereload.listen();  
    // var server = livereload();  

    return gulp.watch(
    	paths.client, function(event) {  
    		console.log('變動的路徑: '+ event.path)
    		// server.changed(event.path);
    		livereload.changed(event.path);
    	 

    });  
});  
  

// 我們可以建立一個預設任務，當只輸入 $>gulp 指令時執行的任務
gulp.task('default',['nodemon'],function(){
	// console.log('run default');

});

