var currentPage;
var fileObj;
var downloadList = new Array();


$(document).ready(function() {
	  
document.getElementById('PlaylistPlayer').addEventListener('ended',play,false);
	
$.mobile.changePage("#intialPage");


$('[data-role=page]').on('pageshow', function (event, ui) {
	
	//console.log('1. $.mobile.activePage.attr( id )-----'+$.mobile.activePage.attr('id'));
	//	var currentPageScreen = $.mobile.activePage.attr('id');
//	PageButtonClicked(currentPageScreen);

	});


/**********Online-Offline Toggle *********/
mySelection = window.localStorage.getItem("status");
if (mySelection == "online") {
    $('.abc').attr('checked',true);
     $('.xyz').attr('checked',false);
    
 } else {
     $('.abc').attr('checked',false);
     $('.xyz').attr('checked',true);
    
 }

//$("input[type='radio']").track({
//	category : 'radiobutton',
//    action   : 'select',
//    label    : 'checked',
//    value    : 'default'
//});


$("input[type='radio']").click(function() {

var lastVisitedPage = $(this).parents('div').last().attr('id');
window.localStorage.setItem("currentPage",lastVisitedPage);
	
    mySelection = $(this).val();
   
  var networkState1 = navigator.network.connection.type;


  
  if(mySelection == "online"){ //when user selected online
  	
	  		$('.abc').attr('checked',true);
	        $('.xyz').attr('checked',false); 	       
	        
	        
	        if ((networkState1 != 'unknown') && (networkState1 != 'No network connection') && (networkState1 != 'none')) {// USER SEELECTS ONLINE BUT NO NETWORK
				//alert('ol');
	        	isOnline = true;
				usrToggle = true;
		        isOnline = true;
		        parent.window.location.href = "https://techtime.accenture.com/mobile/index.php";      
		        window.localStorage.setItem("status", "online");
		        changeDownloadLoginColor();
		       	    
			} 
			else { // USER SEELECTS ONLINE BUT NO NETWORK
				
				
			     
			     window.localStorage.setItem("eventFlag", eventsFlag);
			     window.localStorage.setItem("spotLightFlag", spotLightFlag);
			     window.localStorage.setItem("mediaFlag",mediaFlag);
			     currentTechWatchItemId = window.localStorage.getItem("currentTechWatchItemId");
			     currentTechWatchItemIndex = window.localStorage.getItem("currentTechWatchItemIndex");
			     
			     var srEle = window.localStorage.getItem("searchString");
			     window.localStorage.setItem("searchString",srEle);
			     
			     changeDownloadLogoutColor();

			     stopPlayingMedia();
			     usrToggle = false;
				    isOnline = false;
				    
					
				     window.localStorage.setItem("status", "offline");
			   
			}
		  		
	} 
  else { //when user selected offline 
  	
  	
	  $('.abc').attr('checked',false);
	  	$('.xyz').attr('checked',true);  
    
  // USER SEELECTS ONLINE BUT NO NETWORK
		
		
	     window.localStorage.setItem("status", "offline");
	     
	     window.localStorage.setItem("eventFlag", eventsFlag);
	     window.localStorage.setItem("spotLightFlag", spotLightFlag);
	     window.localStorage.setItem("mediaFlag",mediaFlag);
	     
	     currentTechWatchItemId = window.localStorage.getItem("currentTechWatchItemId");
	     currentTechWatchItemIndex = window.localStorage.getItem("currentTechWatchItemIndex");
	     
	     var srEle = window.localStorage.getItem("searchString");
	     window.localStorage.setItem("searchString",srEle);


	     stopPlayingMedia();
	    
	     usrToggle = false;
	    isOnline = false;
	   
	    if(fileObj)
	  	  {
	  	  fileObj.abort(winOffline, errorDeleteFileSystem);
	  	  downloadList = new Array();
	  	  document.getElementById('showProgressBar').innerHTML ='';
	  	  }
	    
	    onDeviceReady();  
	    
	   
	
     
  }


  $("input[type='radio']").checkboxradio();
  $("input[type='radio']").checkboxradio("refresh");
 // $.mobile.changePage("#intialPage");    
  
  


});



		var form1Var = $('#frmLogin');
		var dataToWrite;                        // JSON Data which needs to be write to disk
	    var toShowCategories= false;            // Flag used to check weather we need to redirect to showcategories page or just write data to disk.
	    var jsonFileData = '';                       // JSON Data which needs to be write to disk
	    var deleteFileName;                     // Global Error Handler
	    var dwnldData;
	

		
	$('#logout').on('click', function() {
		loggedIn = false;
		userName = "";
        $('#avPlayer').html('');
		logoutApp();
	});
                  
                  
    $('#audioBack').on('click', function() {
           document.getElementById('avPlayer').innerHTML = "";
    });              
                  
   
    $('#btnDeleteItem').on('click', function() {
        deleteCurrentPlayingFile();                                
    });

                  
    $('#TAListResult').on('click', function() {       
        
        getList();
        setFlag();
    });

});


function winOffline()
{
	jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.','Tech Time');
	   console.log("winOffline = " + FileTransferError.ABORT_ERR);


}


function logoutApp() {	
    console.log('Else device.platform:'+device.platform);    
    $.mobile.changePage('#logoutPage');
}



function setUserInfo(value) 
{
	if(value.length)
	{
        var username = (value.substr(10,value.length)).split("@")[0];
       // console.log('Storing userName to memory :'+username);     
        document.getElementById("lblUserName").innerHTML = username.replace(/\./g, '.');
        userNameGlobal = username.replace(/\./g, '.');
      }

}
	


function loadDataforOfflineMode() {
    
    var userName = window.localStorage.getItem("userName");
    
   // console.log('In loadDataforOfflineMode.'+userName);
	getFileSystemRefForReading(true, null);
}



//function refreshRSSData() {
//	//console.log('12');
//    loadXMLFromURL();
//}


var isDownloadOn = false;


function getFileSize(bytes) {
	if(bytes != 0 && bytes > 1024) {
		var mb = 1024*1024;
		return (bytes/mb).toFixed(1);
	} else {
		return bytes;
	}
}

function deleteCurrentPlayingFile() {
    //var retVal = confirm("The file will be permanently deleted from your device.");
    jConfirm('The file will be permanently deleted from your device.', 'Tech Time', function(returnValue) {
             if( returnValue == true ){
                confirmDeleteFile();
             }
    });
    
}

function confirmDeleteFile() {
    
    var fileNameToDelete = "";
    var changeIsDownloade = "";
    var mediaTypetoDelete = "";
    
    if(document.getElementById('videoComp') ){
        
      //  console.log('video item exist');
       // console.log('videoComp src -->'+document.getElementById('videoComp').src);
        
        fileNameToDelete = document.getElementById('videoComp').src;
        changeIsDownloade = document.getElementById('videoComp').src;
        
        mediaTypetoDelete = 'video';
    }
    if(document.getElementById('audioComp')){
        
        console.log('Audio item exist');
        console.log('Audio src -->'+document.getElementById('audioComp').src);
        
        fileNameToDelete = document.getElementById('audioComp').src;
        changeIsDownloade = document.getElementById('audioComp').src;
        
        mediaTypetoDelete = 'audio';
    }

    $('#avPlayer').html("");
    
    var n = fileNameToDelete.lastIndexOf("/")+1;
  
    fileNameToDelete = fileNameToDelete.substring(n,fileNameToDelete.length);
    
//  console.log('changeIsDownloade'+changeIsDownloade);
//    console.log('alldownloadFlag->'+alldownloadFlag);
//    console.log('sPath--->'+sPath);
//    console.log('fileNameToDelete after substring -->'+fileNameToDelete);
//    console.log('fileNameToDelete after substring -->'+fileNameToDelete);
  
//    
    deleteFile(sPath+"/"+fileNameToDelete);
  // updateListAfterDelete(changeIsDownloade,fileNameToDelete,mediaTypetoDelete);
  
   fileNameToDelete = fileNameToDelete.substring(0,fileNameToDelete.length-4);
  // alert('fileNameToDelete'+fileNameToDelete);
   setTimeout(changeIsdownloadStatusAfterDelete(changeIsDownloade, fileNameToDelete, mediaTypetoDelete),2000);
   
   CheckAllDownloads();
   
   if(alldownloadFlag){
	   console.log('From downloades Page');
	   showAllDown();
	   
   }else if (spotLightFlag) {
	   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
       spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
	   }
   }
   else {
	   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
       detailPageView(currElementId,currElementtype,currElementcountNum);
       $.mobile.changePage('#detailMediaPage');

	   }
   }
    
   
   
   if(alldownloadFlag){
	   console.log('From downloades page');
	   showAllDown();
	   
   }else if (spotLightFlag) {
    	   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
           spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
    	   }
       }
       else {
    	   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
           detailPageView(currElementId,currElementtype,currElementcountNum);
           $.mobile.changePage('#detailMediaPage');

    	   }
    	   
       }
   
   

}

function reloginToTT()
{

	 $('.abc').attr('checked',true);
    $('.xyz').attr('checked',false); 	       
    isOnline = true;
	usrToggle = true;
       isOnline = true;
        parent.window
        window.location.href = "https://techtime.accenture.com/mobile/index.php";      
        window.localStorage.setItem("status", "online");
        changeDownloadLoginColor(); 
	//parent.window.location.href = "https://techtime.accenture.com/mobile/index.php";      
//    window.localStorage.setItem("status", "online");
  //  alert("RELOGIN Fn Called End");
   
}


