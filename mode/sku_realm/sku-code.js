import {combination} from "../../utils/Util";

class SkuCode {
    code
    spuId
    seqments = []

    constructor(code) {
        this.code = code;
    }

    splitToSeqments() {
        if (!this.code) {
            return;
        }
        const spuAndSpec = this.code.split('$');
        this.spuId = spuAndSpec[0];
        const specCodeArr = spuAndSpec[1].split('#');
        for (let i = 1; i <= specCodeArr.length; i++) {
            this.seqments = this.seqments.concat(combination(specCodeArr,i).map(seqs=>{
                return seqs.join('#')
            }))
        }
    }

}

export {
    SkuCode
}