package com.epai.core.service.product.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epai.common.web.Constants;
import com.epai.core.dao.BrandMapper;
import com.epai.core.pojo.product.Brand;
import com.epai.core.pojo.product.BrandQuery;
import com.epai.core.service.product.BrandService;

import cn.itcast.common.page.Pagination;
import redis.clients.jedis.Jedis;

@Service(value="brandService")
@Transactional
public class BrandServiceImpl implements BrandService{
	
	@Autowired
	private BrandMapper brandMapper;
	
	@Autowired
	private Jedis jedis;
	
	public List<Brand> queryBrandListByQuery(String name,Integer isDisplay){
		BrandQuery brandQuery = new BrandQuery();
		if(null != name){
			brandQuery.setName(name);
		}
		if(null != isDisplay){
			brandQuery.setIsDisplay(isDisplay);
		}else{
			brandQuery.setIsDisplay(Constants.IS_DISPLAY_YES);//默认为1
		}
		return brandMapper.queryBrandListByQuery(brandQuery);
		
	}

	@Override
	public Brand queryBrandById(Long id) {
		
		return brandMapper.queryBrandById(id);
	}

	@Override
	public Pagination queryBrandListByPagination(Integer pageNo, String name, Integer isDisplay) {
		BrandQuery brandQuery = new BrandQuery();
		//当前页
		brandQuery.setPageNo(Pagination.cpn(pageNo));
		brandQuery.setPageSize(Constants.PAGE_NO);
		//拼接参数
		StringBuilder params = new StringBuilder();
		if(null != name){
			brandQuery.setName(name);
			params.append("name=").append(name);
		}
		if(null != isDisplay){
			brandQuery.setIsDisplay(isDisplay);
			params.append("&isDisplay=").append(isDisplay);
		}else{
			brandQuery.setIsDisplay(Constants.IS_DISPLAY_YES);//默认为1
		}
		//构建分页对象
		Pagination pagination = new Pagination(brandQuery.getPageNo(), brandQuery.getPageSize(), brandMapper.countBrandByQuery(brandQuery));
		//设置结果集
		//List<Brand> list = brandMapper.queryBrandListByQuery(brandQuery);
		pagination.setList(brandMapper.queryBrandListByQuery(brandQuery));
		//设置Url
		String url = "/brand/list.do";
		pagination.pageView(url,params.toString());
		return pagination;
	}

	@Override
	public void updateBrandById(Brand brand) {
		brandMapper.updateBrandById(brand);
		jedis.hset("brand", String.valueOf(brand.getId()), brand.getName());
	}

	@Override
	public void deletes(Long[] ids) {
		brandMapper.deletes(ids);
	}
}
