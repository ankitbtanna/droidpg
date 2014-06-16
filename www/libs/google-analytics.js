

cordova.define("com/accenture/techtime/GAPlugin", function(require, exports, module) {
	var exec = require("cordova/exec");
	var GoogleAnalytics = function () {};
	
	var GoogleAnalytics = function(code, message) {
	    this.code = code || null;
	    this.message = message || '';
	};


    GoogleAnalytics.prototype.trackView = function(pageName,success,fail) {
	    cordova.exec(success,fail,"GoogleAnalytics","trackView",[pageName]);
	};

    GoogleAnalytics.prototype.trackEvent = function(category,action,label,optValue,success,fail) {
        cordova.exec(success,fail,"GoogleAnalytics","trackEvent",[category, action, label, optValue]);
    };

    GoogleAnalytics.prototype.trackSocial = function(network,action,target,success,fail) {
        cordova.exec(success,fail,"GoogleAnalytics","trackSocial",[network, action, target]);
    };

    GoogleAnalytics.prototype.trackTiming = function(category,interval,name,label,success,fail) {
        cordova.exec(success,fail,"GoogleAnalytics","trackTiming",[category, interval, name, label]);
    };

    GoogleAnalytics.prototype.dispatch = function(success,fail) {
        cordova.exec(success,fail,"GoogleAnalytics","dispatch",[]);
    };

    GoogleAnalytics.prototype.startNewSession = function(success,fail) {
        cordova.exec(success,fail,"GoogleAnalytics","startNewSession",[]);
    };

    var analytics = new GoogleAnalytics();
	module.exports = analytics;
});