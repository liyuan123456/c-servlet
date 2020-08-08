import {Http} from "../utils/HttpUtil";

class Banner{
    static locationBannerA = 'b-1';
    static locationBannerB= 'b-2';
    static async getHomeTopBannerA(){
        const bannerData = await Http.request({
            url: `v1/banner/name/${Banner.locationBannerA}`
        });
        return bannerData.data.items;
    }
    static async getHomeTopBannerB(){
        const bannerData = await Http.request({
            url: `v1/banner/name/${Banner.locationBannerB}`
        });
        return bannerData.data;
    }
}

export {Banner}