//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
};

//======================视差滚动背景=====================
var ParallaxLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var bg = new cc.ParallaxNode();
        var bg1 = new cc.Sprite(res.bg1);
        var bg2 = new cc.Sprite(res.bg2);
        var bg3 = new cc.Sprite(res.bg3);
        var bg4 = new cc.Sprite(res.bg4);

        bg.addChild(bg1,1,cc.p(0.1,0),cc.p(bg1.width/2,bg1.height/2));
        bg.addChild(bg2,2,cc.p(0.3,0),cc.p(bg2.width/2,bg2.height/2));
        bg.addChild(bg3,3,cc.p(0.5,0),cc.p(bg3.width/2,bg3.height/2));
        bg.addChild(bg4,4,cc.p(1,0),cc.p(bg4.width/2,bg4.height/2));

        var action = cc.moveBy(2,-200,0);
        bg.runAction(cc.sequence(action,action.clone().reverse()).repeatForever());
        this.addChild(bg);

        return true;
    }
});

//=====================无穷视差滚动背景===================
var UnlimitedParallaxLayer = cc.Layer.extend({

    _bg1:null,
    _bg2:null,
    _bg3:null,
    _bg4:null,
    speed:3,
    ctor:function(){
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();

        var buildParallaxBackground = function(texture){
            var layer = new cc.Layer();
            var bg1 = new cc.Sprite(texture);
            bg1.x = bg1.width/2;
            bg1.y = bg1.height/2;
            layer.addChild(bg1);

            //加长一段背景.
            var bg2 = new cc.Sprite(texture);
            bg2.x = bg2.width/2+bg1.width;
            bg2.y = bg2.height/2;
            layer.addChild(bg2);

            return layer;
        };

        this._bg1 = buildParallaxBackground(res.bg1);
        this.addChild(this._bg1);

        this._bg2 = buildParallaxBackground(res.bg2);
        this.addChild(this._bg2);

        this._bg3 = buildParallaxBackground(res.bg3);
        this.addChild(this._bg3);

        this._bg4 = buildParallaxBackground(res.bg4);
        this.addChild(this._bg4);

        return true;
    },

    update:function(){

        this._bg1.x -= Math.ceil(this.speed*0.1);//Math.ceil()向上取整

        //当图片移动出屏幕时，让图片回到0的位置
        if(this._bg1.x <-1024)//1024为bg1图片的宽度
            this._bg1.x = 0;

        this._bg2.x -= Math.ceil(this.speed*0.5);
        if(this._bg2.x<-1024)
            this._bg2.x = 0;

        this._bg3.x -= Math.ceil(this.speed*1);
        if(this._bg3.x<-1024)
            this._bg3.x = 0;

        this._bg4.x -= Math.ceil(this.speed*1.5);
        if(this._bg4.x<-1024)
            this._bg4.x = 0;
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new UnlimitedParallaxLayer();
        this.addChild(layer);
    }
});

