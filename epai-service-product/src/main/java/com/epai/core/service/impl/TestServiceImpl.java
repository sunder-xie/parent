package com.epai.core.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epai.core.dao.TestTbDao;
import com.epai.core.pojo.TestTb;
import com.epai.core.service.TestService;

@Service("testService")
@Transactional
public class TestServiceImpl implements TestService{

	@Autowired
	private TestTbDao dao;

	@Override
	public void insertTb(TestTb tb) {
		dao.insertTb(tb);
		int a = 10/0;
		dao.insertTb(tb);
	}
	
	
}
