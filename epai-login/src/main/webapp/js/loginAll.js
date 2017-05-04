//登录
function CheckLog()
{
	if($("#username").val() == "")
	{
		//alert("请输入用户名！");
		$("#username").focus();
		$("#b1").css('display','block');
		$("#b1").html("请输入手机号！");
		return false;
	}
	if($("#password").val() == "")
	{
		//alert("请输入密码！");
		$("#password").focus();
		$("#b2").css('display','block');
		$("#b2").html("请输入密码！");
		return false;
	}
	return true;
	
	if($("#code").val() == "")
	{
		//alert("请输入密码！");
		$("#code").focus();
		$("#b3").css('display','block');
		$("#b3").html("请输入验证码！");
		return false;
	}
	return true;
}

//检测手机
function checkMobile(){
	var mobile = /(^1[3|4|5|7|8][0-9]{9}$)/;
	if($("#registerUserName").val() == ""){
		$("#registerUserName").focus();
		$("#errorRegister").html("手机号码不能为空！");
		return false;
	}else if(!mobile.test($("#registerUserName").val()))
	{
		$("#registerUserName").focus();
		$("#errorRegister").html("请输入正确手机号码");
		return false;
	}else{		
		return true;
	}
}

//检测用户名
//function checkUsername(){
//	var ckuname = /^[0-9a-zA-Z_@\.-]+$/;
//	if($("#registerUserName").val() == ""){
//		$("#registerUserName").focus();
//		$("#errorRegister").html("用户名不能为空！");
//		return false;
//	}else if($("#registerUserName").val().length < 6 || $("#registerUserName").val().length > 16){	
//		$("#registerUserName").focus();
//		$("#errorRegister").html("用户名长度为6~16位字符！"); 
//		return false;
//	}else if(!ckuname.test($("#registerUserName").val())){
//		$("#registerUserName").focus();
//		$("#errorRegister").html("用户名请使用[数字/字母]"); 
//		return false;
//	}else{       
//     return true;
//  }
//}
//检测密码
function checkPassword(){
	var ckupwd = /^[0-9a-zA-Z_-]+$/;
	if($("#registerPassword").val() == ""){
		$("#registerPassword").focus();
		$("#errorRegister").html("密码不能为空！");
		return false;
	}else if($("#registerPassword").val().length < 6 || $("#registerPassword").val().length > 16){
		$("#registerPassword").focus();
		$("#errorRegister").html("密码长度为6~16位字符！"); 
		return false;
	}else if(!ckupwd.test($("#registerPassword").val())){
		$("#registerPassword").focus();
		$("#errorRegister").html("密码请使用[数字/字母]"); 
		return false;
	}else{       
        return true;
    }	
}
//检测重复密码
function checkRepassword(){
	if($("#repassword").val() == ""){
		$("#repassword").focus();
		$("#errorRegister").html("确认密码不能为空！");
		return false;
	}
	else if($("#registerPassword").val() != $("#repassword").val()){
		$("#repassword").focus();
		$("#errorRegister").html("两次输入的密码不相同！");
		return false;
	}else{
		return true;
	}
}
//检测验证码
function checkValidate(){
	if($("#validate").val() == "")
	{
		$("#validate").focus();
		$("#errorRegister").html("验证码不能为空");
		return false;
	}
	else if($("#validate").val().length != 6){
		$("#validate").focus();
		$("#errorRegister").html("请输入正确验证码");
		return false;
	}else{
		return true;
	}
}
//截取url参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) 
		return unescape(r[2]); 
	return null;
}



