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
            const log = 'onGoToHome';
            this.triggerEvent('ongotohome',log);
        },
        onGoToCart: function () {
            const log = 'onGoToCart';
            this.triggerEvent('ongotocart', log);
        },
        onAddToCart: function () {
            const log = 'onAddToCart';
            this.triggerEvent('onaddtocart', log);
        },
        onBuy: function () {
            const log = 'onBuy';
            this.triggerEvent('onbuy',log)
        }
    }
});

