var pageNo = 0;
var total = 0;
var isPage = 1;
var sort=""; 
var keys = decodeURI(decodeURI(getUrlParam("keys")));
var keysEn = decodeURI(decodeURI(getUrlParam("keysEn")));


$(function () {
    //排序点击
    $(".sortDiv>ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
	//排序部分
	$("#sortHeight").click(function(){
		sort="start_price/01";
		pageNo=0;
		getData();
	})
	$("#sortLow").click(function(){
		sort="start_price/02";
		pageNo=0;
		getData();
	})
	$("#sortMo").click(function(){
		sort="";
		pageNo=0;
		getData();
	});
    getData();
    setTimeout("setKeyValue()",300);
})
function setKeyValue(){
    if(keys!=null){$("#keyPro").val(keys)};
}
function getData() {
	$(".loadDiv").show();
    $.ajax({
        type: "post",
        url: searchKeywordsUrl,
        async: true,
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId,
            "wordname": keys,
            "engwordname": keysEn,
        	"sort":sort,
            "pageNo": ++pageNo,
            "pageSize": 60
        },
        error: function () {
            $(".loadDiv").hide();
        },
        success: function (data) {
        	if(data.code=="0000"){
	            var totalCount = data.totalCount;
	            $("#totalNum").html(totalCount);
	            total = Math.ceil(totalCount / 60);
	            var content = '';
	            if (data.goods.length > 0) {
	                for (var i = 0; i < data.goods.length; i++) {
	                    var pkId = data.goods[i].pkId;
	                    var lotNum = data.goods[i].lotNum;
	                    var thumbnailUrl = data.goods[i].thumbnailUrl;
	                    var goodsName = data.goods[i].goodsName;
	                    var priceUnit = data.goods[i].priceUnit;
	                    var startPrice = data.goods[i].startPrice;
	                    var startTime = data.goods[i].startTime;
	                    var estimateMin = data.goods[i].estimateMin!=null?data.goods[i].estimateMin:0;
	                    var estimateMax = data.goods[i].estimateMax!=null?data.goods[i].estimateMax:0;
	                    content += '<dl>' +
	                        '<a href="detail.html?goodId=' + pkId + '" target="_blank">' +
	                        '<dt><img src="' + thumbnailUrl + '" /></dt>' +
	                        '<dd>' +
	                        '<p >' +"Lot "+lotNum+": "+ goodsName + '</p>' +
	                        '<p class="auctionListP1">起拍价：<span>' + priceUnit + '</span><span>' + startPrice + '</span></p>' +
	                        '<p class="auctionListP2">估计报价：<span>'+priceUnit+estimateMin+"-"+priceUnit+estimateMax+'</span></p>' +
	                        '<p>开拍时间：<span>' + startTime + '</span></p>' +
	                        '</dd>' +
	                        '</a>' +
	                        '</dl>';
	
	                }
	                $(".auctionList").html(content);
	                $(".loadDiv").hide();
	                if (isPage == 1) {
	                    $("#selectPage").html("");
	                    for (var i = 0; i < total; i++) {
	                        $("#selectPage").append("<option value='" + (i) + "'>第" + (i + 1) + "页</option>");
	                    }
	                }
	                isPage = 0;
	                var page = pageNo;
	                document.addEventListener('DOMContentLoaded', init(total, page), false);
	            } else {
	                $(".auctionList").append('<p style="font-size:12px; text-align:center;">暂无数据！</p>');
	                document.addEventListener('DOMContentLoaded', init(1, 1), false);
	                $("#selectPage").html("");
	                $(".loadDiv").hide();
	            }
            }else{
            	 $(".auctionList").append('<p style="font-size:12px; text-align:center;">查询数据失败！</p>');
                document.addEventListener('DOMContentLoaded', init(1, 1), false);
                $("#selectPage").html("");
                $(".loadDiv").hide();
            }
        }
    });
}
function getPageFresh(number) {
    pageNo = --number;
    getData();
}
function changeColor(page) {
    ++page;
    document.addEventListener('DOMContentLoaded', init(total, page), false);
    pageNo = --page;
    getData();
}