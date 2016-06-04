/**
 * Created by lwenn on 2016/3/25.
 * Loop picture playing for web page.
 */
(function(window, $, undefined) {

    var cssFile = $("link[href*='slide_show.css']");
    if (cssFile.length == 0) {
        $("<link rel='stylesheet' type='text/css' href='http://webres.61.com/common/css/slide_show.css'>").appendTo("head");
    }

    /*
     * 图片轮播
     * element：轮播元素容器
     * nav：图片对应按钮容器（可选）
     */
    var SlideShow = function(element, nav, options) {
        if (!(this instanceof SlideShow)) {
            return new SlideShow(element, nav, options);
        }
        this.options = $.extend({}, this.options, options);
        this.getElement = function() {
            return $(element);
        };
        this.getNav = function() {
            return $(nav);
        };

        if (this.getNav().length > 0) {
            this.getNav().addClass("nav-container clearfix");
            this.getNav().children().addClass("nav-item");
            this.getNav().find("a").addClass("nav-btn");
        }
    };

    SlideShow.prototype = {
        options: {
            interval: 2000,
            duration: 300,
            autoPlay: true,
            className: "on",
            switchNum: 1
        },
        setInterval: function(interval) {
            this.options.interval = interval;
            return this;
        },
        setDuration: function(duration) {
            this.options.duration = duration;
            return this;
        },
        setAutoPlay: function(autoPlay) {
            this.options.autoPlay = autoPlay;
            return this;
        },
        setSwitchNum: function(switchNum) {
            this.options.switchNum = switchNum;
            return this;
        },
        createNav: function(before) { //创建切换按钮
            if (this.getNav() && this.getNav().length > 0) {
                return this;
            }
            var $ele = this.getElement();
            var total = $ele.children("li").length;
            var len = Math.ceil(total / this.options.switchNum);
            var nav = $("<ul>");
            var html = "";
            for (var i = 0; i < len; i++) {
                html += "<li><a href='####'></a></li>";
            }
            nav.html(html);
            nav.addClass("nav-container clearfix");
            nav.children().addClass("nav-item");
            nav.find("a").addClass("nav-btn");
            if (before) {
                nav.insertBefore($ele);
            } else {
                nav.insertAfter($ele);
            }
            this.getNav = function() {
                return nav;
            }
            return this;
        },
        fade: function() { //不支持一次性切换多张图片
            var $ele = this.getElement();
            var $nav = this.getNav();
            var opt = this.options;
            $ele.addClass("slide-fade");
            $ele.children("li").addClass("slide-fade-li").hide().eq(0).show();
            var roll = new Roll($ele, $nav, opt.autoPlay, opt.interval, opt.duration, opt.className, 1, "fade");
            roll.playPicRoll();
        },
        slideLeft: function() {
            var $ele = this.getElement();
            var $nav = this.getNav();
            var opt = this.options;
            var wrap = $("<div>");
            wrap.addClass("slide-left-wrap");
            wrap.insertBefore($ele);
            wrap.append($ele);
            $ele.addClass("slide-left clearfix");
            $ele.children("li").addClass("slide-left-li");
            var roll = new Roll($ele, $nav, opt.autoPlay, opt.interval, opt.duration, opt.className, opt.switchNum, "slideLeft");
            roll.playPicRoll();
        }
    };

    var Roll = function($ele, $nav, autoPlay, interval, duration, className, switchNum, switchType) {
        this.$ele = $ele;
        this.$nav = $nav;
        this.total = $ele.children("li").length;
        this.currPos = 0;
        this.autoPlay = autoPlay;
        this.interval = interval;
        this.duration = duration;
        this.className = className;
        this.switchNum = switchNum;
        this.switchType = switchType;
    };

    Roll.prototype = {
        playPicRoll: function() {
            var it = this;
            var eles = it.$ele.children("li");
            var navs = it.$nav.find("a");
            var id;
            $(eles[it.currPos]).show();
            switch (it.switchType) {
                case "fade":
                    it.switchFun = it.fade;
                    break;
                case "slideLeft":
                    addStyle();
                    it.switchFun = it.slideLeft;
                    break;
                default:
                    it.switchFun = it.fade;
                    break;
            }
            $(navs[0]).addClass(it.className);
            if (it.total > 1 && it.autoPlay) {
                id = play();
            }
            if (navs.length > 0) {
                navs.each(function(i) {
                    $(this).click(function(e) {
                        e.preventDefault();
                        if (i == it.currPos) {
                            return;
                        }
                        it.switchFun(it.currPos, i);
                        if (id) {
                            clearInterval(id);
                            id = play();
                        }
                    });
                });
            }

            function play() {
                return setInterval(function() {
                    var pageNum = Math.ceil(it.total / it.switchNum);
                    it.switchFun(it.currPos, (it.currPos + 1) % pageNum);
                }, it.interval);
            }

            function addStyle() {
                setTimeout(function() {
                    if (eles.css("float")) {
                        var moveWidth = $(eles[1]).offset().left - $(eles[0]).offset().left;
                        it.$ele.css("width", moveWidth * it.total + "px");
                        it.$ele.parent().css("width", moveWidth * it.switchNum + "px");
                    } else {
                        arguments.callee();
                    }
                }, 200);
            }
        },
        fade: function(fromPos, toPos) {
            var it = this;
            var eles = it.$ele.children("li");
            var navs = it.$nav.find("a");
            var last = it.currPos;
            it.currPos = toPos;
            for (var i = 0; i < it.switchNum; i++) {
                $(eles[it.switchNum * fromPos + i]).fadeOut(it.duration);
                $(eles[it.switchNum * toPos + i]).fadeIn(it.duration);
            }
            if (navs.length > 0) {
                if ($(navs[last]).hasClass(it.className)) { //样式加在按钮上(a标签)
                    $(navs[last]).removeClass(it.className);
                    $(navs[toPos]).addClass(it.className);
                } else if ($(navs[last]).parent().hasClass(it.className)) { //样式加在按钮的父级上(如li)
                    $(navs[toPos]).parent().addClass(it.className).siblings().removeClass(it.className);
                }
            }
        },
        slideLeft: function(fromPos, toPos) {
            var it = this;
            var eles = it.$ele.children("li");
            var navs = it.$nav.find("a");
            var last = it.currPos;
            it.currPos = toPos;
            var moveWidth = $(eles[1]).offset().left - $(eles[0]).offset().left;
            it.$ele.animate({marginLeft: -toPos * it.switchNum * moveWidth + "px"});
            if (navs.length > 0) {
                if ($(navs[last]).hasClass(it.className)) { //样式加在按钮上(a标签)
                    $(navs[last]).removeClass(it.className);
                    $(navs[toPos]).addClass(it.className);
                } else if ($(navs[last]).parent().hasClass(it.className)) { //样式加在按钮的父级上(如li)
                    $(navs[toPos]).parent().addClass(it.className).siblings().removeClass(it.className);
                }
            }
        }
    };

    window.lwenn = window.lwenn || {};
    window.lwenn.SlideShow = SlideShow;

}(window, jQuery));