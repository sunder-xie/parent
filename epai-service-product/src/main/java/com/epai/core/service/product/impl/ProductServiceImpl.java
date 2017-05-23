package com.epai.core.service.product.impl;

import java.util.Date;
import java.util.List;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epai.common.web.Constants;
import com.epai.core.dao.product.ProductDao;
import com.epai.core.dao.product.SkuDao;
import com.epai.core.pojo.product.Product;
import com.epai.core.pojo.product.ProductQuery;
import com.epai.core.pojo.product.ProductQuery.Criteria;
import com.epai.core.pojo.product.Sku;
import com.epai.core.pojo.product.SkuQuery;
import com.epai.core.service.product.ProductService;

import cn.itcast.common.page.Pagination;
import redis.clients.jedis.Jedis;

@Service("productService")
@Transactional
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductDao productDao;
	@Autowired
	private SkuDao skuDao;
	@Autowired
	private Jedis jedis;
	@Autowired
	private SolrServer solrServer;
	@Autowired
	private JmsTemplate jmsTemplate;
	@Override
	public Pagination queryProductListByPagination(Integer pageNo, String name, Long brandId, Boolean isShow){
		ProductQuery productQuery = new ProductQuery();
		productQuery.setPageNo(Pagination.cpn(pageNo));
		productQuery.setPageSize(Constants.PAGE_NO);
		Criteria criteria = productQuery.createCriteria();
		StringBuilder params = new StringBuilder();
		/*if(pageNo != null){
			productQuery.setPageNo(Pagination.cpn(pageNo));
		}else{
			productQuery.setPageNo(5);
		}*/
		if(name != null){
			criteria.andNameLike("%"+name+"%");
			params.append("name=").append(name);
		}
		if(null != brandId){
			criteria.andBrandIdEqualTo(brandId);
			params.append("&brandId=").append(brandId);
		}
		if(null != isShow){
			criteria.andIsShowEqualTo(isShow);
			params.append("&isShow=").append(isShow);
		}else{
			criteria.andIsShowEqualTo(false);
			params.append("&isShow=").append(false);
		}
		
		Pagination pagination = new Pagination(productQuery.getPageNo(),
				productQuery.getPageSize(),
				productDao.countByExample(productQuery),
				productDao.selectByExample(productQuery));
		String url = "/product/list.do";
		pagination.pageView(url, params.toString());
		return pagination;
	}
	
	@Override
	public void insertProduct(Product product){
		//redis生成商品id
		Long id = jedis.incr("pno");
		product.setId(id);
		product.setIsShow(false);
		product.setIsDel(true);
		product.setCreateTime(new Date());
		productDao.insertSelective(product);
		
		for(String size : product.getSizes().split(",")){//遍历尺码
			for(String colorId:product.getColors().split(",")){
				Sku sku = new Sku();
				//商品ID
				sku.setProductId(product.getId());
				//颜色ID
				sku.setColorId(Long.parseLong(colorId));
				//尺码 
				sku.setSize(size);
				//市场价
				sku.setMarketPrice(0f);
				//售价
				sku.setPrice(0f);
				//运费
				sku.setDeliveFee(8f);
				//库存
				sku.setStock(0);
				//购买上限
				sku.setUpperLimit(200);
				
				sku.setCreateTime(new Date());
				
				skuDao.insertSelective(sku);
			}
		}
	}

	@Override
	public void isShow(Long[] ids) throws Exception {
		Product product = new Product();
		product.setIsShow(true);
		for (final Long id : ids) {
		product.setId(id);
		productDao.updateByPrimaryKeySelective(product);
		
		//activeMq
		jmsTemplate.send(new MessageCreator(){

			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(String.valueOf(id));
			}
			
		});			
		}
	}

}
