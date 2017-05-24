package com.epai.core.controller.product;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.common.web.Constants;
import com.epai.core.pojo.product.Brand;
import com.epai.core.pojo.product.Color;
import com.epai.core.pojo.product.Product;
import com.epai.core.pojo.product.Sku;
import com.epai.core.service.ad.AdService;
import com.epai.core.service.product.CmsService;
import com.epai.core.service.product.SearchService;

import cn.itcast.common.page.Pagination;
/*
 * 首页
 */
@Controller
public class ProductController {
	@Autowired
	private SearchService searchService;
	@Autowired
	private CmsService cmsService;
	
	@Autowired
	private AdService adService;
	
	@RequestMapping("/")
	public String index(Model model){
		//String ads = adService.selectAdList(Constants.AD_BIG_POSITION_ID);
		//model.addAttribute("ads", ads);
		return "index";
	}
	@RequestMapping("/search")
	public String list(Integer pageNo,String keyword,Long brandId,String price,Model model) throws Exception{
		//加载品牌结果集,从redis中查询
		/*List<Brand> brands = searchService.selectBrandList();
		model.addAttribute("brands", brands);
		
		Pagination pagination = searchService.selectPaginationByQuery(pageNo, keyword,brandId,price);
		model.addAttribute("pagination", pagination);
		model.addAttribute("keyword", keyword);
		model.addAttribute("brandId", brandId);
		model.addAttribute("price", price);
		
		//创建map已选条件过滤
		Map<String,String> map = new LinkedHashMap<>();
		if(null != brandId){
			for(Brand brand:brands){
				if(brandId.equals(brand.getId())){
					map.put("品牌", brand.getName());
					break;
				}
			}
		}
		if(null != price){
			if(price.contains("-")){
				map.put("价格", price);
			}else{
				map.put("价格", price+"以上");
			}
		}
		
		model.addAttribute("map", map);*/
		return "search";
	}
	@RequestMapping("/product/detail")
	public String detail(Long id,Model model){
		Product product = cmsService.selectProductById(id);
		model.addAttribute("product", product);
		List<Sku> skus = cmsService.selectSkuListByProductId(id);
		Set<Color> colors = new HashSet<>();
		for (Sku sku:skus) {
			colors.add(sku.getColor());
		}
		model.addAttribute("colors", colors);
		model.addAttribute("skus", skus);
		return "product";
	}
}
