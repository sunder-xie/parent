package com.epai.core.controller.product;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.core.pojo.product.Sku;
import com.epai.core.service.product.SkuService;

@Controller
@RequestMapping("/sku")
public class SkuController {
	@Autowired
	private SkuService skuService;
	@RequestMapping("/list.do")
	public String list(Long productId,Model model){
		List<Sku> skus = skuService.queryListById(productId);
		model.addAttribute("skus", skus);
		return "sku/list";
	}
	@RequestMapping("/saveSku.do")
	public void saveSku(Sku sku,HttpServletResponse response) throws IOException{
		JSONObject jo = new JSONObject();
		try {
			skuService.saveSku(sku);
			jo.put("msg", "保存成功");
		} catch (Exception e) {
			jo.put("msg", "保存失败");
		}
		
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print(jo);
	}
}
