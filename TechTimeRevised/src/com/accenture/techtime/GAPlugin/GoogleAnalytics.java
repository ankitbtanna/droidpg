package com.accenture.techtime.GAPlugin;

import com.google.analytics.tracking.android.EasyTracker;

public class GoogleAnalytics {
	
	
	/**
	 * Tracks a page view
	 * @param pageName The name of the page you want to track
	 */
	public static void trackView(String pageName) {
		EasyTracker.getTracker().trackView(pageName);
	}
	
	
	
	/**
	 * Track an event
	 * https://developers.google.com/analytics/devguides/collection/android/v2/events
	 * 
	 * @param category The category
	 * @param action The action performed
	 * @param label The label
	 * @param optValue An optional value
	 */
	public static void trackEvent(String category, String action, String label, Object optValue) {		
		if (optValue == null) {
			EasyTracker.getTracker().trackEvent(category, action, label, null);		
		} else {
			EasyTracker.getTracker().trackEvent(category, action, label, (Long) optValue);	
		}
	}
	
	/**
	 * Track a social event
	 * 
	 * @param network The social network with which the user is interacting (e.g. Google+, Facebook, Twitter, etc.).
	 * @param action  The social action taken (e.g. Like, Share, +1, Tweet, etc.).
	 * @param target  The content on which the social action is being taken (i.e. a specific product, article or video).
	 */
	public static void trackSocial(String network, String action, String target) {
		EasyTracker.getTracker().trackSocial(network, action, target);		
	}
	
	/**
	 * Track a timing
	 *  
	 * @param category The category of the timed event
	 * @param interval The timing measurement in milliseconds
	 * @param name The name of the timed event
	 * @param label The label of the timed event
	 */
	public static void trackTiming(String category, long interval, String name, String label) {
		EasyTracker.getTracker().trackTiming(category, interval, name, label);
	}
	
	/**
	 * Manually dispatch the collected analytics
	 */
	public static void dispatch() {
		EasyTracker.getInstance().dispatch();
	}
	
	/**
	 * Starts a new session
	 */
	public static void startNewSession() {
		EasyTracker.getTracker().setStartSession(true);
	}
}
