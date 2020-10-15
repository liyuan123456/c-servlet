import {FaceGroup} from "../../mode/sku_realm/fance-group";
import {Judger} from "../../mode/sku_realm/judger";
import {SpuDetail} from "../../mode/spu-detail";
import {Paging} from "../../utils/Paging";
import {Cart} from "../../mode/cart/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        dataSpu: Object,
        orderWay: String
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
        stock: String,
        isNoSpecs: Boolean,
        isSkuIntact: Boolean,
        skuCurrentCount: Cart.MIN_SKU_COUNT
    },
    observers: {
        "dataSpu": function (spu) {
            if (!spu) {
                return;
            }
            if (SpuDetail.isNoSpecs(spu.data)) {
                this.processNoSpec(spu)
            } else {
                this.processHasSpec(spu)
            }
            this.triggerSpecEvent();
        }

    },
    /**
     * 组件的方法列表
     */
    methods: {
        processNoSpec(spu) {
            this.setData({
                isNoSpecs: true
            })
            this.bindSkuData(spu.data.sku_list[0])
            this.setStockStatus(spu.data.sku_list[0].stock, this.data.skuCurrentCount);
        },
        processHasSpec(spu) {
            this.setData({
                isNoSpecs: false
            })
            const faceGroup = new FaceGroup(spu);
            faceGroup.initFances();
            const judger = new Judger(faceGroup);
            this.data.judger = judger
            const defaultSku = faceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
                this.setStockStatus(defaultSku.stock, this.data.skuCurrentCount);
            } else {
                this.bindSpuData();
                this.setStockStatus(0, this.data.skuCurrentCount);
            }
            this.bindTipData();
            this.bindFanceGroupData(faceGroup);

        },
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
        bindFanceGroupData: function (fanceGroup) {
            this.setData({
                fances: fanceGroup.fances
            });
        },
        bindTipData: function () {
            this.setData({
                isSkuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentSpecValues(),
                missKeys: this.data.judger.getMissingKeys()
            })
        },
        triggerSpecEvent: function () {
            if (this.data.isNoSpecs) {
                this.triggerEvent('specchange',{
                    isNoSpecs:this.properties.isNoSpecs,
                })
            }else{
                this.triggerEvent('specchange', {
                    isNoSpecs: this.data.isNoSpecs,
                    isSkuIntact: this.data.judger.isSkuIntact(),
                    currentValues: this.data.judger.getCurrentSpecValues(),
                    missKeys: this.data.judger.getMissingKeys()
                })
            }
        },
        onSelectCount: function (event) {
            const currentCount = event.detail.count;
            this.data.skuCurrentCount = currentCount;
            if (this.data.isNoSpecs) {
                this.noSpecSetStockStatus(currentCount);
            } else {
                this.hasSpecSetStockStatus(currentCount);
            }
        },
        hasSpecSetStockStatus(currentCount) {
            const judger = this.data.judger;
            if (judger.isSkuIntact()) {
                const sku = judger.getDetermainteSku();
                this.setStockStatus(sku.stock, currentCount);
            }
        },
        noSpecSetStockStatus(currentCount) {
            this.setStockStatus(this.data.stock, currentCount)
        },
        isOutOfStock: function (stock, currentCount) {
            return stock < currentCount
        },
        setStockStatus: function (stock, currentCount) {
            this.setData({
                isOutOfStock: this.isOutOfStock(stock, currentCount)
            })
        },
        onCellTap(event) {
            /**
             * x y 坐标思路
             */
            const cell = event.detail.cell;
            const judger = this.data.judger;
            judger.judgeByCoor(cell, event.detail.x, event.detail.y)

            const isIntact = judger.isSkuIntact();
            if (isIntact) {
                const currentSku = judger.getDetermainteSku();
                this.bindSkuData(currentSku);
                this.setStockStatus(currentSku.stock, this.data.skuCurrentCount);
            }
            this.bindTipData();
            this.bindFanceGroupData(judger.fanceGroup);
            this.triggerSpecEvent();
        }
    }
});
