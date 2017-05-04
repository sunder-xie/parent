package com.epai.common.json;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

	public static final ObjectMapper MAPPER = new ObjectMapper();
	static{
		MAPPER.setSerializationInclusion(Include.NON_NULL);
	}
	public static String objectToJson(Object data){
		String json = null;
		try {
			json = MAPPER.writeValueAsString(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	//json转pojo
	public static <T> T JsonToPojo(String jsonData,Class<T> beanType){
		T t = null;
		try {
			t = MAPPER.readValue(jsonData, beanType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
	//json转list
	public static <T> List<T> JsonToList(String jsonData,Class<T> beanType){
		JavaType javaType = MAPPER.getTypeFactory().constructParametricType(List.class, beanType);
		List<T> t = null;
		try {
			t = MAPPER.readValue(jsonData, javaType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
	
}
