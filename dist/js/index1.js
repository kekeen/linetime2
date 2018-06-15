$(document).ready(function(){
    //模块js初始化
    commonJs.fn.init();

});

var commonJs = $(window).commonJs || {};

commonJs.fn = {
    init : function(){
        var _this = this;
        _this.dropdown();
        _this.dropdup();
        _this.niceScroll();
        _this.editSubject();
        _this.editLabel();
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
    // bootstrap下拉框
    dropdup : function () {
        $('.dropdown,.dropup').on('click','.dropdown-menu li a', function(event) {
            var txt = $(this).text();
            $(this).parents('.dropdown-menu').siblings('.dropdown-toggle')[0].childNodes[0].nodeValue = txt + ' ';
        });
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
    },
    //编辑专题
    editSubject : function () {
        $('.nLeft .edit a').click(function () {
            //标注发生变化
            $('.labelBox .lTextarea').css({'width':'90%'});
            $('.labelBox .lEdit').css('display','inline-block')
        })
    },
    //编辑标注
    editLabel : function () {
        $('.labelBox .lEdit').click(function () {
            if($(this).find('span').text() == '编辑标注'){
                $('.lTextarea textarea').attr('disabled',false).css('background','rgba(255,255,255,0.2)');
                $('.lEdit span').text('保存标注');
            }else if($(this).find('span').text() == '保存标注'){
                $('.lTextarea textarea').attr('disabled',true).css('background','none');
                $('.lEdit span').text('编辑标注');
            }
        })
    }
    //点击底部导航选中对应新闻
    // clickHaveCon : function () {
    //     $('')
    // }

};

    // 时间控件
    lay('.time-range').each(function(){
        laydate.render({
            elem: this,
            type: 'datetime'
        });
    });

