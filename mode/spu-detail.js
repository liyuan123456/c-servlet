import {Http} from "../utils/HttpUtil";

class SpuDetail{
    static isNoSpecs(spu){
        if(spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0){
            return true;
        }
        return false;
    }
    static async getSpuDetail(pid){
        const data = await Http.request({
            url:`v1/spu/id/${pid}/detail`
        })
        return data;
    }

}
export {
    SpuDetail
}