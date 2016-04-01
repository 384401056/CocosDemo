//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
}


//=======================SpriteSheet的载入======================
var SpriteFrameLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.cand_list);
        var bg = new cc.Sprite("#1.png");
        bg.x = size.width/2;
        bg.y= size.height/2;
        this.addChild(bg, 0);
        return true;
    }
});

//=====SpriteBatchNode的性能测试,不使用SpriteBatchNode.(帧频在10以下)=========
//超过10万不会崩溃。
var NotSpriteBatchNodeLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.cand_list);
        var size = cc.winSize;
        for(var i=0;i<100000;i++){
            var ball  = new cc.Sprite("#"+(parseInt(Math.random()*5)+1)+".png");
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
            ball.runAction(cc.rotateBy(1,360*Math.random(),360*Math.random()).repeatForever());
            this.addChild(ball,1);
        }
        return true;
    }
});

//===========SpriteBatchNode的性能测试,使用SpriteBatchNode.(帧频在25左右)==============
//但是图片超过10万，会崩溃。而且在andorid和ios 7以下的手机浏览器不支持WebGL
var SpriteBatchNodeLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.cand_list);
        var batchNode = new cc.SpriteBatchNode(res.cand_png);

        this.addChild(batchNode,0);

        var size = cc.winSize;
        for(var i=0;i<100000;i++){
            var ball  = new cc.Sprite("#"+(parseInt(Math.random()*5)+1)+".png");
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
            ball.runAction(cc.rotateBy(1,360*Math.random(),360*Math.random()).repeatForever());
            batchNode.addChild(ball,1);
        }
        return true;
    }
});



//========================使用缓存池的性能测试==========================
var UsePoolLayer = cc.Layer.extend({
    tag:0,
    deleteTag:0,
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.cand_list);
        deleteTag = tag = 0;
        this.scheduleUpdate();//帧定时器
        return true;
    },

    update:function(){
        var size = cc.winSize;
        //当新增的ball数量减去删除的ball数量大于500时
        if(this.tag-this.deleteTag >500){
            //向缓存池中加入250个不用的对象
            for(var i=0;i<250;i++){
                var ball = this.getChildByTag(this.deleteTag);//取得ball对象
                cc.pool.putInPool(ball);//将对象加入缓冲池.此时执行ReuseSprite的unuse方法.
                this.removeChild(ball);//从界面删除ball.
                this.deleteTag++;
                trace("DeleteTag:",deleteTag);
            }
        }
        var param = "anything";
        for(var i=0;i<250;i++){
            var ball = null;
            //判断缓存池中是否有ReuseSprite的存在.
            if(cc.pool.hasObject(ReuseSprite)){
                ball = cc.pool.getFromPool(ReuseSprite,param);//从池中取出,此时执行ReuseSprite的reuse方法.
            }else{
                ball = new ReuseSprite("#"+(parseInt(Math.random()*5)+1)+".png");//创建新的Sprite对象.
            }
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
            this.addChild(ball,1,this.tag);//添加Sprite至userPoolLayer.并增加tag标识.
            this.tag++;
            trace("Tag:",tag);
        }
    }
});


//新建一个用来回收的精灵类
var ReuseSprite = cc.Sprite.extend({

    ctor:function(url){
        this._super(url);
        return true;
    },
    //取出实例
    reuse:function(param){
        trace("reuse",param);
    },
    //放回实例
    unuse:function(){
        trace("unuse");
    }

});


//==============位图缓存测试(bake)====================
//需要修改project.json中renderMode为1，表示强制使用Canvas 2D渲染.
//本例中，开启bake()时只有4次的draw call,不开启则出现10000多次的draw call

var BakeLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(res.cand_list);

        var layer = new cc.Layer();
        this.addChild(layer);

        for(var i=0;i<10000;i++){
            var node = new cc.Sprite("#"+(parseInt(Math.random()*5)+1)+".png");
            node.x = Math.random()*size.width;
            node.y = Math.random()*size.height;
            layer.addChild(node);
        }
        layer.bake();//让layer层开启bake().

        return true;
    },

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BakeLayer();
        this.addChild(layer);
    }
});

