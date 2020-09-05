import {SpuDetail} from "../../mode/spu-detail";

Page({

    data: {
        spuDetail:null
    },
    onLoad:function (options) {
        this.initSpuDetail(options.pid)
    },
    async initSpuDetail(options){
        const spuDetail = await SpuDetail.getSpuDetail(options);
        this.setData({
            spuDetail
        })
    }

});