function PdfViewer() {
}

/**
 * Display a new browser with the specified URL.
 * 
 * NOTE: If usePhoneGap is set, only trusted PhoneGap URLs should be loaded,
 *       since any PhoneGap API can be called by the loaded HTML page.
 *
 * @param url           The url to load
 * @param usePhoneGap   Load url in PhoneGap webview [optional] - Default: false
 */
PdfViewer.prototype.showPdf = function(url) {
        cordova.exec(null, null, "PdfViewer", "showPdf", [url]);
};



/**
 * Load PdfViewer
 */
//cordova.addConstructor(function() {
//    cordova.addPlugin("pdfviewer", new PdfViewer());
//    PluginManager.addService("PdfViewer", "com.mobile.plugin.PdfViewer");
//});



if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.PdfViewer) {
    window.plugins.PdfViewer = new PdfViewer();
}
