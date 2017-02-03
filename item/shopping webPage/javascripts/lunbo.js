(function(){
    function autoSlide(){}
    autoSlide.prototype.init=function(){
        //参数初始化
        var initParam={
            "slideLi":document.getElementById("slidePic").children
        }
        //判断是手机还是电脑，选择初始化
        if(!this.isPhone()){
            this.phoneSlide(initParam);
        }else{
            this.computerSlide(initParam);
        }
    }
    autoSlide.prototype.phoneSlide=function(param){};
    autoSlide.prototype.computerSlide=function(param){
        var _this=this;
        var divEle=document.createElement("div");
        divEle.className="slide-box";
        var divFocus=document.createElement("div");
        divFocus.className="slide-focus";
        var divRect=document.createElement('div');
        divRect.className="divTurn";
        for(var i=0;i<param.slideLi.length;i++){
            var slideItem=document.createElement("div");
            var focusItem=document.createElement("span");
            focusItem.setAttribute("date-index",i);
            if(i==0){ 
                slideItem.className="active";
                focusItem.className="on";
            }
            focusItem.onmouseover=function(){
                if(this.className!="on"){
                    divFocus.getElementsByClassName("on")[0].className="";
                this.className="on";
                var index=this.getAttribute("date-index");
                divEle.getElementsByClassName("active")[0].className="";
                document.querySelector(".slide-box").children[index].className="active";
                }
            }
            slideItem.style.backgroundImage="url('"+param.slideLi[i].querySelectorAll("img")[0].getAttribute("src")+"')";
            divEle.appendChild(slideItem);//存储到图片列表处
            divFocus.appendChild(focusItem);//存储span元素到图片
        }
        var html="";
        _this.isSign=true;//判断移动方向
        html="<span id=\"left\">＜</span><span id=\"right\">＞</span>";
        divRect.innerHTML=html;
        document.getElementById("slidePic").remove();
        var focus=document.getElementById("focus");
        focus.appendChild(divEle);
        focus.appendChild(divFocus);
        focus.appendChild(divRect);
        divEle.onmouseover=divRect.onmouseover=function(){
            divRect.style.display="block";
        }
        divEle.onmouseout=function(){
            divRect.style.display="none";   
        }
        focus.onmousemove=function(){
            clearTimeout(_this.time);
        }
        focus.onmouseout=function(){
            _this.computerPlay();
        }
        document.getElementById("left").onclick=function(){
            _this.isSign=false;
            _this.isLast();
        }
        document.getElementById("right").onclick=function(){
            _this.isSign=true;
            _this.isLast();
        }
        this.computerPlay();
    }
    autoSlide.prototype.computerPlay=function(){
        var _this=this;
        this.time=setTimeout(function(){//setInterval容易出现错误
            _this.isSign=true;
            _this.isLast();
            _this.computerPlay();//这里的this是window，_this的对象是autoSlide
        },3000)
    }
    autoSlide.prototype.isLast=function(){
        var slideBox=document.getElementsByClassName("slide-box")[0].children;
        var slideFocus=document.getElementsByClassName("slide-focus")[0].children;
        var currFocus=Number(document.getElementsByClassName("slide-focus")[0].getElementsByClassName("on")[0].getAttribute("date-index"));
        slideBox[currFocus].className="";
        slideFocus[currFocus].className="";
        if(this.isSign){//向右增加移动
            if((slideBox.length-1)<=currFocus){
                slideBox[0].className="active";
                slideFocus[0].className="on";
            }else{
                slideBox[currFocus+1].className="active";
                slideFocus[currFocus+1].className="on";
            }
        }else{//false时向左移动
            if(currFocus==0){
                var length=slideBox.length-1;
                slideBox[length].className="active";
                slideFocus[length].className="on";
            }else{
                slideBox[currFocus-1].className="active";
                slideFocus[currFocus-1].className="on";
            }
        }
    }
    autoSlide.prototype.isPhone=function(){
        var userAgentInfo=navigator.userAgent;//匹配系统
        var agents=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];//系统名字
        var flag=true;//是否包含状态
        for(var i=0;i<agents.length;i++){
            if(userAgentInfo.indexOf(agents[i])>0){
                flag=false;//判断是否包含修改flag状态
                break;
            }else{

            }
        }
        return flag;
    }
    var autoSlides=new autoSlide();
    window.autoSlide=autoSlides;
})();