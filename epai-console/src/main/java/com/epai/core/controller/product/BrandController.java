package com.epai.core.controller.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.core.pojo.product.Brand;
import com.epai.core.service.product.BrandService;

import cn.itcast.common.page.Pagination;

@Controller
@RequestMapping(value="/brand")
public class BrandController {
	
	@Autowired
	private BrandService brandService;
	
	@RequestMapping(value="/list.do")
	public String index(Integer pageNo,String name,Integer isDisplay,Model model){
		//List<Brand> brandList = brandService.queryBrandListByQuery(name, isDisplay);
		//model.addAttribute("brandList", brandList);
		Pagination pagination = brandService.queryBrandListByPagination(pageNo, name, isDisplay);
		//回显数据
		model.addAttribute("pagination", pagination);
		model.addAttribute("name", name);
		model.addAttribute("isDisplay", isDisplay);
		return "brand/list";
	}
	@RequestMapping(value="/toEdit.do")
	public String index(Long id,Model model){
		Brand brand = brandService.queryBrandById(id);
		model.addAttribute("brand", brand);
		return "brand/edit";
	}
	@RequestMapping(value="/editSubmit.do")
	public String editSubmit(Brand brand){
		brandService.updateBrandById(brand);
		return "redirect:/brand/list.do";
	}
	@RequestMapping(value="/deletes.do")
	public String deletes(Long[] ids){
		brandService.deletes(ids);
		
		return "forward:/brand/list.do";
	}
}
