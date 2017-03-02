$(document).ready(function(){
    //选择切换头像
    $(".sec-wrapper .sec-list.index2 a input[type=file]").on("change",function(){
        var img=this.value;
        if(!/\.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(img)){
            rectTip("图片格式必须是.gif,jpeg,jpg,png等一种");
            return false;
        }//正则判断选择的图片格式
        var f=this.files[0];
        var src=window.URL.createObjectURL(f);
        $(this).prev().attr("src",src);
    });
    //右边内容
    $.getJSON('picData.json', function(date) {
       var community = date.circle;
       var cares = date.myCare;
       var question = date.myWrong;
       $('.sec-ring').append(' <ul class="sec-add-pics sec-add-ring"></ul>');
       $('.sec-care').append(' <ul class="sec-add-pics sec-care-pic"></ul>');
       $('.sec-center').append('<ul class="sec-list-date"></ul>');
       $.each(community, function(i, val) {
            $('.sec-add-ring').append('<li><a href="#"><img src="'+val.pic+'" /></a><a href="#">'+val.name+'</a></li>')
       });
       $.each(cares, function(i, vals) {
            $('.sec-care-pic').append('<li><a href="#"><img src="'+vals.pic+'" /></a><a href="#">'+vals.name+'</a></li>')
       });
       //陈列提问内容
       $.each(question, function(i, val) {
            $(".sec-center ul").append('<li><span>'+val.ask+'</span><p><i>'+val.time+'</i>/<a href="#">'+val.user+'</a></p></li>');
       });
    });
    $('.sec-center-head span').on('click',function(){
        var $this = $(this);
        if($this.hasClass('action')){
            return;
        }else{
            $this.addClass('action').siblings().removeClass('action');
            var $hideDiv = $this.parents('.sec-center').find('div.sec-hide');
           $hideDiv.is(":hidden")?$hideDiv.show():$hideDiv.hide();
        } 
    });
    $('.myAsk').on('click',function(){
        //if()
        var $hideDiv = $(this).parents('.sec-center').find('div.sec-hide');
        if($hideDiv.is(":hidden")){
            $('.fly').show().find('.fly-write').val(""); 
        }else{
            return false;
        }
    });
    $("#submitBtn").on('click',function(){
        var $parentVal = $(this).parents('form');
        var askQue = $parentVal.find('#textMain').val();
        var askbody = $parentVal.find('textarea').val();
        var nowTime = new Date();
        var detailTime = nowTime.toLocaleString();//获取当前时间
        if(askQue!="" && askbody!=""){
            $(".sec-center ul").append('<li><span>'+askbody+'</span><p><i>'+detailTime+'</i>/<a href="#">'+askQue+'</a></p></li>');
            $('.fly').hide();
        }else{
            alert("请重新输入");
            return false;
        }
    })
});