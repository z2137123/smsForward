package com.zee.smsforward.service;

import java.util.List;
import java.util.Map;

import com.zee.smsforward.model.SMS;

public interface WeAppService {
	
	public List<SMS> getUserSMSList(Map<String,Object> queryMap);

	public void insertSMS(SMS sms);
}
