package com.epai.core.service.product;

import java.util.List;

import com.epai.core.pojo.product.Sku;

public interface SkuService {

	List<Sku> queryListById(Long productId);

	void saveSku(Sku sku);
}
