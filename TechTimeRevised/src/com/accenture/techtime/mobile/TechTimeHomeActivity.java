package com.accenture.techtime.mobile;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewClient;
import org.apache.cordova.DroidGap;
import org.apache.cordova.api.CordovaInterface;
import org.apache.http.cookie.Cookie;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.google.analytics.tracking.android.EasyTracker;
import com.google.analytics.tracking.android.GoogleAnalytics;
import com.google.analytics.tracking.android.Tracker;


public class TechTimeHomeActivity extends DroidGap implements CordovaInterface {
	
	

	String TAG = "TechTimeHomeActivity-TechTimeMobile";
	//private IPlugin activityResultCallback;
	private Object activityResultKeepRunning;
	private Object keepRunning;
	private CordovaInterface cordova;
	private CordovaWebView mainView;
	private static final String PREFS_NAME = "MyPrefsFile";
	private static Cookie cookie = null;
	//private static Logger logger;
	private String loginURL= "https://techtime.accenture.com/mobile/index.php";
	static  String username = "";
	private String localUrl = "file:///android_asset/www/index.html";
	private String errorUrl = "file:///android_asset/www/error.html";
	private String prefUrl = "file:///android_asset/www/preference.html";
	private String statusFromJS = "";
	static String errorMessage = "";
     
	private Tracker GaTracker;
	private GoogleAnalytics GaInstance;

	private Tracker tracker;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		// ConfigureLog4J.configure();
		// Log.i(TAG, "********************** onCreate:"+ new Date().getTime());
		
		//GaInstance = GoogleAnalytics.getInstance(this);
	//GaTracker  = GaInstance.getTracker("UA-42025246-1");
		
		try {
			
			super.onCreate(savedInstanceState);
			
			Context context= this;  // Get current context.
			EasyTracker.getInstance().setContext(context);
			
			EasyTracker.getInstance().setContext(getApplicationContext());
		      // Instantiate the Tracker
		     tracker = EasyTracker.getTracker();
		     EasyTracker.getInstance().activityStart(this);
			
			
			//super.init(); 
			//super.clearCache(); 
			setContentView(R.layout.activity_tech_time_home);
			
			
			   // Start the tracker in manual dispatch mode. The following UA-xxxxxxx-x code must be replaced by //your web property ID.

		      
			mainView = (CordovaWebView) findViewById(R.id.tutorialView);
			mainView.clearSslPreferences();
			mainView.clearCache(true);
			mainView.clearHistory();
			
		      // mainView .loadUrl("file:///android_asset/www/index.html"); 
			
			//mainView.clearCache();
			 //System.out.println("cacheeeeeeee cleareddddddd");

			super.setIntegerProperty("loadUrlTimeoutValue", 120000);

		      final JavaScriptInterface myJavaScriptInterface= new JavaScriptInterface(this);    	 
		    	 
		      mainView.getSettings().setLightTouchEnabled(true);
		      mainView.getSettings().setJavaScriptEnabled(true);
		      mainView.loadUrl(prefUrl); 
		   //   mainView.loadUrl("javascript:initPref()");
		      mainView.addJavascriptInterface(myJavaScriptInterface, "AndroidFunction");
		      mainView.addJavascriptInterface(myJavaScriptInterface, "Androidtracking");

		      System.out.println("myJavaScriptInterface-------"+myJavaScriptInterface);
		   

			WebSettings webSetting = mainView.getSettings();
			webSetting.setAppCacheEnabled(false);
			webSetting.setCacheMode(WebSettings.LOAD_NO_CACHE);

			mainView.setWebViewClient(new CordovaWebViewClient(this, mainView) {
				@SuppressWarnings("deprecation")
				@Override
				public boolean shouldOverrideUrlLoading(WebView view, String url) {
					//logger.info("Overridden URL Outside IF-->**********************  in onShouldOverrideUrl:-->"+url+ new Date().getTime());
					String[] arrUrl = url.split("\\?");
					//Log.i("setWebViewClient", "shouldOverrideUrlLoading");
					if (arrUrl != null && arrUrl.length == 2 && arrUrl[0].contains("authenticated")) {
						//tracker.trackEvent("AUTHENTICATIONJAVAEVENT", "Rate", "", 0L);
						//logger.info("**********************If Condition in onShouldOverrideUrl:-->"+url+ new Date().getTime());
						TechTimeHomeActivity.username = arrUrl[1];
						//Log.i("**UserName**",TechTimeHomeActivity.username);
						//view.loadUrl("javascript:setUserInfo('"+TechTimeHomeActivity.username+"')");
						String cookie = CookieManager.getInstance().getCookie(url);
						view.clearSslPreferences();
						//logger.info("**********************  OBefore Forwarding to index page:"+ new Date().getTime());
						
						view.loadUrl(localUrl);
						return true;
					}
					else
					{
						//logger.info("**********************Else Condition in onShouldOverrideUrl:-->"+url+ new Date().getTime());
					}
					return false;
				}

				@Override
				public void onPageStarted(WebView view, String url, Bitmap bitmap) {
					super.onPageStarted(view, url, bitmap);
					//tracker.trackEvent("onPageStarted", "pagename", url, 0L);
					//Log.i("techtime", "onPageStarted: " + url);
					// Log.i(TAG, "********************** in onPageStarted:"+
					// new Date().getTime());
					try {
						//logger.info("**********************  in onPageStarted:"+ new Date().getTime()+"\nURL:"+url);
						SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
						SharedPreferences.Editor settings_editor = settings.edit();
					
						
						
						int success = url.contains("authenticated") ? 0:1;
						if (success == 0) {
							CookieManager mgr = CookieManager.getInstance();
							// Log.i("URL", url);
							// Log.i("Cookie", mgr.getCookie("FedAuth") +
							// "<---->Test");
							String cookie_string = mgr.getCookie("FedAuth");
							if (cookie_string.length() > 1) {
								settings_editor.putBoolean("got_session_cookie",
										true);
								settings_editor.putString("cookie", cookie_string);
								settings_editor.commit();
							}
							super.onPageStarted(view, url, bitmap);
						} else {
							super.onPageStarted(view, url, bitmap);
						}
					} catch (Exception e) {
						//logger.warn("**********************Exception in onPageStarted:"+e.toString());
					}
				}
				
				@Override
				public void onPageFinished(WebView view, String url) {
					
					
					super.onPageFinished(view, url);
					//logger.info("**********************  in onPageFinished:"+ new Date().getTime()+"\nURL:"+url);
					int prefSuccess = url.contains("preference") ? 0:1;
					if(prefSuccess == 0)
					{
						  mainView.loadUrl("javascript:initPref()");
					}
					
					if(url.contains(localUrl))
					{
						view.loadUrl("javascript:setUserInfo('"+TechTimeHomeActivity.username+"')");
					}else if(url.contains(errorUrl)){
					
						view.loadUrl("javascript:setErrorInfo('"+TechTimeHomeActivity.errorMessage+"')");
					}
				}

				@Override
				public void onReceivedError(WebView view, int code,
						String errorMsg, String desc) {
					//logger.info("**********************  in onReceivedError:" + new Date().getTime());
					Log.i("**********************  in view:", view.toString());
					//mainView.loadUrl("javascript:alert("+view.toString()+")");
					Log.i("**********************  in code:", ""+code);
					//mainView.loadUrl("javascript:alert("+code+")");

					Log.i("**********************  in errorMsg:", errorMsg);
					//mainView.loadUrl("javascript:alert("+errorMsg+")");

					Log.i("**********************  in desc:" ,desc);
					errorMessage = errorMsg;
					view.loadUrl(errorUrl);
					super.onReceivedError(view, code, errorMsg, desc);
				}
				
				
			});

		} catch (Exception ex) {
			//logger.warn("Exception onCreate()::"+ex.toString());	
		}
	}

	
	@Override 
    public boolean onKeyUp(int keyCode, KeyEvent event) 
    { 
           // Log.i(TAG,""+event.getKeyCode()); 
           // Log.i(TAG,""+keyCode); 
            // mywebview.loadUrl("javascript:callMe(\""+keyCode+"\")"); 
        return false; 
    } 
	
	@Override 
    public boolean onKeyDown(int keyCode, KeyEvent event) 
    { 
            //Log.i(TAG,""+event.getKeyCode()); 
            //Log.i(TAG,""+keyCode); 
            // mywebview.loadUrl("javascript:callMe(\""+keyCode+"\")"); 
        return false; 
    } 
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		//getMenuInflater().inflate(R.menu.activity_tech_time_home, menu);
		return true;
	}

	@Override
	public Activity getActivity() {
		return this;
	}

	public Object onMessage(String id, Object data) {
		if ("exit".equals(id)) {
			super.finish();
		}
		return null;
	}

//	@Override
//	public void setActivityResultCallback(IPlugin plugin) {
//		this.activityResultCallback = plugin;
//	}

	/**
	 * Launch an activity for which you would like a result when it finished.
	 * When this activity exits, your onActivityResult() method will be called.
	 * 
	 * @param command
	 *            The command object
	 * @param intent
	 *            The intent to start
	 * @param requestCode
	 *            The request code that is passed to callback to identify the
	 *            activity
	 */
//	public void startActivityForResult(IPlugin command, Intent intent,
//			int requestCode) {
//		// Log.i(TAG, "********************** startActivityForResult:"+ new
//		// Date().getTime());
//		this.activityResultCallback = command;
//		this.activityResultKeepRunning = this.keepRunning;
//		// If multitasking turned on, then disable it for activities that return
//		// results
//		if (command != null) {
//			this.keepRunning = false;
//		}
//		// Start activity
//		super.startActivityForResult(intent, requestCode);
//	}

//	@Override
//	public void cancelLoadUrl() {
//		// This is a no-op.
//	}

	//@Override
	/**
	 * Called when an activity you launched exits, giving you the requestCode you started it with,
	 * the resultCode it returned, and any additional data from it.
	 *
	 * @param requestCode       The request code originally supplied to startActivityForResult(),
	 *                          allowing you to identify who this result came from.
	 * @param resultCode        The integer result code returned by the child activity through its setResult().
	 * @param data              An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
	 */
//	protected void onActivityResult(int requestCode, int resultCode,
//			Intent intent) {
//		// Log.i(TAG, "********************** onActivityResult:"+ new
//		// Date().getTime());
//		super.onActivityResult(requestCode, resultCode, intent);
//		IPlugin callback = this.activityResultCallback;
//		if (callback != null) {
//			callback.onActivityResult(requestCode, resultCode, intent);
//		}
//	}

	@Override
	/**
	 * Called when the system is about to start resuming a previous activity.
	 */
	protected void onPause() {
		super.onPause();
		
		
		// Send pause event to JavaScript
		this.mainView
				.loadUrl("javascript:try{cordova.fireDocumentEvent('pause');}catch(e){console.log('exception firing pause event from native');};");

		this.mainView
		.loadUrl("javascript:try{stopPlayingMedia();}catch(e){console.log('stop playing media');};");
		
		
		// Forward to plugins
		if (this.mainView.pluginManager != null) {
			this.mainView.pluginManager.onPause(true);
		}
	}

	@Override
	/**
	 * Called when the activity receives a new intent
	 **/
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);

		// Forward to plugins
		if ((this.mainView != null) && (this.mainView.pluginManager != null)) {
			this.mainView.pluginManager.onNewIntent(intent);
		}
	}

	@Override
	/**
	 * Called when the activity will start interacting with the user.
	 */
	protected void onResume() {
		super.onResume();

		if (this.mainView == null) {
			return;
		}

		// Send resume event to JavaScript
		this.mainView
				.loadUrl("javascript:try{cordova.fireDocumentEvent('resume');}catch(e){console.log('exception firing resume event from native');};");

		// Forward to plugins
		if (this.mainView.pluginManager != null) {
			this.mainView.pluginManager.onResume(true);
		}

	}

	@Override
	/**
	 * The final call you receive before your activity is destroyed.
	 */
	public void onDestroy() {
		//logger.info("onDestroy()");
		
		
		super.onDestroy();
		if (mainView.pluginManager != null) {
			mainView.pluginManager.onDestroy();
		}

		if (this.mainView != null) {

			// Send destroy event to JavaScript
			this.mainView
					.loadUrl("javascript:try{cordova.require('cordova/channel').onDestroy.fire();}catch(e){console.log('exception firing destroy event from native');};");

			// Load blank page so that JavaScript onunload is called
			this.mainView.loadUrl("about:blank");

			// Forward to plugins
			if (this.mainView.pluginManager != null) {
				this.mainView.pluginManager.onDestroy();
			}
		} else {
			// this.endActivity();
			//this.endActivity();
			
		}
	}

	@Override
	public Context getContext() {
		return null;
	}
	
    public class JavaScriptInterface {
		Context mContext;

	    JavaScriptInterface(Context c) {
	        mContext = c;
	    }
	    
	    public void getStatus(String webMessage){	    	
	    	
	    	statusFromJS = webMessage;
	    	
	         //Log.i("this is from javascript",statusFromJS);
	        
		      
				CheckConnectivity con = new CheckConnectivity();

				// Log.i("before if loop",statusFromJS);
				 
				// Log.i("connection status :",""+con.checkNow(getApplicationContext()));
				 
				// mainView.loadUrl("javascript:alert("+con.checkNow(getApplicationContext())+");");
				 
				if (con.checkNow(getApplicationContext())) {
				//	 Log.i("before loops",statusFromJS);

					if(statusFromJS.equalsIgnoreCase("online"))
					{
				      //  Log.i("both online",statusFromJS);
						mainView.loadUrl(loginURL);
					}
					else
					{
				      //  Log.i("mobile online status online",statusFromJS);
						mainView.loadUrl(localUrl);
					}
				} else {
			      //  Log.i("offline",statusFromJS);
			        
			        if(statusFromJS.equalsIgnoreCase("offline"))
					{
				      //  Log.i("offline online",statusFromJS);
						mainView.loadUrl(localUrl);
					}			        
			        mainView.loadUrl(localUrl);
				}
	    }
	    
	    	public void getTracker(){	    	
	    	
	    	
	         //Log.i("this is from javascript",statusFromJS);      
//	    		String idTracking = tracker.getTrackingId();
//				System.out.println("idTracking======="+idTracking);
//				String idTracking1 = tracker.getAppId();
//				System.out.println("idTracking1======="+idTracking1);
	    }
    }
}
