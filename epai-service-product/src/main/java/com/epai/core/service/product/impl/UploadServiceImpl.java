package com.epai.core.service.product.impl;

import com.epai.fastDFS.FastDFSUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epai.core.service.product.UploadService;

@Service("uploadService")
@Transactional
public class UploadServiceImpl implements UploadService{

	@Override
	public String uploadPic(byte[] pic, String name, long size) throws Exception {
		String path = FastDFSUtils.uploadPic(pic, name, size);
		return path;
	}

}
