package com.epai.core.service.product;

public interface UploadService {

	String uploadPic(byte[] pic, String name, long size) throws Exception;
}
