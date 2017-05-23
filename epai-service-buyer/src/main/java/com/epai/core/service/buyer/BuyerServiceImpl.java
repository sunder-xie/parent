package com.epai.core.service.buyer;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epai.core.dao.product.ColorDao;
import com.epai.core.dao.product.ProductDao;
import com.epai.core.dao.product.SkuDao;
import com.epai.core.dao.user.BuyerDao;
import com.epai.core.pojo.cart.BuyerCart;
import com.epai.core.pojo.cart.BuyerItem;
import com.epai.core.pojo.product.Sku;
import com.epai.core.pojo.user.Buyer;
import com.epai.core.pojo.user.BuyerQuery;

import redis.clients.jedis.Jedis;
/**
 * 用户管理
 * @author admin
 *
 */
@Service("buyerService")
public class BuyerServiceImpl implements BuyerService{
	@Autowired
	private BuyerDao buyerDao;
	
	@Autowired
	private SkuDao skuDao;
	
	@Autowired
	private ColorDao colorDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private Jedis jedis;
	
	public Buyer selectBuyerByUsername(String username){
		if(null != username){
			BuyerQuery buyerQuery = new BuyerQuery();
			buyerQuery.createCriteria().andUsernameEqualTo(username);
			List<Buyer> buyer = buyerDao.selectByExample(buyerQuery);
			if(null != buyer && buyer.size()>0){
				return buyer.get(0);
			}
		}
		return null;
	}
	public Sku selectSkuById(Long skuId){
		Sku sku = skuDao.selectByPrimaryKey(skuId);
		sku.setProduct(productDao.selectByPrimaryKey(sku.getProductId()));
		sku.setColor(colorDao.selectByPrimaryKey(sku.getColorId()));
		return sku;
	}
	
	public void insertBuyerCartToRedis(BuyerCart buyerCart,String username){
		//将购物车保存到redis中
		List<BuyerItem> items = buyerCart.getItems();
		for (BuyerItem item : items) {
			jedis.hincrBy("buyerCart:"+username, String.valueOf(item.getSku().getId()), item.getAmount());
		}
	}
	@Override
	public BuyerCart selectBuyerCartFormRedis(String username) {
		BuyerCart buyerCart = new BuyerCart();
		//从redis中获取购物车
		Map<String, String> hgetAll = jedis.hgetAll("buyerCart:"+username);
		Set<Entry<String,String>> entrySet = hgetAll.entrySet();
		for (Entry<String, String> entry : entrySet) {
			Sku sku = new Sku();
			sku.setId(Long.parseLong(entry.getKey()));
			BuyerItem item = new BuyerItem();
			item.setSku(sku);
			item.setAmount(Integer.parseInt(entry.getValue()));
			buyerCart.addItem(item);
		}
		return buyerCart;
	}
}
