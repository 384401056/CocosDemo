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
        levelLabel.setColor(cc.color(106,14,184))
        levelLabel.x = 100;
        levelLabel.y = size.height-40;
        this.addChild(levelLabel);

        this.levelText = new cc.LabelTTF("0","Arial",30);
        this.levelText.setColor(cc.color(0,0,0));
        this.levelText.x = 100;
        this.levelText.y = size.height-80;
        this.addChild(this.levelText);

        //-----------------------------
        var scoreLabel = new cc.LabelTTF("分数", "Arial", 30);
        scoreLabel.setColor(cc.color(106,14,184));
        scoreLabel.x = 200;
        scoreLabel.y = size.height-40;
        this.addChild(scoreLabel);


        this.scoreText = new cc.LabelTTF("0", "Arial", 30);
        this.scoreText.setColor(cc.color(0,0,0));
        this.scoreText.x = 200;
        this.scoreText.y = size.height-80;
        this.addChild(this.scoreText);

        //------------------------------

        var stepLabel = new cc.LabelTTF("步数", "Arial", 30);
        stepLabel.setColor(cc.color(106,14,184));
        stepLabel.x = 300;
        stepLabel.y = size.height-40;
        this.addChild(stepLabel);


        this.stepText = new cc.LabelTTF("50", "Arial", 30);
        this.stepText.setColor(cc.color(0,0,0));
        this.stepText.x = 300;
        this.stepText.y = size.height-80;
        this.addChild(this.stepText);

    },

    showSuccess:function(){
        var size = cc.director.getWinSize();

        var window = new cc.Sprite(res.success_png);
        window.x = size.width/2;
        window.y = size.height/2+50;
        this.addChild(window);

        var successLevel =new cc.LabelTTF("10","Arial",35);
        successLevel.setColor(cc.color(255,120,0));
        successLevel.x = window.height/2-15;
        successLevel.y = window.height/2+78;
        window.addChild(successLevel);

        var successStepText =new cc.LabelTTF("剩余步数:","Arial",30);
        successStepText.x = window.width/2-50;
        successStepText.y = window.height/2-100;
        window.addChild(successStepText);


        var successStep =new cc.LabelTTF("50","Arial",30);
        successStep.x = window.width/2+50;
        successStep.y = window.height/2-100;
        window.addChild(successStep);
    },

    showFail:function(){
        var size = cc.director.getWinSize();

        var window = new cc.Sprite(res.fail_png);
        window.x = size.width/2;
        window.y = size.height/2+50;
        this.addChild(window);
    }


});

var GameLayer = cc.Layer.extend({
    candyPanel:null,
    uiPanel:null,

    level:0,
    score:0,
    steps:0,
    limitStep:0,
    targetScore:0,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);
        return true;
    }

});



















