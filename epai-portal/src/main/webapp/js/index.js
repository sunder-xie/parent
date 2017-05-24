$(document).ready(function () {
    //banner
    //getBanner();
    BannerLun();
    //引入猜你喜欢
    $(".love").load("love.html");
    //今日推荐
   // getToday();
    //闪购
   // getLight();
    //拍卖会专区
    //getAuction();
    //艺术品
    //getArt();
    //名表
    //getWatch();
    //珠宝
    //getJewel();
    //乐器
   // getMusic();
    //收藏品
    //getCollect();
    //老爷车
    //getCar();
    //手表品牌效果
	$(".watchLogo dl").hover(function(){
		$(this).children("dd").addClass("hover");
        $(this).children("dd").find(".span_l").animate({"height": "92px", "width": "182px"}, 300);
        $(this).children("dd").find(".span_r").animate({"height": "92px", "width": "182px"}, 300);
	},function(){
		$(this).children("dd").removeClass("hover");
		$(this).children("dd").find(".span_l").animate({"height":"0","width":"0px"},0);
		$(this).children("dd").find(".span_r").animate({"height":"0","width":"0px"},0);
	})

//banner

});

var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg","ucweb", "skyfire");
var browser = navigator.userAgent.toLowerCase(); 
var isMobile = false; 
for (var i=0; i<mobileAgent.length; i++){ 
	if (browser.indexOf(mobileAgent[i])!=-1){ 
		isMobile = true; 
		location.href = 'http://www.pecoo.com/pecooh5/index.html';
	} 
} 
//banner
function getBanner() {
    $.ajax({
        url: queryBannerUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "01"
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var data = data.banners;
            if (data != "" && data != null) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
//				var content='<li style=" background-color:'+data[i].picBg+'">'+
//			 				'<div class="banner-container">'+
//			                ' <a href="'+data[i].webUrl+'" target="_blank">'+
//			                '<img src="'+data[i].picUrlSub+'" class="mts_big"/>'+
//			                ' <img src="'+data[i].picUrl+'" class="mts_small">'+
//			                '</a>'+
//			 				'</div>'+
//			 				'</li>';
                        var content = '<li bgColor="' + data[i].picBg + '">' +
                            '<a href="' + data[i].webUrl + '">' +
                            '<img src="' + data[i].picUrl + '" />' +
                            '</a>' +
                            '</li>';
                        var contentNum = '<li><a href="javascript:void(0);"></a></li>';
                        $("#bannersUl").append(content);
//			 	$("#bannerNum").append(contentNum);
                        BannerLun();
                    }
                }
            }
        }
    });
}

//今日推荐data-original
function getToday() {
    $.ajax({
        url: queryQualityGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var data = data.goods;
            if (data != "" && data != null) {
                if (data.length > 0) {
                    for (var i = 0; i < 8; i++) {
                        var content = '<dl>' +
                            '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<dt>' +
                            '<img src="' + data[i].thumbnailUrl + '" title="' + data[i].goodsName + '"/>' +
                            '</dt>' +
                            '<dd>' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '<p class="toadyDivDdP2">' +
                            '起拍价：<span>' + data[i].priceUnit + '' + data[i].startPrice + '</span>' +
                            '</p>' +
                            '</dd>' +
                            '</a>' +
                            '</dl>';
                        $("#todayDiv").append(content);
                    }
                }
            }
        }
    });
}
function BannerLun() {
    //jquery代理对象，因为反复要使用
    var $banner = $('#banners');
    var $nums = $('#bannerNum li');
    var $banners = $('#bannersUl li');
    //默认从0个广告开始显示
    var index = 0;
    //广告中间的块，移上去左右按钮出来，计时器停止
    //移开的时候左右按钮消失，计时器继续
    $('#banners div.content').hover(function () {
        $('a.btn', this).show();
        window.clearInterval(interval);
    }, function () {
        $('a.btn', this).hide();
        interval = window.setInterval(changeBanner, 3000);
    });
    //改变广告
    function changeBanner(flag) {
        var $curr = $nums.eq(index);
        $curr.addClass('curr').siblings().removeClass('curr');
        var $target = $banners.eq(index);
        var bgColor = $target.attr('bgColor');
        $banner.css('background-color', bgColor);
        $target.stop().fadeIn().siblings().stop().hide();
        index = ++index % $nums.size();

    }

    var interval = window.setInterval(changeBanner, 3000);
    changeBanner();
    $nums.mouseover(function () {
        index = $(this).index();
        changeBanner();
    });
    $('#banners div.content a.prev').click(function () {
        var $prev = $nums.filter('.curr').prev();
        $prev = $prev.size() == 0 ? $nums.last() : $prev;
        $prev.trigger('mouseover');
    });
    $('#banners div.content a.next').click(function () {
        var $next = $nums.filter('.curr').next();
        $next = $next.size() == 0 ? $nums.first() : $next;
        $next.trigger('mouseover');
    });
}
//拍卖会专区
function getAuction() {
    $.ajax({
        url: queryQualityAuctionUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId
        },
        error: function () {
            // alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var data = data.auctions;
            if (data != "" && data != null) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var content = '<dl>' +
                            '<a href="auctionList.html?auctionId=' + data[i].pkId + '">' +
                            '<dt>' +
                            '<img class="lazy" src="' + data[i].auctionPic + '" />' +
                            '</dt>' +
                            '</a>' +
                            '<a href="auctionList.html?auctionId=' + data[i].pkId + '">' +
                            '<dd class="auctionDivDd2">' +
                            '<p class="auctionName">名称：<span>' + data[i].name + '</span></p>' +
                            '<p class="auctionAddress">地址：<span>' + data[i].address + '</span></p>' +
                            '<p class="auctionTime">开拍时间：<span>' + data[i].startTime + '</span></p>' +
                            '</dd>' +
                            '</a>' +
                            '</dl>';
                        $(".auctionDiv").append(content);
                    }
                }
            }
        }
    });
}
//闪购
function getLight() {
    $.ajax({
        url: queryQualityFlashGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "001"
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var data = indexToday.goods;
            if (data != "" && data != null) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var content = '<dl>' +
                            '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<dt>' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '" title="' + data[i].goodsName + '"/>' +
                            '</dt>' +
                            '<dd>' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '<p class="toadyDivDdP2">' +
                            '起拍价：<span>' + data[i].priceUnit + '' + data[i].startPrice + '</span>' +
                            '</p>' +
                            '</dd>' +
                            '</a>' +
                            '</dl>';
                        $("#lightDiv").append(content);
                    }
                }
            }
        }
    });

}

//艺术品
function getArt() {
    $.ajax({
        url: queryIndexPageGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "003"
        },
        error: function () {
            // alert("网络繁忙，请稍后再试!");
        },
        success: function (result) {
            var data = result.goods;
            var dataImg = result.picWeb;
            var dataLogo = result.childType;
            $("#artLeft").append('<a href="artList.html?kindCode=003"><img src="' + dataImg + '" /></a>');
            if (data != "" && data != null) {
                if (data.length > 0) {
                    var num = 6;
                    if(data.length < num){
                        num = data.length;
                    }
                    for (var i = 0; i < num; i++) {
                        var content = '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '"/>' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '</a>';
                        $("#artRight").append(content);
                    }
                }
            }
        }
    });
}
//名表
function getWatch() {
    $.ajax({
        url: queryIndexPageGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "004"
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (result) {
            var data = result.goods;
            var dataImg = result.picWeb;
            var dataLogo = result.childTypes;
            $("#watchLeft").append('<a href="artList.html?kindCode=004"><img src="' + dataImg + '" /></a>');
            if (data != "" && data != null) {
                if (data.length > 0) {
                    var num = 6;
                    if(data.length < num){
                        num = data.length;
                    }
                    for (var i = 0; i < num; i++) {
                        var content = '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '"/>' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '</a>';
                        $("#watchRight").append(content);
                    }
                    for (var i = 0; i < dataLogo.length; i++) {
                        var content = '<a href="artList.html?kindCode=' + dataLogo[i].code + '"target="_blank">' +
                            '<dl>' +
                            '<dt>' +
                            '<img class="lazy" src="' + dataLogo[i].picWeb + '" title="' + dataLogo[i].name + '" width="180" height="90" />' +
                            '</dt>' +
                            '<dd>' +
                            '<div>' +
                            '<span class="wz">' + dataLogo[i].name + '</span>' +
                            '<span class="span_l"></span>' +
                            '<span class="span_r"></span>' +
                            '</div>' +
                            '</dd>' +
                            '</dl>' +
                            '</a>';
                        $("#watchLogo").append(content);
                    }
                }
            }
        }
    });
}

//珠宝
function getJewel() {
    $.ajax({
        url: queryIndexPageGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "005"
        },
        error: function () {
            // alert("网络繁忙，请稍后再试!");
        },
        success: function (result) {
            var data = result.goods;
            var dataImg = result.picWeb;
            var dataLogo = result.childTypes;
            $("#jewelLeft").append('<a href="artList.html?kindCode=005"><img src="' + dataImg + '" /></a>');
            if (data != "" && data != null) {
                if (data.length > 0) {
                    var num = 6;
                    if(data.length < num){
                        num = data.length;
                    }
                    for (var i = 0; i < num; i++) {
                        var content = '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '"/>' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '</a>';
                        $("#jewelRight").append(content);
                    }
                    ;
                    for (var i = 0; i < dataLogo.length; i++) {
                        var content = '<a href="artList.html?kindCode=' + dataLogo[i].code + '"target="_blank">' +
                            '<dl>' +
                            '<dt>' +
                            '<img class="lazy" src="' + dataLogo[i].picWeb + '" title="' + dataLogo[i].name + '" width="180" height="90" />' +
                            '</dt>' +
                            '<dd>' +
                            '<div>' +
                            '<span class="wz">' + dataLogo[i].name + '</span>' +
                            '<span class="span_l"></span>' +
                            '<span class="span_r"></span>' +
                            '</div>' +
                            '</dd>' +
                            '</dl>' +
                            '</a>';
                        $("#jewelLogo").append(content);
                    }
                }
            }
        }
    });
}
//相机
function getMusic() {
    $.ajax({
        url: queryIndexPageGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "008"
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (result) {
            var data = result.goods;
            var dataImg = result.picWeb;
            var dataLogo = result.childTypes;
            $("#instrLeft").append('<a href="artList.html?kindCode=008"><img src="' + dataImg + '" /></a>');
            if (data != "" && data != null) {
                if (data.length > 0) {
                    var num = 6;
                    if(data.length < num){
                        num = data.length;
                    }
                    for (var i = 0; i < num; i++) {
                        var content = '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '" />' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '</a>';
                        $("#instrRight").append(content);
                    }
                }
            }
        }
    });
}
//老爷车
function getCar() {
    $.ajax({
        url: queryIndexPageGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "007"
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (result) {
            var data = result.goods;
            var dataImg = result.picWeb;
            var dataLogo = result.childTypes;
            $("#carLeft").append('<a href="artList.html?kindCode=007"><img src="' + dataImg + '" /></a>');
            if (data != "" && data != null) {
                if (data.length > 0) {
                    var num = 6;
                    if(data.length < num){
                        num = data.length;
                    }
                    for (var i = 0; i < num; i++) {
                        var content = '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '" />' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '</a>';
                        $("#carRight").append(content);
                    }
                }
            }
        }
    });
}
//收藏品
function getCollect() {
    $.ajax({
        url: queryIndexPageGoodsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "type": "006"
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (result) {
            var data = result.goods;
            var dataImg = result.picWeb;
            var dataLogo = result.childTypes;
            $("#collectLeft").append('<a href="artList.html?kindCode=006"><img src="' + dataImg + '" /></a>');
            if (data != "" && data != null) {
                if (data.length > 0) {
                    var num = 6;
                    if(data.length < num){
                        num = data.length;
                    }
                    for (var i = 0; i < num; i++) {
                        var content = '<a href="detail.html?goodId=' + data[i].pkId + '">' +
                            '<img class="lazy" src="' + data[i].thumbnailUrl + '" />' +
                            '<p>' + data[i].goodsName + '</p>' +
                            '</a>';
                        $("#collectRight").append(content);
                    }
                }
            }
        }
    });
}
//艺术品
/*function getArt(){
 var data=indexArt.goods;
 var dataImg=indexArt.picUrl;
 var dataLogo=indexArt.childType;
 $(".artLeft").append('<a href="javascript:;"><img src="'+dataImg+'" /></a>');
 for(var i=0; i<data.length; i++){
 var content='<a href="javascript:;">'+
 '<img class="lazy" data-original="'+data[i].thumbnailUrl+'" />'+
 '<p>'+data[i].goodsName+'</p>'+
 '</a>';
 $(".artRight").append(content);
 };
 for(var i=0; i<dataLogo.length; i++){
 var content='<a href="javascript:;"target="_blank">'+
 '<dl>'+
 '<dt>'+
 '<img class="lazy" data-original="'+dataLogo[i].picUrl+'" title="'+dataLogo[i].name+'" width="180" height="90" />'+
 '</dt>'+
 '<dd>'+
 '<div>'+
 '<span class="wz">'+dataLogo[i].name+'</span>'+
 '<span class="span_l"></span>'+
 '<span class="span_r"></span>'+
 '</div>'+
 '</dd>'+
 '</dl>'+
 '</a>';
 $(".watchLogo").append(content);
 }
 }*/
//头部固定搜索框
$(window).scroll(function () {
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrolltop > 100) {
        $(".index2Search").fadeIn();
    }
    else {
        $(".index2Search").fadeOut();
    }
})

//楼梯
var b = true

$(".stair li").not(".last").click(function () {
    $(".stair li").find("span").removeClass("active")
    $(this).find("span").addClass("active")
    var $index = $(this).index()
    $top = $(".div").eq($index).offset().top - 50;
    if (b) {
        b = false
        $("body,html").animate({scrollTop: $top}, 500, function () {
            b = true
        })

    }
})
//鼠标滚动事件
$(window).scroll(function () {
    var $t = $(this).scrollTop()
    if ($t >= 550) {
        $(".stairMain").fadeIn()
        $(".fix_right").fadeIn()
    }
    else {
        $(".stairMain").fadeOut()
        $(".fix_right").fadeOut()
    }
    if (b) {
        var arr = [];
        $(".div").each(function () {
            var $index = $(this).index()
            arr.push($index)
            var $height = $(this).offset().top + $(this).height() / 2;
            if ($t < $height) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i] == $index
                }
                $(".stair li").find("span").removeClass("active")
                $(".stair li").eq(i - 1).find("span").addClass("active")
                return false;
            }
        })
    }
})
//回到顶部
$(".lastTop").click(function () {
    $("body,html").animate({
        scrollTop: 0
    }, 500)
})