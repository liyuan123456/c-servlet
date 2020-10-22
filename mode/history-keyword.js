class HistoryKeyWord{
    static MAX_ITEM_COUNT = 20
    keywords = []
    save(keyword){
        const item = this.keywords.filter(k => k === keyword);
        if(item.length != 0){
            return
        }
        if(this.keywords.length >= HistoryKeyWord.MAX_ITEM_COUNT){
            this.keywords.pop()
        }
        this.keywords.unshift(keyword);
    }
    get(){
        return this.keywords;
    }
    clear(){
        this.keywords = [];
    }
}