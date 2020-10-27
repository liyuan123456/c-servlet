class HistoryKeyWord{
    static MAX_ITEM_COUNT = 20;
    static KEY = 'KeyWords';
    static instance
    keywords = [];
    constructor(){
        if(typeof HistoryKeyWord.instance === 'object'){
            return HistoryKeyWord.instance;
        }
        this.keywords = this._getLocalKeyWords();
        HistoryKeyWord.instance = this;
        return this;
    }
    save(keyword){
        const item = this.keywords.filter(k => k === keyword);
        if(item.length != 0){
            return
        }
        if(this.keywords.length >= HistoryKeyWord.MAX_ITEM_COUNT){
            this.keywords.pop()
        }
        this.keywords.unshift(keyword);
        this._refreshLocal();
    }
    get(){
        return this._getLocalKeyWords();
    }
    clear(){
        this.keywords = [];
        this._refreshLocal();
    }
    _refreshLocal(){
        wx.setStorageSync(HistoryKeyWord.KEY,this.keywords);
    }
    _getLocalKeyWords(){
        const keyWords = wx.getStorageSync(HistoryKeyWord.KEY);
        if(keyWords){
            return keyWords
        }else{
            wx.setStorageSync(HistoryKeyWord.KEY, []);
            return [];
        }
    }
}
export {
    HistoryKeyWord
}