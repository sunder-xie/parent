package com.epai.core.service.product;

import java.util.List;

import com.epai.core.pojo.product.Brand;

import cn.itcast.common.page.Pagination;

public interface SearchService {
	public List<Brand> selectBrandList();
	
	Pagination selectPaginationByQuery(Integer pageNo, String keyword, Long brandId, String price)throws Exception;
	
	public void insertProductToSolr(Long id) throws Exception;
}
