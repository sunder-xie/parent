package com.epai.core.controller.ad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.core.pojo.ad.Ad;
import com.epai.core.service.ad.AdService;

@Controller
public class AdController {

	@Autowired
	private AdService adService;
	
	//大广告列表查询
	@RequestMapping("/ad/list.do")
	public String ad_big_list(Long root,Model model){
		List<Ad> ads = adService.selectAdListByParentId(root);
		model.addAttribute("ads", ads);
		return "ad/list";
	}
}
