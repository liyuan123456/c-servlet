// compoents/tab-bar/tab-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onGoToHome: function () {
            this.triggerEvent('ongotohome');
        },
        onGoToCart: function () {
            this.triggerEvent('ongotocart');
        },
        onAddToCart: function () {
            this.triggerEvent('onaddtocart');
        },
        onBuy: function () {
            this.triggerEvent('onbuy')
        }
    }
});

