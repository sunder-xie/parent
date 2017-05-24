$(function () {
	var str=location.href;
	if(str.indexOf("kindCode=003")>-1){
		$(".pecooNav li:nth-child(5) a").css({
			"color":"#463B7F",
			"border-bottom": "2px solid #463B7F",
    		"padding-bottom": "4px"
		});
		$("#listName").html("艺术品");
		$(document).attr("title","艺术品");
	}
	if(str.indexOf("kindCode=004")>-1){
		$(".pecooNav li:nth-child(6) a").css({
			"color":"#463B7F",
			"border-bottom": "2px solid #463B7F",
    		"padding-bottom": "4px"
		});
		$("#listName").html("名表");
		$(document).attr("title","名表");
	}
	if(str.indexOf("kindCode=005")>-1){
		$(".pecooNav li:nth-child(7) a").css({
			"color":"#463B7F",
			"border-bottom": "2px solid #463B7F",
    		"padding-bottom": "4px"
		});
		$("#listName").html("珠宝");
		$(document).attr("title","珠宝");
	}
	if(str.indexOf("kindCode=006")>-1){
		$(".pecooNav li:nth-child(8) a").css({
			"color":"#463B7F",
			"border-bottom": "2px solid #463B7F",
    		"padding-bottom": "4px"
		});
		$("#listName").html("收藏品");
		$(document).attr("title","收藏品");
	}
	if(str.indexOf("kindCode=007")>-1){
		$(".pecooNav li:nth-child(9) a").css({
			"color":"#463B7F",
			"border-bottom": "2px solid #463B7F",
    		"padding-bottom": "4px"
		});
		$(".sortDiv").css("margin-top","0");
		$(".listDiv").hide();
		$("#listName").html("老爷车");
		$(document).attr("title","老爷车");
	}
	if(str.indexOf("kindCode=008")>-1){
		$(".pecooNav li:nth-child(10) a").css({
			"color":"#463B7F",
			"border-bottom": "2px solid #463B7F",
    		"padding-bottom": "4px"
		});
//		$(".sortDiv").css("margin-top","0");
//		$(".listDiv").hide();
		$("#listName").html("相机&乐器");
		$(document).attr("title","相机&乐器");
	}
	
    //搜索下拉框
    $(".headerInt").click(function () {
        $(".headCenUl").show();
    })
    $(".headCenUl li").click(function () {
        $(".headerInt").val($(this).find("a").html())
        $(".headCenUl").hide();
    })
    //拍品
    $(".paipinDiv,.headPaiDiv").hover(function () {
        $("#getOrderByUserHead").show();
    }, function () {
        $("#getOrderByUserHead").hide();
    });

    //二维码
    $(".headerLi1,.headerDiv1").hover(function () {
        $(".headerDiv1").stop().slideDown();
    }, function () {
        $(".headerDiv1").stop().slideUp();
    })
    $(".headerLi2,.headerDiv2").hover(function () {
        $(".headerDiv2").stop().slideDown();
    }, function () {
        $(".headerDiv2").stop().slideUp();
    })

    //搜索匹配
    $("#keyPro").blur(function () {
        setTimeout(function () {
            $("#matchingUl").hide();
        }, 800);
    })
    //三级菜单
    getMenu();
    //三级菜单
    $(".one").hover(function () {
        $(".menuShow dl").show();
    }, function () {
        $(".menuShow dl").hide();
    })
    $(".menuShow dl").on('click', function () {
        //alert(1)
    })
    $(".menuShow").on("mouseenter", "dl dt", function () {
        $(this).addClass("active");
        $(".menuShow dl").show();
        $(this).siblings().show();
        $(this).find("dd").hide();
        $(this).parent().siblings().find("dt").removeClass("active");
    });
    $(".menuShow").on("mouseleave", "dl dt", function () {
        $(".menuShow dd").hide();
        $(".menuShow dl").hide();
        $(".menuShow dl dt").removeClass("active");
    });

    $(".menuShow").on("mouseenter", "dl dd", function () {
        $(".menuShow dl").show();
        $(this).show();
        $(this).siblings().addClass("active");
    });
    $(".menuShow").on("mouseleave", "dl dd", function () {
        $(this).hide();
        $(".menuShow dl").hide();
        $(".menuShow dl dt").removeClass("active");
    });
    
    //加载站内信
    $("#messageNum").click(function () {
    })
    
});

//初始化页面信息
function initHeader(){
	getOrderByUser();
	//热门搜索列表
    getSearchKey();
    //站内信
    getMessNum();
}

//登出
function logout() {
    var storage = window.localStorage;
    delete storage.userId;
    delete storage.tokenId;
    delete storage.userName;
    window.location.href = "index.html"
}




//三级菜单
function getMenu() {
    $.ajax({
        url: SubwordsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "userID": userId,
            "tokenId": tokenId
        },
        error: function () {
            // alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var data = data.firstKinds;
            var content = "";
            var content2 = "";
            for (var i = 0; i < data.length; i++) {
                var data2 = data[i].secondKinds;
                if (data[i].code == 001) {
                    content += '<li><a href="light.html">' + data[i].name + '</a></li>';
                } else {
                    content += '<li><a href="artList.html?kindCode=' + data[i].code + '">' + data[i].name + '</a></li>';
                }
                content2 += '<dl>';
                content2 += '<dt>';
                content2 += '<strong><a href="artList.html?kindCode=' + data[i].code + '">' + data[i].name + '</a></strong>';
                content2 += '<p>';
                for (var j = 0; j < data2.length; j++) {
                    var data22 = data2[j].code.substring(0, 3);
                    if (data22 == 001) {
                        content2 += '<a target="_blank" href="lightList.html?kindCode=' + data2[j].code + '">' + data2[j].name + '</a>';
                    } else {
                        content2 += '<a target="_blank" href="artList.html?kindCode=' + data2[j].code + '">' + data2[j].name + '</a>';
                    }
                }
                content2 += '</p>';
                content2 += '</dt>';
                content2 += '<dd><ul>';
				content2 += '<li>';
				content2 += '<strong>分类</strong>';
				content2 += '<div class="float-list-cont">';
				for (var j = 0; j < data2.length; j++) {
					var data22 = data2[j].code.substring(0, 3);
					if (data22 == 001) {
                        content2 += '<a target="_blank" href="artList.html?kindCode=' + data2[j].code + '">' + data2[j].name + '</a>';
                    } else {
                        content2 += '<a target="_blank" href="artList.html?kindCode=' + data2[j].code + '">' + data2[j].name + '</a>';
                    }
				}
				content2 += '</div>';
				content2 += '</li>';
				content2 += '<ul>';
				for (var j = 0; j < data2.length; j++) {
					var data3 = data2[j].thirdKinds;
					if(data3.length>0){
						
						content2 += '<li><strong><a target="_blank" href="artList.html?kindCode=' + data2[j].code + '">' + data2[j].name + '</a></strong>';
						content2 += '<div class="float-list-cont">';
						for (var k = 0; k < data3.length; k++) {
							 content2 += '<a target="_blank" href="artList.html?kindCode=' + data3[k].code + '">' + data3[k].name + '</a>';
						}
						content2 += '</div></li>';
					}
				}
				content2 += '</ul></ul></dd>';
                content2 += '</dl>';
				
            }
            $("#oneMenu").html(content);
            $("#menuShow").html(content2);
        }
    });
}

function openNewWeb(url) {
    window.parent.location = url;
}

//搜索实现回车键
function entersearch() {
	var keys = $("#keyPro").val();
	if (keys != "") {
	    var event = window.event || arguments.callee.caller.arguments[0];
	    var srcElement = event.srcElement;
	    if (!srcElement) {
	        srcElement = event.target;
	    }
	    if (event.keyCode == 13) {
	        findProduct();
	    }
   	}
}

 
//友盟统计
//

//var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1261397730'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1261397730' type='text/javascript'%3E%3C/script%3E"));