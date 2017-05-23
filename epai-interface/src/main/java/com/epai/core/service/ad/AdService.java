package com.epai.core.service.ad;

import java.util.List;

import com.epai.core.pojo.ad.Ad;

public interface AdService {

	List<Ad> selectAdListByParentId(Long parentId);

	String selectAdList(Long positionId);
	
}
