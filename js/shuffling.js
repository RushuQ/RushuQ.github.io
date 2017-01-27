(function(root,factory,plug){
    factory(root.jQuery,plug);
})(window,function($,plug){
   var _DEFAULT_ = {
      _init : function(){//初始化DOM结构样式
        this.$parent = this.parent();
        this.$model = this.addClass('animate').find('div.section');
        this.length = this.$model.length - 1;//模块的总数
        this.index = 0;//定义当前页页码
        this.lock = true;//定义钥匙
      },
      //右导航圆点
      _spotBorn : function(){
        this.$serialSpot = $("<ul></ul>");
        for(var i=0;i<=this.length;i++) {
          this.$serialSpot.append('<li index="'+i+'"><a href="#"></a></li>');
        }
        this.$serialSpot.addClass('spot').find('li:first a').addClass('on');
        $('body').append(this.$serialSpot);
        this._spotTurn();
      },
      //触发圆点点击事件
      _spotTurn : function(){
        var _this = this;
        this.$serialSpot.on('click','li',function(){
          var $this = $(this);
          var alt = $this.index();
          _this.$serialSpot.find('li a').removeClass('on');
          $this.find('a').addClass('on');
         _this.$parent.trigger('mousewheel',alt);
        })
      },
      //定义事件触发机制
      _triggerEvent : function(obj,event) {
        this.trigger(obj,event);
      },
      //绑定事件功能
      _bindEvent : function() {
        var _this = this;//注意先定义作用域，后面的作用域即将改变
        _this.$parent.on('mousewheel',function(e,alt){
          e = e || {};
          if(_this.lock) {
            if(e.originalEvent) {
              var isUp = e.originalEvent.deltaY < 0;//判断是否为向上滑动
              isUp ? _this.index-- : _this.index++;
            }else {
              _this.index = alt;
            }
            _this.lock = false;
            //限定index的取值范围，防止页码超出页数
            _this.index = Math.max(0,_this.index);     
            _this.index = Math.min(_this.index,_this.length);
            _this.css({
                "transform": "translateY(-"+_this.index+"00%)",
                "-mz-transform": "translateY(-"+_this.index+"00%)",
                "-o-transform": "translateY(-"+_this.index+"00%)",
                "-webkit-transform": "translateY(-"+_this.index+"00%)"
            });
            window.setTimeout(function(){
              _this.$serialSpot.find('li a').removeClass('on');//移除所有的a中所有的on属性
              _this.$serialSpot.find('li:eq('+_this.index+') a').addClass('on');//找到当前序号相对应的圆点并加上on
              _this.lock = true;
            }, 1000 );
          }
        })
      }
   }
   $.fn[plug] = function(){
    $.extend(this,_DEFAULT_);//继承
    this._init();
    this._spotBorn();
    this._bindEvent();
    return this;
   }
},"shuffling");