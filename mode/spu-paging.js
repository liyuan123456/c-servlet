import {Paging} from "../utils/Paging";

class SpuPaging {
    /**
     * 初始化paging对象
     * @returns {Paging}
     */
    static getLatestPaging(){
        return new Paging({
            url: `v1/spu/latest`
        },0,5)
    }
}

export {SpuPaging}
