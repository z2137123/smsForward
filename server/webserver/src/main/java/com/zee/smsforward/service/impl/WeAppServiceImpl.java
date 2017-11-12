package com.zee.smsforward.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.zee.smsforward.mapper.SMSMapper;
import com.zee.smsforward.model.SMS;
import com.zee.smsforward.service.WeAppService;

@Component("weAppService")
public class WeAppServiceImpl implements WeAppService {

	@Autowired
	private SMSMapper smsMapper;
	
	public List<SMS> getUserSMSList(Map<String,Object> queryMap) {
		// TODO Auto-generated method stub
		return smsMapper.getSMSByopenId(queryMap);
	}

	public void insertSMS(SMS sms) {
		smsMapper.insertSMS(sms);
		
	}
	public SMSMapper getSmsMapper() {
		return smsMapper;
	}

	public void setSmsMapper(SMSMapper smsMapper) {
		this.smsMapper = smsMapper;
	}


}
