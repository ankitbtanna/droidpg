
    var dataToWrite;                        // JSON Data which needs to be write to disk
    var toShowCategories= false;            // Flag used to check weather we need to redirect to showcategories page or just write data to disk.
    var jsonFileData;                       // JSON Data which needs to be write to disk
    var deleteFileName;                     // Global Error Handler
    var dwnldData;
    //var sPath;
   // window.appRootDirName = "Bhavya";
    var globalPath;


    var authorGlobal = '';
    

function errorFileSystem(event) {
	console.log('Filesystem Error:' + event.code + "\n" + JSON.stringify(event));
}

function errorImageFileSystem(event) {
	console.log('Image Filesystem Error:' + event.code + "\n" + JSON.stringify(event));
}


/***************************************************/
//Code starting to write to the data.json file..
/***************************************************/

function getFileSystemRefForWriting(data) {
	
	dataToWrite = data;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotRssFileSystem, errorFileSystem);
}

function gotRssFileSystem(fileSystemToWrite) {
	
    fileSystem = fileSystemToWrite;
 	fileSystem.root.getFile(jsonPath, {
		create : true,
		exclusive : false
	}, writeDataToRSSFile, errorFileSystem);

}

function writeDataToRSSFile(fileEntry) {
	
	fileEntry.createWriter(gotRSSFileWriter, errorFileSystem);

}

function gotRSSFileWriter(writer) {
	
	writer.onwriteend = function(evt) {
		
        dataToWrite = null;
        
	};
	writer.seek(0);
	writer.onerror = errorFileSystem;
	
	writer.write(JSON.stringify(dataToWrite));
}



/***************************************************/
//Code starting to read from the data.json file..
/***************************************************/

function getFileSystemRefForReading(showCategories, data) {
    toShowCategories = showCategories;
    if(!toShowCategories) {
        
        dataToWrite = data; 
    }
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFileEntryForReader, errorFileSystem);
}

function getFileEntryForReader(fileSystemForRead) {
	fileSystemForRead.root.getFile(jsonPath, null, readRSSFileData, errorFileSystem);
}

function readRSSFileData(fileReaderEntry) {
	console.log('readRSSFileData');

	try{
	fileReaderEntry.file(gotReadRssFile, errorFileSystem);
	}
	catch(error)
	{
	}

}

function gotReadRssFile(file) {
	readRSSFileJSON(file);
}

function readRSSFileJSON(file) {
	console.log('*********FINAL - readRSSFileJSON**********');
 var reader = new FileReader();
	reader.onloadend = function(evt) {
		
		try
		{
		 var obj = $.parseJSON(evt.target.result);
		}
		catch(err)
		{
			console.log("try catch"+err.message);
		}
		
	if(toShowCategories) {
		    if(obj == null || obj == '' || obj == 'null')
		    	{
		    	
		    	$('#errorString').html('If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content.<br> Please close the application and connect to Internet.');
		    	$.mobile.changePage("#errorPage");
		    	}
		    else
		    	{
		    		createJsonFormatOffline(obj);
			    	showCategoriesListTT(obj);	
			    	changeDownloadLogoutColor();
			    	

			    	
			    	document.getElementById("lblUserName").innerHTML = (jsonData.loggedUserName).replace(/\_/g,'.');
			    	
			    	
			    	lastPageOpen = window.localStorage.getItem("currentPage");
					//console.log("lastPageOpen :"+lastPageOpen);
					if(lastPageOpen == "" || lastPageOpen == null)
				   {
						lastPageOpen = 'businessCategory';
						$.mobile.changePage("#businessCategory");
						
				   }
					//alert("lastPageOpen after if for bhavya:"+lastPageOpen);
					
					if(lastPageOpen=='aboutTectTimePage')
						{
							showAboutTTArea();
							$.mobile.changePage("#"+lastPageOpen);
						}
					else if(lastPageOpen == 'contactUsPage')
						{
							contactUsFocus();
							$.mobile.changePage("#"+lastPageOpen);
						}
					else if(lastPageOpen == 'faqPage')
					{
						showFaqContent();
						$.mobile.changePage("#"+lastPageOpen);
					}
					else if(lastPageOpen == 'DownloadsPage')
					{
						showInProgress();
						$.mobile.changePage("#"+lastPageOpen);
					}
					else if(lastPageOpen == 'subscribePage')
					{
						showSubscribeContent();
						$.mobile.changePage("#"+lastPageOpen);
					}
					else if(lastPageOpen == 'UpcomingEventsPage')
					{
						var eveMnt = window.localStorage.getItem("eventmonth");
			               
			               var currMonthName =  window.localStorage.getItem("currMonth");
			               
			               //var eveCnt = window.localStorage.getItem("eventcount");
			     //  alert("currMonthName"+currMonthName);
			               showUpcomingEventList(eveMnt,currMonthName);
			               
					//	showUpcomingEventList('curr');
						$.mobile.changePage("#"+lastPageOpen);
					}
					else if(lastPageOpen == 'TAListResult')
					{
						var catName = window.localStorage.getItem("currentCategoryOff");
						var catId = window.localStorage.getItem("currentCategoryIdOff");
						//alert("catName :"+catName + "\ncatId :"+catId);
						showTAListResult(catName, catId);
						$.mobile.changePage("#"+lastPageOpen);
					}
					else if(lastPageOpen == "detailAuthor")
					{
							var authorN = window.localStorage.getItem("authorName");
							
							//console.log("authorN"+authorN);
							

							showAuthorDetailPage(authorN);
		                  $.mobile.changePage("#"+lastPageOpen); 
					}
					
					else if(lastPageOpen == "PlaylistsPage")
					{
							resetPlaylistLMRParameters();
							displayPlaylist();
		                  $.mobile.changePage("#"+lastPageOpen); 
					}
					else if(lastPageOpen == "playlistsItemPage")
					{
						var lastPlaylist = window.localStorage.getItem("lastOpenPlaylist");
						displayPlaylistItems(lastPlaylist);
		                  $.mobile.changePage("#"+lastPageOpen); 
					}
					else if(lastPageOpen == "sharePlaylistsPage")
					{
				
		                  $.mobile.changePage("#"+lastPageOpen); 
					}
					else if(lastPageOpen == "addToPlaylistPage")
					{
							showAddToPlaylist();
		                  $.mobile.changePage("#"+lastPageOpen); 
					}
					
					
					
					
					
					
					
					
					
					
					
					
					else if(lastPageOpen =='detailMediaPage')
		            {
		                //$.mobile.changePage("#businessCategory");
		                
		                //
		                //alert("in here");
						var evtFlag = window.localStorage.getItem("eventFlag");
		                var sptFlag = window.localStorage.getItem("spotLightFlag");
		                var mdFlag = window.localStorage.getItem("mediaFlag");
		                
		                //alert("sptFlag"+sptFlag);
		                
		                if(sptFlag == "false" && evtFlag == "false" && mdFlag == "false")
		                {
		                    // alert("all false");
		                    $.mobile.changePage("#businessCategory");
		                }
		                if(evtFlag == "true")
		                {
		                    //                  // alert("evt");
		                    var upeveID = window.localStorage.getItem("eventitemId");
		                    //
		                    UpcomingEventsDetail(upeveID);
		                    $.mobile.changePage("#"+lastPageOpen);
		                }
		                else if(sptFlag == "true")
		                {
		                  
		                    showSpotLightContent();
		                    $.mobile.changePage("#"+lastPageOpen);
		                }
		                else if(mdFlag == "true")
		                {
		                    //
		                    //                    //alert("mdFlag");
		                	mediaFlag = true;
		                    var eleId = window.localStorage.getItem("detailPageelementId");
		                    var eleType = window.localStorage.getItem("detailPagetype");
		                    var eleNum = window.localStorage.getItem("detailPagecountNum");
		                   // var eleCnt = window.localStorage.getItem("detailPageitemCount");
		                    //
		                    detailPageView(eleId,eleType,eleNum);
		                    //
		                    $.mobile.changePage("#"+lastPageOpen);
		                    //
		                }
		                
		            }
					
					 else if(lastPageOpen == "searchResultPage")
			            {
			                
			                var sEle = window.localStorage.getItem("searchelement");
			                var sMed = window.localStorage.getItem("media");
			                var vEle = window.localStorage.getItem("valueElement");
			                var srEle = window.localStorage.getItem("searchString");
			        //alert("sEle"+sEle+"sMed"+sMed+"vEle"+vEle+"srEle"+srEle);
			                
			                showSearchResult(sEle,sMed,vEle,srEle);
			            $.mobile.changePage("#"+lastPageOpen);
			            }
					 else if(lastPageOpen == "techWatchPage")
						{
						 	
						 currentTechWatchItemId = window.localStorage.getItem("currentTechWatchItemId");

					        currentTechWatchItemIndex = window.localStorage.getItem("currentTechWatchItemIndex");



						 showTechWatchContent(currentTechWatchItemId, currentTechWatchItemIndex);
						 $.mobile.changePage("#"+lastPageOpen);
					

						}else 
						{
							$.mobile.changePage("#businessCategory");
						
						}
				}
		} else {
			
			jsonFileData = obj;
			

			if (jsonFileData) {	
					compareAndUpdateJSON1(jsonFileData); // mainpageload.js page

			} else { // id json file is empty
				startThumbnailDownload();
				if (!toShowCategories) {
					getFileSystemRefForWriting(dataToWrite)
				}
			}
		}

	};
	reader.readAsText(file);
}

/** ************************************************ */
// Code to delete file..
/** ************************************************ */

function deleteFile(fileName){
    
    deleteFileName = fileName;
   
    if(device.platform == "Android"){
    	window.resolveLocalFileSystemURI(deleteFileName, deleteFileByFile, errorDeleteFileSystem);
    }else {
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, doDeleteFile, errorFileSystem);
    }
    

    
}

function doDeleteFile(fileSystem) {
    fileSystem.root.getFile(deleteFileName, null, deleteFileByFile , errorFileSystem);
}


function deleteFileByFile(file) {
	
   
    file.remove(function() {
        deleteFileName = "";
        jAlert('File deleted successfully.', 'Tech Time');
        //updateListAfterDelete();
    },errorDeleteFileSystem);
    
    //$.mobile.changePage("#detailMediaPage");
}


function errorDeleteFileSystem(event) {
	//console.log('errorrrrrrrrrrrrrrrrrrrrr'+JSON.stringify(event));

    jAlert('Error while deleting File. Please retry again.', 'Tech Time');
	//alert('Error while deleting File. Please retry again.'+JSON.stringify(event));
}


function readDataUrl(file) {
    
    //alert('inside read data file')
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        //alert("Read as data URL");
        //alert(evt.target.result);
    };
    reader.readAsDataURL(file);
}

