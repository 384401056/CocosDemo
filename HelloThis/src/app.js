//菜单与文字层。
var HelloWorldLayer = cc.Layer.extend({
    helloLabel:null,
    ctor:function() {
        this._super();
        var size = cc.director.getWinSize();

        //新建菜单项
        var closeItem = new cc.MenuItemImage(
            res.normal_png,
            res.selected_png,
            res.disabled_png,
            this.closeClicked, //要绑定的事件.
            this//事件的目标
        );

        closeItem.anchorX = 0.5;
        closeItem.anchorY = 0.5;

        //菜单项加入菜单
        var menu = new cc.Menu(closeItem);
        menu.x = size.width/2-300;
        menu.y = size.height/2+200;

        //菜单加入Layer
        this.addChild(menu,1);

        this.helloLabel = new cc.LabelTTF("HelloLable","Arial",38);
        this.helloLabel.x = size.width/2;
        this.helloLabel.y = size.height/2;
        this.addChild(this.helloLabel,5);

        return true;
    },

    //菜单项的点击事件.
    closeClicked: function(){
        this.removeChild(this.helloLabel);
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

