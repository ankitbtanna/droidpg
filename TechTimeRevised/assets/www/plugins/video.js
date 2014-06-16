/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2011, IBM Corporation
 */

/**
 * Constructor
 */
function TechTimeHomeActivity()
{
	
};

TechTimeHomeActivity.prototype.doLogin = function() {
	//alert("in video play function"+url);
    cordova.exec(null, null, "TechTimeHomeActivity", "doLogin","abc");
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.doLoginIndex) {
    window.plugins.doLoginIndex = new TechTimeHomeActivity();
}





/**
 * Starts the video player intent
 *
 * @param url           The url to play
 */


function VideoPlayer() {
};


VideoPlayer.prototype.play = function(url) {
	//alert("in video play function"+url);
    cordova.exec(null, null, "VideoPlayer", "playVideo", [url]);
};

/**
 * Load VideoPlayer
 */

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = new VideoPlayer();
}


function AudioPlayer() {
};

/**
 * Starts the audio player intent
 *
 * @param url           The url to play
 */
AudioPlayer.prototype.play = function(url) {
	//alert("in Audio play function"+url);
    cordova.exec(null, null, "AudioPlayer", "playAudio", [url]);
};


if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.AudioPlayer) {
    window.plugins.AudioPlayer = new AudioPlayer();
}