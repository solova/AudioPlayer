/*
Відображення плеєру
*/
define([
    'backbone',
    'underscore',
    'text!templates/player.html'
], function (Backbone, _, template) {
    'use strict';

    var PlayerView = Backbone.View.extend({

        id: "player",

        events: {
            'click button.play': 'play',
            'click button.stop': 'stop',
            'click button.volumeup': 'volumeUp',
            'click button.volumedown': 'volumeDown'
        },

        template: _.template(template),

        initialize: function () {
            _.bindAll(this, 'count');
            this.listenTo(this.model, 'change:volume', this.changeVolume);
            return this;
        },

        volumeUp: function () {
            this.model.set('volume', Math.min(1.0, parseFloat(this.model.get('volume')) + 0.1));
        },
        volumeDown: function () {
            this.model.set('volume', Math.max(0.0, parseFloat(this.model.get('volume')) - 0.1));
        },
        changeVolume: function () {
            this.model.get('sound').volume(parseFloat(this.model.get('volume')));
        },

        /*кривий лічильник часу - не вдалося поки що знайти необхідний івент*/
        count: function(){
            if (typeof this.instance !== 'undefined') {
                var time = Math.ceil((+ new Date() - this.start) / 1000);
                this.$('progress').attr('value', time);
                setTimeout(this.count, 900);
            }
        },

        play: function () {
            var that = this;
            if (typeof this.instance === 'undefined') {
                this.instance = this.model.get('sound').play();
                this.model.get('sound').equalize(this.model.get('eq'));
                this.model.get('sound').volume(this.model.get('volume'));
                this.start = new Date();
                this.instance.node.onended = function () {
                    delete that.instance;
                }
                this.count();
            }
        },

        stop: function () {
            if (this.instance) {
                this.instance.stop();
            }
        },



        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        },
    });

    return PlayerView;
});