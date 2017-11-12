package com.zee.smsforward.mapper;

import java.util.List;
import java.util.Map;



import com.zee.smsforward.model.SMS;

public interface SMSMapper {
	
	
	List<SMS> getSMSByopenId(Map queryMap);
	
	void insertSMS(SMS	sms);
}
