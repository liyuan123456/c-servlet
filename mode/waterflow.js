import {Http} from "../utils/HttpUtil";

class Water {
    static page = 0;
    start = 0;
    count = 5;
    static flag = false;
    waterFlowArray = [];

    startAndPage(){
        this.start = Water.page * this.count;
    }

    /*查询商品信息*/
    async getProduct() {
        if(Water.flag){
            console.log("没有数据了");
            return;
        }
        const data = await Http.request({
            url: `v1/spu/latest`,
            data:{
                start:this.start,
                count:this.count
            }
        })
        this.waterFlowArray = data.data.items;
        if(this.waterFlowArray.length < this.count){
            Water.flag = true;
        }else {
            Water.page = data.data.page + 1;
        }



    }
}

export {Water}