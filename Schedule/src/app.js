var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("定时器", "Arial", 20);
        helloLabel.x = 100;
        helloLabel.y = size.height-50 ;
        this.addChild(helloLabel, 1);
        return true;
    }
});

//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
}

//scheduleUpdate.每次帧刷新时
var ScheduleUpdateLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.scheduleUpdate();
        return true;
    },
    update: function () {

        //每次刷新帧时，执行的代码。

    }
} );

//scheduleOnce 定时器，功能是多长时后执行
// 两个参数，第一个是回调函数，第二个时单以秒为单位，
var scheduleOnceLayer = cc.Layer.extend({

    ctor: function(){
        this._super();

        //5秒后打印"tick",
        this.scheduleOnce(function(){
            trace("tick")
        },5);
        return true;
    }

});


//schedule 固定时间间隔内，不断触发。
var ScheduleLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        //2秒后，每间隔一秒打印一次"tick",总执行10次。
        //第一个参数是回调，第二个是多久执行一次，第三个是执行多少次，第四个是什么时候执行。
        this.schedule(function () {
            trace("tick")
        },2,10,5);
        return true;
    }
});

//取消定时器
var UnScheduleLayer = cc.Layer.extend({
    tickCount:0,
    ctor :function(){
        this._super();
        //无限循环，1秒执行一次trck()方法。
        this.schedule(this.tick,1,cc.REPEAT_FOREVER,5);
        return true;
    },

    tick:function (){
        trace("tick");
        this.tickCount++;
        //当执行5次已后，取消定时器。此时要传入设置定时器时的方法。
        if(this.tickCount>5){
            this.unschedule(this.tick);
            trace("UnSchedule.....");
        };
    }
});

//越来越慢的定时器
var InaccuracyTestLayer = cc.Layer.extend({
    ctor: function(){
        this._super();

        var startTime = new Date().getTime();
        var count = 0;
        this.schedule(function(){
            var timePass = new Date().getTime() -startTime;//当前时间减去开始时间。
            count++;
            var delta = timePass-(count*100);//误差时间。
            trace("time pass:"+timePass+"  totla dalta:"+delta+"  count:"+count);
        },0.1);
        return true;
    }
});

//不会变慢的定时器
var BetterScheduleLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        var startTime = Date.now();
        var count = 0;
        this.schedule2(function () {
            var timePass  = Date.now() - startTime;
            count++;
            var delta = timePass - (count*100);
            trace("time pass:",timePass,"  total delta:",delta,"  count:",count);
        },0.1);

        this.scheduleUpdate();

        return true;
    },

    schedule2:function(callback,interval){
        var then = Date.now();
        interval = interval*1000;
        this.schedule(function(){
            var now = Date.now();
            var delta = now - then;
            if(delta > interval){
                then = now - (delta % interval);
                callback.call(this);
            }
        }.bind(this),0)
    },

    update: function(){
        for(var i=0;i<10000000;i++){
            b= 1/0.222222;
        }
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer0 = new HelloWorldLayer();
        this.addChild(layer0);
        var layer = new BetterScheduleLayer();
        this.addChild(layer);
    }
});
