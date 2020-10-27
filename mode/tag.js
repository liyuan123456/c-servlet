import {Http} from "../utils/HttpUtil";

class Tag{
    static async getHotTags(){
        const hotTags = await Http.request({
            url:'v1/tag/type/1'
        })
        return hotTags;
    }
}
export {
    Tag
}