import {Paging} from "../utils/Paging";

class Search{
    static getSearch(keyWord){
        return new Paging({
            url:`v1/search?q=${keyWord}`
        })
    }
}
export {
    Search
}