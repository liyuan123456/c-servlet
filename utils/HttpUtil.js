import {config} from "../config/config";

class Http{
    static request({url,method='GET',data,callback}){
        wx.request({
            url:`${config.basePath}${url}`,
            data,
            method,
            header:{
                appkey:config.appkey
            },
            success: res => {
                callback(res.data[0])
            }
        });
    }
}

export{
    Http
}
