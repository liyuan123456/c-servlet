

import {Toptheme} from "../../mode/toptheme";

Page({

  /**
   * 页面的初始数据
   */
  data: {
        topTheme:null
  },
  onLoad: function (options) {
      Toptheme.getHomeTopThemeOne(data => {
          this.setData({topTheme: data});
      });
  }

})