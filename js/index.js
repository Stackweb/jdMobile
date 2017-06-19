/*
* @Author: Administrator
* @Date:   2017-06-19 11:15:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-19 18:25:44
*/

'use strict';
window.onload = function() {
	search();
	secondKill();
	scrollPic();
};

// 头部搜索
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

        if (times <= 0) {
        	clearInterval(timer);
        }
	},1000)
}

// 轮播图部分
var scrollPic = function(){
	var banner = document.getElementsByClassName('jd_banner')[0];
	var imgBox =  banner.getElementsByTagName('ul')[0];
	var pointBox =  banner.getElementsByTagName('ul')[1];
	var pointList = pointBox.getElementsByTagName('li');

    var width = banner.offsetWidth;
	var index = 1;   /* 初始化index为1，即当前显示第一张图片 */
	var timer;

	// 添加过渡
	var addTransition = function(){
		imgBox.style.transition = "all .3s ease 0s";
		imgBox.style.webkitTransition = "all .3s ease 0s";
	}
	//清除过渡
	var removeTransition = function(){
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	}
	//改变位置
	var setTransform = function(t){
		imgBox.style.transform = "translateX("+t+"px)";
		imgBox.style.webkitTransform = "translateX("+t+"px)";
	}

	//开启定时器
	timer = setInterval(function(){
		index ++;
		addTransition();
		setTransform(-index*width);
	},1000);

	//判断轮播图是否走完
	imgBox.addEventListener('transitionEnd',function(){
		if(index >= 9){
			index = 1;
		}else if(index <= 0){
			index = 8;
		};
		removeTransition();
		setTransform(-index*width);
	},false)
	imgBox.addEventListener("webkitTransitionEnd",function(){
		if(index >= 9){
			index = 1;
		}else if(index <= 0){
			index = 8;
		};
		removeTransition();
		setTransform(-index*width);
	},false)

}

