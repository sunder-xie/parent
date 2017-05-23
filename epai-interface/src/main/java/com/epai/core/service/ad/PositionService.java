package com.epai.core.service.ad;

import java.util.List;

import com.epai.core.pojo.ad.Position;

public interface PositionService {

	public List<Position> selectPositionListByParentId(Long parentId);
}
