package com.phonegap.plugins.logger;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

public class LoggerPlugin extends Plugin {
	//private static Logger logger;
	
	public LoggerPlugin() {
	}

	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		PluginResult.Status status = PluginResult.Status.OK;
        String result = "";
        //logger = Logger.getInstance(this.webView.getContext());
        try {
            if (action.equals("log")) {
            	String infoToLog = args.getString(0);
            	//logger.info("Message from JavaScript:"+infoToLog);
            }
            else {
                status = PluginResult.Status.INVALID_ACTION;
            }
            return new PluginResult(status, result);
        } catch (JSONException e) {
        	//logger.warn("Message from JavaScript:"+e.getLocalizedMessage());
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        } 
	}
}
