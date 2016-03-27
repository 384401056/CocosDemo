//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
};

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var gameLayer = new GameLayer();
        this.addChild(gameLayer,0);

        var gameUi= new GameUI();
        this.addChild(gameUi,1);
    }
});

