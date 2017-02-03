function Snake(){
    this._init();
    this._creatMap();
    this._drawSnake();
    this._moveSnake();
    this._eggFood();
    this._bindEvent();
}
Snake.prototype = {
    _init : function(){
        this.score = document.querySelector('.score');
        this.scoreNum = document.querySelector('.scoreNum');
        this.wall = document.querySelector('.wall');
        this.scoreNums = 0;//得分
        this.cols = 20;//列数
        this.rows = 9;//行数
        this.snakeLen = 3;//蛇的初始长度
        this.direction = "right";//默认方向为右边
        this.snakeBody = [];//存储蛇身体
        this.eggX = 0;//蛇胆的位置
        this.eggY = 0;
    },
    _boxTip : function(){//游戏结束时提示框
        var box = document.createElement("div");
        box.className = 'boxTip';
        box.innerHTML = "Game Over!";
        document.body.appendChild(box);
    },
    _creatMap : function(){//绘制地图
        this.snakeArray = [];
        for(var i=0;i<this.rows;i++){
            var rowDiv = document.createElement("ul");
            var rowArray = [];
            for(var j=0;j<this.cols;j++){
                var colDiv = document.createElement("li");
                colDiv.className = 'col';
                rowArray.push(colDiv);//列存入行数组
                rowDiv.appendChild(colDiv);//列存入行中
            }
            this.snakeArray.push(rowArray);
            this.wall.appendChild(rowDiv);//将行插入该DOM元素中
        }
    },
    _drawSnake : function(){//生成初始蛇
       for(var i=0;i<this.snakeLen;i++){
        this.snakeArray[0][i].className = 'col snake';
        this.snakeBody.push(this.snakeArray[0][i]);
       }
    },
    _moveSnake : function(){
        var _this = this;//这里的this是snake,而下面的this是window，作用域不同
        var x = 2,y = 0;//初始化蛇的位置
        var timer = setInterval(function(){
            switch(_this.direction) {
                case "right" ://往右大于列数时超出
                    x++;
                    break;
                case "left" :
                    x--;
                    break;
                case "up" :
                    y--;
                    break;
                case "down" :
                    y++;
                    break;
            }
            if(x < 0 || x > _this.cols-1 || y < 0 || y > _this.rows) {//判断超出范围
                _this._boxTip();
                clearInterval(timer);//清除定时器
                return;
            }
            for(var i=0;i<_this.snakeBody.length;i++){
                if(_this.snakeBody[i] == _this.snakeArray[y][x]){//判断蛇的身体是否与走动的位置重合
                    _this._boxTip();
                    clearInterval(timer);
                    return;
                }
            }
            if(_this.eggX == x && _this.eggY == y) {//判断蛇身是否与蛇胆重合
                _this.snakeArray[_this.eggY][_this.eggX].className = "col snake";//蛇胆变成蛇身,即吃了蛇胆
                _this.snakeBody.push(_this.snakeArray[_this.eggY][_this.eggX]);
                _this.scoreNums++;//吃到蛇胆加分数
                _this.scoreNum.innerHTML = _this.scoreNums;
                _this._eggFood();//重新生成蛇胆
            }else {
                _this.snakeBody[0].className = 'col';
                _this.snakeBody.shift();
                _this.snakeArray[y][x].className = 'col snake';
                _this.snakeBody.push(_this.snakeArray[y][x]);
            }
        }, 400);
    },
    _eggFood : function(){
        this.eggX = Math.floor(Math.random() * this.cols);//随机生成蛇胆
        this.eggY = Math.floor(Math.random() * this.rows);
        if(this.snakeArray[this.eggY][this.eggX].className == 'col snake'){
            this._eggFood();
        }else {
            this.snakeArray[this.eggY][this.eggX].className = 'col egg';
        }
    },
    _bindEvent : function(){
        var _this = this;
        window.onkeydown = function(event){
            event = event || window.event;
            if((_this.direction == 'right' && event.keyCode == "37") || (_this.direction == 'left' && event.keyCode == "39") || (_this.direction == 'up' && event.keyCode == "40") || (_this.direction == 'down' && event.keyCode == "38")) {return;}//判断目前走向是否与执行的方向自相矛盾
            switch(event.keyCode) {
                case 37 : //left
                    _this.direction = "left";
                    break;
                case 39 : //right
                    _this.direction = "right";
                    break;
                case 38 : //up
                    _this.direction = "up";
                    break;
                case 40 : //down
                    _this.direction = "down";
                    break;
            }
        }
    }
}