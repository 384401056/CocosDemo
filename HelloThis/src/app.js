//菜单与文字层。.
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



//动画层
var animationLayer = cc.Layer.extend({

    deltaX:2,
    ball:null,
    frame:0,
    bg:null,
    dotColor:null,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();



        this.ball = new cc.Sprite(res.ball_png);
        this.ball.x = 0;
        this.ball.y = size.width/2;
        this.addChild(this.ball,1);


        this.bg = new cc.DrawNode();//用于记录球的运动轨迹。
        this.addChild(this.bg,0);

        this.scheduleUpdate();//通知当前节点，在每帧重绘之前调用update函数。

        return true;
    },

    update: function(){

        var size = cc.director.getWinSize();

        //根据deltaX的正反方向来惊变颜色。
        if(this.deltaX>0){
            this.dotColor = new cc.color(255,204,0);
        }else{
            this.dotColor = new cc.color(51,153,255);
        }


        this.ball.x += this.deltaX;

        //如果ball超出屏幕,改变增量的方向。
        if(this.ball.x>=size.width || this.ball.x <=0){
            this.deltaX *= -1;    //对增量取反1变为-1，-1变为1.
        }

        this.ball.y = Math.sin(this.frame/20)*50+size.height/2;

        //drawDot画出点，参数为位置、点半径和颜色。
        this.bg.drawDot(new cc.Point(this.ball.x,this.ball.y),2, this.dotColor);

        this.frame++;
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new animationLayer();
        this.addChild(layer);
    }
});

