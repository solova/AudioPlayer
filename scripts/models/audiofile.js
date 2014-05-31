/*
Модель, що зберігає інформацію, щодо поточного файлу
*/
define([
    'jquery',
    'backbone',
    'webaudio'
], function ($, Backbone, WebAudio) {
    'use strict';

    var AudioFileModel = Backbone.Model.extend({
        initialize: function () {
            var webaudio = new WebAudio();
            var sound = webaudio.createSound();

            this.set('sound', sound);

            this.listenTo(this, 'change:url', this.setRaw);
            if (this.get('url')) {
                this.setRaw();
            }

            return this;
        },
        defaults: {
            url: '',
            loaded: false,
            eq: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            volume: 0.8
        },
        setRaw: function () {
            var that = this;
            this.set('loaded', false);
            this.get('sound').load(this.get('url'), function () {
                that.set('loaded', true);
            })
        }
    });

    return AudioFileModel;
});