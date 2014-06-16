package com.phonegap.plugins.video;

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

public class AudioPlayer extends Plugin {
  //  private static final String YOU_TUBE = "youtube.com";
   // private static final String ASSETS = "file:///android_asset/";

    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";

        try {
            if (action.equals("playAudio")) {
                playAudio(args.getString(0));
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

    private void playAudio(String url) throws IOException {
        // Create URI
    	
        Uri uri = Uri.parse(url);
        
        Log.i("AudioPlayer:", url);
        Intent intent = null;
        // Check to see if someone is trying to play a YouTube page.
       {
        	Log.i("AudioPlayer", url);
            // Display video player
        	
        	
        	try {
        		intent = new Intent(Intent.ACTION_VIEW);
                intent.setDataAndType(uri, "audio/*");
                this.cordova.getActivity().startActivity(intent);
        	} catch (ActivityNotFoundException e) {
        	    // Handle exception
        		Log.i("ActivityNotFoundException:", e.toString());
        	} catch (Exception e) {
        		Log.i("Exception:", e.toString());
        	}
        }

       
    }

  
}