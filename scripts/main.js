'use strict';

require.config({ //налаштування requirejs
	paths: {
		jquery: '../vendor/jquery/dist/jquery',
		underscore: '../vendor/lodash/dist/lodash',
		backbone: '../vendor/exoskeleton/exoskeleton',
		templates: '../templates',
		text: '../vendor/requirejs-text/text',
		webaudio: 'webaudio'
	}
});

require([
	'backbone',
	'models/app',
	'views/app'
], function (Backbone, App, AppView) {
	var appModel = new App();
	var app = new AppView({ model: appModel });
	app.render();
});