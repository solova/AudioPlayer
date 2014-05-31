/*
Головне відображення
*/
define([
    'backbone',
    'underscore',
    'models/audiofile',
    'views/menu',
    'views/player',
    'views/visualizer',
    'views/equalizer',
    'text!templates/main.html'
], function (Backbone, _, AudioFile, MenuView, PlayerView, VisualizerView, EqualizerView, template) {
    'use strict';


    var AppView = Backbone.View.extend({

        el: 'body',

        template: _.template(template),

        initialize: function () {
        	//завантаження файлу - вже не вистачає часу зробити з використаннями FileAPI
            this.audio = new AudioFile({
                url: 'test2.mp3'
            });
            this.listenTo(this.audio, 'change:loaded', this.renderPlayer);
            this.listenTo(this.model, 'change', this.blockVisibility);

            this.raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            _.bindAll(this, 'startLoop');
        },
        /*
        цикл перемальовки
        */
        startLoop: function () {
            this.visualizer.update();
            if (this.audio.get('sound').isPlayable() !== false) {
                this.raf.call(window, this.startLoop);
            }
        },

        blockVisibility: function () {
            if (typeof this.equalizer !== 'undefined') {
                this.equalizer.$el.toggle(this.model.get('equalizer'));
            }
            if (typeof this.visualizer !== 'undefined') {
                this.visualizer.$el.toggle(this.model.get('visualizer'));
            }
            return this;
        },

        renderPlayer: function () {

            this.$el.removeClass('loading');

            this.player = new PlayerView({
                model: this.audio
            });
            this.$el.append(this.player.render().el);

            this.visualizer = new VisualizerView({
                model: this.audio
            });
            this.$el.append(this.visualizer.render().el);

            this.equalizer = new EqualizerView({
                model: this.audio
            });
            this.$el.append(this.equalizer.render().el);

            this.startLoop();
            return this;
        },



        render: function () {
            this.$el.html(this.template());
            this.$el.addClass('loading');

            var menu = new MenuView({
                model: this.model
            });
            this.$el.append(menu.render().el);
            return this;
        },
    });

    return AppView;
});