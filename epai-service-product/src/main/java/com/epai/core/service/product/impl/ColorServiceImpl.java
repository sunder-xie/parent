package com.epai.core.service.product.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epai.core.dao.product.ColorDao;
import com.epai.core.pojo.product.Color;
import com.epai.core.pojo.product.ColorQuery;
import com.epai.core.service.product.ColorService;

@Service("colorService")
public class ColorServiceImpl implements ColorService{

	@Autowired
	private ColorDao colorDao;
	
	public List<Color> queryColorList(){
		ColorQuery colorQuery = new ColorQuery();
		colorQuery.createCriteria().andParentIdNotEqualTo(0L);
		return colorDao.selectByExample(colorQuery);
	}
}
