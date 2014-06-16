var len;
var mediaID;

var jsonPath = "/mnt/sdcard/TechTime/data.json";
//var jsonPath = "/data/data/com.accenture.techtime.mobile/TechTime/data.json";

var allDownloaded = new Array();

var index = 0;
var nextItemId;
var loggedIn = false;
var userName = "";
var videoStreamUrl ='';
var audioStreamUrl = '';
var lastPageOpen = '';

var gaPlugin;

var rssUrlDoc = 'https://techtime.accenture.com/mobile-home-page-latestupdates-documents.xml';

var AccURL = "";

var mediaLink;
var selectedCategory;

var downloadFilesCount = 0;
var actualDownloadedCount= 0 ;

var categories = new Array();
var itemsList = new Array();

var keysArr = new Object();
var categoryItemsList = new Array();

var isOnline = false;
var platform;

var sPath;
var sPath1;
var localFilePath = "";
var currentPlayingItemId="";
var downloadedItems = new Object(); 
var usrToggle = true; //Online Mode
var userNameGlobal;
var pageFlag = false;
var flagTest = false;

var searchFromMediaPage = false;
var searchFromEventsPage = false;
var searchFromSpotlightPage = false;
var searchFromUpcomingEventsPage = false;
var searchFromTAListResultPage = false;
var searchFromAuthorDetailPage = false;
var searchFromDownloadsPage = false;
var searchFromMainPage = false;
var searchFromContactUsPage = false;
var searchFromAboutPage = false;
var searchFromFaqPage = false;
var searchFroSubscribPage = false;
var searchFromsearchResultPage = false;
var searchFromtechWatchPage = false;
var searchFromplaylistPage = false;
var searchFromplaylistitemPage = false;
var searchSharePlaylistsPage = false;
var searchAddToPlaylistPage = false;
var searchContributePage = false;



var searchFlag = '';

var SpotLightContentFlag = false;
var eventsFlag = false;
var mediaFlag = false;
var spotLightFlag = false;

var indexTW;
var alldownloadFlag = false;
var spotFlagSet = false;
var detailFlag = false;

var rootFolderName = '';
var entriesList = [];


var downloadedThumbs = [];
var downloadedActuals = [];

var downloadedFiles = [];

var playlistItemsPageFlag = false;


function onBodyLoad()
{
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("orientationchange", doOnOrientationChange);
	doOnOrientationChange();
	//navigator.splashscreen.show();	
	
	  analytics = cordova.require("com/accenture/techtime/GAPlugin");
      console.log("Initialized Analytics!");
}

function onDeviceReady() {
    
   document.addEventListener("backbutton", backKeyDown, false); 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS1, errorFileSystem);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSDownloadMain, errorFileSystem);

    
    checkConnection();  
   // doOnOrientationChange();
    gaPlugin = window.plugins.gaPlugin;    
    
    
	//navigator.notification.confirm('GA_PLUGIN would like your permission to collect usage data. No personal or user identifiable data will be collected.', permissionCallback, 'Attention', 'Allow,Deny');
}



function readMoreDetails(val) {
	
	if(isOnline)
		{
			var ref = window.open(val, '_blank', 'location=yes');
		}
	else
		{
			jAlert('Please go online to view the content.', 'Tech Time');		
		}
   /* ref.addEventListener('loadstart', function() { console.log('start: ' + event.url); });
   ref.addEventListener('loadstop', function() { console.log('stop: ' + event.url); });
    ref.addEventListener('exit', function() { console.log(event.type); });*/

}


function checkConnection() {
	
var networkState = navigator.network.connection.type;


var userToggle = window.localStorage.getItem("status");
//alert("usrToggle before"+userToggle);

if(userToggle == "online")
{ //--------------
	document.addEventListener("online", resumeOnline, false);
	document.addEventListener("offline", takeAppOffline, false);
	//isOnline = true;
			if ((networkState != 'unknown') && (networkState != 'No network connection') && (networkState != 'none')) {// USER SEELECTS ONLINE BUT NO NETWORK
				isOnline = true;
			
			} 
			else { // USER SEELECTS ONLINE BUT NO NETWORK
				isOnline = false;
				
			}
}  
else  //NETWORK OR NO NETWORK// USER SELECTS OFF
	{ 
	
	
    
	isOnline = false;  
	} 

	loadApplicationState(isOnline);
}



function loadApplicationState(state){
	
    createJsonFormat();            
    var userToggle = window.localStorage.getItem("status");
    //createTAJson(technologyArea);
  //  alert("userToggle in loadapp state"+userToggle);
	if(state && userToggle == "online"){
		flagTest = false;
		getSubscribeRss(); 

		
	}else {
       loadDataforOfflineMode();
	}
	
	setApplicationState(state);
   
// document.addEventListener("online", resumeOnline, false);
// document.addEventListener("offline", takeAppOffline, false);
}


function gotFS(fileSystem) {
	
	fileSystem.root.getDirectory("TechTime", {
		create : true,
		exclusive : false
	}, getDirectoryEntry, errorFileSystem);
	
	fileSystem.root.getDirectory("TechTime/images", {create: false, exclusive: false},
            gotImagesDir, errorImageFileSystem
            );

}


function gotFS1(fileSystem) {
	
fileSystem.root.getFile(jsonPath, {
								create : true,
								exclusive : false
                            }, getDirectoryEntry1, errorFileSystem);
}

function getDirectoryEntry(entry) {
	
	sPath = entry.fullPath;
	
	   downloadedFiles = [];
	
	globalPathNew = sPath;	
	entriesList = [];	

	var dirReader = entry.createReader();
	 
	 dirReader.readEntries(function(results){
        var i = 0;
        for(i = 0;i<results.length;i++)
        {
          if(results[i].isFile && results[i].name != "data.json" && results[i].name.indexOf(".download") == -1)
              {
                  var fileName = results[i].name.split(".");
                  entriesList.push(fileName[0]);
              }
              
       
        }
        
        jsonData.listOfFiles = entriesList;
	 });
	 
	 
	 
	    var dirFilesReader = entry.createReader();
	    dirFilesReader.readEntries(function (results) {
	        var i = 0;
	       
	        //alert("1 -- " + results.length);
	        for (i = 0; i < results.length; i++) {
	            var sFileExtension = results[i].name.split('.')[results[i].name.split('.').length - 1];
	            //alert("name : " + results[i].name + " extension : " + sFileExtension);
	            
	         
	            
	            if (sFileExtension == "mp4" || sFileExtension == "mp3" || sFileExtension == "pdf") {
	                downloadedFiles.push(results[i].name);
	            }
	            //alert("name : " + results[i].name + " extension : " + sFileExtension);
	        }
	        sFileExtension = " ";
	    });

}

function getDirectoryEntry1(entry) {}


function errorFileSystem(evt) {
	console.log('Error in errorFileSystem : ' + evt.target.error.code);
}


function resumeOnline() {

	var userToggle = window.localStorage.getItem("status");
	
	if (userToggle == "online") {
		isOnline = true;
		setApplicationState(true);
		changeDownloadLoginColor();
	} else {
		var networkStatenew = navigator.network.connection.type;

		if ((networkStatenew != 'unknown')
				&& (networkStatenew != 'No network connection')
				&& (networkStatenew != 'none')) {
			
		}
	}

}


function takeAppOffline(){
	
	isOnline = false;  
	setApplicationState(false);
	changeDownloadLogoutColor();
	//copyPendingDownloadstoJson();	
	
	
 }

function setApplicationState(value) {
    if(value){
        
        $("#downloadFile").removeClass('ui-disabled');        
        $("#logout").children().text('Logout');
        
    }else {
        $("#downloadFile").addClass('ui-disabled');
        //        $("#btnRefreshRSS").addClass('ui-disabled');
//        $("#btnRefreshItems").addClass('ui-disabled');
        
        $("#logout").children().text('  Exit  ');

    }
}


function backKeyDown(e){
	//var pageName = $.mobile.activePage.attr('id');
	//alert("pageName"+pageName);
	//console.log("pageName"+pageName);
	if($.mobile.activePage.is('#intialPage'))
	{
       e.preventDefault();
      // device.exitApp();
     //  app.exitApp();
    // navigator.app.exitApp();
    } else if($.mobile.activePage.is('#loggedOutPage')) {
    	e.preventDefault();
        $.mobile.changePage("#loggedOutPage");
    }else if($.mobile.activePage.is('#errorPage')) {
    	e.preventDefault();
        $.mobile.changePage("#errorPage");
    }
    else {
       // navigator.app.backHistory()
    	 e.preventDefault();
    	//$.mobile.changePage("#businessCategory");
    }
	
}



function gotFSDownloadMain(fileSystemDownload) {
  //console.log("filesystem got main download");
  window.fileSystem = fileSystemDownload;
  fileSystem.root.getDirectory("TechTime", {
                               create : true,
                               exclusive : false
                               }, dirReadyMain, errorFileSystem);
}

function dirReadyMain(entry) {
	
	 if(device.platform == "Android"){
		 sPath = entry.fullPath;
		 globalPath = sPath;
	    }else {
	    	window.appRootDir = entry;
	    }
  //window.appRootDir = entry;
  console.log("************************************application dir is ready************************************");
  
}

function doLoginIndex()
{
	window.plugins.doLoginIndex.doLogin();
}

function playVideo(vidUrl) 
{
	//alert('inVideo :'+vidUrl);
    window.plugins.videoPlayer.play(vidUrl);
}

function streamVideo()
{
	//alert("in test function"+videoStreamUrl);
	playVideo(videoStreamUrl);
}


function playAudio(audUrl) 
{
    window.plugins.AudioPlayer.play(audUrl);
}

function streamAudio()
{
	//alert("in test function"+audioStreamUrl);
	playAudio(audioStreamUrl);
}

window.onorientationchange = function() { 
    setTimeout(doOnOrientationChange(),0);
}

function doOnOrientationChange()
{

	var screenWidth = screen.width;
	var screenHeight = screen.height;
	var switchCase = '';

	
	if(screenHeight > screenWidth)
		{
		switchCase = "portrait";
		}
	else if (screenHeight < screenWidth)
		{
		switchCase = "landscape";
		}

	switch(switchCase) 
  {  
	    case "landscape":
	    	//alert('landscape screenHeight'+screenHeight+'    screenWidth :'+screenWidth);
	         setTimeout(changeLandScape(),600);
	        break; 
	
	    case "portrait":
	    	//alert('portrait screenHeight'+screenHeight+'    screenWidth :'+screenWidth);

	    	setTimeout(changePotrait(),600);
	      //changePotrait();
	      break;
  
  } 
}


function changeLandScape() {

	var screenWidth = screen.width;
	var screenHeight = screen.height;
	// alert(window.orientation);
	// alert("Width: " + screenWidth + " Height: " + screenHeight);
	// PP == Potrait Potrait
	// PL == Potrait Landscape
	// LL == Landscape Landscape
	// LP == Landscape Potrait
	// device 320x480
	if (screenWidth == 480 && screenHeight == 320
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '5%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-right', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
	} else if (screenWidth == 480 && screenHeight == 320
			&& (window.orientation == 90 || window.orientation == -90)) {
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '5%');
		$('img[id^="emp"]').css('width', '90%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
	}
	// device 480x854
	else if (screenWidth == 854 && screenHeight == 480
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '5%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
	} else if (screenWidth == 854 && screenHeight == 480
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '70%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '1%');
		$('img[id^="emp"]').css('padding-top', '3%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '70%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
	}
	// device 720x1280
	else if (screenWidth == 1280 && screenHeight == 720
			&& (window.orientation == 0 || window.orientation == 180)) {
		 //alert("Landscape P");
		$('img[id^="accLogoImg"]').css('width', '80%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
	} else if (screenWidth == 1280 && screenHeight == 720
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("Landscape L");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '90%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '118px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
	}
	// device 720x1280
	else if (screenWidth == 1024 && screenHeight == 768
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '80%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '4.5%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 1024 && screenHeight == 768
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '92px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '3%');
		// $('#usernameLabel').css('padding-left', '3%');
		$('#usernameLabel').css('margin-left', '3%');
	}
	// device 768x1280
	else if (screenWidth == 1280 && screenHeight == 768
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '80%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '0%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '3%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 1280 && screenHeight == 768
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '102px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '2.5%');
		// $('#usernameLabel').css('padding-left', '2.5%');
		$('#usernameLabel').css('margin-left', '2.5%');
	}
	// device 800x1280
	else if (screenWidth == 1280 && screenHeight == 800
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '2.5%');
		$('.navigateMenu').css('top', '108px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
	} else if (screenWidth == 1280 && screenHeight == 800
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '1.5%');
		$('.navigateMenu').css('top', '152px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	}
	// device 900x1440
	else if (screenWidth == 1440 && screenHeight == 900
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '2.5%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1440 && screenHeight == 900
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '2%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '4.5%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '112px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '2%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '2%');
	}
	// device 1080x1920
	else if (screenWidth == 1920 && screenHeight == 1080
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '1%');
		$('.navigateMenu').css('top', '95px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1920 && screenHeight == 1080
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '2%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '115px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '2%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '2%');
	}

	// device 1200x1920
	else if (screenWidth == 1920 && screenHeight == 1200
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '0.5%');
		$('.navigateMenu').css('top', '108px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1920 && screenHeight == 1200
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '152px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	}

	// device 1280x1920
	else if (screenWidth == 1920 && screenHeight == 1280
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '1%');
		$('.navigateMenu').css('top', '110px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1920 && screenHeight == 1280
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '50%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '50%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '50%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '130px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	}
	// device 1600x2560
	else if (screenWidth == 2560 && screenHeight == 1600
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("LP");
		$('img[id^="accLogoImg"]').css('width', '45%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '45%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '45%');
		$('.highPerf').css('padding-left', '3%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '155px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	} else if (screenWidth == 2560 && screenHeight == 1600
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("LL");
		$('img[id^="accLogoImg"]').css('width', '50%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '55%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '50%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '113px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	} else if (screenWidth == 1920 && screenHeight == 1080) {
		$('.navigateMenu').css('top', '228px');
	} else if (screenWidth == 1280 && screenHeight == 800) {
		// AVD Name - 3_SamsungGalaxyTab2_10Inch_1280x800
		$('.navigateMenu').css('top', '164px');
		$('#usernameLabel').css('margin-left', '1.1%');
		$('.acnLog').css('margin-left', '1.8%');
		$('.highPerf').css('margin-left', '1.4%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x800_l.png');
	}

	else if (screenWidth == 1280 && screenHeight == 720) {
		// AVD Name - 4_SamsungGalaxySIII_1280x720
		$('.navigateMenu').css('top', '94px');
		$('#usernameLabel').css('margin-left', '2.2%');
		$('.acnLog').css('margin-left', '4.5%');
		$('.highPerf').css('margin-left', '4.5%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_l.png');
		$('#bannerImage').css('padding-top', '0px');
		$('img[id^="accLogoImg"]').css('width', '45%');
		$('img[id^="accLogoImg"]').css('padding-top', '20px');
		$('img[id^="emp"]').css('width', '65%');
		$('img[id^="emp"]').css('padding-bottom', '2%');

		$('img[id^="highPerfImg"]').css('width', '45%');

	} else if (screenWidth == 800 && screenHeight == 480) {
		// AVD Name - 1_HTC_480x800_Sanket, Sanket's Phone
		$('.navigateMenu').css('top', '94px');
		$('#usernameLabel').css('margin-left', '2%');
		$('.acnLog').css('margin-left', '4%');
		$('.highPerf').css('margin-left', '4%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace480x800_l.png');
		$("#accLogoImg")
				.attr('src', 'images/header_accentureRed_480x800_l.png');

		$('img[id^="accLogoImg"]').css('width', '53%');
		$('img[id^="accLogoImg"]').css('padding-top', '20px');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');

		$('img[id^="highPerfImg"]').css('width', '53%');
	} else if (screenWidth == 1024 && screenHeight == 600) {
		// AVD Name - 2_SamsungGalaxyTab2_1024x600_Sachin
		// Scale HPD, back and navigate
		$('.navigateMenu').css('top', '113px');
		$('#usernameLabel').css('margin-left', '1.2%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1024x600_l.png');
		$('.acnLog').css('margin-left', '3%');
		$('.highPerf').css('margin-left', '3%');
		$('img[id^="accLogoImg"]').css('width', '45%');
		$('img[id^="accLogoImg"]').css('padding-top', '20px');
		$('img[id^="emp"]').css('width', '50%');
		$('img[id^="emp"]').css('padding-bottom', '2%');

		$('img[id^="highPerfImg"]').css('width', '45%');
	}

	else if (screenWidth == 960 && screenHeight == 540
			&& (window.orientation == 0 || window.orientation == 180)) {
		$('.navigateMenu').css('top', '95px');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('img[id^="highPerfImg"]').css('width', '55%');
		$('img[id^="accLogoImg"]').css('width', '55%');
		$('img[id^="accLogoImg"]').css('padding-top', '1%');
		$('img[id^="accLogoImg"]').css('padding-left', '1%');
		$('img[id^="emp"]').css('width', '60%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-top', '1%');
		$('img[id^="emp"]').css('padding-right', '1%');
		$('.searchBar').css('padding-left', '2.5%');
		$('#usernameLabel').css('margin-left', '2.5%');
		// alert("THIS IS Portrait");
	} else if (screenWidth == 960 && screenHeight == 540
			&& (window.orientation == 90 || window.orientation == -90)) {
		$('.navigateMenu').css('top', '95px');
		$('#usernameLabel').css('margin-left', '2%');
		$('img[id^="highPerfImg"]').css('width', '45%');
		$('img[id^="highPerfImg"]').css('padding-left', '0%');
		$('img[id^="accLogoImg"]').css('width', '45%');
		$('img[id^="accLogoImg"]').css('padding-top', '1%');
		$('img[id^="accLogoImg"]').css('padding-left', '2.5%');
		$('img[id^="emp"]').css('width', '50%');
		$('img[id^="emp"]').css('padding-bottom', '1.5%');
		$('img[id^="emp"]').css('padding-top', '1%');
		$('img[id^="emp"]').css('padding-right', '1%');
		$('.searchBar').css('padding-left', '2.5%');
		$('#usernameLabel').css('margin-left', '2.5%');
		// alert("THIS IS Portrait");
	}
}

function changePotrait() {
	var screenWidth = screen.width;
	var screenHeight = screen.height;
	// alert(screenWidth + " " + screenHeight);
	// alert(window.orientation);
	// alert("Width: " + screenWidth + " Height: " + screenHeight);
	var bannerImageSrc = '';
	// alert("Width: " + screenWidth + " Height: " + screenHeight);
	// PP == Potrait Potrait
	// PL == Potrait Landscape
	// LL == Landscape Landscape
	// LP == Landscape Potrait

	// device 320x480
	if (screenWidth == 320 && screenHeight == 480
			&& (window.orientation == 0 || window.orientation == 180)) {
		
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '5%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-right', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 320 && screenHeight == 480
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '90%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2%');
	}
	// device 480x854
	else if (screenWidth == 480 && screenHeight == 854
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '5%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 480 && screenHeight == 854
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '70%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '1%');
		$('img[id^="emp"]').css('padding-top', '3%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('.highPerf').css('width', '70%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2%');
	}
	// device 720x1280
	else if (screenWidth == 720 && screenHeight == 1280
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("Potrait P");
		$('img[id^="accLogoImg"]').css('width', '80%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 720 && screenHeight == 1280
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("Potrait L");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '90%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '118px'); //change
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2%');
	}
	// device 768x1024
	else if (screenWidth == 768 && screenHeight == 1024
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '80%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '4.5%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 768 && screenHeight == 1024
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '92px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '3%');
		// $('#usernameLabel').css('padding-left', '3%');
		$('#usernameLabel').css('margin-left', '3%');
	}
	// device 768x1280
	else if (screenWidth == 768 && screenHeight == 1280
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '80%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '0%');
		$('img[id^="emp"]').css('width', '85%');
		$('img[id^="emp"]').css('padding-bottom', '3%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '80%');
		$('.highPerf').css('padding-left', '3%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '3%');
	} else if (screenWidth == 768 && screenHeight == 1280
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '2%');
		$('.navigateMenu').css('top', '102px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '2.5%');
		// $('#usernameLabel').css('padding-left', '2.5%');
		$('#usernameLabel').css('margin-left', '2.5%');
	}
	// device 800x1280
	else if (screenWidth == 800 && screenHeight == 1280
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '2.5%');
		$('.navigateMenu').css('top', '108px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
	} else if (screenWidth == 800 && screenHeight == 1280
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '1.5%');
		$('.navigateMenu').css('top', '152px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	}
	// device 900x1440
	else if (screenWidth == 900 && screenHeight == 1440
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '3%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '2.5%');
		$('.navigateMenu').css('top', '94px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 900 && screenHeight == 1440
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '2%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '4.5%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '112px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '2%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '2%');
	}
	// device 1080x1920
	else if (screenWidth == 1080 && screenHeight == 1920
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '1%');
		$('.navigateMenu').css('top', '95px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1080 && screenHeight == 1920
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '2%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '110px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '2%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '2%');
	}

	// device 1200x1920
	else if (screenWidth == 1200 && screenHeight == 1920
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '0.5%');
		$('.navigateMenu').css('top', '108px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1200 && screenHeight == 1920
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '65%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '70%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '65%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '152px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	}

	// device 1280x1920
	else if (screenWidth == 1280 && screenHeight == 1920
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '75%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '3%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '75%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '2%');
		$('.highPerf').css('width', '75%');
		$('.highPerf').css('padding-left', '1%');
		$('.navigateMenu').css('top', '110px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('.searchBar').css('padding-left', '2.5%');
	} else if (screenWidth == 1280 && screenHeight == 1920
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '50%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '50%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '50%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '130px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	}
	// device 1600x2560
	else if (screenWidth == 1600 && screenHeight == 2560
			&& (window.orientation == 0 || window.orientation == 180)) {
		// alert("PP");
		$('img[id^="accLogoImg"]').css('width', '50%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '55%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '50%');
		$('.highPerf').css('padding-left', '4%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '113px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	} else if (screenWidth == 1600 && screenHeight == 2560
			&& (window.orientation == 90 || window.orientation == -90)) {
		// alert("PL");
		$('img[id^="accLogoImg"]').css('width', '45%');
		$('img[id^="accLogoImg"]').css('padding-left', '1.5%');
		$('img[id^="accLogoImg"]').css('padding-top', '5%');
		$('img[id^="accLogoImg"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('width', '45%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-right', '2%');
		$('img[id^="emp"]').css('padding-top', '5%');
		$('.highPerf').css('width', '45%');
		$('.highPerf').css('padding-left', '3%');
		$('.highPerf').css('margin-left', '0%');
		$('.navigateMenu').css('top', '155px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').css('width', '100%');
		$('.searchBar').css('padding-left', '1.5%');
		// $('#usernameLabel').css('padding-left', '1.5%');
		$('#usernameLabel').css('margin-left', '1.5%');
	} else if (screenWidth == 1080 && screenHeight == 1920) {
		// AVD Name - 6_SamsungGalaxyS4_1920x1080
		$('.navigateMenu').css('top', '190px');
	}

	else if (screenWidth == 800 && screenHeight == 1280) {
		// AVD Name - 3_SamsungGalaxyTab2_10Inch_1280x800
		// Alignment Scale HPD, back and Navigate
		$('.navigateMenu').css('top', '117px');
		$('.navigateMenu').css('top', '114px');
		$('#usernameLabel').css('margin-left', '2.2%');
		$('.acnLog').css('margin-left', '3.9%');
		$('.highPerf').css('margin-left', '2.9%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x800_p.png');
		// $('img[id^="accLogoImg"]').css('width','70%');
		// $('img[id^="accLogoImg"]').css('padding-top','22px');
		// $('img[id^="emp"]').css('width','95%');
		// $('img[id^="emp"]').css('padding-bottom','2%');
		// 
		// $('img[id^="highPerfImg"]').css('width','73%');
		$('#usernameLabel').css('margin-left', '2.9%');
	}

	else if (screenWidth == 720 && screenHeight == 1280) {
		// AVD Name - 4_SamsungGalaxySIII_1280x720
		// Alignment, Scale HPD, back and Navigate
		$('.navigateMenu').css('top', '94px');
		//
		$('#bannerImage').css('height', '70px');
		$('#usernameLabel').css('margin-left', '3.2%');
		$('.acnLog').css('margin-left', '8%');
		$('.highPerf').css('margin-left', '8.5%');
		$('#bannerImage').css('padding-top', '0px');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1280x720_p.png');
		$('img[id^="accLogoImg"]').css('width', '70%');
		$('img[id^="accLogoImg"]').css('padding-top', '22px');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="highPerfImg"]').css('width', '73%');
		$('#usernameLabel').css('margin-left', '8.5%');
	} else if (screenWidth == 480 && screenHeight == 800) {
		// AVD Name - 1_HTC_480x800_Sanket, Sanket's Phone
		$('.navigateMenu').css('top', '95px');
		$('#usernameLabel').css('margin-left', '3.5%');
		$('.acnLog').css('margin-left', '8%');
		$('.highPerf').css('margin-left', '8.5%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace480x800_p.png');
		$('img[id^="accLogoImg"]').css('width', '70%');
		$('img[id^="accLogoImg"]').css('padding-top', '22px');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="highPerfImg"]').css('width', '73%');
		$('#usernameLabel').css('margin-left', '4%');
	}

	else if (screenWidth == 600 && screenHeight == 1024) {
		$('.navigateMenu').css('top', '110px');
		$('#usernameLabel').css('margin-left', '2%');
		$('.acnLog').css('margin-left', '4.1%');
		$('.highPerf').css('margin-left', '4.2%');
		$('#bannerImage').attr('src', 'images/banner_rightPlace1024x600_p.png');
		$('img[id^="accLogoImg"]').css('width', '70%');
		$('img[id^="accLogoImg"]').css('padding-top', '22px');
		$('img[id^="emp"]').css('width', '95%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="highPerfImg"]').css('width', '73%');
		$('#usernameLabel').css('margin-left', '4.2%');
	} else if (screenWidth == 1600 && screenHeight == 2560) {
		// AVD Name - 5_SamsungNexus10_2560x1600
		$('.navigateMenu').css('top', '234px');
	} else if (screenWidth == 768 && screenHeight == 1280) {
		//alert("DEVICE changePotrait ----------------> LG Nexus... Works fine");
		$('.navigateMenu').css('top', '94px');
		//height : 70px; padding-top:2px;" 
	} else if (screenWidth == 540 && screenHeight == 960
			&& (window.orientation == 0 || window.orientation == 180)) {
		$('.navigateMenu').css('top', '95px');
		$('#usernameLabel').css('margin-left', '2.5%');
		$('img[id^="highPerfImg"]').css('width', '55%');
		$('img[id^="accLogoImg"]').css('width', '55%');
		$('img[id^="accLogoImg"]').css('padding-top', '1%');
		$('img[id^="accLogoImg"]').css('padding-left', '1%');
		$('img[id^="emp"]').css('width', '60%');
		$('img[id^="emp"]').css('padding-bottom', '2%');
		$('img[id^="emp"]').css('padding-top', '1%');
		$('img[id^="emp"]').css('padding-right', '1%');
		$('.searchBar').css('padding-left', '2.5%');
		$('#usernameLabel').css('margin-left', '2.5%');
		//alert("THIS IS Portrait");
	} else if (screenWidth == 540 && screenHeight == 960
			&& (window.orientation == 90 || window.orientation == -90)) {
		$('.navigateMenu').css('top', '95px');
		$('#usernameLabel').css('margin-left', '2%');
		$('img[id^="highPerfImg"]').css('width', '45%');
		$('img[id^="highPerfImg"]').css('padding-left', '0%');
		$('img[id^="accLogoImg"]').css('width', '45%');
		$('img[id^="accLogoImg"]').css('padding-top', '1%');
		$('img[id^="accLogoImg"]').css('padding-left', '2.5%');
		$('img[id^="emp"]').css('width', '50%');
		$('img[id^="emp"]').css('padding-bottom', '1.5%');
		$('img[id^="emp"]').css('padding-top', '1%');
		$('img[id^="emp"]').css('padding-right', '1%');
		$('.searchBar').css('padding-left', '2.5%');
		$('#usernameLabel').css('margin-left', '2.5%');
		//alert("THIS IS Portrait");
	}
}



function updateThumbnailList()
{
    fileSystem.root.getDirectory("TechTime/images", {create: false, exclusive: false},
                                 gotImagesDir, errorImageFileSystem
                                 );
}

function gotImagesDir(entry)
{
    downloadedThumbs = [];
    downloadedActuals = [];
    
    var dirImagesReader = entry.createReader();
    dirImagesReader.readEntries(function(results){
                                var i = 0;
                                for(i=0;i<results.length;i++)
                                    {
                                        if(results[i].name.indexOf("thumb") != -1)
                                            {
                                                downloadedThumbs.push(results[i].name);
                                            }
                                        if(results[i].name.indexOf("actual") != -1)
                                            {
                                                downloadedActuals.push(results[i].name);
                                            }
                                    }
                                
                          });
}

