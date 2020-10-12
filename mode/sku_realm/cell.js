
import {statusEnum} from "../../core/enum";

class Cell{
    spec
    title
    id
    status = statusEnum.WAITING;
    skuImg
    constructor(spec){
        this.spec = spec;
        this.title = spec.value;
        this.id = spec.value_id;
    }

    getCellCode() {
        return this.spec.key_id + "-" + this.spec.value_id
    }
}
export {
    Cell
}