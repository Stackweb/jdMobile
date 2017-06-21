/*
* @Author: Ronaldo
* @Date:   2017-06-21 22:30:25
* @Last Modified by:   Ronaldo
* @Last Modified time: 2017-06-22 01:22:16
*/

'use strict';
window.onload = function(){
    scrollCategory();
}

var scrollCategory = function(){
    var parentBox = document.getElementsByClassName('jd_category_left')[0];
    var childBox = parentBox.querySelector('.left_box');
    var height = parentBox.offsetHeight;
    var topHeight = document.getElementsByClassName('jd_topBar')[0].offsetHeight;
    var liList = childBox.getElementsByTagName('li');

    var parentH = height - topHeight;
    var childH = childBox.offsetHeight;

    /* 初始化变量值 */
    var startY = 0;
    var endY = 0;
    var moveY = 0;
    var currentY = 0;
    
    /* 初始化开始点击时间和结束点击时间 */
    var startTime = 0;
    var endTime = 0;

    /* 上下滑动的范围，即向上或向下滑动到一定距离后，就无法继续滑动 */
    var upDownY = 150;

    /* 添加过渡 */
    var addTransition = function(){
    	childBox.style.transition = "all .3s ease 0s"
    	childBox.style.webkitTransition = "all .3s ease 0s"
    }

    //清除过渡动画
	var removeTransition = function(){
		childBox.style.transition = "none";
		childBox.style.webkitTransition = "none";
	}

	//设置动画移动的距离
	var setTransform = function(t){
       childBox.style.transform = "translateY("+t+"px)";
       childBox.style.webkitTransform = "translateY("+t+"px)";
	}

	childBox.addEventListener('touchstart', function(e){
		startTime = new Date().getTime();
		startY = e.touches[0].clientY;
	},false)
	childBox.addEventListener('touchmove', function(e){
		e.preventDefault();
		endY = e.touches[0].clientY;
		moveY = startY - endY;

		/* 上下的滑动空白间距不大于upDownY,大于时将无法滑动 */
		if (currentY - moveY < upDownY && currentY - moveY > (-(childH - parentH) - upDownY)) {
			removeTransition();
			setTransform(currentY - moveY);
			// currentY = 0;
		};
	},false)
	childBox.addEventListener('touchend', function(e){
		endTime = new Date().getTime();
		/* 上面满足吸附的条件 */
		if((currentY - moveY) >= 0){
			addTransition();
			setTransform(0);
			currentY = 0;
		}else if((currentY - moveY) < -(childH - parentH)){
			addTransition();
			setTransform(-(childH - parentH));
			currentY = -(childH - parentH);
		}else{
			/* 下次从当前滑动到的位置继续滑动，而不是重新从0开始 */
		    currentY = currentY - moveY;
		}

		/* 当时间间隔小于150ms且未发生移动时，触发tap轻触事件 */
	    if((endTime - startTime) < 150 && moveY == 0){
            for(var i = 0;i < liList.length;i++){
            	liList[i].className = " ";
            	liList[i].index = i;
            }
            var li = e.target.parentNode;  /* 获取到当前点击的li */
            li.className = "now";
            /* 需要移动的距离 */
            var scrollY = li.index * liList[0].offsetHeight;  /* 用每个li的高度乘以当前点击的li的索引号 */

            if (scrollY < (childH-parentH)) {
            	addTransition();
			    setTransform(-scrollY);
			    currentY = -scrollY;
            }else{
            	addTransition();
			    setTransform(-(childH-parentH));
			    currentY = -(childH-parentH);
            };

	    }
	}, false)


}