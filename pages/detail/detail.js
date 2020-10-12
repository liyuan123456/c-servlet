import {SpuDetail} from "../../mode/spu-detail";
import {ShopingWay} from "../../core/enum";

Page({

    data: {
        spuDetail: null,
        showRealm: false
    },
    onLoad: function (options) {
        this.initSpuDetail(options.pid)
    },
    async initSpuDetail(options) {
        const spuDetail = await SpuDetail.getSpuDetail(options);
        this.setData({
            spuDetail
        })
    },
    onGotoHome: function (event) {
        wx.switchTab({
            url:'/pages/home/home'
        })
    },
    onGotoCart: function (event) {
        wx.switchTab({
            url:'/pages/cart/cart'
        })
    },
    onAddToCart: function (event) {
        this.setData({
            showRealm:true,
            orderWay:ShopingWay.CART
        })
    },
    onBuy: function (event) {
        this.setData({
            showRealm:true,
            orderWay:ShopingWay.BUY
        })
    }


});