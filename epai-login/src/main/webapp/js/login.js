$(function(){ 
	
	$(".header_li2,.header_div2").hover(function(){
		$(".header_div2").stop().slideDown();
	},function(){
		$(".header_div2").stop().slideUp();
	})
	$(".loginUl li").click(function(){
		$(".loginUl li").removeClass("active").eq($(this).index()).addClass("active");
	})
	$(".loginUlLi1").click(function(){
		$(".loginDiv").show();
		$(".registerDiv").hide();
		getValidateImg();
	})
	$(".loginUlLi2").click(function(){
		$(".registerDiv").show();
		$(".loginDiv").hide();
		getValidateImg();
	})
	var type= getUrlParam("type");
	if(type=="register"){
		$(".loginUl li").removeClass("active");
		$(".loginUlLi2").addClass("active");
		$(".registerDiv").show();
		$(".loginDiv").hide();
	}
	//注册协议
	var $winheight = $(window).height();
	var $winwidth = $(window).width();
	var $xieyiHeight = $(".xieyi").height();
	var $xieyiWidth = $(".xieyi").width();
	var $top = parseFloat(($winheight - $xieyiHeight) / 2);
	var $left = parseFloat(($winwidth - $xieyiWidth) / 2);
	$(".xieyi").css({
		"top": $top,
		"left": $left
	});
	
	$(".registerCheck a").bind("click",function(){
		$(".addressShade").fadeIn();
		$(".xieyi").fadeIn();
		
	});	
	$(".xieyiBtn button").bind("click",function(){ 
		$(".xieyi").fadeOut();  
		$(".addressShade").fadeOut();
	});
	$(".xieyiHeader xieyiClose").bind("click",function(){ 
		$(".xieyi").fadeOut();  
		$(".addressShade").fadeOut();
		closeBox();
	});
	//登录注册成功
	var $loginSucHeight = $(".loginSuc").height();
	var $loginSucWidth = $(".loginSuc").width();
	var $top2 = parseFloat(($winheight - $loginSucHeight) / 2);
	var $left2 = parseFloat(($winwidth - $loginSucWidth) / 2);
	$(".loginSuc").css({
		"top": $top2,
		"left": $left2
	});
	$("#picCodeImgLoginInt").keyup(function(event){
		  if(event.keyCode ==13){
			  subLogin();
		  }
	});
	//获取推荐码的值
	/*var regCode=getUrlParam("regCode");
	$("#regCode").val(regCode);
	getValidateImg();*/
});

//倒计时
/*var validCode=true;
function getVal(){
	var time=60;
	var code=$("#getCode");
	if (validCode) {
		validCode=false;
		//code.addClass("testingGet2");
        $("#getCode").attr("onclick","null");
	var t=setInterval(function  () {
			time--;
			code.html(time+"秒");
			if (time==0) {
                $("#getCode").attr("onclick","getcode()");
				clearInterval(t);
			code.html("重新发送");
				validCode=true;
			//code.removeClass("testingGet2");
			}
		},1000);
	}
}*/
var namekey = "userName";                  
var userkey = "userId";
var tokenkey = "tokenId";
var mobilekey = "mobile";
var isManagerkey="isManager";
var isChannelkey="isChannel";
var storage = window.localStorage;
//去注册
function getRegisterData(){
	$("#errorRegister").html("");
	if(document.getElementById("agreeCheck").checked==false){				
		$("#errorRegister").html("协议没选中");
		return false;
	}		
	if(checkUsername1()&&checkPassword()&&checkRepassword()&&checkEmail()){
		var pwd=$("#registerPassword").val();
		//var pwdmd5= hex_md5(pwd);
		var repassword=$("#repassword").val();
		//var mobile = $("#registerUserName").val();
		//var validate = $("#validate").val();
		//var picCode=$("#picCode").val();
		//var regCode=$("#regCode").val();
		//var verificationCodeTemp=$("#verificationCodeTemp").val();
		//var urlLoction=document.referrer;
		if(pwd==repassword){
			alert("heihei");
			$("#registerForm").submit();
		}else{
			alert("两次密码输入不一致");
		}
	}
}

//获取短信验证码
// function getcode(){
// 	if(checkMobile()){
// 		var mobile = $("#registerUserName").val();
// 		var picCode=$("#picCode").val();
//         var verificationCodeTemp=$("#verificationCodeTemp").val();
// 		if(picCode ==""){
// 			alert("请输入图片中的验证码");
// 			return;
// 		}
// 		if(mobile!=null&&mobile!=""&&mobile!=undefined){
// 			$.ajax({
// 				cache : true,
// 				type : "post",
// 				url : VerificationCodeUrl,
// 				data : {
// 					"sourceMode":"PC",
// 					"mobile":mobile,
// 					"picCode":picCode,
//                     "verificationCodeTemp":verificationCodeTemp
// 				},
// 				dataType : "text",
// 				error : function() {
// 					//alert("出现错误，请联系管理员");
// 				},
// 				success : function(data) {
// 					var data = eval("("+data+")");
// 					if(data.code=="0000"){
// 						getVal();
// 						$("#errorRegister").html("验证码已发送");
//
// 					}else{
//                         getValidateImg();
// 						alert(data.message);
// 					}
// 				}
// 			});
//
// 		}else{
// 			alert("手机号码有误，请确认");
// 		}
// 	}
// }
//获取图片验证码
/*function getValidateImg(){
//	$("#picCodeImg ,#picCodeImgLogin").attr("src",ValidateImgUrl+"?n="+Math.floor(Math.random()*100));
	$.ajax({
        type: "POST",
        url:VerificationCodeTempUrl,
        dataType : "json",
        success: function(msg){
            $("#verificationCodeTemp").val(msg);
            $("#verificationCodeTempLogin").val(msg);
            $("#picCodeImg ,#picCodeImgLogin").attr('src', ValidateImgUrl+"?getVerificationCodeTemp="+msg+"&n="+Math.floor(Math.random()*100));
        }
    });
}   */

// 登录方法
function subLogin() {
    if(CheckLog()){
        $("#loginForm").submit();
    }
}
/*function subLogin(){
	if(CheckLog()){
		var mobile = $("#username").val();
		var pwd=$("#password").val();
		var pwdmd5= hex_md5(pwd);
		var picCode=$("#picCodeImgLoginInt").val();
		var verificationCodeTempLogin=$("#verificationCodeTempLogin").val();
		var urlLoction=document.referrer;
		//alert(urlLoction);
	 	$.ajax({
			type : "post",
			url:loginUrl,
			dataType : "json",
			data : {
				"sourceMode":"PC",
				"userID":userId,
				"tokenId":tokenId,
				"mobile":mobile,
				"pwd":pwdmd5,
				"picCode":picCode,
				"verificationCodeTemp":verificationCodeTempLogin
			},
		    error : function(result){
		    	storage.setItem(userkey, result.userID);  
			    storage.setItem(tokenkey, result.tokenId);  
			    storage.setItem(namekey, result.userName);
                storage.setItem(mobilekey, result.mobile);
                storage.setItem(isManagerkey, result.isManager);
                storage.setItem(isChannelkey, result.isChannel);
            },
			success : function(data) {
		       if(data.code == "0000"){
		    	   storage.setItem(userkey, data.userID);  
		    	   storage.setItem(tokenkey, data.tokenId);  
		    	   storage.setItem(namekey, data.userName);
                   storage.setItem(mobilekey, data.mobile);
                   storage.setItem(isManagerkey, data.isManager);
                   storage.setItem(isChannelkey, data.isChannel);
		    	   //alert(data.url);
		    	   if(urlLoction.indexOf("detail.html") > -1){
		    	   		self.location=document.referrer;
		    	   }else if(urlLoction.indexOf("lightDetail.html") > -1){
		    	   		self.location=document.referrer;
		    	   }else{
		    	   		window.location.href="mine.html";
		    	   }
				}
		       	else{
                    getValidateImg();
		    	    alert(data.message);
		       	}
		   	}
		});
	}
}*/

function closeBox() {
    promptHide();
    $("#agreeCheck").prop("checked", "checked");
}