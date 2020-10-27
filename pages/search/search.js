import {HistoryKeyWord} from "../../mode/history-keyword";

const history = new HistoryKeyWord();
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    onLoad(){
        const historyTags = history.get();
        this.setData({
            historyTags
        });
    },
    onSearch(event) {
        const keyWord = event.detail.value.replace(/\s*/g,"");;
        if(keyWord === ''){
            return
        }
        console.log(keyWord);
        history.save(keyWord);
        this.setData({
            historyTags: history.get()
        });
    },
    onDeleteHistory(){
        history.clear();
        this.setData({
            historyTags:[]
        })
    }
});