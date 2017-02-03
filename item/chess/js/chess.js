var chess = document.getElementById("chess");
var context = chess.getContext("2d");
context.strokeStyle = "#4d3128";
var img = new Image();
img.src = "bg.png";
img.onload = function(){
    context.drawImage(img, 0, 0, 600, 600 , 0, 0, 600, 600);
    drawChess();
}
function drawChess(){//绘制棋格子
    for(var i=0;i<19;i++){
        context.moveTo(30+i*30, 30);//纵向
        context.lineTo(30+i*30, 570);
        context.stroke();
        context.moveTo(30, 30+i*30);//横向
        context.lineTo(570, 30+i*30);
        context.stroke();
    }
}
var chessArry = [];//记住棋盘状态
for(var i=0;i<19;i++){
    chessArry[i] = [];
    for(var j=0;j<19;j++){
        chessArry[i][j] = 0;
    }
}
var wins = [];//创建赢法规则，记录每一种赢法
var count = 0;//统计赢法的索引，初始化为0
function winMethod(){//创建赢法的规则：横线、竖线、正斜线、反斜线
    for(var i = 0;i < 19;i++){//建立一个空的赢法规则,相当于创建了一个棋盘的格子
        wins[i] = [];
        for(var j = 0;j < 19;j++){
            wins[i][j] = [];
        }
    }
    for(var i = 0;i < 19;i++){//横线赢法
        for(var j = 0;j < 15;j++){
            for(var r = 0;r < 5;r++){
                wins[i][j+r][count] = true;//初始化为true，如果为false则已经存在
            }
            count++;
        }
    }
    for(var i = 0;i < 19;i++){//竖线赢法
        for(var j = 0;j < 15;j++){
            for(var r = 0;r < 5;r++){
                wins[j+r][i][count] = true;//初始化为true
            }
            count++;
        }
    }
    for(var i = 0;i < 15;i++){//正斜线赢法
        for(var j = 0;j < 15;j++){
            for(var r = 0;r < 5;r++){
                wins[i+r][j+r][count] = true;//初始化为true
            }
            count++;
        }
    }
    for(var i = 0;i < 15;i++){//反斜线赢法
        for(var j = 18;j > 3;j--){
            for(var r = 0;r < 5;r++){
                wins[i+r][j-r][count] = true;//初始化为true
            }
            count++;
        }
    }
}
winMethod();
var myWin = [];//需要知道自己的赢法有哪些了
var computerWin = [];//统计电脑当前的赢法
for(var  i = 0;i < count;i++){
    myWin[i] = 0;//默认为0，当不为0那么就是已经存在
    computerWin[i] = 0;
}
var myWin = [];//需要知道自己的赢法有哪些了
var computerWin = [];//统计电脑当前的赢法
for(var  i = 0;i < count;i++){
    myWin[i] = 0;//默认为0，当不为0那么就是已经存在
    computerWin[i] = 0;
}
function chessStyle(x,y,bool){//棋子样式
    context.beginPath();
    context.arc(30+30*x, 30+30*y, 15, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(30+x*30+2, 30+y*30-2, 15, 30+x*30+2,30+y*30-2,0);
    if(bool){
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    }else{
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
}
var flag = true;
var over = true;
chess.onclick = function(e){//点击生成棋子
    if(!over){
        tipBox("游戏结束",false);
        return;
    }
    var x = Math.floor((e.offsetX-15)/30);
    var y = Math.floor((e.offsetY-15)/30);
    if(chessArry[x][y] == 0){
        chessStyle(x,y,true); //黑棋
        chessArry[x][y] =1;
        for(var i = 0;i < count;i++){
            if(wins[x][y][i]){//没有占用当前赢法
                myWin[i]++;//让自己的赢法加1
                //当一种赢法统计了5次，就算赢
                computerWin[i] == 6;
                if(myWin[i] == 5){
                    tipBox("您赢了",false);
                    break;
                }
            }
        }
    }else {
        tipBox("此处已不能下棋子",true);
        return;
    }
    computerWalk();
}
function tipBox(inner,isShow){//游戏结束时提示框
    var wrap = document.createElement("div");
    wrap.className = 'boxTip';
    wrap.innerHTML = inner;
    document.body.appendChild(wrap);
    if(isShow){
        setTimeout(function(){
            document.body.removeChild(wrap);
        }, 1200);
    }
}
function computerWalk(){//权衡对自己有利的位置
    var max = 0;//确定一个权衡值最大的
    var u = 0,v = 0;//获取坐标
    var myScore = [];//我的积分
    var computerScore = [];//电脑的积分
    for(var i = 0;i < 15;i++){//保存棋盘，用于积分
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0;j < 15;j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(var i = 0;i < 15;i++){
        for(var j = 0;j < 15;j++){
            if(chessArry[i][j] == 0){//判断当前没有落子
                for(var k = 0;k < count;k++){//判断赢法
                    if(wins[i][j][k]){//是true和false
                        /*
                            判断赢法的利弊
                            这里是对当前人的赢法计算
                        */
                        if(myWin[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 10000;
                        }
                        
                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 420;
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] += 2200;
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    chessStyle(u,v,false);//对棋盘落子
    chessArry[u][v] = 2;//表示计算机在这里落子，存储在这个对象中
    flag = !flag;
    for(var k = 0;k < count;k++){//统计属于第几种赢法
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k] = 6;
            if(computerWin[k] == 5){
                tipBox("计算机赢了",false);
                over = false;
            }
        }
    }
}
