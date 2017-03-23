(function(root, factory, plug) {
    factory(root.jQuery, plug)
})(window, function($, plug) {
    var _DEFAULT_ = {
        _init: function() {
            this.$parent = this.parent();
            this.$model = this.addClass("animate").find("div.section");
            this.length = this.$model.length - 1;
            this.index = 0;
            this.lock = true;
        },
        _spotBorn: function() {
            this.$serialSpot = $("<ul></ul>");
            for (var i = 0; i <= this.length; i++) {
                this.$serialSpot.append('<li index="' + i + '"><a href="#"></a></li>')
            }
            this.$serialSpot.addClass("spot").find("li:first a").addClass("on");
            $("body").append(this.$serialSpot);
            this._spotTurn()
        },
        _spotTurn: function() {
            var _this = this;
            this.$serialSpot.on("click", "li", function() {
                var $this = $(this);
                _this.alt = $this.index();
                _this.$serialSpot.find("li a").removeClass("on");
                $this.find("a").addClass("on");
                _this.$parent.trigger("mousewheel", _this.alt);
                return _this.alt;
            });
            return _this.alt;
        },
        _triggerEvent: function(obj, event) {
            this.trigger(obj, event)
        },
        /*_change: function() {
            var _this = this;
            $("header ul li").on("click", function() {
                var alt = $(this).index();
                _this.$serialSpot.find("li a").removeClass("on");
                _this.$serialSpot.find("li:eq(" + alt + ") a").addClass("on")
            })
        },*/
        _bindEvent: function() {
            var _this = this;
            _this.$parent.on("mousewheel", function(e, alt) {
                e = e || {};
                if (_this.lock) {
                    if (e.originalEvent) {
                        var isUp = e.originalEvent.deltaY < 0;
                        var beforeIndex = _this.index;//翻转时的页面
                        isUp ? _this.index-- : _this.index++;
                        var afterIndex = _this.index;//翻转后的页码
                    } else {
                        _this.index = alt;
                    }
                    _this._triggerEvent("beforeWheel", {
                        before : beforeIndex,
                        beforeDom : _this.$model.eq(beforeIndex)
                        
                    });
                    _this.lock = false;
                    _this.index = Math.max(0, _this.index);
                    _this.index = Math.min(_this.index, _this.length);
                    _this.css({
                        "transform": "translateY(-" + _this.index + "00%)",
                        "-mz-transform": "translateY(-" + _this.index + "00%)",
                        "-o-transform": "translateY(-" + _this.index + "00%)",
                        "-webkit-transform": "translateY(-" + _this.index + "00%)"
                    });
                    setTimeout(function() {
                        _this.$serialSpot.find("li a").removeClass("on");
                        _this.$serialSpot.find("li:eq(" + _this.index + ") a").addClass("on");
                        _this._triggerEvent("afterWheel", {
                            after : afterIndex,
                            afterDom : _this.$model.eq(afterIndex),
                            spotNum : _this.alt
                        });
                        _this.lock = true
                    }, 1000)
                }
            })
        }
    };
    $.fn[plug] = function() {
        $.extend(this, _DEFAULT_);
        this._init();
        this._spotBorn();
       // this._change();
        this._bindEvent();
        return this;
    }
}, "shuffling");