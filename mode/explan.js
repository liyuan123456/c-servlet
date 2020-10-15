import {Http} from "../utils/HttpUtil";

class Explan{
    static async getExplan() {
        const explan = await Http.request({
            'url': 'v1/sale_explain/fixed'
        })
        return explan.data.map(e=>{
            return e.text
        })
    }
}
export {
    Explan
}