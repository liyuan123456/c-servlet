import {Toptheme} from "../../mode/toptheme";
import {Banner} from "../../mode/banner";
import {Category} from "../../mode/category";
import {Activity} from "../../mode/activity";
import {Water} from "../../mode/waterflow";

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
        flag: true
    },

    /*页面初始化加载*/
    onLoad: function () {
        this.initAllData();
        this.initWaterFlow(new Water());
    },
    /*初始化瀑布流*/
    async initWaterFlow(options) {

        await options.getProduct();
        await wx.lin.renderWaterFlow(options.waterFlowArray, false, () => {

        });
    },
    /*上拉加载*/
    async onReachBottom() {
        if(this.data.flag){
            this.setData({
                flag:false
            })
            if (Water.flag) {
                wx.showToast({
                    title: "全部加载完毕",
                    icon: "success",
                    duration: 2000
                });
            } else {
                wx.showLoading({
                    title: "加载中"
                });
                const pullWater = new Water();
                pullWater.startAndPage();

                this.initWaterFlow(pullWater);
                setTimeout(function () {
                    wx.hideLoading({});
                },1000)
            }
            this.setData({
                flag:true
            })
        }else{
            return;
        }
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

});