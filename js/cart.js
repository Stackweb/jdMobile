/*
* @Author: Administrator
* @Date:   2017-06-22 11:18:35
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-22 19:23:34
*/

'use strict';
window.onload = function(){
    checkBox();
    deleteFuc();
}


/* 购物车商品复选框 */
var checkBox = function(){
    var checkBoxList = document.getElementsByClassName('jd_shop_check');
    var totalCheckList = document.getElementsByClassName('total_check_box')[0];
    var contCheckList = document.getElementsByClassName('cont_check_box');

    for(var i = 0;i < checkBoxList.length;i++){
    	checkBoxList[i].onclick = function(){
    	    var hasChecked = this.getAttribute('checked');
    	    if (hasChecked != null) {
                this.removeAttribute('checked');
    	    }else{
    	    	this.setAttribute('checked',' ');
    	    };	
    	}    	
    }
    
    totalCheckList.onclick = function(){
	    var hasChecked = this.getAttribute('checked');
	    if (hasChecked != null) {
	    	this.removeAttribute('checked');
            for(var i = 0;i < checkBoxList.length;i++){
            	checkBoxList[i].removeAttribute('checked');
            }
	    }else{
	    	this.setAttribute('checked',' ');
	    	for(var i = 0;i < checkBoxList.length;i++){
            	checkBoxList[i].setAttribute('checked',' ');
            }
	    };	
	}    
}

/* 删除框弹出 */
var deleteFuc = function(){
    var deleteList = document.getElementsByClassName('delete_box');
    var jd_win = document.getElementsByClassName('jd_win')[0];
    var win_dialog = document.getElementsByClassName('win_dialog')[0];
    var cancelBar = win_dialog.getElementsByClassName('cancel')[0];
    var submitBar = win_dialog.getElementsByClassName('submit')[0];

    var up_icon;
    for(var i = 0;i < deleteList.length;i++){
    	deleteList[i].onclick = function(){
    		jd_win.style.display = 'block';
            win_dialog.className = 'win_dialog jumpOut';

            var deleteObj = this;
            up_icon = deleteObj.getElementsByClassName('delete_box_top')[0];
            up_icon.style.transition = 'all 1s ease 0s'
            up_icon.style.webkitTransition = 'all 1s ease 0s'

            up_icon.style.transform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
            up_icon.style.webkitTransform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
    	}
    }

    cancelBar.onclick = function(){
    	jd_win.style.display = 'none';
    	win_dialog.className = 'win_dialog';
        
        up_icon.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)';
        up_icon.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)';
    	
    }

    submitBar.onclick = function(){
    	jd_win.style.display = 'none';
    	win_dialog.className = 'win_dialog';
        
        up_icon.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)';
        up_icon.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)';
    	
    }

}