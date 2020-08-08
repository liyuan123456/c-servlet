import {Http} from "../utils/HttpUtil";

class Category{
    static locationCategory = "all";
    static async getCategoryDate(){
        const data = await Http.request({
            url: `v1/category/grid/${Category.locationCategory}`
        });
        return data.data;
    }
}
export {Category}