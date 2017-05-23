package com.epai.core.controller.ad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.core.pojo.ad.Position;
import com.epai.core.service.ad.PositionService;

@Controller
public class PositionController {

	@Autowired
	private PositionService positionService;
	//广告
	@RequestMapping(value="/position/list.do")
	public String ad_list(String root,Model model){
		List<Position> ads = null;
		
		if(root == null){
			//初始化加载
			ads = positionService.selectPositionListByParentId(30L);
		}else{
			//广告子位置加载
			ads = positionService.selectPositionListByParentId(Long.parseLong(root));
		}
		
		model.addAttribute("list", ads);
		return "position/list";
	}
	//广告树
	@RequestMapping(value="/position/tree.do")
	public String ad_tree(String root,Model model){
		List<Position> ads = null;
		
		if("source".equals(root)){
			//初始化加载
			ads = positionService.selectPositionListByParentId(0L);
		}else{
			//广告子位置加载
			ads = positionService.selectPositionListByParentId(Long.parseLong(root));
		}
		
		model.addAttribute("list", ads);
		return "position/tree";
	}
}
