package com.epai.core.service.product;

import java.util.List;

import com.epai.core.pojo.product.Product;
import com.epai.core.pojo.product.Sku;

public interface CmsService {

	Product selectProductById(Long id);

	List<Sku> selectSkuListByProductId(Long id);

}
