/**
 * Created by Administrator on 2016/3/26.
 * 游戏UI界面
 */

var GameUI = cc.Layer.extend({
    levelText:null,//等级
    scoreText:null,//分数
    stepText:null,//剩余步数
    gameLayer:null,
    ctor:function(){
        this._super();
        this.gameLayer = null;
        this._initInfoPanel();
        //this.scheduleUpdate();//每帧不断刷新.等级，分数和剩余步数。
        return true;
    },

    //update:function(){
    //  this.levelText.setString(""+(this.gameLayer.level+1));
    //  this.scoreText.setString(""+(this.gameLayer.score));
    //  this.stepText.setString(""+(this.gameLayer.limitStep - this.gameLayer.steps));
    //},

    //初始化信息栏
    _initInfoPanel:function(){
        var size = cc.director.getWinSize();

        var levelLabel = new cc.LabelTTF("等级","Arial",30);
        levelLabel.setColor(cc.color(255,120,0))
        levelLabel.x = 100;
        levelLabel.y = size.height-20;
        this.addChild(levelLabel);

        this.levelText = new cc.LabelTTF("0","Arial",30);
        this.levelText.setColor(cc.color(255,255,255));
        this.levelText.x = 100;
        this.levelText.y = size.height-60;
        this.addChild(this.levelText);

        //-----------------------------
        var scoreLabel = new cc.LabelTTF("分数", "Arial", 30);
        scoreLabel.setColor(cc.color(255,120,0));
        scoreLabel.x = 200;
        scoreLabel.y = size.height-20;
        this.addChild(scoreLabel);


        this.scoreText = new cc.LabelTTF("0", "Arial", 30);
        this.scoreText.setColor(cc.color(255,255,255));
        this.scoreText.x = 200;
        this.scoreText.y = size.height-60;
        this.addChild(this.scoreText);

        //------------------------------

        var stepLabel = new cc.LabelTTF("步数", "Arial", 30);
        stepLabel.setColor(cc.color(255,120,0));
        stepLabel.x = 300;
        stepLabel.y = size.height-20;
        this.addChild(stepLabel);


        this.stepText = new cc.LabelTTF("50", "Arial", 30);
        this.stepText.setColor(cc.color(255,255,255));
        this.stepText.x = 300;
        this.stepText.y = size.height-60;
        this.addChild(this.stepText);

    },

    showSuccess:function(){
        var bg = new cc.Layer.extend({
            ctor:function(){
                var size = cc.director.getWinSize();

                var window = new cc.Sprite(res.success);
                window.x = size.width/2;
                window.y = size.height/2;
                bg.addChild(window);

                var levelText = cc.LabelTTF("100","Arial",40);
                levelText.x = size/window/2 - 100;
                levelText.y = size/height/2 + 100;
                bg.addChild(levelText);

                var stepText = cc.LabelTTF("99","Arial",40);
                stepText.x = size/window/2 - 200;
                stepText.y = size/height/2 + 200;
                bg.addChild(stepText);
                return true;
            }
        });

        this.addChild(bg);

    },

    showFail:function(){
        var bg = new cc.Layer.extend({
            ctor:function(){
                var size = cc.director.getWinSize();

                var window = new cc.Sprite(res.fail);
                window.x = size.width/2;
                window.y = size.height/2;
                bg.addChild(window);
                return true;
            }
        });

    },


});

var GameLayer = cc.Layer.extend({


    ctor:function(){
        this._super();



        return true;
    }

});