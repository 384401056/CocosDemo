/**
 * Created by Administrator on 2016/3/26.
 *
 * 糖果元素的封装
 */

var Candy = cc.Sprite.extend({
    type:0,
    colum:0,
    row:0,
    ctor:function(type,colum,row){
        this._super("res/candy/"+(type+1)+".png");
        this.init(type,colum,row);
        return true;
    },

    init:function(type,colum,row){
        this.type = type;
        this.colum = colum;
        this.row = row;
    },

});

//根据定义的常量，创建随机颜色的糖果
Candy.createRandomType = function(colum,row){
    return new Candy(parseInt(Math.random()*Constant.CANDY_TYPE_COUNT),colum,row);
};