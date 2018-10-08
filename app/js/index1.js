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
        _this.togglePoint();
        _this.clickHaveCon();
        _this.mouseHover();
        _this.bigContent();
        _this.changeWidth();
        //_this.addReport();
        _this.chooseLabel();
        _this.addLabel();
        _this.changeLine();
    },
    // 下拉案例
    dropdown : function () {
        $('.select .sShow').click(function () {
            $('.sHide').slideToggle();
            $(".sUl").getNiceScroll().resize();
        })
        var speed = 30;
        var MyMar = null;
        var scroll_begin = document.getElementById("scroll_begin");
        var scroll_end = document.getElementById("scroll_end");
        var scroll_div = document.getElementById("scroll_div");
        var beginTxt = $('#scroll_begin .spanMargin:first-child').text();
        var beginLenght = beginTxt.length;
        clearInterval(MyMar);
        scroll_div.scrollLeft = 0;
        if(beginLenght< 12){
            clearInterval(MyMar);
            $('#scroll_begin .spanMargin:gt(0)').text('');
            scroll_end.innerHTML='';
        }else{
            clearInterval(MyMar);
            $('#scroll_begin .spanMargin').text(beginTxt);
            scroll_end.innerHTML=scroll_begin.innerHTML;
            setTimeout(ScrollImgLeft,100)
        }
        $('.sUl').on('click','li', function(event) {
            clearInterval(MyMar);
            scroll_div.scrollLeft = 0;
            $('#scroll_begin .spanMargin').empty();
            var val = $(this).text();
            var valLength = val.length;
            $('.sHide').slideUp();
            if(valLength < 12){
                scroll_div.scrollLeft = 0;
                $('#scroll_begin .spanMargin:first-child').text(val);
                scroll_end.innerHTML='';
            }else{
                scroll_div.scrollLeft = 0;
                $('#scroll_begin .spanMargin').text(val);
                scroll_end.innerHTML=scroll_begin.innerHTML;
                setTimeout(ScrollImgLeft,100)
            }
        });
            //点击空白下拉消失
        $('body').on('click',function(e){
            var target = $(e.target);
            if(target.closest('.select .sShow').length == 0 && target.closest('.sHide').length == 0 ){
                $('.sHide').slideUp();
            }
        });
        //文字横向滚动
        function ScrollImgLeft(){
            clearInterval(MyMar);
            function Marquee(){
                if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0)
                    scroll_div.scrollLeft-=scroll_begin.offsetWidth;
                else
                    scroll_div.scrollLeft++;
            };
            MyMar=setInterval(Marquee,speed);
            scroll_div.onmouseover = function(){
                clearInterval(MyMar);
            };
            scroll_div.onmouseout = function(){
                MyMar = setInterval(Marquee,speed);
            };
        }

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
        $('.descriptBox').niceScroll({
            cursorcolor: "#ccc",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "3px", //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            cursorborderradius: "3px",//以像素为光标边界半径
            autohidemode: false //是否隐藏滚动条
        });
        $('.iconWrap').niceScroll({
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
            var editText = $(this).text();
            //alert(editText);
            if(editText == '编辑专题'){
                $(this).addClass('haveEdit');
                $(this).text('取消编辑');
                //标注发生变化
                $('.labelBox .lTextarea').css({'width':'90%'});
                $('.labelBox .lEdit').css('display','inline-block');
                //新增报道发生变化
                var slideLength = $('.footer .swiper-slide').length;
                var addOne = '<li class="addNew"><i class="fa fa-plus-circle jia"></i>新增报道</li>';
                var addTwo = '<li class="holpPlace"></li><li class="addNew"><i class="fa fa-plus-circle jia"></i>新增报道</li>';
                var addThree = '<li class="holpPlace"></li><li class="holpPlace"></li><li class="addNew"><i class="fa fa-plus-circle jia"></i>新增报道</li>';
                $('.footer .swiper-slide').find('.holpPlace').remove();
                for(var i = 0; i < slideLength; i ++){
                    var conLength = $('.footer .swiper-slide:eq('+i+')').find('.haveCon').length;
                    if(conLength == '1'){
                        $('.footer .swiper-slide:eq('+i+')').find('ul').prepend(addTwo);
                    }else if(conLength == '2'){
                        $('.footer .swiper-slide:eq('+i+')').find('ul').prepend(addOne);
                    }else if(conLength == '0'){
                        $('.footer .swiper-slide:eq('+i+')').find('ul').prepend(addThree);
                    }
                }
            }else{
                $(this).removeClass('haveEdit');
                $(this).text('编辑专题');
                //标注发生变化
                $('.labelBox .lTextarea').css({'width':'100%'});
                $('.labelBox .lEdit').css('display','none');
                //新增报道发生变化
                var slideLength = $('.footer .swiper-slide').length;
                var addOnePlace = '<li class="holpPlace"></li>';
                var addTwoPlace = '<li class="holpPlace"></li><li class="holpPlace"></li>';
                var addThreePlace = '<li class="holpPlace"></li><li class="holpPlace"></li><li class="holpPlace"></li>';
                $('.footer .swiper-slide').find('.addNew').remove();
                $('.footer .swiper-slide').find('.holpPlace').remove();
                for(var i = 0; i < slideLength; i ++){
                    var conLength = $('.footer .swiper-slide:eq('+i+')').find('.haveCon').length;
                    if(conLength == '1'){
                        $('.footer .swiper-slide:eq('+i+')').find('ul').prepend(addTwoPlace);
                    }else if(conLength == '2'){
                        $('.footer .swiper-slide:eq('+i+')').find('ul').prepend(addOnePlace);
                    }else if(conLength == '0'){
                        $('.footer .swiper-slide:eq('+i+')').find('ul').prepend(addThreePlace);
                    }
                }
                //标注变化
                $('.lTextarea textarea').attr('disabled',true).css('background','none');
                $('.lEdit span').text('编辑标注');
            }
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
    },
    //展开收起重要报道
    togglePoint : function () {
        $('.control .conA').click(function () {
            if($(this).hasClass('up')){
                $(this).attr('title','收起重点内容');
                $(this).removeClass('up');
                //$('.newSubject .nRight').slideDown();
                $('.newSubject .nRight').show();
                $('.newSubject .nLeft').css('width','72%');
                //$('.newSubject .nLeft').css('width','71%');
                $('.nLeft .edit').css('right','0');
                $('.nLeft .caseBox').css('width','14.4rem');
                //放大内容发生变化
                $('.bigContent .cLeft').css('width','58%');
                $('.bigContent .cRight').css('width','42%');
            }else {
                $(this).attr('title','展开重点内容');
                $(this).addClass('up');
                //$('.newSubject .nRight').slideUp();
                $('.newSubject .nRight').hide();
                $('.newSubject .nLeft').css('width','98.5%');
                $('.nLeft .edit').css('right','0.8rem');
                $('.nLeft .caseBox').css('width','100%');
                //放大内容发生变化
                $('.bigContent .cLeft').css('width','68%');
                $('.bigContent .cRight').css('width','32%');
            }
        })
    },
    //点击底部选择对应的新闻
    clickHaveCon : function () {
        $('body').on('click', '.swiperIn .haveCon', function() {
            var childInd = $(this).index();
            var parentInd = $(this).closest('.swiper-slide').index();
            $(this).addClass('lActive').siblings().removeClass('lActive').closest('.swiper-slide').siblings().find('li').removeClass('lActive');
            $('.swiperIn .yellow').hide();
            $(this).closest('.swiperIn').find('.yellow').show();
            $('.caseBox ._con').removeClass('dActive');
            $('.caseBox .listDiv').eq(parentInd).find('._con').eq(childInd).addClass('dActive').siblings().removeClass('dActive');

            var slide = swiper.activeIndex;
            var newSlide1 = slide + 4;
            var newSlide2 = slide + 5;
            var moveSlide1 = slide + 1;
            var moveSlide2 = slide + 2;
            if(newSlide1 == parentInd){
                swiper.slideTo(moveSlide1);
            } if(newSlide2 == parentInd){
                swiper.slideTo(moveSlide2);
            }
        })
    },
    //鼠标经过对应新闻显示操作
    mouseHover : function () {
        $('body').on('mouseenter','.detailsDiv',function(){
            if($('.nLeft .edit a').hasClass('haveEdit')){
                $('.caseWrap .editDiv').hide();
                $(this).children('.editDiv').show();
            }else{
                $('.caseWrap .hoverDiv').hide();
                $(this).children('.hoverDiv').show();
            }
        })
        $('body').on('mouseleave','.detailsDiv',function(){
            $('.caseWrap .editDiv').hide();
            $('.caseWrap .hoverDiv').hide();
        })
    },
    //内容放大
    bigContent : function () {
        //点击内容上的案例
        $('body').on('click','.caseBox .detailsDiv',function(){
            var thisIndex = $(this).index();
            var fatherIndex = $(this).closest('.listDiv').index();
            $('.caseBox .detailsDiv').removeClass('dActive');
            $(this).addClass('dActive');
            $('.swiperIn .haveCon').removeClass('lActive');
            $('.footer .swiper-slide:eq('+fatherIndex+') li:eq('+thisIndex+')').addClass('lActive');
            $('.swiperIn .yellow').hide();
            $('.footer .swiper-slide:eq('+fatherIndex+')').find('.yellow').show();
            //计算当前点击第几个
            var detNum = 0;
            for(var i = 0; i < fatherIndex; i ++){
                detNum += $('.caseBox .listDiv:eq('+i+')').find('.detailsDiv').length;
            }
            var thisLength = 0;
            var allThisLenght = $('.caseBox .listDiv:eq('+fatherIndex+')').find('.detailsDiv').length;
            if(allThisLenght == '3'){
                thisLength = thisIndex + 1;
            }else if(allThisLenght == '2'){
                thisLength = thisIndex;
            }else if(allThisLenght == '1'){
                thisLength = 1;
            }
            detNum = parseInt(detNum) + parseInt(thisLength);
            var detNumEq = detNum - 1;
            //alert(detNumEq);
            //放大显示
            if(!$('.nLeft .edit a').hasClass('haveEdit')){
                $('.bigContent').show();
                $('.bigContent li:eq('+detNumEq+')').addClass('liShow').siblings().removeClass('liShow');
                $('.newSubject .nLeft .labelBox').css('background','#22528a');
            }
        })
        //点击底部导航
        $('body').on('click','.footer .haveCon',function(){
            var thisIndex = $(this).index();
            var fatherIndex = $(this).closest('.swiper-slide').index();
            $('.caseBox .detailsDiv').removeClass('dActive');
            $('.caseBox .listDiv:eq('+fatherIndex+') ._con:eq('+thisIndex+')').addClass('dActive');
            $('.swiperIn .haveCon').removeClass('lActive');
            $(this).addClass('lActive');
            //计算当前点击第几个
            var detNum = 0;
            for(var i = 0; i < fatherIndex; i ++){
                detNum += $('.footer .swiper-slide:eq('+i+')').find('.haveCon').length;
            }
            var thisLength = 0;
            var allThisLenght = $('.footer .swiper-slide:eq('+fatherIndex+')').find('.haveCon').length;
            if(allThisLenght == '3'){
                thisLength = thisIndex + 1;
            }else if(allThisLenght == '2'){
                thisLength = thisIndex;
            }else if(allThisLenght == '1'){
                thisLength = 1;
            }
            detNum = parseInt(detNum) + parseInt(thisLength);
            var detNumEq = detNum - 1;
            $('.bigContent li:eq('+detNumEq+')').addClass('liShow').siblings().removeClass('liShow');
        })
        //关闭放大
        $('.bigContent .bigClose').click(function () {
            $('.bigContent').hide();
            $('.newSubject .nLeft .labelBox').css('background','rgba(255, 255, 255, 0.2)');
        })
        //点击右边
        var footLength = $('.footer .haveCon').length;
        $('.bigContent .moveRight').click(function () {
            $('.footer .haveCon').removeClass('lActive');
            $('.caseBox .detailsDiv').removeClass('dActive');
            var showIndex = $('.bigContent .liShow').index();
            if(showIndex == footLength - 1){
                showIndex = footLength - 2;
            }
            showIndex = showIndex + 1;
            $('.bigContent .liShow').next().addClass('liShow').siblings().removeClass('liShow');
            $('.footer .haveCon:eq('+showIndex+')').addClass('lActive');
            $('.caseBox .detailsDiv:eq('+showIndex+')').addClass('dActive');
            //黄色干发生变化
            $('.swiperIn .yellow').hide();
            $('.footer .swiperIn').find('.lActive').closest('.swiper-slide').find('.yellow').show();
            //swiper向左移动
            var swiperIndex = $('.footer .swiperIn').find('.lActive').closest('.swiper-slide').index();
            var slide = swiper.activeIndex;
            var differSlide = parseInt(swiperIndex) - parseInt(slide);
            //alert(differSlide);
            var moveSlide = slide + differSlide - 4;
            if(differSlide > 0 || differSlide == 0){
                swiper.slideTo(moveSlide);
            }else if(differSlide < 0){
                swiper.slideTo(swiperIndex);
            }

        })
        //点击左边
        $('.bigContent .moveLeft').click(function () {
            $('.footer .haveCon').removeClass('lActive');
            $('.caseBox .detailsDiv').removeClass('dActive');
            var showIndex = $('.bigContent .liShow').index();
            if(showIndex == 0){
                showIndex = 1;
            }
            showIndex = showIndex - 1;
            $('.bigContent .liShow').prev().addClass('liShow').siblings().removeClass('liShow');
            $('.footer .haveCon:eq('+showIndex+')').addClass('lActive');
            $('.caseBox .detailsDiv:eq('+showIndex+')').addClass('dActive');
            //黄色干发生变化
            $('.swiperIn .yellow').hide();
            $('.footer .swiperIn').find('.lActive').closest('.swiper-slide').find('.yellow').show();
            //swiper向右移动
            var swiperIndex = $('.footer .swiperIn').find('.lActive').closest('.swiper-slide').index();
            var slide = swiper.activeIndex;
            var differSlide = parseInt(slide) - parseInt(swiperIndex);
            //alert(differSlide);
            var moveSlide = slide - differSlide - 1;//有时要减有时不用减
            var slide2 = slide + 4;
            var differSlide2 = parseInt(swiperIndex) - parseInt(slide);
            var moveSlide2 = parseInt(swiperIndex) - 4;
            if(differSlide > 0 || differSlide == 0){
                swiper.slideTo(moveSlide);
            }else if(differSlide2 > 0){
                swiper.slideTo(moveSlide2);
            }

        })
    },
    //动态改变案例排版,底部的宽度
    changeWidth : function () {
        //案例排版宽
        var listWidth = 3.6;
        var listLength = $('.caseBox .listDiv').length + 1;
        var caseWidth = listWidth * listLength;
        $('.caseBox .caseWrap').css('width',''+caseWidth+'rem');
        //底部宽
        var slideLength = $('.swiper-wrapper .swiper-slide').length - 3;
        var wraperWidth = listWidth * slideLength;
        $('.swiper-wrapper').css('width',''+wraperWidth+'rem');
        //曲线宽
        var curveLength = slideLength;
        var curveWidth = listWidth * curveLength + 0.3;
        $('.curveWrap').css('width',''+curveWidth+'rem');
    },
    //编辑报道里的标签，站点来源选择
    chooseLabel : function () {
        $('body').on('click','.list-right-btn1 a',function () {
            $('.list-right-btn2 a').removeClass('active');
            $(this).toggleClass('active');
        })
        $('body').on('click','.list-right-btn2 a',function () {
            $('.list-right-btn1 a').removeClass('active');
            $(this).parent('li').siblings().find('a').removeClass('active');
            $(this).toggleClass('active');
        })
        $('body').on('click','.list-right-btn3 a',function () {
            $(this).parent('li').siblings().find('a').removeClass('active');
            $(this).toggleClass('active');
        })
    },
    //编辑报道里的添加标签
    addLabel : function () {
        //选择图标
        $('body').on('click','.iconWrap .a',function () {
            $(this).addClass('aActive').siblings().removeClass('aActive');
        })
        //添加标签
        $('body').on('click', '.aControl .save', function() {
            var labelName = $(this).parent('.aControl').siblings('.name').find('.nInt').val();
            //alert(labelName);
            var activeLength = $(this).parent('.aControl').siblings('.iconWrap').find('.aActive').length;
            //alert(activeLength);
            var addLab = '<li class="site"><a href="javascript:;"><i></i>新增项可删<span>x</span></a></li>'
            if(labelName == ''){
                alert('标签名称不能为空');
            }else if (labelName != '' && labelName.length > 7) {
                alert('标签名称长度不对');
            }else if(activeLength == 0){
                alert('你还没选择图标');
            }else{
                $(this).closest('.edit-more-btn').siblings('.list-right-btn').append(addLab);
            }
        });
    },
    //textarea换行
    changeLine : function (){
        $('body').on('keydown','.fTxt',function(e){
            var txtVal = $(this).val();
            if(e.keyCode == 13){
                txtVal = txtVal + "\n";
            }
            $(this).val(txtVal);
        });
    },

};





