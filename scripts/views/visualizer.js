/*
Відображення гістограми та стовчика інтесивності
*/
define([
    'backbone',
    'underscore'
], function (Backbone, _) {
    'use strict';

    var VisualizerView = Backbone.View.extend({

        id: "visualizer",

        initialize: function () {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext("2d");

            this.amplitude = document.createElement('progress');
            this.amplitude.className = 'amplitude';
            this.amplitude.setAttribute('max', 100);
            this.amplitude.setAttribute('min', 0);
            this.amplitude.setAttribute('value', 0);
        },

        update: function () {

            var nBar = 24;
            var histo = this.model.get('sound').makeHistogram(nBar);
            var amplitude = this.model.get('sound').amplitude();
            this.amplitude.setAttribute('value', Math.ceil(amplitude * 100));

            this.canvas.width = this.$el.width();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            var barW = Math.floor(this.canvas.width / nBar);
            for (var i = 0; i < histo.length; i++) {
                var height = Math.floor(histo[i]) / 256;
                this.ctx.fillStyle = "hsl(" + (height * 360) + ", 100%, 50%)";
                var heightPix = height * this.canvas.height;
                this.ctx.fillRect(i * barW, this.canvas.height - heightPix, barW, heightPix);
            }
        },
        render: function () {
            this.$el.append(this.amplitude)
            this.$el.append(this.canvas);
            return this;
        },
    });

    return VisualizerView;
});