import {Http} from "../utils/HttpUtil";

class Toptheme {
    static getHomeTopThemeOne(callback) {
        Http.request(
            {
                url: "v1/theme/by/names",
                data: {
                    names: "t-1"
                },
                callback: data => {
                    callback(data)
                }

            }
        );
    }
}

export {
    Toptheme
}