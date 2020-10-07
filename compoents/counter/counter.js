import {Cart} from "../../mode/cart/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: Number,
            value: Cart.MIN_SKU_COUNT
        },
        min: {
            type: Number,
            value: Cart.MIN_SKU_COUNT
        },
        max: {
            type: Number,
            value: Cart.MAX_SKU_COUNT
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        overFlow:function (event) {
            const overFlowType = event.detail.type;
            if(overFlowType == "overflow_max"){
                wx.showToast({
                    title:'超过最大购买数量',
                    icon:'none',
                    duration:3000
                })
            }
            if(overFlowType == "overflow_min"){
                wx.showToast({
                    title:`最少购买${Cart.MIN_SKU_COUNT}件哈`,
                    icon:'none',
                    duration:3000
                })
            }
        }
    }
})
