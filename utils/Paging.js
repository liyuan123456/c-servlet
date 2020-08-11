import {Http} from "./HttpUtil";

class Paging{
    req
    start
    count
    locker
    url
    moreData = true
    accumulator=[]
    constructor(req,start = 0,count = 10){
        this.req = req;
        this.start = start;
        this.count = count;
        this.url = req.url;
    }
    async getMoreData(){
        if(!this.moreData){
            return;
        }
        if(!this.getLocker()){
            return;
        }
        const data = await this.actualGetData();
        this.releaseLocker();
        return data;
    }

    /**
     * 获取锁，判断锁的状态
     * @returns {*}
     */
    getLocker(){
        if(this.locker){
            return false;
        }
        this.locker = true;
        return true;
    }

    /**
     * 释放锁
     */
    releaseLocker(){
        this.locker = false;
    }

    /**
     * 处理请求参数
     */
    getCurrentReq(){
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`
        if(url.includes('?')){
            url += '&' + params
        }else{
            url += '?' + params
        }
        this.req.url = url;
        return this.req;
    }

    /**
     * 判断是否还有更多分页
     * @param totalPage 总共页数
     * @param pageNum 当前页数
     * @returns {boolean}
     */
    isMoreData(totalPage,pageNum){
        return pageNum < totalPage-1;
    }

    /**
     * 累加数据
     * @param items
     */
    accumulators(items){
        this.accumulator = this.accumulator.concat(items)
    }

    /**
     * 调用api获取数据
     */
    async actualGetData(){
        const req = this.getCurrentReq()
        let paging = await Http.request(req);
        if(!paging){
            return null;
        }
        //判断请求是否有数据返回
        if(paging.total === 0){
            return{
                empty: false,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        //判断是否还有更多数据，有则设置下一次请求参数
        this.moreData = this.isMoreData(paging.data.total_page,paging.data.page);
        if(this.moreData){
            this.start += this.count;
        };
        //数据累加
        this.accumulators(paging.data.items);
        return {
            empty: false,
            items: paging.data.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        };
    }
}

export {Paging}