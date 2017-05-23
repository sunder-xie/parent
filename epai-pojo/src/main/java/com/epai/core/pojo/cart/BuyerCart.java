package com.epai.core.pojo.cart;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class BuyerCart implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private List<BuyerItem> items = new ArrayList<BuyerItem>();

	public List<BuyerItem> getItems() {
		return items;
	}

	public void setItems(List<BuyerItem> items) {
		this.items = items;
	}
	public void addItem(BuyerItem item){
		if(items.contains(item)){
			for (BuyerItem it : items) {
				if(it.equals(item)){
					it.setAmount(it.getAmount()+item.getAmount());
				}
			}
		}else{
			items.add(item);
		}
	}
	//小计
	@JsonIgnore
	public Integer getProductAmount(){
		Integer result = 0;
		for (BuyerItem item : items) {
			result+=item.getAmount();
		}
		return result;
	}
	@JsonIgnore
	public Float getProductPrice(){
		Float result = 0f;
		for (BuyerItem item : items) {
			result += item.getSku().getPrice()*item.getAmount();
		}
		return result;
	}
	@JsonIgnore
	public Float getFee(){
		Float result = 0f;
		if(getProductPrice()<80){
			result+=20;//20邮费
		}
		return result;
	}
	@JsonIgnore
	public Float getTotal(){
		return getProductPrice()+getFee();
	}
	
}
