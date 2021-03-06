var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("动画效果", "Arial", 20);
        // position the label on the center of the screen
        helloLabel.x = 100;
        helloLabel.y = size.height-50 ;
        // add the label as a child to this layer
        this.addChild(helloLabel, 1);

        return true;
    }
});


//动画层01--逐帧变化
var animationLayer_01 = cc.Layer.extend({
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


//动画层02 - 移动(即定动作)
var animationLayer_02  =  cc.Layer.extend({

    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball);

        //10秒内让小球移动到指定坐标点。
        //var action = new cc.moveTo(10, cc.p(size.width,size.height/2));
        //10秒内让小球x轴变为size.width,y轴不变化。
        var action = new cc.moveBy(10, cc.p(size.width,0));
        ball.runAction(action);

        return true;
    }
});

//动画03--缩放
var animationLayer_03 = cc.Layer.extend({

    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = size.width/2;
        ball.y = size.height/2;
        this.addChild(ball);

        //缩放动画,x,y同时放大2倍。
        var action = new cc.scaleTo(5,2,2);
        ball.runAction(action);

        return true;
    }

});

//动画04 淡入淡出
var animationLayer_04 = cc.Layer.extend({

    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = size.width/2;
        ball.y = size.height/2;
        this.addChild(ball);

       //3秒内透明度变为0.
       // var action = new cc.fadeTo(3,0);

        //3秒内淡出
        //var action = new cc.fadeOut(3);

        //3秒内淡入
        ball.opacity = 0;
        var action = new cc.fadeIn(3);

        ball.runAction(action);
        return true;
    }
});

//动画05，闪烁。
var animationLayer_05 = cc.Layer.extend({

    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = size.width/2;
        ball.y = size.height/2;
        this.addChild(ball);

        //2秒内闪烁10次。
        var action = new cc.blink(10,100);
        ball.runAction(action);
        return true;
    }

});

//动画06，变色。
var animationLayer_06 = cc.Layer.extend({

    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = size.width/2;
        ball.y = size.height/2;
        this.addChild(ball);

        //2秒内变颜色。
        var action = new cc.tintTo(2,0,255,0);
        ball.runAction(action);
        return true;

    }
});

//组合动画01
var cmposeAction_01 = cc.Layer.extend({

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = size.width/2;
        ball.y = size.height/2;
        this.addChild(ball);

        var action01 = new cc.tintTo(0.3,100,0,0);
        var action02 = new cc.tintTo(0.3,255,255,255);
        ball.runAction(cc.sequence(action01,action02));
        return true;
    }


});

//组合动画02
var composeAction_02 = cc.Layer.extend({
    ctor: function(){
        this._super();
        var size = cc.director.getWinSize();

        var ball  = new cc.Sprite(res.ball_png);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball);


        var actionMove1 = new cc.moveBy(1,cc.p(size.width/2,0));
        var actionScale1 = new cc.scaleTo(1,2,2);
        var actionScale2 = new cc.scaleTo(1,1,1);
        var actionMove2 = new cc.moveBy(1,cc.p(-(size.width/2),0));
        var sequenceAction = new cc.sequence(actionMove1,actionScale1,actionScale2,actionMove2);

        //定义动画重复执行。
        var repeatAction = cc.repeat(sequenceAction,3);

        //ball.runAction(sequenceAction);
        ball.runAction(repeatAction);

        return true;
    }

});







var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
<<<<<<< HEAD
        var layer = new composeAction_02();
=======
        var layer = new animationLayer_05();
        var layer0 = new HelloWorldLayer();
        this.addChild(layer0);
>>>>>>> afb39cda95739036522c55f0bdbb303a44cd8192
        this.addChild(layer);
    }
});

