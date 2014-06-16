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
function LoggerPlugin() {
};

/**
 * Starts the LoggerPlugin intent
 *
 * @param url           The url to play
 */
LoggerPlugin.prototype.log = function(message) {
    cordova.exec(null, null, "LoggerPlugin", "log", [message]);
};

/**
 * Load LoggerPlugin
 */

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.fileLogger) {
    window.plugins.fileLogger = new LoggerPlugin();
}