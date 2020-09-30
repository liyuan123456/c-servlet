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
        judger: Object
    },
    observers: {
        "dataSpu": function (spu) {
            if (!spu) {
                return;
            }
            console.log(spu)
            const faceGroup = new FaceGroup(spu);
            faceGroup.initFances();
            const judger = new Judger(faceGroup);
            this.data.judger = judger
            this.bindInitData(faceGroup);
        }

    },
    /**
     * 组件的方法列表
     */
    methods: {
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
            judger.judgeByCoor(cell,event.detail.x,event.detail.y)
            this.bindInitData(judger.fanceGroup);
        }
    }
})
