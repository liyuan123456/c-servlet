import {HistoryKeyWord} from "../../mode/history-keyword";
import {Tag} from "../../mode/tag";

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