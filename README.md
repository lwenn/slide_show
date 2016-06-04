Slide Show - 图片轮播
==
简介
--
SlideShow模块主要用于图片轮播和切换，图片切换可以使用滑动的展示，也可以使用淡入淡出的展示，并且可以设置图片切换的间隔时间、切换动画的持续时间等。
用法
--
####HTML
1. 下载JS代码slide_show.js并放入项目里的js目录
2. 在页面的&lt;head&gt;里引入jQuery代码
3. 在jQuery代码后面引入下面的html代码
```html
<script type="text/javascript" src="js/slide_show.js"></script>
```
####JavaScript
```javascript
var slide = new lwenn.SlideShow($("#slide")); //$("#slide")是轮播图片的列表ul
slide.createNav() //createNav: 创建图片的导航按钮，可选
	.fade(); //淡入淡出效果，滑动使用slideLeft()
```
API
==
####lwenn.SlideShow(element[, nav][, options])
构造器，参数element, nav, options
* 返回：SlideShow
* element：类型-jQuery或DOM object，图片的列表ul
* nav(可选)：类型-jQuery或DOM object，传入的图片导航栏
* options(可选)：类型-Object，包含展示参数的对象
	* interval(默认:2000)：类型-Number，图片切换的间隔时间（毫秒）
	* duration(默认:300)：类型-Number，图片切换动画的持续时间（毫秒）
    * autoPlay(默认:true)：类型-Boolean，是否开启轮播
    * className(默认:"on")：类型-String，图片导航中被激活按钮的css类名
    * switchNum(默认:1)：类型-Number，每次切换图片的张数

####setInterval(interval)
设置图片切换的间隔时间（毫秒）
* 返回：SlideShow
* interval：类型-Number，图片切换的间隔时间（毫秒）

####setDuration(duration)
设置图片切换动画的持续时间（毫秒）
* 返回：SlideShow
* duration：类型-Number，图片切换动画的持续时间（毫秒）

####setAutoPlay(autoPlay)
设置是否开启轮播
* 返回：SlideShow
* autoPlay：类型-Boolean

####setSwitchNum(switchNum)
设置切换图片的数量
* 返回：SlideShow
* switchNum：类型-Number，每次切换图片的张数

####createNav([before])
创建图片导航栏的函数，一旦被调用，会检查用户是否已经传入导航栏，如果有传入的导航栏，则什么都不做；如果没有传入，则会按切换图片的张数计算页数，然后创建相应个数的按钮
* 返回：SlideShow
* before(可选)：类型-Boolean，要创建的导航栏是否位于图片之前

####fade()
以淡入淡出的形式切换图片，如果开启轮播则会开始自动轮播图片（默认开启），同时可以点击按钮跳到相应的图片页，无返回值

####slideLeft()
以左右滑动的形式切换图片，如果开启轮播则会开始自动轮播图片（默认开启），同时可以点击按钮滑动到相应的图片页，无返回值