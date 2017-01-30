//3D轮播展示
$.fn["showSlip"] = function(options) {
    var _PROTO_ = {
        _init : function(){//初始化DOM结构，并且判断是否支持2D，3D效果
            this.support3d = Modernizr.csstransforms3d;
            this.support2d = Modernizr.csstransforms;
            this.supportTrans = Modernizr.csstransforms;

            this.$wrapper = this.find('.lb-wrap');
            this.$pic = this.$wrapper.children();//a标签
            this.length = this.$pic.length;//a标签的长度，即图片数量
            this.$nav = this.find('nav');
            this.$navLeft = this.$nav.find('.lb-left');//左箭头    
            this.$navRight = this.$nav.find('.lb-right');//右箭头
            this.currentItem = 0;//定义当前页面页码
        },
        _pattern : function(){
            //若图片数量小于3，则移除箭头标签
            if(this.length < 3){
                this.$nav.remove();
                return false;
            }
            this.$pic.css({//赋予图片出样式
                "opacity" : 0,
                "visibility" : "hidden"
            });
        },
        _setItem : function(){
            this.$pic.removeClass('lg-center');
            this.$currentObj = this.$pic.eq(this.currentItem);
            this.$leftItem = (this.currentItem === 0 ) ? this.$pic.eq(this.length - 1) : this.$pic.eq(this.currentItem - 1);
            this.$rightItem = (this.currentItem === this.length - 1 ) ? this.$pic.eq(0) : this.$pic.eq(this.currentItem + 1);
            this.$pic.css('z-index', 1);
            this.$currentObj.css('z-index', 999);
            if(this.length > 3) {
                this.$nextItem = (this.$rightItem.index() === this.length - 1) ? this.$pic.eq(0) : this.$rightItem.next();//右右图的由来
                this.$nextItem.css(this._styleArrow('outright'));//右右图的样式
                this.$prevItem = (this.$leftItem.index() === 0) ? this.$pic.eq(this.length - 1) : this.$leftItem.prev();//左左图
                this.$prevItem.css(this._styleArrow('outleft'));//左左图的样式
            }
        },
        _stylesheet : function(){//定义左、中、右图片的父节点a的样式
            this._setItem();
            var leftCss,rightCss,currentCss;
            if(this.support3d  && this.supportTrans) {
                leftCss = {
                   '-webkit-transform': 'translateX(-350px) translateZ(-220px) rotateY(45deg)',
                      '-moz-transform': 'translateX(-350px) translateZ(-220px) rotateY(45deg)',
                       '-ms-transform': 'translateX(-350px) translateZ(-220px) rotateY(45deg)',
                        '-o-transform': 'translateX(-350px) translateZ(-220px) rotateY(45deg)',
                           'transform': 'translateX(-350px) translateZ(-220px) rotateY(45deg)'
                };
                rightCss = {
                    '-webkit-transform': 'translateX(350px) translateZ(-220px) rotateY(-45deg)',
                       '-moz-transform': 'translateX(350px) translateZ(-220px) rotateY(-45deg)',
                        '-ms-transform': 'translateX(350px) translateZ(-220px) rotateY(-45deg)',
                         '-o-transform': 'translateX(350px) translateZ(-220px) rotateY(-45deg)',
                            'transform': 'translateX(350px) translateZ(-220px) rotateY(-45deg)'
                };
                leftCss.opacity = 1;
                leftCss.visibility = 'visible';
                rightCss.opacity = 1;
                rightCss.visibility = 'visible';
            }else if(this.support2d  && this.supportTrans) {
                leftCss = {
                    '-webkit-transform': 'translateX(-350px) scale(.8)',
                       '-moz-transform': 'translateX(-350px) scale(.8)',
                        '-ms-transform': 'translateX(-350px) scale(.8)',
                         '-o-transform': 'translateX(-350px) scale(.8)',
                            'transform': 'translateX(-350px) scale(.8)'
                };
                rightCss = {
                    '-webkit-transform': 'translateX(-350px) scale(.8)',
                       '-moz-transform': 'translateX(-350px) scale(.8)',
                        '-ms-transform': 'translateX(-350px) scale(.8)',
                         '-o-transform': 'translateX(-350px) scale(.8)',
                            'transform': 'translateX(-350px) scale(.8)'
                };
                currentCss = {
                    'z-index' : 999
                };
                leftCss.opacity = 1;
                leftCss.visibility = 'visible';
                rightCss.opacity = 1;
                rightCss.visibility = 'visible';
            }
            this.$leftItem.css(leftCss || {});
            this.$rightItem.css(rightCss || {});
            this.$currentObj.css({
                'opacity' : 1,
                'visibility' : 'visible',
                'transform' : 'scaleX(1.8)'
            }).addClass('lb-center');
        },
        _styleArrow : function(position){//箭头样式
            if(this.support3d  && this.supportTrans) {
                switch(position) {
                    case 'outleft':
                        return {
                            '-webkit-transform' : 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
                            '-moz-transform'    : 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
                            '-o-transform'      : 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
                            '-ms-transform'     : 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
                            'transform'         : 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
                            'opacity' : 0,
                            'visibility' : 'hidden'
                        };
                        break;
                    case 'outright':
                        return {
                            '-webkit-transform' : 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
                            '-moz-transform'    : 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
                            '-o-transform'      : 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
                            '-ms-transform'     : 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
                            'transform'         : 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
                            'opacity' : 0,
                            'visibility' : 'hidden'
                        };
                        break;
                    case 'left':
                        return {
                            '-webkit-transform' : 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
                            '-moz-transform'    : 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
                            '-o-transform'      : 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
                            '-ms-transform'     : 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
                            'transform'         : 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
                            'opacity' : 1,
                            'visibility' : 'visible'
                        };
                        break;
                    case 'right':
                        return {
                            '-webkit-transform' : 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
                            '-moz-transform'    : 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
                            '-o-transform'      : 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
                            '-ms-transform'     : 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
                            'transform'         : 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
                            'opacity' : 1,
                            'visibility' : 'visible'
                        };
                        break;
                    case 'center' : 
                         return {
                            '-webkit-transform' : 'translateX(0px) translateZ(0px) rotateY(0deg) scaleX(1.8)',
                            '-moz-transform'    : 'translateX(0px) translateZ(0px) rotateY(0deg) scaleX(1.8)',
                            '-o-transform'      : 'translateX(0px) translateZ(0px) rotateY(0deg) scaleX(1.8)',
                            '-ms-transform'     : 'translateX(0px) translateZ(0px) rotateY(0deg) scaleX(1.8)',
                            'transform'         : 'translateX(0px) translateZ(0px) rotateY(0deg) scaleX(1.8)',
                            'opacity'           : 1,
                            'visibility'        : 'visible'
                         }
                }
            }else if(this.support2d  && this.supportTrans) {
                switch(position) {
                    case 'outleft':
                        return {
                            '-webkit-transform': 'translate(-450px) scale(.7)',
                               '-moz-transform': 'translate(-450px) scale(.7)',
                                '-ms-transform': 'translate(-450px) scale(.7)',
                                 '-o-transform': 'translate(-450px) scale(.7)',
                                    'transform': 'translate(-450px) scale(.7)',
                            'opacity' : 0,
                            'visibility' : 'hidden'
                        }
                        break;
                    case 'outright':
                        return {
                            '-webkit-transform': 'translate(450px) scale(.7)',
                               '-moz-transform': 'translate(450px) scale(.7)',
                                '-ms-transform': 'translate(450px) scale(.7)',
                                 '-o-transform': 'translate(450px) scale(.7)',
                                    'transform': 'translate(450px) scale(.7)',
                            'opacity' : 0,
                            'visibility' : 'hidden'
                        }
                        break;
                    case 'left':
                        return {
                            '-webkit-transform': 'translate(-350px) scale(.7)',
                               '-moz-transform': 'translate(-350px) scale(.7)',
                                '-ms-transform': 'translate(-350px) scale(.7)',
                                 '-o-transform': 'translate(-350px) scale(.7)',
                                    'transform': 'translate(-350px) scale(.7)',
                            'opacity' : 1,
                            'visibility' : 'visible'
                        }
                        break;
                    case 'right':
                        return {
                            '-webkit-transform': 'translate(350px) scale(.7)',
                               '-moz-transform': 'translate(350px) scale(.7)',
                                '-ms-transform': 'translate(350px) scale(.7)',
                                 '-o-transform': 'translate(350px) scale(.7)',
                                    'transform': 'translate(350px) scale(.7)',
                            'opacity' : 1,
                            'visibility' : 'visible'
                        }
                        break;
                    case 'center':
                        return {
                            '-webkit-transform': 'scale(1.8)',
                               '-moz-transform': 'scale(1.8)',
                                '-ms-transform': 'scale(1.8)',
                                 '-o-transform': 'scale(1.8)',
                                    'transform': 'scale(1.8)',
                            'opacity' : 1,
                            'visibility' : 'visible'
                        };
                        break;
                }
            }else {
                switch(position) {
                    case 'outleft'  :
                    case 'outright' :
                    case 'left'     :
                    case 'right'    :
                         return {
                            'opacity' : 0,
                            'visibility' : 'hidden'
                         };
                         break;
                    case 'center'   :
                        return {
                            'opacity': 1,
                            'visibility' : 'visible'
                        };
                        break;
                };
            }
        },
        _setArrow : function(direct){//箭头设置方向功能
            switch(direct) {
                case 'next' ://前进箭头
                    this.currentItem = this.$rightItem.index();
                    this.$currentObj.addClass('animate').css(this._styleArrow('left'));
                    this.$rightItem.addClass('animate').css(this._styleArrow('center'));
                    if(this.$nextItem) {//存在下下个图片时
                        this.$nextItem.addClass('animate').css(this._styleArrow('right'));
                        this.$leftItem.addClass('animate').css(this._styleArrow('outleft'));
                    }else {
                        this.$leftItem.addClass('animate').css(this._styleArrow('right'));
                    }
                    break;
                case 'prev' ://后退箭头
                    this.currentItem = this.$leftItem.index();
                    this.$currentObj.addClass('animate').css(this._styleArrow('right'));
                    this.$leftItem.addClass('animate').css(this._styleArrow('center'));
                    if(this.$prevItem) {//存在上上个图片
                        this.$rightItem.addClass('animate').css(this._styleArrow('outright'));
                        this.$prevItem.addClass('animate').css(this._styleArrow('left'));
                    }else{
                        this.$rightItem.addClass('animate').css(this._styleArrow('left'));
                    }
                    break;
            }
            this._setItem();
        },
        _triggerArrow : function(){//触发箭头事件
            var _this = this;
            this.$navLeft.on('click',function(){//左箭头点击触发事件
                _this._setArrow('next');
                return false;
            })
            this.$navRight.on('click',function(){//右箭头点击触发事件
                _this._setArrow('prev');
                return false; 
            })
        }
    };
    $.extend(this, _PROTO_);
    this._init();
    this._pattern();
    this._stylesheet();
    this._triggerArrow();
}