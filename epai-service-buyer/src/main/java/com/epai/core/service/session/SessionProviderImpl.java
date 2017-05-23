package com.epai.core.service.session;

import org.springframework.beans.factory.annotation.Autowired;

import redis.clients.jedis.Jedis;

/**
 * 远程session
 * @author admin
 *
 */
public class SessionProviderImpl implements SessionProvider{
	@Autowired
	private Jedis jedis;
	
	private Integer exp = 30;//设置session的存活时间

	public void setExp(Integer exp) {
		this.exp = exp;
	}
	
	public String getAttributeForUsername(String key) {
		
		String value = jedis.get(key+":USER_SESSION");
		if(null != value){
			jedis.expire(key+":USER_SESSION", exp*60);
			return value;
		}else{
			return null;
		}
	}

	public void setAttributeForUsername(String key,String value) {
		jedis.set(key+":USER_SESSION", value);
		jedis.expire(key+":USER_SESSION", exp*60);
	}
	
}
