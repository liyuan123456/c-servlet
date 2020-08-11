import {Toptheme} from "../../mode/toptheme";
import {Banner} from "../../mode/banner";
import {Category} from "../../mode/category";
import {Activity} from "../../mode/activity";
import {SpuPaging} from "../../mode/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeD: null,
        bannerA: null,
        bannerB: null,
        category: [],
        activity: null,
        spuTheme: null,
        themeB: null,
        flag: true,
        spu_paging: null,
        loading: 'loading'
    },

    /*页面初始化加载*/
    onLoad: function () {
        this.initAllData();
        this.initBottomSpuList();
    },
    /*初始化瀑布流*/
    async initBottomSpuList() {
        const paging = await SpuPaging.getLatestPaging();
        this.data.spu_paging = paging;
        const data = await paging.getMoreData();
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items);
    },
    /*初始化数据*/
    async initAllData() {
        const themes = new Toptheme();
        await themes.getThemes();
        const themeA = themes.getThemeA();
        const themeB = themes.getThemeB();
        const themeD = themes.getThemeD();

        const bannerA = await Banner.getHomeTopBannerA();
        const bannerB = await Banner.getHomeTopBannerB();
        const category = await Category.getCategoryDate();
        const activity = await Activity.getLocationActivity();

        let spuTheme = [];
        if (themeB.online) {
            const data = await Toptheme.getThemeSpuByEName();
            if (data) {
                spuTheme = data.data.spu_list.splice(0, 8);
            }
        }

        this.setData({
            themeA,
            themeB,
            themeD,
            bannerA,
            bannerB,
            category,
            activity,
            spuTheme
        });
    },
    async onReachBottom() {
        const data = await this.data.spu_paging.getMoreData();
        if(!data){
            return;
        }
        if(!data.items){
            return;
        }
        wx.lin.renderWaterFlow(data.items);
        if(!this.data.spu_paging.moreData){
            this.setData({
                loading:'end'
            })
        }
    }


});