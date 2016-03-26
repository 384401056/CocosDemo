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
        spriteBG.y = size.height/2;
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
    textField:null,
    ctor:function(){
        this._super();

        var root = ccs.load(res.mainScene).node;
        this.addChild(root);



        //获取界面上的控件,Tag就是cocosStudio中的逻辑标签。
        var button = ccui.helper.seekWidgetByTag(root,4);
        var checkBox = ccui.helper.seekWidgetByName(root,"CheckBox_1");
        var slider = ccui.helper.seekWidgetByTag(root,7);
        this.textField = ccui.helper.seekWidgetByTag(root,8);


        //点击事件,只有一个参数就是callback,所以要用bind(this)
        //button.addClickEventListener(this.buttonClicked.bind(this));
        //触摸事件
        button.addTouchEventListener(this.buttonTouched,this);

        //选中事件
        checkBox.addEventListener(this.checkBoxSelected,this);

        slider.addTouchEventListener(this.sliderTouched,this);

        return true;
    },


    buttonClicked:function(sender){
        this.textField.setString("点击了按钮");
    },

    buttonTouched:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
                this.textField.setString("Touch Down");
                break;
            case ccui.Widget.TOUCH_MOVED:
                this.textField.setString("Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.textField.setString("Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.textField.setString("Touch Canceled");
                break;
        }
    },

    checkBoxSelected:function(sender,type){
        switch(type){
            //选中状态
            case ccui.CheckBox.EVENT_SELECTED:
                this.textField.setString("SELECTED");
                break;
            //非选中状态
            case ccui.CheckBox.EVENT_UNSELECTED:
                this.textField.setString("UNSELECTED");
                break;
        }
    },

    sliderTouched:function(sender,type){
        switch (type){
            case 2://ccui.Slider.EVENT_SLIDEBALL_UP
                //this.textField.setString("UP");
                this.textField.setString(sender.percent);
                break;
            case ccui.Slider.EVENT_PERCENT_CHANGED://0
                this.textField.setString(sender.percent);
                break;
        }
    }




});



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layerBG = new bgLayer();
        this.addChild(layerBG,0);

        var layer0 = new HelloWorldLayer();
        this.addChild(layer0,1);

        var layer1 = new CustomUILayer();
        this.addChild(layer1,2);

    }
});

