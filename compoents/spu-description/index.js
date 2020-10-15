Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        tags: Array
    },
    observers: {
        'spu': function (spu) {
            if (!(spu && spu.data.tags)) {
                return;
            }
            const tags = spu.data.tags.split('$');
            this.setData({
                tags
            })
        },
        /**
         * 组件的方法列表
         */
        methods: {}
    }
});
