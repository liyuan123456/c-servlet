// compoents/hot-list/index.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        left:Object,
        right:Object,
        rightBottom:Object
    },
    observers: {
        'banner': function (banner) {
            if (!banner) {
                return;
            }
            if (banner.items.length === 0) {
                return;
            }
            const left = banner.items.find(item => item.name === 'left');
            const right = banner.items.find(item => item.name === 'right-top');
            const rightBottom = banner.items.find(item => item.name === 'right-bottom');

            this.setData({
                left,
                right,
                rightBottom
            });
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {}
})
