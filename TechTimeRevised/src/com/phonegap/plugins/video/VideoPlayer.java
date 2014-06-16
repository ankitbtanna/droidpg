/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2011, IBM Corporation
 */
package com.phonegap.plugins.video;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class VideoPlayer extends Plugin {
    private static final String YOU_TUBE = "youtube.com";
    private static final String ASSETS = "file:///android_asset/";

    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";

        try {
            if (action.equals("playVideo")) {
                playVideo(args.getString(0));
            }
            else {
                status = PluginResult.Status.INVALID_ACTION;
            }
            return new PluginResult(status, result);
        } catch (JSONException e) {
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        } catch (IOException e) {
            return new PluginResult(PluginResult.Status.IO_EXCEPTION);
        }
    }

    private void playVideo(String url) throws IOException {
        // Create URI
    	
        Uri uri = Uri.parse(url);
        
        Log.i("VideoPlayer:", url);
        Intent intent = null;
        // Check to see if someone is trying to play a YouTube page.
       {
        	Log.i("VideoPlayer", url);
            // Display video player
        	
        	
        	try {
        		intent = new Intent(Intent.ACTION_VIEW);
                intent.setDataAndType(uri, "video/*");
                this.cordova.getActivity().startActivity(intent);
        	} catch (ActivityNotFoundException e) {
        	    // Handle exception
        		Log.i("ActivityNotFoundException:", e.toString());
        	} catch (Exception e) {
        		Log.i("Exception:", e.toString());
        	}
        }

       
    }

    private void copy(String fileFrom, String fileTo) throws IOException {
        // get file to be copied from assets
        InputStream in = this.cordova.getActivity().getAssets().open(fileFrom);
        // get file where copied too, in internal storage.
        // must be MODE_WORLD_READABLE or Android can't play it
        FileOutputStream out = this.cordova.getActivity().openFileOutput(fileTo, Context.MODE_WORLD_READABLE);

        // Transfer bytes from in to out
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) > 0)
            out.write(buf, 0, len);
        in.close();
        out.close();
    }
}