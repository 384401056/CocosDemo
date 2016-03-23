//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
}


var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("游戏界面", "Arial", 20);
        helloLabel.x = 100;
        helloLabel.y = size.height-50 ;
        this.addChild(helloLabel, 1);
        return true;
    }
});

var bgLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var spriteBG = new cc.Sprite(res.HelloWorld_png);
        spriteBG.x = size.width/2;
        spriteBG.y = size.height-120;
        this.addChild(spriteBG);
        return true;
    }

});

//菜单层图片按钮
var MenuItemSpriteLayer = cc.Layer.extend({
    menuSprite:null,
    ctor: function(){
        this._super();

        //var spriteNor = new cc.Sprite(res.start_normal);
        //var spritePress = new cc.Sprite(res.start_press);
        //var spriteDis= new cc.Sprite(res.start_dis);
        //this.menuSprite = new cc.MenuItemSprite(spriteNor,spritePress,spriteDis,this.startGame,this);

        //同上
        var menuImage = new cc.MenuItemImage(res.start_normal,res.start_press,res.start_dis,this.startGame,this);

        var menu = new cc.Menu(menuImage);

        this.addChild(menu,1);

        return true;
    },

    startGame:function(){
        trace("Game Start!!")
        //this.menuSprite.setEnabled(false);//禁用按钮。
    }

});

//菜单层，文字按钮
var MenuItemFontLayer = cc.Layer.extend({
    ctor: function(){
        this._super();

        var menuFont = new cc.MenuItemFont("Font Button",function(){
            trace("我被点击了...");
        },this);

        menuFont.fontName = "Arial";
        menuFont.fontSize = 40;

        var menu = new cc.Menu(menuFont);

        this.addChild(menu,1);

        return true;
    }
});

//菜单层，位图文字
var MenuItemLabel = cc.Layer.extend({
    ctor: function(){
        this._super();

        var lable = new cc.LabelTTF("Start Game","Arial",32);
        //var lable = new cc.labelBMFont("Start Game","res/font.fnt");
        var menuLable = new cc.MenuItemLabel(lable,function() {
            trace("我被点击了...");
        },this);

        var menu = new cc.Menu(menuLable);
        this.addChild(menu,1);

        return true;
    }
});

//开关按钮及切换按钮。
var MenuItemToggleLayer = cc.Layer.extend({
    musicOff:false,
    ctor:function(){
        this._super();

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(32);
        //var off  = new cc.MenuItemFont("Off");
        //var on  = new cc.MenuItemFont("On");
        //
        //var item = new cc.MenuItemToggle(off,on,function(){
        //    if(!this.musicOff){
        //        trace("Musicis On")
        //        this.musicOff = true;
        //    }else{
        //        trace("Musicis Off")
        //        this.musicOff = false;
        //    }
        //},this);

        var easy = new cc.MenuItemFont("Easy");
        var normal = new cc.MenuItemFont("Normal");
        var hard = new cc.MenuItemFont("Hard");

        var item = new cc.MenuItemToggle(easy,normal,hard,function(){
            var index = item.getSelectedIndex();//选中的按钮序号。
            trace("index=",index);
        },this);

        var menu = new cc.Menu(item);
        this.addChild(menu,1);

        return true;
    }

});


//从Cocos Studio导入UI
var CustomUILayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var root = new ccs.uiReader.widgetFromJsonFile(res.MainScene);
        this.addChild(root);
        return true;
    }
});



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layerBG = new bgLayer();
        this.addChild(layerBG);

        var layer0 = new HelloWorldLayer();
        this.addChild(layer0);

        var layer = new CustomUILayer();
        this.addChild(layer);

    }
});

