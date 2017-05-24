package com.epai.core.service.product.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epai.core.dao.BrandMapper;
import com.epai.core.dao.product.ProductDao;
import com.epai.core.dao.product.SkuDao;
import com.epai.core.pojo.product.Brand;
import com.epai.core.pojo.product.Product;
import com.epai.core.pojo.product.ProductQuery;
import com.epai.core.pojo.product.Sku;
import com.epai.core.pojo.product.SkuQuery;
import com.epai.core.service.product.SearchService;

import cn.itcast.common.page.Pagination;
import redis.clients.jedis.Jedis;

@Service("searchService")
public class SearchServiceImpl implements SearchService{

	@Autowired
	private SolrServer solrServer;
	
	@Autowired
	private Jedis jedis;
	
	@Autowired
	private ProductDao productDao;
	@Autowired
	private SkuDao skuDao;
	@Autowired
	private BrandMapper brandMapper;
	
	@Override
	public List<Brand> selectBrandList(){
		List<Brand> brands = null;
		Map<String, String> hgetAll = jedis.hgetAll("brand");
		if(hgetAll.size()>0&&hgetAll != null){
			Set<Entry<String,String>> entrySet = hgetAll.entrySet();
			if(null != entrySet && entrySet.size()>0){
				brands = new ArrayList<Brand>();
				for (Entry<String, String> entry : entrySet) {
					Brand brand = new Brand();
					brand.setId(Long.parseLong(entry.getKey()));
					brand.setName(entry.getValue());
					brands.add(brand);
				}
				return brands;
			}
		}
		
		//从数据库中加载全部品牌
		brands = brandMapper.queryBrandListByQuery(null);
		for(Brand brand:brands){
			//往redis中存一份
			jedis.hset("brand", String.valueOf(brand.getId()), brand.getName());
		}
		return brands;
	}
	@Override
	public Pagination selectPaginationByQuery(Integer pageNo, String keyword,Long brandId,String price) throws Exception {
		ProductQuery productQuery = new ProductQuery();
		//当前页
		productQuery.setPageNo(Pagination.cpn(pageNo));
		//每页数
		productQuery.setPageSize(10);
		SolrQuery solrQuery = new SolrQuery();
		StringBuilder params = new StringBuilder();
		if(null != keyword){
			solrQuery.setQuery("name_ik:"+keyword);
			params.append("keyword=").append(keyword);
		}
		if(null != brandId){
			solrQuery.addFilterQuery("brandId:"+brandId);
			params.append("&brandId=").append(brandId);
		}
		if(null != price){
			String[] split = price.split("-");
			if(split.length==2){
				solrQuery.addFilterQuery("price:["+split[0]+" TO "+split[1]+"]");
			}else{
				solrQuery.addFilterQuery("price:["+split[0]+" TO *]");
			}
			params.append("&price=").append(price);
		}
		//排序
		solrQuery.setSort("price", ORDER.asc);
		solrQuery.set("df", "name_ik");//设置查询域
		solrQuery.set("fl", "id,name_ik,url,price");
		//设置高亮
		solrQuery.setHighlight(true);
		solrQuery.addHighlightField("name_ik");
		solrQuery.setHighlightSimplePre("<span style='color:red'>");
		solrQuery.setHighlightSimplePost("</span>");
		//分页条件
		solrQuery.setStart(productQuery.getStartRow());//设置起始页
		solrQuery.setRows(productQuery.getPageSize());//设置总数
		
		QueryResponse queryResponse = solrServer.query(solrQuery);//执行查询
		SolrDocumentList docs= queryResponse.getResults();//取出结果集
		
		Map<String, Map<String, List<String>>> highlighting = queryResponse.getHighlighting();//取出高亮
		
		long numFound = docs.getNumFound();
		List<Product> products = new ArrayList<Product>();
		for (SolrDocument doc : docs) {
			Product product = new Product();
			
			String id = (String)doc.get("id");
			product.setId(Long.parseLong(id));
			product.setName((String)doc.get("name_ik"));
			product.setImgUrl((String)doc.get("url"));
			
			product.setPrice((Float)doc.get("price"));
			
			/*String a = (String)doc.get("brandId");
			System.out.println(a);
			
			long brandid = Long.parseLong(String.valueOf((Integer)doc.get("brandId")));
			product.setBrandId(brandid);*/
			
			//商品名称
			Map<String, List<String>> map = highlighting.get(id);
			List<String> list = map.get("name_ik");
			
			product.setName(list.get(0));
			
			products.add(product);
		}
		Pagination pagination = new Pagination(
				productQuery.getPageNo(), 
				productQuery.getPageSize(), 
				(int)numFound,
				products);
		String url = "/search";
		pagination.pageView(url, params.toString());
		return pagination;
	}
	
	//保存商品信息到Solr服务器中
	public void insertProductToSolr(Long id)throws Exception{
		SolrInputDocument doc = new SolrInputDocument();
		doc.setField("id", id);
		Product p = productDao.selectByPrimaryKey(id);
		doc.setField("name_ik", p.getName());
		doc.setField("brandId", p.getBrandId());
		doc.setField("url", p.getImgUrl());
		SkuQuery skuQuery = new SkuQuery();
		skuQuery.createCriteria().andProductIdEqualTo(id);
		skuQuery.setOrderByClause("price asc");
		skuQuery.setPageSize(1);
		skuQuery.setStartRow(1);
		skuQuery.setFields("price");
		List<Sku> skus = skuDao.selectByExample(skuQuery);
		doc.setField("price", skus.get(0).getPrice());
		solrServer.add(doc);
		solrServer.commit();
	}
}
