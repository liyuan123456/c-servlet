import {Http} from "../utils/HttpUtil";

class SpuDetail{
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