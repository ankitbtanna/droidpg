package com.accenture.techtime.mobile;


import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

public class CheckConnectivity {
	
	    ConnectivityManager connectivityManager;
	    NetworkInfo wifiInfo, mobileInfo,ethernetInfo;
	 
	    /**
	     * Check for <code>TYPE_WIFI</code> and <code>TYPE_MOBILE</code> connection using <code>isConnected()</code>
	     * Checks for generic Exceptions and writes them to logcat as <code>CheckConnectivity Exception</code>.
	     * Make sure AndroidManifest.xml has appropriate permissions.
	     * @param con Application context
	     * @return Boolean
	     */
	    public Boolean  checkNow(Context con){
	 
	        try{
	            connectivityManager = (ConnectivityManager) con.getSystemService(Context.CONNECTIVITY_SERVICE);
	            
	            wifiInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
	            
	            NetworkInfo info = connectivityManager.getActiveNetworkInfo();
	            Log.i("Main Activity", "info " +info);
	            
	            mobileInfo = connectivityManager.getNetworkInfo(info.getType());
	            Log.i("Main Activity", "State : " + mobileInfo.getState());
	            Log.i("Main Activity", "Connected ? : " + mobileInfo.getState().equals(NetworkInfo.State.CONNECTED));
	 
	            if(mobileInfo.getState().equals(NetworkInfo.State.CONNECTED))
	            {
	            	Log.i("Main Activity","Inside return true");
	                return true;
	            }
	        }
	        catch(Exception e){
	            Log.i("Main Activity", "CheckConnectivity Exception: " + e.getMessage());
	        }
	        Log.i("Main Activity","returning false");
	        return false;
	    }
	    
}

