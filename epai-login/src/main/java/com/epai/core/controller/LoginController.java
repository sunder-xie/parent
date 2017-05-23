package com.epai.core.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.epai.common.web.RequestUtils;
import com.epai.core.pojo.user.Buyer;
import com.epai.core.service.buyer.BuyerService;
import com.epai.core.service.session.SessionProvider;

@Controller
public class LoginController {
	@Autowired
	private BuyerService buyerService;
	@Autowired
	private SessionProvider sessionProvider;
	
	@RequestMapping(value="/login.aspx",method=RequestMethod.GET)
	public String login(String ReturnUrl,Model model){
		if(null == ReturnUrl){
			ReturnUrl = "localhost:8082";//portal
		}
		model.addAttribute("ReturnUrl", ReturnUrl);
		return "login";
	}
	@RequestMapping(value="/login.aspx",method=RequestMethod.POST)
	public String loginSubmit(String username,String password,String ReturnUrl,HttpServletRequest request,HttpServletResponse response,Model model){
		if(null != username){
			if(null != password){
				Buyer buyer = buyerService.selectBuyerByUsername(username);
				if(null != buyer){
					if(buyer.getPassword().equals(encodePass(password))){
						//登录成功,保存用户
						sessionProvider.setAttributeForUsername(RequestUtils.getCSESSION(request, response), username);
						return "redirect:"+ReturnUrl;
					}else{
						model.addAttribute("error", "密码错误");
					}
				}else{
					model.addAttribute("error", "用户名错误");
				}
			}else{
				model.addAttribute("error", "密码不能为空");
			}
		}else{
			model.addAttribute("error", "用户名不能为空");
		}
		return "login";
	}
	public String encodePass(String password){
		String algorithm = "MD5";
		char[] encodeHex = null;
		try {
			MessageDigest instance = MessageDigest.getInstance(algorithm);
			byte[] digest = instance.digest(password.getBytes());
			encodeHex = Hex.encodeHex(digest);
		} catch (NoSuchAlgorithmException e) {

			e.printStackTrace();
		}
		return new String(encodeHex);
	}
	@RequestMapping("/isLogin.aspx")
	public @ResponseBody MappingJacksonValue isLogin(String callback,HttpServletRequest request,HttpServletResponse response){
		Integer result = 0;
		String username = sessionProvider.getAttributeForUsername(RequestUtils.getCSESSION(request, response));
		if(null != username){
			result = 1;
		}
		MappingJacksonValue mjv = new MappingJacksonValue(result);
		mjv.setJsonpFunction(callback);
		return mjv;
	}
}
