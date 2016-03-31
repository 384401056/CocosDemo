//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
};

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer= new GameLayer();
        this.addChild(layer,0);
    }
});

