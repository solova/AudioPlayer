/*
Відображення еквалайзеру
*/
define([
    'backbone',
    'underscore',
    'text!templates/equalizer.html'
], function (Backbone, _, template) {
    'use strict';

    var VisualizerView = Backbone.View.extend({
        id: "equalizer",
        className: 'pure-g',
        events: {
            "input input.eq-range": "changeValue",
            "change input.eq-range": "changeValue"
        },
        template: _.template(template),
        changeValue: function (event) {
            var $el = $(event.target);
            var $parent = $el.closest('div');
            var value = parseInt($el.val());
            $('.eq-value', $parent)
                .text(value)
                .toggleClass('red', value < 0)
                .toggleClass('green', value > 0);
            if (event.type === 'change') { //якщо це остаточна позиція слайдеру

                var eq = this.model.get('eq');
                eq[$parent.index()] = value;
                this.model.set('eq', eq);
                this.model.get('sound').equalize(this.model.get('eq'));
            }
        },
        render: function () {
            var eq = this.model.get('eq');
            for (var i = 0; i < 12; i++) { //створення слайдерів, не самий кращий спосіб, проте задовільняє умові мінімального копіпасту
                this.$el.append(this.template({
                    value: eq[i]
                }));
            }
            return this;
        },
    });

    return VisualizerView;
});