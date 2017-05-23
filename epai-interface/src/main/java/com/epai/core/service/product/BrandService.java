package com.epai.core.service.product;

import java.util.List;

import com.epai.core.pojo.product.Brand;

import cn.itcast.common.page.Pagination;

public interface BrandService {
	public List<Brand> queryBrandListByQuery(String name, Integer isDisplay);
	
	public Brand queryBrandById(Long id);
	
	Pagination queryBrandListByPagination(Integer pageNo, String name, Integer isDisplay);
	
	public void updateBrandById(Brand brand);
	
	public void deletes(Long[] ids);
}
