var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("事件监听", "Arial", 20);
        // position the label on the center of the screen
        helloLabel.x = 100;
        helloLabel.y = size.height-50 ;
        // add the label as a child to this layer
        this.addChild(helloLabel, 1);

        return true;
    }
});




//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
}

//鼠标事件监听层
var MouseEvenLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        //如果有鼠标
        if("mouse" in cc.sys.capabilities){

            //添加事件
            cc.eventManager.addListener({
                event:  cc.EventListener.MOUSE,//鼠标事件

                //当鼠标按下时
                onMouseDown: function (event){
                    var pos = event.getLocation();
                    var target = event.getCurrentTarget();
                    if(event.getButton()==cc.EventMouse.BUTTON_RIGHT){
                        trace("onRightMouseDown at: "+pos.x+" "+pos.y);
                        trace("target: "+target.getName());

                    }else if(event.getButton()==cc.EventMouse.BUTTON_LEFT){
                        trace("onLeftMouseDown at: "+pos.x+" "+pos.y);
                        trace("target: "+target.getName());
                        trace("Button:"+event.getButton());
                    }
                },
                //当鼠标移动时。
                onMouseMove: function(event){

                },
                onMouseUp: function(event){

                }
            },this);
        }else{
            trace("Mouse not supported");
        }
        return true;
    }
});

//单点触摸事件监听层。
var TouchOneByOneListener = cc.Layer.extend({
    ctor: function(){
        this._super();

        //判断是否支持触摸
        if("touches" in cc.sys.capabilities){
            //添加事件
            cc.eventManager.addListener({
                //事件类型为单点触摸
                event: cc.eventListener.TOUCH_ONE_BY_ONE,

                //触摸开始,有返回值,表示是否接受本次触摸事件。
                onTouchBegan:function(touch,event){

                    return false;
                },

                //触摸移动
                onTouchMoved:function(touch,event){

                },
                //触摸结束
                onTouchEnded:function(touch,event){

                },
                //触摸取消
                onTouchCancelled:function(touch,event){

                }

                },this);

        }else{
            trace("Touches not supported.");
        }

        return true;
    }
});

//多点触摸事件监听层。
var TouchAllAtOnce = cc.Layer.extend({

    ctor: function(){
        this._super();

        if("touches" in cc.sys.capabilities){

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,

                //触摸开始,无返回值，其中touches是一个touch数组。
                onTouchesBegan:function(touches,event){

                },

                //触摸移动
                onTouchesMoved:function(touches,event){

                },
                //触摸结束
                onTouchesEnded:function(touches,event){

                },
                //触摸取消
                onTouchesCancelled:function(touches,event){

                }

            },this);

        }else{
            trace("Touches not supported")
        }

        return true;
    }

});



//键盘事件监听层
var KeyboardEventListener = cc.Layer.extend({
    ctor: function () {
       this._super();
        if("keyboard" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,

                onKeyPressed:function(KeyCode,event){
                    //打印所按键盘的KeyCode.
                    trace("KeyCode:"+KeyCode);
                },
                onKeyReleased:function(KeyCode,event){

                }
            },this);
        }else{
            trace("Keyboard not supported.")
        }
        return true;
    }
});


//重力感应事件监听。
var ACLEventListener = cc.Layer.extend({

    ctor: function(){
        this._super();

        if("accelerometer" in cc.sys.capabilities){

        }else{
            trace("Accelerometer not supported.")
        }

        return true;
    }

});

//自定义事件(进入后台和恢复显示事件).
var showAndHideListener = cc.Layer.extend({
    ctor: function (){
        this._super();

        cc.eventManager.addCustomEventListener(cc.game.EVENT_HIDE,function(){

        });

        cc.eventManager.addCustomEventListener(cc.game.EVENT_SHOW,function(){

        });


        return true;
    }
});





var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new KeyboardEventListener();
        var layer0 = new HelloWorldLayer();
        this.addChild(layer0);
        this.addChild(layer);
    }
});

