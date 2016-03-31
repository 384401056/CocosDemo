/**
 * Created by Administrator on 2016/3/26.
 * 游戏UI界面
 */
//打印函数.
var trace = function(){
    cc.log(Array.prototype.join.call(arguments,","));
}


var GameUI = cc.Layer.extend({
    levelText:null,//等级
    scoreText:null,//分数
    stepText:null,//剩余步数
    gameLayer:null,
    ctor:function(gameLayer){
        this._super();
        this.gameLayer = gameLayer;
        this._initInfoPanel();
        this.scheduleUpdate();//每帧不断刷新.等级，分数和剩余步数。
        return true;
    },

    update:function(){
      this.levelText.setString(""+(this.gameLayer.level+1));
      this.scoreText.setString(""+(this.gameLayer.score));
      this.stepText.setString(""+(this.gameLayer.limitStep - this.gameLayer.steps));
    },

    //初始化信息栏
    _initInfoPanel:function(){
        var size = cc.director.getWinSize();
        var levelLabel = new cc.LabelTTF("等级","Arial",30);
        levelLabel.setColor(cc.color(106,14,184))
        levelLabel.x = 100;
        levelLabel.y = size.height-40;
        this.addChild(levelLabel);

        this.levelText = new cc.LabelTTF(Storage.getCurrentLevel(),"Arial",30);
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


        this.scoreText = new cc.LabelTTF(Storage.getCurrentScore(), "Arial", 30);
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


        this.stepText = new cc.LabelTTF(Constant.LEVELS[0].limitStep, "Arial", 30);
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

        var successLevel =new cc.LabelTTF(""+(this.gameLayer.level+1),"Arial",35);
        successLevel.setColor(cc.color(255,120,0));
        successLevel.x = window.height/2-15;
        successLevel.y = window.height/2+78;
        window.addChild(successLevel);

        var successStepText =new cc.LabelTTF("剩余步数:","Arial",30);
        successStepText.x = window.width/2-50;
        successStepText.y = window.height/2-100;
        window.addChild(successStepText);


        var successStep =new cc.LabelTTF(""+(this.gameLayer.limitStep - this.gameLayer.steps),"Arial",30);
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
    mapPanel:null,//糖果界面
    ui:null,//GameUIl
    map:null,//保存糖果的数组
    moving:false,//判断当前是否处于消除的状态
    level:0,
    score:0,
    steps:0,
    limitStep:0,
    targetScore:0,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        //=================背景图====================
        var bg = new cc.Sprite(res.bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg,1);


        //=================遮罩节点====================
        var clippingPanel = new cc.ClippingNode();
        this.addChild(clippingPanel,2);

        //糖果层，位置为糖果界面。Layer的锚点在左上角。
        this.mapPanel = new cc.Layer();
        this.mapPanel.x =(size.width-Constant.CANDY_WIDTH*Constant.MAP_SIZE)/2;
        this.mapPanel.y =(size.height-Constant.CANDY_HEIGHT*Constant.MAP_SIZE)/2;
        clippingPanel.addChild(this.mapPanel,1);
        //绘制一个正方形
        var stencil = new cc.DrawNode();
        //前两个参数是点，后三个分别为：填充色、线宽，线色。
        stencil.drawRect(cc.p(this.mapPanel.x,this.mapPanel.y),
            cc.p(this.mapPanel.x+Constant.CANDY_WIDTH*Constant.MAP_SIZE,this.mapPanel.y+Constant.CANDY_HEIGHT*Constant.MAP_SIZE),
            cc.color(0,0,0),1,cc.color(0,0,0));
        clippingPanel.stencil = stencil;

        this._init();
        return true;
    },

    _init:function(){
        this.steps = 0;
        this.level=Storage.getCurrentLevel();
        this.score=Storage.getCurrentScore();
        this.limitStep= Constant.LEVELS[this.level].limitStep;//从常量文件中取得的值.
        this.targetScore=Constant.LEVELS[this.level].targetScore;
        this.map = [];

        //行
        for(var i = 0;i<Constant.MAP_SIZE;i++){
            var colum = [];//例数组
            //例
            for(var j = 0;j<Constant.MAP_SIZE;j++){
                var candy = Candy.createRandomType(i,j);
                //设置糖果的位置，Sprite的锚点在中心。
                candy.x = (i*Constant.CANDY_WIDTH+Constant.CANDY_WIDTH/2);
                candy.y = (j*Constant.CANDY_WIDTH+Constant.CANDY_HEIGHT/2);
                this.mapPanel.addChild(candy);
                colum.push(candy);
            }
           this.map.push(colum);
        }
        this.ui = new GameUI(this);//创建GameUI,并将自身对象传入.
        this.addChild(this.ui,3);

        //mapPanel的触摸或点击事件监听
        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan:this._onTouchBegan.bind(this)
            },this.mapPanel);
        }else{
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:this._onMouseDown.bind(this)
            },this.mapPanel);
        }
    },

    //触摸事件有touche和event参数.
    _onTouchBegan:function(touche,event){
        var column = Math.floor((touche.getLocation().x - this.mapPanel.x)/Constant.CANDY_WIDTH);
        var row = Math.floor((touche.getLocation().y-this.mapPanel.y)/Constant.CANDY_HEIGHT);
        this._popCandy(column,row);
        return true;
    },

    //点击事件只有event参数。
    _onMouseDown:function(event){
        var column = Math.floor((event.getLocationX() - this.mapPanel.x)/Constant.CANDY_WIDTH);
        var row = Math.floor((event.getLocationY()-this.mapPanel.y)/Constant.CANDY_HEIGHT);
        this._popCandy(column,row);
        return true;
    },

    /**
     * 消除糖果的判断逻辑。
     * @param column 例
     * @param row 行
     * @private
     */
    _popCandy:function(column,row){
        if(this.moving)
            return;

        if(this.map[column][row]==null){
            return;
        }else{
            //通过行例号，得到当前点击的Candy对象,并加入joinCandy数组中.
            var joinCandys = [this.map[column][row]];
        }

        var index = 0;

        //添加Candy的方法.
        var pushIntoCandys = function(element){
            //如果element不在joinCandys数组中,则加入joinCandys.
            if(joinCandys.indexOf(element)<0)
                joinCandys.push(element);
        };

        while(index<joinCandys.length) {
            //获取joinCandys中的糖果对象，并判断其上下左右的糖果是否为相同颜色。
            var candy = joinCandys[index];

            //左边的糖果是否存在，并且与点击的糖果为相同颜色.
            if (this._checkCandyExist(candy.column - 1, candy.row)) {
                trace("左边存在");
                if (this.map[candy.column - 1][candy.row].type == candy.type) {
                    console.log("颜色相同");
                    pushIntoCandys(this.map[candy.column - 1][candy.row]);
                } else {
                    console.log("颜色不同.");
                }
            }else{
                trace("左边不存在");
            }

            //右
            if (this._checkCandyExist(candy.column + 1, candy.row)) {
                trace("右边存在");
                if (this.map[candy.column + 1][candy.row].type == candy.type) {
                    console.log("颜色相同");
                    pushIntoCandys(this.map[candy.column + 1][candy.row]);
                } else {
                    console.log("颜色不同.");
                }
            }else{
                trace("右边不存在");
            }

            //下
            if (this._checkCandyExist(candy.column, candy.row - 1)){
                trace("下边存在");
                if(this.map[candy.column][(candy.row - 1)].type == candy.type){
                    console.log("颜色相同");
                    pushIntoCandys(this.map[candy.column][candy.row-1]);
                }else {
                    console.log("颜色不同.");
                }
            }else{
                trace("下边不存在");
            }

            //上
            if(this._checkCandyExist(candy.column,candy.row+1)){
                trace("上边存在");
                if(this.map[candy.column][candy.row+1].type == candy.type){
                    console.log("颜色相同");
                    pushIntoCandys(this.map[candy.column][candy.row+1]);
                }else {
                    console.log("颜色不同.");
                }
            }else{
                trace("上边不存在");
            }

            index++;
            trace("=========="+joinCandys.length+"===============")
        }

        //如果没有点击到相同色彩的点
        if(joinCandys.length<=1){
            return;
        }else{
            this.steps++;//可用步骤加1
            this.moving = true;//正在消除

            for(var i= 0;i<joinCandys.length;i++){
                var candy = joinCandys[i];
                this.mapPanel.removeChild(candy);
                this.map[candy.column][candy.row] = null;
            }

            this.score += joinCandys.length*joinCandys.length;//计算分数.
            this._generateNewCandy();//生成新的糖果.
            this._checkSucceedOrFail();//检查游戏是否结束。
        }
    },

    /**
     * 补充糖果
     * @private
     */
    _generateNewCandy:function(){

        var maxTime = 0;//定时器scheduleOnce的执行时间。
        for(var i=0;i<Constant.MAP_SIZE;i++){
            var missCount = 0;
            for(var j=0;j<this.map[i].length;j++){
                var candy = this.map[i][j];
                //如果糖果为null
                if(!candy){
                    var newCandy = Candy.createRandomType(i,Constant.MAP_SIZE+missCount);
                    newCandy.x = newCandy.column*Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                    newCandy.y = newCandy.row*Constant.CANDY_HEIGHT + Constant.CANDY_HEIGHT/2;
                    this.mapPanel.addChild(newCandy);
                    this.map[i][newCandy.row] = newCandy;
                    missCount++;
                    trace("missCount:",missCount);
                }else{
                    var fallLength = missCount;
                    if(fallLength>0){
                        //下落时间的设定。
                        var duration = Math.sqrt(2*fallLength/Constant.FALL_ACCELERATION);
                        if(duration > maxTime){
                            maxTime = duration;
                        }
                        //从糖果原来的位置移动到下几行。easeIn()设定速率
                        var move  = cc.moveTo(duration,candy.x,candy.y-Constant.CANDY_WIDTH*fallLength).easing(cc.easeIn(2));
                        candy.runAction(move);
                        candy.row -= fallLength;//重新对candy的row进行赋值。

                        this.map[i][j] = null;
                        this.map[i][candy.row] = candy;//下落完的candy加入map.
                    }
                }
            }

            //移除超出地图的临时元素。
            for(var j= this.map[i].length;j>=Constant.MAP_SIZE;j--){
                this.map[i].splice(j,i);
            }
        }

        this.scheduleOnce(this._finishCandyFalls.bind(this),maxTime);
    },

    /**
     * 检查游戏是否结束.
     * @private
     */
    _checkSucceedOrFail:function(){
        this.moving = true;
        if(this.score > this.targetScore){
            this.ui.showSuccess(); //显示胜利界面.
            this.score += (this.limitStep-this.steps)*30; //剩余步数可以加倍得分。
            //保存游戏数据
            Storage.setCurrentLevel(this.level+1);
            Storage.setCurrentScore(0);

            this.scheduleOnce(function () {
               cc.director.runScene(new GameScene()); //重新载入游戏界面.
            },3);

        }else if(this.steps >= this.limitStep){
            this.ui.showFail(); //显示失败界面.
            //保存游戏数据
            Storage.setCurrentLevel(0);
            Storage.setCurrentScore(0);
            this.scheduleOnce(function () {
                cc.director.runScene(new GameScene()); //重新载入游戏界面.
            },3);
        }
        this.moving = false;
    },

    /**
     * 完成candy的下落。
     * @private
     */
    _finishCandyFalls:function(){
        this.moving = false;
    },

    /**
     * 检查糖果是否存在.
     * @private
     */
    _checkCandyExist:function(column,row) {
        try {
            var candy = this.map[column][row];
            if (candy != null) {
                return 1;
             }
        } catch (e) {
            return 0;
        }
    }
});


















