import {Cell} from "./cell";

class Fance {
    cells = [];
    specs
    title
    id

    constructor(specs) {
        this.specs = specs;
        this.title = this.specs[0].key;
        this.id = this.specs[0].key_id;
    }

    init() {
        if (!this.specs) {
            return;
        }
        this.initCell();
    }

    initCell() {
        this.specs.forEach(r => {
            //去重
            const existed = this.cells.some(c => {
                return c.id === r.value_id
            })
            if(existed){
                return;
            }
            const cell = new Cell(r);
            this.cells.push(cell);
        });
    }
}

export {
    Fance
}