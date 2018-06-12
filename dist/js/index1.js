$(document).ready(function(){
    //模块js初始化
    commonJs.fn.init();

});

var commonJs = $(window).commonJs || {};

commonJs.fn = {
    init : function(){
        var _this = this;
        _this.dropdown();
        _this.niceScroll();
    },

    // 下拉案例
    dropdown : function () {
        $('.select .sShow').click(function () {
            $('.sHide').slideToggle();
        })
        $('.sUl').on('click','li', function(event) {
            var val = $(this).text();
            $('.sShow .tit').text(val);
            $('.sHide').slideUp();
        });
            //点击空白下拉消失
        $('body').on('click',function(e){
            var target = $(e.target);
            if(target.closest('.select .sShow').length == 0 && target.closest('.sHide').length == 0 ){
                $('.sHide').slideUp();
            }
        })
    },
    //美化滚动条
    niceScroll : function () {
        $('.sUl').niceScroll({
            cursorcolor: "#ccc",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "3px", //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            cursorborderradius: "3px",//以像素为光标边界半径
            autohidemode: false //是否隐藏滚动条
        });
    }

};