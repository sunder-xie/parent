package com.epai.core.service.product;

import com.epai.core.pojo.product.Product;

import cn.itcast.common.page.Pagination;

public interface ProductService {

	Pagination queryProductListByPagination(Integer pageNo, String name, Long brandId, Boolean isShow);

	public void insertProduct(Product product);

	void isShow(Long[] ids) throws Exception;
}
