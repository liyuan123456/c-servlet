import {SkuCode} from "./sku-code";
import {statusEnum} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {
    fanceGroup
    pathDict = []
    skuPending

    constructor(fanceGroup) {
        this.fanceGroup = fanceGroup;
        this.initSkuPending();
    }

    initSkuPending() {
        this.skuPending = new SkuPending();
    }

    initPathDict() {
        if (!this.fanceGroup) {
            return
        }
        this.fanceGroup.skuList.forEach(s => {
            const skuCode = new SkuCode(s.code);
            skuCode.splitToSeqments();
            this.pathDict = this.pathDict.concat(skuCode.seqments);
        });
        console.log(this.pathDict);
    }

    judgeByCoor(cell, x, y) {
        this.changeCurrentCellStatusByCoor(cell, x, y);
        this.fanceGroup.eachCell((cell, x, y) => {
            const path = this.findPotentiaPath(cell, x, y);
            if(!path){
                return
            }
            const isIn = this.isInDict(path);
            if(isIn){
                this.fanceGroup.fances[x].cells[y].status = statusEnum.WAITING;
            }else{
                this.fanceGroup.fances[x].cells[y].status = statusEnum.FORBIDDEN;
            }

        });
    }

    isInDict(path){
        return this.pathDict.includes(path);
    }

    /**
     * 发现潜在路径
     * @param cell
     * @param x
     * @param y
     * @returns {*}
     */
    findPotentiaPath(cell, x, y) {
        const jonner = new Joiner('#');
        for (let i = 0; i < this.fanceGroup.fances.length; i++) {
            const selected = this.skuPending.findCellByX(i);
            if(x === i){
                if(this.skuPending.isSelected(cell,x)){
                    return
                }
                const cellCode = this.getCellCode(cell);
                jonner.join(cellCode);
            }else{
                if(selected){
                    const selectedCellCode = this.getCellCode(selected);
                    jonner.join(selectedCellCode);
                }
            }
        }
        return jonner.getStr();
    }

    /**
     * 获得凭借后的code码
     * @param cell
     * @returns {string}
     */
    getCellCode(cell) {
        return cell.spec.key_id + "-" + cell.spec.value_id
    }

    /**
     * 根据坐标切换cell的status
     * @param cell
     * @param x
     * @param y
     */
    changeCurrentCellStatusByCoor(cell, x, y) {
        switch (cell.status) {
            case statusEnum.WAITING:
                this.fanceGroup.fances[x].cells[y].status = statusEnum.SELECTED;
                this.skuPending.insertCell(cell, x);
                break;
            case statusEnum.SELECTED:
                this.fanceGroup.fances[x].cells[y].status = statusEnum.WAITING;
                this.skuPending.removeCell(x);
                break;
        }
    }


}

export {
    Judger
}