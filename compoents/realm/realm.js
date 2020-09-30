import {FaceGroup} from "../../mode/sku_realm/fance-group";
import {Judger} from "../../mode/sku_realm/judger";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        dataSpu: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object,
        previewImg: String,
        title: String,
        price: String,
        discount_price: String,
        stock: String
    },
    observers: {
        "dataSpu": function (spu) {
            if (!spu) {
                return;
            }
            const faceGroup = new FaceGroup(spu);
            faceGroup.initFances();
            const judger = new Judger(faceGroup);
            this.data.judger = judger
            const defaultSku = faceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
            } else {
                this.bindSpuData();
            }
            this.bindInitData(faceGroup);
        }

    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindSpuData: function () {
            const spu = this.properties.dataSpu;
            this.setData({
                previewImg: spu.data.img,
                title: spu.data.title,
                price: spu.data.price,
                discount_price: spu.data.discount_price
            })
        },
        bindSkuData: function (sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discount_price: sku.discount_price,
                stock: sku.stock
            })
        },
        bindInitData: function (fanceGroup) {
            this.setData({
                fances: fanceGroup.fances
            })
        },
        onCellTap(event) {
            /**
             * x y 坐标思路
             */
            const cell = event.detail.cell;
            const judger = this.data.judger;
            judger.judgeByCoor(cell, event.detail.x, event.detail.y)
            this.bindInitData(judger.fanceGroup);
        }
    }
});
