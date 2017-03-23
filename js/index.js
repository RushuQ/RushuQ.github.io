$(document).ready(function($) {
    var $listLi = $(".produceList ").find('li');
    $("#pack").shuffling().on("beforeWheel",function(event,ops){
        if(ops.before != 0){
            $(".index1").addClass('actions'); 
        }
    }).on("afterWheel",function(event,ops){
        $(".index1").removeClass('actions animate');
        ops.after != 2 ? $listLi.addClass('drow'):$listLi.removeClass('drow animate');
        var $h3 = $(".left").find('h3');
        if(ops.after == 3 || ops.spotNum == 3){
            $(".right").addClass('move');
            $h3.addClass('title');
        }else {
            $(".right").removeClass('move');
            $h3.removeClass('title'); 
        }
        var $li = $(".index3 .caseList").find('li');
        ops.after == 2 || ops.spotNum == 2?$li.addClass('moveShow'):$li.removeClass('moveShow');
    });
});