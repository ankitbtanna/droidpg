/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010, IBM Corporation
 */
package com.mobile.plugin;

import java.io.File;
import java.io.IOException;

import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;


import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;



public class PdfViewer extends org.apache.cordova.api.Plugin {
	
	/**
 * Executes the request and returns PluginResult.
 * 
 * @param action
 *            The action to execute.
 * @param args
 *            JSONArry of arguments for the plugin.
 * @param callbackId
 *            The callback id used when calling back into JavaScript.
 * @return A PluginResult object with a status and message.
 */
public PluginResult execute(String action, JSONArray args, String callbackId) {

	PluginResult.Status status = PluginResult.Status.OK;
	String result = "";
   	
	
	
	try {
		if (action.equals("showPdf")) {
			 this.showPdf(args.getString(0));
			if (result.length() > 0) {
				status = PluginResult.Status.ERROR;
			}
		}
		return new PluginResult(status, result);
	} catch (JSONException e) {
		return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
	} catch (ActivityNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
   
	return null;
}

/**
 * Identifies if action to be executed returns a value and should be run
 * synchronously.
 * 
 * @param action
 *            The action to execute
 * @return T=returns value
 */
public boolean isSynch(String action) {
	return false;
}

/**
 * Called by AccelBroker when listener is to be shut down. Stop listener.
 */
public void onDestroy() {
}

// --------------------------------------------------------------------------
// LOCAL METHODS
// --------------------------------------------------------------------------



@SuppressWarnings("deprecation")
private void showPdf(String url) throws IOException {
	
   	
   	Log.d("FileViewerPlugin", "View file   :"+url);
    Intent intent = new Intent();
    intent.setAction(android.content.Intent.ACTION_VIEW);
    File file = new File(url);

    String extension = url.substring(url.lastIndexOf(".")+1);
	Log.d("FileViewerPlugin", "extension   :"+extension);
    String type = "";

    if (extension.toLowerCase().equals("pdf")) {
        type = "application/pdf";
        Log.d("application/pdf", "application/pdf");
    } 
    
   

    intent.setDataAndType(Uri.fromFile(file), type);
    cordova.getActivity().startActivity(intent);

    Log.d("FileViewerPlugin", "View complete in" + url);

    
   
}


}