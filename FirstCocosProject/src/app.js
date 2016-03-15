var HelloWorldLayer = cc.Layer.extend({
    //HelloWorldLayer的属性
    sprite:null,
    //HelloWorldLayer的构造方法
    ctor:function () {
        //////////////////////////////
        // 1. super init first 初始化父类。
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size  获得屏幕大小
        //var size = cc.winSize; //同下
        var size = cc.director.getWinSize();


        //添加纯色背景。
        //var my_layer = new cc.LayerColor(cc.color(255.,186,0),size.width,size.height);
        //this.addChild(my_layer);
        var bg = new cc.Sprite(res.bg_png);
        //位置居中。
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);

        //var bgsize = bg.getContentSize();//获取背景图的大小
        //bgsize.getWidth();//再获取具体的长各宽。
        //bgsize.getHeight();

        var sp1 = new cc.Sprite(res.sp1_png);
        //位置对于bg居中。
        sp1.x = bg._getWidth()/2; //直接获取bg的长宽
        sp1.y =  bg._getHeight()/2;
        bg.addChild(sp1);


        var ball = new cc.Sprite(res.ball_png);
        bg.addChild(ball);


        ///////////////////////////////
        //// 3. add your codes below...
        //// add a label shows "Hello World"
        //// create and initialize a label
        //var helloLabel = new cc.LabelTTF("Hello Cocos2d-X", "Arial", 44);
        //// position the label on the center of the screen
        //helloLabel.x = size.width / 2;
        //helloLabel.y = size.height / 2 + 200;
        //// add the label as a child to this layer
        //this.addChild(helloLabel, 5);
        //
        //
        //// add "HelloWorld" splash screen"
        //this.sprite = new cc.Sprite(res.HelloWorld_png);
        //this.sprite.attr({
        //    x: size.width / 2,
        //    y: size.height / 2
        //});
        //this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene;
HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

