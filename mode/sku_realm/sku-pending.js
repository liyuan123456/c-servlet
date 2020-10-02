import {Cell} from "./cell";

class SkuPending {
    pending = []
    size

    constructor(size) {
        this.size = size
    }

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if(this.isEmpty(i)){
               return false;
            }
        }
        return true;
    }

    isEmpty(index){
        return this.pending[index]?false:true;
    }

    insertCell(cell, x) {
        this.pending[x] = cell;
    }

    removeCell(x) {
        this.pending[x] = null;
    }

    findCellByX(x) {
        return this.pending[x];
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x];
        if (!pendingCell) {
            return
        }
        return cell.id === pendingCell.id
    }

}

export {
    SkuPending
}