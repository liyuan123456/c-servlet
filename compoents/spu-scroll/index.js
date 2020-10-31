Component({
    /**
     * 组件的属性列表
     */
    properties: {
        theme: Object,
        spuList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        spuDetail(event) {
            const spuId = event.currentTarget.id;
            wx.navigateTo({
                url:`/pages/detail/detail?pid=${spuId}`
            })
        }
    }
});
