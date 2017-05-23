package com.epai.core.service.buyer;

import com.epai.core.pojo.cart.BuyerCart;
import com.epai.core.pojo.product.Sku;
import com.epai.core.pojo.user.Buyer;

public interface BuyerService {
	public Buyer selectBuyerByUsername(String username);
	
	public void insertBuyerCartToRedis(BuyerCart buyerCart, String username);

	public BuyerCart selectBuyerCartFormRedis(String username);

	public Sku selectSkuById(Long id);
}
