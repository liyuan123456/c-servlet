import {HistoryKeyWord} from "../../mode/history-keyword";
import {Tag} from "../../mode/tag";
import {Search} from "../../mode/search";

const history = new HistoryKeyWord();
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    async onLoad(){
        const historyTags = history.get();
        const hotTags = await Tag.getHotTags();
        this.setData({
            historyTags,
            hotTags:hotTags.data
        });
    },
    onSearch(event) {
        this.setData({
            search:true,
            items:[]
        })
        const keyWord = event.detail.value.replace(/\s*/g,"");;
        if(keyWord === ''){
            return
        }
        history.save(keyWord);
        this.setData({
            historyTags: history.get()
        });
        this.searchData(keyWord)
    },
    onTag(event){
        this.setData({
            search:true,
            items:[]
        })
        const keyword = event.detail.name;
        this.searchData(keyword);
    },
    async searchData(keyword){
        const paging = Search.getSearch(keyword);
        wx.lin.showLoading({
            color:'#157658',
            type:'change',
            fullScreen:true
        })
        const data = await paging.getMoreData();
        wx.lin.hideLoading();
        this.bindItems(data);
    },
    bindItems(data){
        if(data.accumulator.length !== 0){
            this.setData({
                items: data.accumulator,
                loadingType:'end',
                loadingText:this.loadType(data)
            });
        }
    },
    loadType(data){
        return data.moreData ? '以上为热搜商品' : '无更多商品';
    },
    onDeleteHistory(){
        history.clear();
        this.setData({
            historyTags:[]
        })
    },
    onCancal(){
        this.setData({
            search:false
        })
    }

});