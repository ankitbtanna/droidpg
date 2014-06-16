package com.accenture.techtime.GAPlugin;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

public class Analytics extends Plugin {

	private final String TRACK_VIEW = "trackView";
	private final String TRACK_EVENT = "trackEvent";
	private final String TRACK_SOCIAL = "trackSocial";
	private final String TRACK_TIMING = "trackTiming";
	private final String DISPATCH = "dispatch";
	private final String START_NEW_SESSION = "startNewSession";
	
    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";
        
        try {
            if (action.equals(TRACK_VIEW)) {
            	GoogleAnalytics.trackView(args.getString(0));
            	
            } else if (action.equals(TRACK_EVENT)) {
            	Object optValue = args.isNull(3) ? null : args.getLong(3);            	
            	GoogleAnalytics.trackEvent(args.getString(0), args.getString(1), args.getString(2), optValue);
            	
            } else if (action.equals(TRACK_SOCIAL)) {
            	GoogleAnalytics.trackSocial(args.getString(0), args.getString(1), args.getString(2));
            	
            } else if (action.equals(TRACK_TIMING)) {
            	GoogleAnalytics.trackTiming(args.getString(0), args.getLong(1), args.getString(2), args.getString(3));
            	
            } else if (action.equals(DISPATCH)) {
            	GoogleAnalytics.dispatch();
                
            } else if (action.equals(START_NEW_SESSION)) {
            	GoogleAnalytics.startNewSession();
                
            } else {
            	status = PluginResult.Status.INVALID_ACTION;
            }
            
        } catch (JSONException e) {
            status = PluginResult.Status.JSON_EXCEPTION;
            result = "A JSON error occurred";
        } catch (Exception e) {
        	status = PluginResult.Status.ERROR;
        	result = "An error occurred";
        }
        
        return new PluginResult(status, result);
    }
}
