package com.epai.core.service.ad.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epai.common.json.JsonUtils;
import com.epai.core.dao.ad.AdDao;
import com.epai.core.dao.ad.PositionDao;
import com.epai.core.pojo.ad.Ad;
import com.epai.core.pojo.ad.AdQuery;
import com.epai.core.service.ad.AdService;

import redis.clients.jedis.Jedis;

@Service("adService")
public class AdServiceImpl implements AdService{

	@Autowired
	private AdDao adDao;

	@Autowired
	private PositionDao positionDao;
	@Autowired
	private Jedis jedis;
	@Override
	public List<Ad> selectAdListByParentId(Long parentId) {
		AdQuery adQuery = new AdQuery();
		adQuery.createCriteria().andPositionIdEqualTo(parentId);
		List<Ad> ads = adDao.selectByExample(adQuery);
		for (Ad ad : ads) {
			ad.setPosition(positionDao.selectByPrimaryKey(ad.getPositionId()));
		}
		return ads;
	}
	@Override
	public String selectAdList(Long positionId) {
		//添加首页图片缓存
		String json = jedis.get("ads:"+positionId);
		if(json == null||json.equals("[]")){
			AdQuery adQuery = new AdQuery();
			adQuery.createCriteria().andPositionIdEqualTo(positionId);
			List<Ad> ads = adDao.selectByExample(adQuery);
			json = JsonUtils.objectToJson(ads);
			jedis.set("ads:"+ positionId,json);
			jedis.expire("ad:"+positionId, 60*60*24);
		}
		
		return json;
	}
}
