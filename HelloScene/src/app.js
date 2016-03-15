
var size = cc.director.getWinSize();

//纯色背景。
//var HelloWorldLayer = new  cc.LayerColor(cc.color(255,180,0),size.width,size.height);

//背景层
var HelloWorldLayer =  cc.Layer.extend({
    sprite:null,
    ctor:function(){
        this._super();
        this.sprite = new cc.Sprite(res.bg1);
        this.sprite.x = size.width/2;
        this.sprite.y = size.height/2;
        this.addChild(this.sprite, 0);
    }

});

//人物层
var SpLayer =  cc.Layer.extend({
    bg:null,
    sp1:null,
    sp2:null,
    sp3:null,
    ctor:function(){
        this._super();

        bg = new cc.Sprite(res.bg2);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg,0);

        sp1 = new cc.Sprite(res.sp1);
        sp1.x = size.width/2-150;
        sp1.y = size.height/2;
        this.addChild(sp1,1);

        sp2 = new cc.Sprite(res.sp2);
        sp2.x = size.width/2;
        sp2.y = size.height/2;
        this.addChild(sp2,1);

//自定义精灵类
        var mySprite  = cc.Sprite.extend({
            //成员变量
            life:100,
            //构造方法
            ctor: function(imageURL){
                this._super(imageURL);
                this.life = 100;
            },
            //方法
            onHit: function(){
                this.life -= 10;
            }
        });

        sp3 = new mySprite(res.sp3);
        sp3.x = size.width/2+150;
        sp3.y = size.height/2-50;
        this.addChild(sp3,1);
    }
});



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var bgLayer = new HelloWorldLayer();
        this.addChild(bgLayer);
    }
});



var  SecondScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer1 = new SpLayer();
        this.addChild(layer1);
    }

});

