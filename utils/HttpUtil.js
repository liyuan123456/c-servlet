import {config} from "../config/config";
import {promisic} from "./Util";

class Http {
    static async request({url, method = 'GET', data}) {
        return await promisic(wx.request)({
            url: `${config.basePath}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            }
        });
    }
}

export {
    Http
}
