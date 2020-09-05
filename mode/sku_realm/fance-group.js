import {Matrix} from "./matrix";
import {Fance} from "./fance";

class FaceGroup{
    spu
    skuList
    fances = []
    constructor(spu){
        this.spu = spu;
        this.skuList = spu.data.sku_list;
    }
    initFances(){
        if(!this.skuList){
            return;
        }
        const fances = [];
        const matrix = this.createMatrix(this.skuList);
        const AT =matrix.transpose();
        AT.forEach(row=>{
            const fance = new Fance(row);
            fance.init();
            fances.push(fance);
        })
        this.fances = fances;
    }
    createMatrix(spulist){
        const m = [];
        spulist.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m);
    }
    eachCell(cb){
        for(let i=0;i<this.fances.length;i++){
            for(let j =0;j<this.fances[i].cells.length;j++){
                const cell = this.fances[i].cells[j];
                cb(cell,i,j)
            }
        }
    }
}
export {
    FaceGroup
}