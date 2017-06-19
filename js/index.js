/*
* @Author: Administrator
* @Date:   2017-06-19 11:15:48
* @Last Modified by:   Ronaldo
* @Last Modified time: 2017-06-20 00:23:36
*/

'use strict';
window.onload = function() {
	search();
	secondKill();
	scrollPic();
};

// 头部搜索
    /*
     * 1.颜色随着 页面的滚动  逐渐加深
     * 2.当我们超过  轮播图的  时候  颜色保持不变
     * */
var search = function(){
	//获取DOM对象
	var header = document.getElementsByClassName('jd_header_box')[0];
    var banner = document.getElementsByClassName('jd_banner')[0];
    //获取banner的高度
    var height = banner.offsetHeight;
    window.onscroll = function(){
        //获取页面向上滚动过的高度
        var scroll = document.body.scrollTop;
        if (scroll > height) {
        	header.style.background = "rgba(201,21,35,0.85)";
        }else{
        	var opacity = scroll/height*0.85
        	header.style.background = "rgba(201,21,35,"+opacity+")";
        };
    }
    
}

// 秒杀倒计时
var secondKill = function(){
	var sk_time = document.getElementsByClassName('sk_time')[0];
	var timeList = sk_time.getElementsByClassName('num');
	var times = 4*60*60;
	var timer;
	timer = setInterval(function(){
		if (times <= 0) {
        	clearInterval(timer);
        }

		times--;

        var h = Math.floor(times/(60*60));
        var m = Math.floor((times/60)%60);
        var s = times%60;

        timeList[0].innerHTML = h>=10 ? Math.floor(h/10):0;
        timeList[1].innerHTML = h%10;
        timeList[2].innerHTML = m>=10 ? Math.floor(m/10):0;
        timeList[3].innerHTML = m%10;
        timeList[4].innerHTML = s>=10 ? Math.floor(s/10):0;
        timeList[5].innerHTML = s%10;
	},1000)
}

// 轮播图部分
    /*
     * 1.自动的滚动起来    （定时器，过渡）
     * 2.点随之滚动起来     （改变当前点元素的样式）
     * 3.图片滑动           （touch事件）
     * 4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）
     * 5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）
     * */
var scrollPic = function(){
	var banner = document.getElementsByClassName('jd_banner')[0];
	var imgBox = banner.getElementsByTagName('ul')[0];
	var pointBox = banner.getElementsByTagName('ul')[1];
	var pointList = pointBox.getElementsByTagName('li');

    var width = banner.offsetWidth;
	var index = 1;  /* 初始化index为1，即显示第一张图片 */
	var timer = timer;

	// 添加过渡动画
	var addTransition = function(){
		imgBox.style.transition = "all .3s ease 0s";
		imgBox.style.webkitTransition = "all .3s ease 0s";
	}

	//清除过渡动画
	var removeTransition = function(){
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	}

	//设置动画移动的距离
	var setTransform = function(t){
       imgBox.style.transform = "translateX("+t+"px)";
       imgBox.style.webkitTransform = "translateX("+t+"px)";
	}

/* 1.自动的滚动起来    （定时器，过渡） */
	timer = setInterval(function(){
        index ++;
        addTransition();
        setTransform(-index*width);
	},1000)

	//判断轮播图是否走完
	imgBox.addEventListener("transitionEnd",function(){
		if(index >= 9){
			index = 1;
		}else if(index <= 0){
			index = 8;
		}

		//清除过渡并跳到第一或最后一张
		removeTransition();
		setTransform(-index*width);
		setPoint();
	},false)

	imgBox.addEventListener("webkitTransitionEnd",function(){
		if(index >= 9){
			index = 1;
		}else if(index <= 0){
			index = 8;
		}
		removeTransition();
		setTransform(-index*width);
		setPoint();
	},false)

/* 2.点随之滚动起来     （改变当前点元素的样式）*/
    var setPoint = function(){
	    for(var i = 0;i < pointList.length;i++){
		    pointList[i].className = " ";
	    }
	    pointList[index-1].className = "active";
    }
}



