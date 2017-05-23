package com.epai.core.service.product.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epai.core.dao.product.ColorDao;
import com.epai.core.dao.product.SkuDao;
import com.epai.core.pojo.product.Color;
import com.epai.core.pojo.product.Sku;
import com.epai.core.pojo.product.SkuQuery;
import com.epai.core.service.product.SkuService;

@Service("skuService")
@Transactional
public class SkuServiceImpl implements SkuService{
	@Autowired
	private SkuDao skuDao;
	@Autowired
	private ColorDao colorDao;
	
	@Override
	public List<Sku> queryListById(Long productId){
		SkuQuery skuQuery = new SkuQuery();
		skuQuery.createCriteria().andProductIdEqualTo(productId);
		List<Sku> skus = skuDao.selectByExample(skuQuery);
		for (Sku sku : skus) {
			Color color = colorDao.selectByPrimaryKey(sku.getColorId());
			sku.setColor(color);
		}
		return skus;
		
	}

	@Override
	public void saveSku(Sku sku) {
		skuDao.updateByPrimaryKeySelective(sku);
	}
	
	
}
