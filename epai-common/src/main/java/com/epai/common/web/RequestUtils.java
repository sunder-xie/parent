package com.epai.common.web;

import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestUtils {
	//获取或生成令牌
	public static String getCSESSION(HttpServletRequest request,HttpServletResponse response){
		Cookie[] cookies = request.getCookies();
		if(null != cookies && cookies.length>0){
			for (Cookie cookie : cookies) {
				if("CSESSIONID".equals(cookie.getName())){
					
					return cookie.getValue();
				}
			}
		}
		//没有cookie,生成
		String csessionid = UUID.randomUUID().toString().replaceAll("-", "");
		Cookie cookie = new Cookie("CSESSIONID",csessionid);
		cookie.setMaxAge(-1);
		cookie.setPath("/");
		response.addCookie(cookie);
		return csessionid;
	}
}
