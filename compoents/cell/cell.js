
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        x:Number,
        y:Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(){
            this.triggerEvent('celltap',{
                cell:this.properties.cell,
                x:this.properties.x,
                y:this.properties.y
            },{
                bubbles:true,
                composed:true
            })
        }
    }
});
