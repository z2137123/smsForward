package com.zee.smsforward.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSON;
import com.zee.smsforward.model.SMS;
import com.zee.smsforward.service.WeAppService;

@Controller()
public class WeAppController {
	
	private static final String WX_OPENID_URL = "https://api.weixin.qq.com/sns/oauth2/access_token";
	
	@Value("${appId}")
	private String appId;
	
	@Value("${secret}")
	private String secret;
	
	@Value("${wekey}")
	private String wekey;
	
	@Autowired
	private WeAppService weAppService;
	
	@RequestMapping(value="/login",method={RequestMethod.GET,RequestMethod.POST})
	public void login(HttpServletRequest request,HttpServletResponse reponse, 
			@RequestParam(value="code") String code){	
		
//		Map<String,String> resMap = new HashMap<String,String>();
//		resMap.put("openId", code);
		
		//请求openId
		RestTemplate rt = new RestTemplate();
		String requestUrl = WX_OPENID_URL + 
				"?appid=" + appId + 
				"&secret=" + secret + 
				"&code=" + code + "&grant_type=authorization_code";
		String openIdRst = rt.getForObject(requestUrl, String.class);
		
		
		writeJsonResp(reponse,openIdRst);
	}
	
	@RequestMapping(value="/getSMSList",method={RequestMethod.GET,RequestMethod.POST})
	public void getSMSList(HttpServletRequest request, HttpServletResponse reponse,
			@RequestParam(value = "openId") String openId, 
			@RequestParam(value = "pageNumber") int pageNumber,
			@RequestParam(value = "pageSize") int pageSize) {
		
		Map<String,Object> queryMap = new HashMap<String,Object>();
		queryMap.put("openId", openId);
		queryMap.put("pageNumber", pageNumber);
		queryMap.put("pageSize", pageSize);
		System.out.println("查询入参" + queryMap);
		List<SMS> smsList = weAppService.getUserSMSList(queryMap);
		System.out.println("查询出参" + JSON.toJSONString(smsList));		
		this.writeJsonResp(reponse, JSON.toJSONString(smsList));
	}
	
	@RequestMapping(value="/insertSMS",method={RequestMethod.GET,RequestMethod.POST})
	public void insertSMS(HttpServletRequest request, HttpServletResponse reponse,
			@RequestParam(value = "openId") String openId, 
			@RequestParam(value = "sendBy") String sendBy,
			@RequestParam(value = "context") String context,
			@RequestParam(value = "sendTime") String sendTime) {
		
		
		SMS sms = new SMS();
		sms.setOpenId(openId);
		sms.setSendBy(sendBy);
		sms.setSendTime(sendTime);
		sms.setContext(context);
//		System.out.println("查询入参" + queryMap);
		weAppService.insertSMS(sms);;
		
	}
	
	
	
	private String getReruestJson(HttpServletRequest request){
		
		
		return null;
	}
	
	
	private void writeJsonResp(HttpServletResponse reponse,String respString){
		try {
			reponse.setCharacterEncoding("utf-8");
			reponse.getWriter().write(respString);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}



	public String getWekey() {
		return wekey;
	}



	public void setWekey(String wekey) {
		this.wekey = wekey;
	}

	public WeAppService getWeAppService() {
		return weAppService;
	}

	public void setWeAppService(WeAppService weAppService) {
		this.weAppService = weAppService;
	}
}
