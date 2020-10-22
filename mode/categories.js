import {Http} from "../utils/HttpUtil";

class Categories{
    roots=[]
    subs=[]
    async getAll(){
        const categories = await Http.request({
            url:'v1/category/all'
        })
        if(categories){
            this.roots = categories.data.roots;
            this.subs = categories.data.subs;
        }
    }
    getRoots(){
        return this.roots;
    }
    getSubs(rootId){
        return this.subs.filter(sub => sub.parent_id === rootId);
    }
}
export {
    Categories
}