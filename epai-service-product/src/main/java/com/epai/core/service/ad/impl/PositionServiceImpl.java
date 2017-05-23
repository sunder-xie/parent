package com.epai.core.service.ad.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epai.core.dao.ad.PositionDao;
import com.epai.core.pojo.ad.Position;
import com.epai.core.pojo.ad.PositionQuery;
import com.epai.core.service.ad.PositionService;

@Service("positionService")
public class PositionServiceImpl implements PositionService {

	@Autowired
	private PositionDao positionDao;
	
	public List<Position> selectPositionListByParentId(Long parentId){
		PositionQuery positionQuery = new PositionQuery();
		positionQuery.createCriteria().andParentIdEqualTo(parentId);
		return positionDao.selectByExample(positionQuery);
	}
}
