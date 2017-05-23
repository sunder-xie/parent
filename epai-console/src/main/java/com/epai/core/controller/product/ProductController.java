package com.epai.core.controller.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.core.pojo.product.Brand;
import com.epai.core.pojo.product.Color;
import com.epai.core.pojo.product.Product;
import com.epai.core.service.product.BrandService;
import com.epai.core.service.product.ColorService;
import com.epai.core.service.product.ProductService;

import cn.itcast.common.page.Pagination;
/*
 * 商品管理
 */
@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private BrandService brandService;
	@Autowired
	private ColorService colorService;
	@RequestMapping("/list.do")
	public String list(Integer pageNo,String name,Long brandId,Boolean isShow,Model model){
		List<Brand> brands = brandService.queryBrandListByQuery(null,1);
		Pagination pagination = productService.queryProductListByPagination(pageNo, name,brandId, isShow);
		//回显数据
		model.addAttribute("pagination", pagination);
		model.addAttribute("brands", brands);
		model.addAttribute("name", name);
		model.addAttribute("brandId", brandId);
		model.addAttribute("isShow", isShow);
		return "product/list";
	}
	@RequestMapping("/toAdd.do")
	public String toAdd(Model model){
		List<Brand> brands = brandService.queryBrandListByQuery(null,1);
		List<Color> colors = colorService.queryColorList();
		model.addAttribute("brands", brands);
		model.addAttribute("colors", colors);
		return "product/add";
	}
	@RequestMapping("/add.do")
	public String add(Product product,Model model){
		productService.insertProduct(product);
		return "redirect:/product/list.do";
	}
	@RequestMapping("/isShow.do")
	public String isShow(Long[] ids) throws Exception{
		//上架
		productService.isShow(ids);
		return "forward:/product/list.do";
	}
}
