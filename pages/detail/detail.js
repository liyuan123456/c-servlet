import {SpuDetail} from "../../mode/spu-detail";

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
    onGoToHome: function (event) {
        console.log(event.detail)
    },
    onGoToCart: function (event) {

        console.log(event.detail)
    },
    onAddToCart: function (event) {
        this.setData({
            showRealm:true
        })
        console.log(event.detail)
    },
    onBuy: function (event) {
        this.setData({
            showRealm:true
        })
        console.log(event.detail)
    }


});