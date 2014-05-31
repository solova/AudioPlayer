/*
Модель, що зберігає налаштування
*/
define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var AppModel = Backbone.Model.extend({
        initialize: function () {

        },
        defaults: {
            visualizer: true,
            equalizer: true
        }
    });

    return AppModel;
});