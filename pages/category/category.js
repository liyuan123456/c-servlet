import {getSystemInfo} from "../../utils/System";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../mode/categories";
import {SpuListType} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultRootId:2
    },
    onLoad: function () {
        this.setSegHeight();
        this.initCategories();
    },
    async initCategories(){
        const categories = new Categories();
        this.data.categories = categories;
        await categories.getAll();
        const roots = categories.getRoots();
        const defaultRoot = this.getDefaultRoot(roots);
        const currentSubs = categories.getSubs(defaultRoot.id);
        this.setData({
            roots,
            currentSubs,
            currentBannerImg:defaultRoot.img
        })

    },
    getDefaultRoot(roots){
        let defaultRoot = roots.find(r => r.id === this.data.defaultRootId);
        if(!defaultRoot){
            defaultRoot = roots[0]
        }
        return defaultRoot;
    },
    async setSegHeight(){
        const systemSize = await getSystemInfo()
        const systemSizeRpx = px2rpx(systemSize.windowHeight)
        const height = systemSizeRpx - 82;
        this.setData({
            segHeight:height
        })
    },
    onGoToSearch(event) {
        wx.navigateTo({
            url: '../search/search',
            success() {
                console.log('跳转成功')
            }
        })
    },
    onSegChange(event){
        const categories = this.data.categories;
        const currentRootId = event.detail.activeKey;
        const currentSubs = categories.getSubs(currentRootId);
        const currentRoot = categories.getRoot(currentRootId);
        this.setData({
            currentSubs,
            currentBannerImg:currentRoot.img
        })
    },
    onJumpToSpuList(event){
        const cid = event.detail.cid;
        wx.navigateTo({
            url:`/pages/spu-list/index?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
        })
    }
});