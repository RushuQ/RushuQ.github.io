$(document).ready(function(){
    $(".left-head").on('click', function() {
        var $this = $(this);
        $this.hasClass('actions')?$this.removeClass('actions').next().hide():$this.addClass('actions').next().show();
    });
    function showCase(num) {
      $('.case'+num).show().siblings('.col-right').hide();
    }
    var space = (window.innerWidth - $(".wrap").width())/2;
    var leftWidth = (space-space/2) +'px';
    var $navLeft =  $(".col-left");
      $navLeft.css({
        left: ''+leftWidth+''
      });
    $(document.body).on("mousewheel",function(){
      document.body.scrollTop >= 200 ? $navLeft.css('top', '25%').addClass('animate') : $navLeft.css('top', '52%');
    })
});