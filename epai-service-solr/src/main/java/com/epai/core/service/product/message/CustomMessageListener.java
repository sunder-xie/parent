package com.epai.core.service.product.message;

import javax.jms.Message;
import javax.jms.MessageListener;

import org.apache.activemq.command.ActiveMQTextMessage;
import org.springframework.beans.factory.annotation.Autowired;

import com.epai.core.service.product.SearchService;

public class CustomMessageListener implements MessageListener {

	@Autowired
	private SearchService searchService;
	@Override
	public void onMessage(Message message) {
		
		ActiveMQTextMessage atm = (ActiveMQTextMessage)message;
		try {
			String id = atm.getText();
			searchService.insertProductToSolr(Long.parseLong(id));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
