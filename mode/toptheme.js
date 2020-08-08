import {Http} from "../utils/HttpUtil";

//顶部专栏
class Toptheme {
    static locationA = "t-1";
    static locationB = "t-2";
    static locationC = "t-3";
    static locationD = "t-4";
    static locationE = "t-5";
    static locationF = "t-6";

    themes = [];

    async getThemes() {
        const name = `${Toptheme.locationA},${Toptheme.locationB},
        ${Toptheme.locationC},${Toptheme.locationD},${Toptheme.locationE}
        ${Toptheme.locationF}`;

        const data = await Http.request({
            url: 'v1/theme/by/names',
            data:{
                names: name
            }
        });
        this.themes = data.data;
    }

    getThemeA(){
        return this.themes.find(t => t.name === Toptheme.locationA);
    }

    getThemeB(){
        return this.themes.find(t => t.name === Toptheme.locationB);
    }

    getThemeD(){
        return this.themes.find(t => t.name === Toptheme.locationD)
    }

    //获取含有spu的专题
    static getThemeSpuByName(name){
        return Http.request({
            url:`v1/theme/name/${name}/with_spu`
        })
    }

    static getThemeSpuByEName(){
        return Toptheme.getThemeSpuByName(Toptheme.locationB)
    }

}

export {
    Toptheme
}