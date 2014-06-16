function Downloader() {}

Downloader.prototype.downloadFile = function(fileUrl,fileName, dirName, params, win, fail) {

if (!fail) win = params;
cordova.exec(win, fail, "Downloader", "downloadFile", [fileUrl, fileName ,dirName , params]);
};


var i = 1; 
 var progress;
 var path;
 
downloadOkCallbak = function(data){
//	console.log('======================='+JSON.stringify(data));
						 if(data=="exist"){
							 console.log("File already exist");
						 }
						 else{
							 console.log("File saved on sd card     " );
						 }
						 
						 progress = data.progress;
						 path = data.path;
						 progressStat(progress,path);
		 			};
		 			
downloadErCallbak = function(data){ 
	console.log("error: "+data); 
					};	 			


function progressStat(p, path)
{

	if(p == 100)
		{
		isDownloaded = "true";
		openFile();
		}
	
	 $( "#progressbar1").progressbar({
         value: p
	      }); 
	
	document.getElementById('prog').innerHTML = p;
}
					
					
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.Downloader) {
    window.plugins.Downloader = new Downloader();
}
