var storage = window.localStorage;
var userId = storage.getItem("userId");
var tokenId = storage.getItem("tokenId");
var mobile = storage.getItem("mobile");
var isManager = storage.getItem("isManager");
var isChannel = storage.getItem("isChannel");
var pageSizeNum= 10;

$(document).ready(function(){
	//判断设备
	var ua = navigator.userAgent;
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	isMobile = isIphone || isAndroid;
	if(isMobile) {
	    $("body,html").css("width","1200px");
	}else{
	     $("body,html").css("width","100%");
	}

	//引入头部底部
	$(".header").load("head.html",null,function(response,status,xhr){
		 //改变登录注册
	    setTimeout("changeTitle()",100);
	    getOrderByUser();
		//热门搜索列表
	    getSearchKey();
	    //站内信
	    getMessNum();
	});
	$(".lightHeader").load("lightHead.html",null,function(response,status,xhr){
		 //改变登录注册
	    setTimeout("changeTitle()",100);
	});
	$(".footer").load("footer.html");
	//弹框居中
	if($(".promptDiv")){
		var promptDivLeft=($(window).width()-$(".promptDiv").width())/2+"px";
		$(".promptDiv").css("left",promptDivLeft);
	}
	if($("#pagination")){
		$("#pagination").click(function(){
			$("body,html").animate({
				scrollTop:0
			},200)
		});
	}
});
//加密
function compile(code)  
{    
   var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
   for(var i=1;i<code.length;i++){  
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
   }  
   //alert(escape(c));  
}  
//解密
function uncompile(code)  
{  
   code=unescape(code);  
   var c=String.fromCharCode(code.charCodeAt(0)-code.length);  
   for(var i=1;i<code.length;i++){  
   c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));  
   }  
   return c;  
} 
//搜索
function findProduct() {
    //getFanYi();
    var detailedDesc= "";
    var keys = $("#keyPro").val();
    if(!keys)keys = $("#keyProFix").val();
//  if(keys == ""||keys==undefined){
//  	alert("请输入搜索内容");
//  }
    if (keys != "" && keys!= undefined) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(reg.test(keys)){
            detailedDesc = clearString(keys);
            var str1= "20161219000034290" + detailedDesc + "12345678" +"mX438bSAQjZi519gosYP";
            var sign = MD5(str1);
            $.ajax({
                url : "http://api.fanyi.baidu.com/api/trans/vip/translate",
                dataType : "jsonp",
                jsonp:"callback",
                type : "get",
                async:false,
                data:{
                    "q": detailedDesc,
                    "appid": "20161219000034290",
                    "salt": "12345678",
                    "from": "auto",
                    "to": "en",
                    "sign": sign
                },
                success : function(data) {
                    var keysEn= "";
                    for(var keyNum in data){
                        if(keyNum == "trans_result"){
                            keysEn = data['trans_result'][0]['dst'];
                        }
                    }
                    window.location.href = "findProduct.html?keys=" + encodeURI(encodeURI(keys)) + "&keysEn="+encodeURI(encodeURI(keysEn));
                }
            });
        }else{
            window.location.href = "findProduct.html?keys=" + encodeURI(encodeURI(keys)) + "&keysEn="+encodeURI(encodeURI(keys));
        }
    }else{
    	alert("请输入搜索内容");
    }
}
//改变登录注册
function changeTitle() {
    var userId = storage.getItem("userName");
    if (userId != undefined && userId != "undefined" && userId != " ") {
        //getsfNum();
        $("#denglu").hide();
        $("#zhuce").hide(); 
        $("#yonghu").text(userId);
        $("#yonghu").show();
        $("#tuichu").show();
    }
}
//获取订单汇总信息
function getOrderByUser() {
    $.ajax({
        url: getOrderByUserUrl,
        type: "get",
        dataType: "text",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var data = eval("(" + data + ")");
            var content = "";

            if (data.orderRs && data.orderRs.length > 0) {
                for (var i = 0; i < data.orderRs.length; i++) {
                    var orderName = data.orderRs[i].orderName;
                    var orderType = data.orderRs[i].orderType;
                    var orderNo = data.orderRs[i].orderNo;
                    var urls = "mine.html?type="+orderType;
                    content += '<p onclick="openNewWeb(\'' + urls + '\')">' + orderName + '（<span id="shipai">' + orderNo + '</span>）</p>';
                }
                $("#getOrderByUserHead").html(content);
            }
        }
    })
}
//热门搜索列表
function getSearchKey() {
    $.ajax({
        url: KeywordsUrl,
        type: "get",
        dataType: "json",
        data: {
            "sourceMode":"PC",
            "userID": userId,
            "tokenId": tokenId
        },
        error: function () {
            //alert("网络繁忙，请稍后再试!");
        },
        success: function (data) {
            var dataList = data.linkkeyword;
            var dataLi = data.searchkeyword;
            $("#indexSearchKeyList").html("");
            $("#matchingUl").html("");
            for (var i = 0; i < dataLi.length; i++) {
                $("#indexSearchKeyList").append('<a target="_blank" href="' + dataLi[i].linkurl + '">' + dataLi[i].keywordname + '&nbsp;</a>')
            }
            for (var i = 0; i < dataList.length; i++) {
                $("#matchingUl").append('<li><a href="' + dataList[i].linkurl + '">' + dataList[i].keywordname + '</a></li>')
            }
        }
    })
}
//获取站内信数量
function getMessNum(){
	$.ajax({
        url :queryMyMessagesStateCountUrl,
        type: "post",
        dataType : "text",
        data : {
            "sourceMode":"PC",
            "tokenId":tokenId
        },
        error : function() {
            //alert("网络繁忙，请稍后再试!");
        },
        success:function(data){
            var data = eval("("+data+")");
            if(data.code == "0000"){
                var totalCount = data.messagesStateCount;
                $("#messageNum").html(totalCount);
            }
            else{
                //alert(data.message);
            }
        }
    });
}


function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null)
		return unescape(r[2]);
	return null;
}

function isLogin(){
    if(tokenId==undefined|| tokenId==""){
    	return false;
    }
    if(tokenId.length>0){
    	return true;
    }
}
//登出
function logout(){
	var storage = window.localStorage;
	 delete storage.userId;
	 delete storage.tokenId;
	 delete storage.userName;
	 window.location.href="index.html"
}

//获取登录保存信息
function getStorage(){
	var map={};
	//初始化
	var storage = window.localStorage;
	for(var pa in storage){
		map[pa]=storage[pa];
	}
	return map;
}


//弹框出现
function promptShow(){
	$(".promptDiv,.shadeBlack").show();
}
//弹框消失
function promptHide(){
	$(".promptDiv,.shadeBlack").hide();
}


//分页
var Pagination = {
    code: '',
    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },
    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },
    Last: function() {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },
    First: function() {
        Pagination.code += '<a>1</a><i>...</i>';
    },
    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
        getPageFresh(Pagination.page);
    },
    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
        getPageFresh(Pagination.page);
    },
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
        getPageFresh(Pagination.page);
    },
    Bind: function() {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },
    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },
    Buttons: function(e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },
    Create: function(e) {

        var html = [
            '<a class="glyphicon glyphicon-chevron-left"><</a>', // previous button
            '<span></span>',  // pagination container
            '<a class="glyphicon glyphicon-chevron-right">></a>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
        if($('.checkbox3')[0]!=undefined){
        	if($('.checkbox3')[0].checked){
	            $('.checkbox3')[0].checked = false;
	       }
        }
        
    }
};

function init(number,selected) {
    Pagination.Init(document.getElementById('pagination'), {
        size: number , // pages size
        page: selected,  // selected page
        step: 0   // pages before and after current
    });
};



//日期 毫秒数 转化 标准格式
function format(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

//防重复提交获得Token
function querySaveToken() {
    $.ajax({
        url: querySaveTokenUrl,
        type: "post",
        dataType: "json",
        data: {
            "sourceMode": "PC",
            "tokenId": tokenId
        },
        error: function () {
        },
        success: function (data) {
            $("#querySaveToken").val(data.token);
        }
    });
}


/**
 *   特殊字符转换
 * 	 1. + URL 中+号表示空格 %2B
 *   2. 空格 URL中的空格可以用+号或者编码 %20
 *   3. / 分隔目录和子目录 %2F
 *   4. ? 分隔实际的 URL 和参数 %3F
 *   5. % 指定特殊字符 %25
 *   6. # 表示书签 %23
 *   7. & URL 中指定的参数间的分隔符 %26
 *   8. = URL 中指定参数的值 %3D
 * @returns
 */
function clearString(s){
    s=s.replace(/\r\n/g,"");
    s=s.replace(/\n/g,"");
    var pattern = new RegExp("[`~!@#$^&*()=|{}\\[\\]<>/?~！@#￥……&*（）&;|{}‘；”“'，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}

function getFanYiQuery(detailedDesc){

}
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}

