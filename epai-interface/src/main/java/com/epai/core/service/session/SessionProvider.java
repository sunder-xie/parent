package com.epai.core.service.session;

public interface SessionProvider {

	public String getAttributeForUsername(String key);
	
	public void setAttributeForUsername(String key, String value);
}
