$(document).ready(function(){
    $(".left-head").on('click', function() {
        var $this = $(this);
        $this.hasClass('actions')?$this.removeClass('actions').next().hide():$this.addClass('actions').next().show();
    });
    
    var space = (window.innerWidth - $(".wrap").width())/2;
    var leftWidth = (space-space/2) +'px';
    var $navLeft =  $(".col-left");
      $navLeft.css({
        left: '-'+leftWidth+''
      });
    /*$(document.body).on("mousewheel",function(){
      document.body.scrollTop >= 200 ? $navLeft.css('top', '25%').addClass('animate') : $navLeft.css('top', '52%');
    })*/
    $(window).scroll(function(event) {
        var $arrows = $(".turnTop");
        event.currentTarget.scrollY > 400 ? $arrows.fadeIn() : $arrows.fadeOut();
        var Timer=null;
        $arrows.on('click', function(event) {
            clearInterval(Timer);
            Timer = setInterval(function(){
                currentPosition=document.documentElement.scrollTop || document.body.scrollTop; 
                currentPosition -= 10;
                if(currentPosition > 0){
                    window.scrollTo(0, currentPosition);
                }else{
                    window.scrollTo(0,0);
                    clearInterval(Timer);
                }
            }, 100);
        });     
    });
});
function showCase(num) {
    $('.case'+num).show().siblings('.col-right').hide();
}
