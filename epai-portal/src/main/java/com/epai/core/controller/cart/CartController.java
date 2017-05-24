package com.epai.core.controller.cart;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.epai.common.json.JsonUtils;
import com.epai.common.web.Constants;
import com.epai.common.web.RequestUtils;
import com.epai.core.pojo.cart.BuyerCart;
import com.epai.core.pojo.cart.BuyerItem;
import com.epai.core.pojo.product.Sku;
import com.epai.core.service.buyer.BuyerService;
import com.epai.core.service.session.SessionProvider;

@Controller
@RequestMapping("/shopping")
public class CartController {
	
	@Autowired
	private SessionProvider sessionProvider;
	
	@Autowired
	private BuyerService buyerService;
	
	@RequestMapping("/buyerCart")
	public String buyerCart(Long skuId,Integer amount,HttpServletRequest request,HttpServletResponse response){
		BuyerCart buyerCart = null;
		//1、	从Request当中获取Cookies
		Cookie[] cookies = request.getCookies();
		for (Cookie cookie : cookies) {
			if(Constants.BUYER_CART.equals(cookie.getName())){
				buyerCart = JsonUtils.JsonToPojo(cookie.getValue(), BuyerCart.class);
				break;
			}
		}
		if(null == buyerCart){
			buyerCart = new BuyerCart();
		}
		//追加购物项
		if(null != skuId && null != amount){
			Sku sku = new Sku();
			sku.setId(skuId);
			BuyerItem item = new BuyerItem();
			item.setAmount(amount);
			item.setSku(sku);
			buyerCart.addItem(item);
		}
		//获得登录用户
		String username = sessionProvider.getAttributeForUsername(RequestUtils.getCSESSION(request, response));
		if(null != username){
			//已登录,将购物车追加到redis中
			buyerService.insertBuyerCartToRedis(buyerCart,username);
			//清空cookie中的购物车
			Cookie cookie = new Cookie(Constants.BUYER_CART, null);
			cookie.setPath("/");
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}else{
			//未登录
			if(null != skuId && null != amount){
				Cookie cookie = new Cookie(Constants.BUYER_CART, JsonUtils.objectToJson(buyerCart));
				cookie.setMaxAge(60*60*24);
				cookie.setPath("/");
				response.addCookie(cookie);
			}
		}
		return "redirect:/shopping/toCart";
	}
	@RequestMapping("/toCart")
	public String toCart(HttpServletResponse response,HttpServletRequest request,Model model){
		BuyerCart buyerCart = null;
		//1、	从Request当中获取Cookies
		Cookie[] cookies = request.getCookies();
		for (Cookie cookie : cookies) {
			if(Constants.BUYER_CART.equals(cookie.getName())){
				buyerCart = JsonUtils.JsonToPojo(cookie.getValue(), BuyerCart.class);
				break;
			}
		}
		//获得登录用户
		String username = sessionProvider.getAttributeForUsername(RequestUtils.getCSESSION(request, response));
		if(null != username){
			//已登录,将购物车追加到redis中
			if(null != buyerCart){
				buyerService.insertBuyerCartToRedis(buyerCart,username);
				//清空cookie中的购物车
				Cookie cookie = new Cookie(Constants.BUYER_CART, null);
				cookie.setPath("/");
				cookie.setMaxAge(0);
				response.addCookie(cookie);
			}
			buyerCart = buyerService.selectBuyerCartFormRedis(username);
		}
		//装满购物车
		if(null != buyerCart){
			List<BuyerItem> items = buyerCart.getItems();
			for (BuyerItem item : items) {
				item.setSku(buyerService.selectSkuById(item.getSku().getId()));
			}
		}
		model.addAttribute("buyerCart", buyerCart);
		return "cart";
	}
}
