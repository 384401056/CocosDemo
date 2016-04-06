//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
};


//=============逐帧动画加载SpriteSheet==========================
var AnimationLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var animation = new cc.Animation();
        var tree = new cc.Sprite();

        //导入SpriteSheet
        cc.spriteFrameCache.addSpriteFrames(res.tree_list);

        for(var i=1;i<6;i++){
            animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(i+".png"))//生成frame
        }
        animation.setDelayPerUnit(1/5);
        animation.setLoops(1);
        var action = cc.animate(animation);
        tree.x = size.width/2;
        tree.y = size.height/2;
        this.addChild(tree);
        tree.runAction(action);//重复播放
        return true;
    }

});

//==========================骨骼动画==================



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AnimationLayer();
        this.addChild(layer);
    }
});

