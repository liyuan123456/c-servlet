import {Http} from "../utils/HttpUtil";

class Activity {
    static locationActivityData = "a-2";

    static async getLocationActivity() {
        const value = await Http.request({
            url: `v1/activity/name/${Activity.locationActivityData}`
        })
        return value.data.entrance_img;
    }
}

export {Activity}