Page({

    /**
     * 页面的初始数据
     */
    data: {},
    onGoToSearch(event) {
        wx.navigateTo({
            url: '../search/search',
            success() {
                console.log('跳转成功')
            }
        })
    }
})