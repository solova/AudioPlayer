/*
Відображення меню
*/
define([
    'backbone',
    'underscore',
    'text!templates/menu.html'
], function (Backbone, _, template) {
    'use strict';

    var MenuView = Backbone.View.extend({

        id: "menu",

        template: _.template(template),

        events: {
            'click .menu-item a': 'switch',
            'click .load-file a': 'loadFile'
        },

        switch: function (event) {
            event.preventDefault();
            var field = $(event.target).closest('li').data('field');
            this.model.set(field, !this.model.get(field));
        },

        loadFile: function (event) {
        	event.preventDefault();
        	alert('preloaded only :-(');
			// var files = $("#file").files;
			// var reader  = new FileReader();
			// reader.onload = function(event) {
			//     var content = event.target.result;
			//     alert(content);
			// }
			// reader.readAsText(files[0]);
        },

        initialize: function () {

            // this.collection.fetch();
            this.listenTo(this.model, 'change', this.render);

            return this;
        },

        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);

            return this;
        },
    });

    return MenuView;
});