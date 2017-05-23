package com.epai.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CenterController {

	@RequestMapping(value="control/index.do")
	public String index(){
		return "index";
	}
	
	@RequestMapping(value="control/main.do")
	public String main(){
		return "main";
	}
	
	@RequestMapping(value="control/top.do")
	public String top(){
		return "top";
	}
	@RequestMapping(value="control/left.do")
	public String left(){
		return "left";
	}
	@RequestMapping(value="control/right.do")
	public String right(){
		return "right";
	}
	
	//商品身体
	@RequestMapping(value="control/frame/product_main.do")
	public String product_main(){
		return "frame/product_main";
	}
	//商品身体-左
	@RequestMapping(value="control/frame/product_left.do")
	public String product_left(){
		return "frame/product_left";
	}
	//广告身体
	@RequestMapping(value="control/frame/ad_main.do")
	public String ad_main(){
		return "frame/ad_main";
	}
	//广告身体-左
	@RequestMapping(value="control/frame/ad_left.do")
	public String ad_left(){
		return "frame/ad_left";
	}

	//登录
	/*@RequestMapping(value="control/login.do")
	public String login(){
		return "login";
	}*/
	
	/*@Autowired
	private TestService testService;
	
	@RequestMapping(value="/test/index.do")
	public String show(){
		TB tb = new TB();
		tb.setName("于乐23");
		testService.insertTb(tb);
		return "index";
	}*/
}
