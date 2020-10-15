import {SpuDetail} from "../../mode/spu-detail";
import {ShopingWay} from "../../core/enum";
import {Explan} from "../../mode/explan";

Page({

    data: {
        spuDetail: null,
        showRealm: false
    },
    async onLoad(options) {
        this.initSpuDetail(options.pid);
        const explan = await Explan.getExplan();
        this.setData({
            explan
        })
    },
    async initSpuDetail(options) {
        const spuDetail = await SpuDetail.getSpuDetail(options);
        this.setData({
            spuDetail
        })
    },
    onGotoHome: function (event) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },
    onGotoCart: function (event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },
    onAddToCart: function (event) {
        this.setData({
            showRealm: true,
            orderWay: ShopingWay.CART
        })
    },
    onBuy: function (event) {
        this.setData({
            showRealm: true,
            orderWay: ShopingWay.BUY
        })
    },
    onSpecChange: function (event) {
        const detail = event.detail
        this.setData({
            isNoSpecs: detail.isNoSpecs,
            isSkuIntact: detail.isSkuIntact,
            currentValues: detail.currentValues,
            missKeys: detail.missKeys
        })
    }


});