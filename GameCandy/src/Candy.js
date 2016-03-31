/**
 * Created by Administrator on 2016/3/26.
 *
 * 糖果元素的封装
 */

var Candy = cc.Sprite.extend({
    type:0,
    column:0,
    row:0,
    ctor:function(type,column,row){
        this._super("res/candy/"+(type+1)+".png");
        this.init(type,column,row);
        return true;
    },

    init:function(type,column,row){
        this.type = type;
        this.column = column;
        this.row = row;
    }

});

//根据定义的常量，创建随机颜色的糖果
Candy.createRandomType = function(column,row){
    return new Candy(parseInt(Math.random()*Constant.CANDY_TYPE_COUNT),column,row);
};