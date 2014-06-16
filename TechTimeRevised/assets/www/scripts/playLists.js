var playlistArray = new Array();
var playlistThumbanails = [];
var playing = false;

var current = 0,
isPlaying = false;

var playlistDownloadedThumbIndex = 0;


    


function loadPlaylistsData() {
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    var playlistRSS = "https://techtime.accenture.com/mobile-playlist/" + loggedInUsername;
    $.ajax({
        type: "GET",
        url: playlistRSS,
        dataType: "xml",
        success: getPlaylistsData,
        error: function (xhr, textStatus, errorThrown) {
            //alert('error');
        }
    });
}
 
 
var playlistThumbnails = [];
 
function getPlaylistsData(xml) {
    $(xml).find('playlist').each(function (index, item) {
        var playlist = new Object();
        playlist.playlistId = $(this).attr('id');
        playlist.playlistName = $(this).attr('name');
        playlist.playlistType = $(this).attr('type');
        playlist.playlistItems = [];
        playlist.isUpdated = true;
        $(this).find('item').each(function (childIndex, childItem) {
            var playlistItem = new Object();
            playlistItem.playlistItemFormatType = $(this).find('format_type').text().substring(0, 1);
            playlistItem.playlistItemContentType = $(this).find('content_type').text().substring(0, 1);
            playlistItem.playlistItemId = playlistItem.playlistItemFormatType + "V" + $(this).find('id').text();
            playlistItem.playlistItemTitle = $(this).find('title').text();
            playlistItem.playlistItemDate = $(this).find('date').text();
            playlistItem.playlistItemAuthor = $(this).find('author').text();
            playlistItem.playlistItemUrl = $(this).find('url').text();
     
           // playlistItem.playlistItemUrl = "http://media.w3.org/2010/05/bunny/trailer.mp4"; //$(this).find('url').text();
 
            playlistItem.playlistItemFormat = playlistItem.playlistItemUrl.substring(playlistItem.playlistItemUrl.lastIndexOf('.') + 1, playlistItem.playlistItemUrl.length);
            playlistItem.playlistItemThumb = $(this).find('thumb').text();
 
            var playlistThumbDetails = new Object();     // itemId mediatype thumbUrl
            playlistThumbDetails.itemId = playlistItem.playlistItemId.substring(2, playlistItem.playlistItemId.length);
           if (playlistItem.playlistItemId.substring(1, 2) == "A") {
                playlistThumbDetails.mediaType = "Audios";
            } else if (playlistItem.playlistItemId.substring(1, 2) == "V") {
                playlistThumbDetails.mediaType = "Videos";
            }
           /* if (playlistItem.playlistItemId.substring(1, 2) == "V") {
                playlistThumbDetails.mediaType = "Technology Sessions";
            }*/else if (playlistItem.playlistItemId.substring(1, 2) == "P") {
                playlistThumbDetails.mediaType = "Panel Discussions";
            } else if (playlistItem.playlistItemId.substring(1, 2) == "T") {
                playlistThumbDetails.mediaType = "Technology Conferences";
            } else if (playlistItem.playlistItemId.substring(1, 2) == "I") {
                playlistThumbDetails.mediaType = "Interviews";
            } else if (playlistItem.playlistItemId.substring(1, 2) == "D") {
                playlistThumbDetails.mediaType = "documents";
            }
            playlistThumbDetails.thumbUrl = playlistItem.playlistItemThumb;
 
            playlistThumbnails.push(playlistThumbDetails);
 
            if (playlistItem.playlistItemFormat != 'mp3' || playlistItem.playlistItemContentType != 'd') {
                playlist.playlistItems.push(playlistItem);
            }
        });
        if (playlist.playlistItems.length > 0) {
            jsonData.playlists.push(playlist);
        }
 
 
    });
 
 
 
    if (isOnline) {
        downloadPlaylistThumbnails();
   }
 
}
 


function displayPlaylist()
{
console.log(jsonData.playlists);

var htmlText = '';
var playId = '';

$.each(jsonData.playlists, function(key, item) {
	
	var thumbId = item.playlistItems[item.playlistItems.length - 1].playlistItemId.substr(2, item.playlistItems[item.playlistItems.length - 1].playlistItemId.length);
    var thumbUrl = item.playlistItems[item.playlistItems.length - 1].playlistItemThumb;
    var thumbPath = '';
    
    if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
    {
        thumbPath = sPath + "/images/"+thumbId + "thumb.png";
        //alert("local image path for playlist " + thumbPath);
    } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
    {
        if(isOnline)
        {
            thumbPath = thumbUrl;
        } else if(!isOnline)
        {
            //thumbPath = 'images/TechTime.png';
            thumbPath = sPath + "/images/"+thumbId + "thumb.png";
        }
    }

	playId = item.playlistId;
	
	
	        htmlText = htmlText + '<div id="' + item.playlistId + '" style="width:100%;background-color:#F0EFED;">';
	       
        htmlText = htmlText + '<div style="width:13%;float:left;text-align:center;background-color:inherit;padding-top:12px;padding-bottom:12px;background-color:inherit;">';
 
 
        htmlText = htmlText + '<input id="playlist' + item.playlistId + '" data-playlistId="' + item.playlistId + '" data-playlistName="' + item.playlistName + '" type="checkbox" data-role="none" style="margin-top:7%;z-index:100;" onclick="selectPlaylistForSharing(this);"></div><div style="width:16%;min-width:75px;float:left;margin-top:7px;" onclick="displayPlaylistItems(' + playId + ');gotFS(fileSystem)"><img src="' + thumbPath + '" style="max-height:75px;max-width:75px;width:100%;height:100%;"></img></div>';
        htmlText = htmlText + '<div style="width:54%;float:left;padding-top:12px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:inherit;" onclick="displayPlaylistItems(' + playId + ');gotFS(fileSystem)">';
        htmlText = htmlText + '<label style="font-size:16px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;font-weight:bold;color:orange;whitespace:wrap" >' + item.playlistName + '</label>';
        htmlText = htmlText + '</div><div style="width:10%;padding-top:10px;padding-bottom:9px;float:left;text-align:right;background-color:inherit;" onclick="displayPlaylistItems(' + playId + ');gotFS(fileSystem)">';
 
        if (item.playlistType == "admin") {
            htmlText = htmlText + '<img src="images/adminPlaylist.png" style="height:20px;width:20px;padding-right:30%;"><br/>';
        } else {
            htmlText = htmlText + '<br/>';
        }
 
        htmlText = htmlText + '<img src="images/orange_icon_right.png" style="height:20px;width:20px;padding-right:30%;"></div></div>';
        htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';
 
        thumbId = '';
        thumbUrl = '';
        thumbPath = '';
    });
    $('#userPlaylistsDiv').html(htmlText);
    showNavigateDiv("navigateDiv");
    $.mobile.changePage("#PlaylistsPage");
    
    


}


// ---------------------------------- Display Playlist Items ---------------------------------- //

var myPlaylistItems = [];

var playlistItemsStartIndex = 0;
var playlistItemsEndIndex = 4;

var isActionLoadMoreResult = false;

function displayPlaylistItems(playlistId)
{
	playlistItemsPageFlag = false;
//alert("displayPlaylistitems");
	var strHTMLtext ='';
	var playlistName ='';
	var icons = '';
	var typeOficon = '';
	
	myPlaylistItems = [];
	
	// TODO: Update Downloaded Files
	
	window.localStorage.setItem("lastOpenPlaylist", playlistId);
	
	
	
	$('#userPlaylistsRenameOption').attr('data-playlistId', playlistId);
	
	
	
	$.each(jsonData.playlists, function(key, item) {
		
		if(playlistId == item.playlistId ){
			
			playlistName= playlistName + item.playlistName;
	
	if (item.playlistType == 'admin') {
                $('#userPlaylistsRenameDeleteOption').css('display', 'none');
            } else {
                $('#userPlaylistsRenameDeleteOption').css('display', 'block');
            }
 
            playlistName = item.playlistName;
           // alert("issue playlist" + item.playlistName);
            currentOpenPlaylist = playlistId;
	
	if(item.playlistItems.length <= 5)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'none');
                  } else if(item.playlistItems.length > 5)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'block');
                  }
	
	
		$.each(item.playlistItems, function(key, itemPlay) {
			typeOficon = itemPlay.playlistItemUrl.substr(itemPlay.playlistItemUrl.lastIndexOf('.')+1 , itemPlay.playlistItemUrl.length);
				if(typeOficon == 'mp3'){
					icons = 'images/icon_audio.png';
				}else if(typeOficon == 'mp4'){
					icons = 'images/icon_video.png';				
				}
			// TODO: LMR
			
			
				
			var playlistItm = new Object();
			playlistItm.id = itemPlay.playlistItemId;
			playlistItm.track = itemPlay.playlistItemTitle;
				
			if(entriesList.indexOf(itemPlay.playlistItemId) == -1)
            {
				playlistItm.trackUrl = itemPlay.playlistItemUrl;
				playlistItm.isItemDownloaded = false;
            } else if(entriesList.indexOf(itemPlay.playlistItemId) != -1)
            {
            	playlistItm.trackUrl =  sPath + itemPlay.playlistItemId+".mp4";
            	playlistItm.isItemDownloaded = true;
            } 

			
			//playlistItm.trackUrl = itemPlay.playlistItemUrl;

			playlistArray.push(playlistItm);
			
			
			var thumbId = itemPlay.playlistItemId.substr(2, itemPlay.playlistItemId.length);
            var thumbUrl = itemPlay.playlistItemThumb;
            var thumbPath = '';
            var itemId = itemPlay.playlistItemId;
          
            
            if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
            {
                thumbPath = sPath + "/images/"+thumbId + "thumb.png";
            } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
            {
                if(isOnline)
                {
                    thumbPath = thumbUrl;
                } else if(!isOnline)
                {
                    thumbPath = 'images/TechTime.png';
                }
            }
            
            var authorDisplayText = '';
            var authorArray = itemPlay.playlistItemAuthor.split('|');
            for(var i=0;i<authorArray.length;i++)
            {
              if(i<authorArray.length-1)
                  {
                      authorDisplayText = authorDisplayText + authorArray[i] + ", "
                  } else
                  {
                      authorDisplayText = authorDisplayText + authorArray[i];
                  }
            }

			var playlistItem = new Object();
                  playlistItem.itemId = itemPlay.playlistItemId;
                  playlistItem.itemTitle = itemPlay.playlistItemTitle;
                  playlistItem.thumnail = thumbPath;
                  
                  if(entriesList.indexOf(itemPlay.playlistItemId) == -1)
                  {
                  playlistItem.itemPath = itemPlay.playlistItemUrl;
                  playlistItem.isItemDownloaded = false;
                  } else if(entriesList.indexOf(itemPlay.playlistItemId) != -1)
                  {
                  playlistItem.itemPath = sPath+"/"+itemPlay.playlistItemId+".mp4";
                  playlistItem.isItemDownloaded = true;
                  }
                  
                  myPlaylistItems.push(playlistItem);
			
			 if(key <= playlistItemsEndIndex)
             {
			strHTMLtext = strHTMLtext+ '<div style="width:100%;background-color:#F0EFED;">';
			strHTMLtext = strHTMLtext + '<div onclick="playPlaylistItem(this)" id="playlistItem'+itemPlay.playlistItemId+'" data-playlistItemIndex="'+key+'" style="width:20%;float:left;padding-top:12px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:#F0EFED;">';
            strHTMLtext = strHTMLtext + '<img src="'+thumbPath+'" style="max-height:65px;max-width:65px;width:100%;height:100%;padding-left:5%;margin-top:2%;"></img></div>';
			strHTMLtext = strHTMLtext+ '<div onclick="playPlaylistItem(this)" id="playlistItem'+itemPlay.playlistItemId+'" data-playlistItemIndex="'+key+'" style="width:61%;float:left;padding-top:12px;padding-bottom:8px;padding-left:2px;padding-right:5px;background-color:#F0EFED;">';
			strHTMLtext = strHTMLtext+ '<ul><li style="font-size:16px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;list-style: none;" id="'+itemPlay.playlistItemId+'" title="'+itemPlay.playlistItemUrl+'">'+itemPlay.playlistItemTitle+'</li>';
			
			strHTMLtext = strHTMLtext + '<br/><label style="width:61%font-size:13px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;color:orange;font-weight:100;">'+authorDisplayText+'</label><br/><label style="font-size:12px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;color:black;font-weight:200;">'+itemPlay.playlistItemDate+'</label>';
            strHTMLtext = strHTMLtext + '</div></ul><div style="width:11%;height:100%;padding-top:10px;padding-bottom:9px;float:left;text-align:right;background-color:#F0EFED;">';
		    strHTMLtext = strHTMLtext + '<img src="'+icons+'" style="height:20px;width:20px;padding-right:10px;"><br/>';
		    
		    
            if(entriesList.indexOf(itemPlay.playlistItemId) == -1)
            {
              strHTMLtext = strHTMLtext + '<img id="downloadPlItemBtn'+key+'" data-itemId="'+itemId+'" data-itemUrl="'+itemPlay.playlistItemUrl+'" data-itemTitle="'+itemPlay.playlistItemTitle+'" src="images/downloadPlaylistItem.png" style="height:32px;width:30px;padding-right:5px;padding-top:50%;z-index:999999" onclick="downloadPlaylistItem(this);">';
            }
            
            strHTMLtext = strHTMLtext + '</div>';
            strHTMLtext = strHTMLtext + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/></div>';
            }
            
            if(playlistItemsEndIndex >= item.playlistItems.length - 1)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'none');
                  } else if(playlistItemsEndIndex < item.playlistItems.length - 1)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'block');
                  }

				
		});
		}

	});
	
	
	document.getElementById('userPlaylistsItemHeader').innerHTML = playlistName;
	//alert("Playlist Header Name" + playlistName);
	
	
	$('#userPlaylistsHeader').html(playlistName);
	$('#playlistItemsDiv').html(strHTMLtext);  
	
	$('#playlistItemsLoadMoreDiv').empty();
    var loadMoreHtml = "<div class='linkTransition' id='loadMorePlaylistItems' data-playlistId='"+playlistId+"' data-itemStartIndex=0 data-itemEndIndex=4 style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='loadMorePlaylistItems(this)'><b>Load More Playlist Items</b></div>";
    $('#playlistItemsLoadMoreDiv').html(loadMoreHtml);
	
	if(!isActionLoadMoreResult)
    {
        if(isOnline)
        {
               //var playlistVideoPlayer = '<video id="playlistItemPlayer" type="video/mp4" style="width:100%;" src="'+myPlaylistItems[0].itemPath+'" controls></video>';
              
                 var playlistVideoPlayer = '<video id="playlistItemPlayer" class="video-js vjs-default-skin" preload="none" style="width:100%;"  controls data-setup="{}"  src="'+myPlaylistItems[0].itemPath+'"></video>';
              
    //alert(myPlaylistItems[0].itemPath);

                 
                $('#playlistItemPlayerDiv').html(playlistVideoPlayer);
             
        } else if(!isOnline)
        {
               if(myPlaylistItems[0].itemPath.indexOf('techtime.accenture') != -1)
                {
                        if(myPlaylistItems[0].isItemDownloaded == false)
                        {
                            //var playlistVideoPlayer = '<video id="playlistItemPlayer" type="video/mp4" style="width:100%;" src="https://techtime.accenture.com" controls></video>';
                        	 var playlistVideoPlayer = '<video id="playlistItemPlayer" class="video-js vjs-default-skin" preload="none" style="width:100%;"  controls data-setup="{}"><source src="'+myPlaylistItems[0].itemPath+'" type="video/mp4"></video>';
                        }
                } else if(myPlaylistItems[0].itemPath.indexOf('techtime.accenture') == -1)
                {
                	if(myPlaylistItems[0].isItemDownloaded == true)
                        {
                            var playlistVideoPlayer = '<video id="playlistItemPlayer" type="video/mp4" style="width:100%;" src="'+myPlaylistItems[0].itemPath+'" controls></video>';
                        }
                }
                $('#playlistItemPlayerDiv').html(playlistVideoPlayer);
        }
      }
	
	document.getElementById('playlistItemPlayer').addEventListener('ended',autoplayNextItem,false);
	$('#nowPlayingItemTitle').html(myPlaylistItems[0].itemTitle);
    $.mobile.changePage("#playlistsItemPage");


}

var video1 = document.getElementById('PlaylistPlayer');

function loadTrack(element)
{	
	var itemSrc = element.title;
	var id = element.id;
	$("#PlaylistPlayer").attr("src", itemSrc); 
	$.each(playlistArray, function(key, item){
		if(id == item.id){
			//alert(id+'====='+key+'===='+JSON.stringify(playlistArray[key]));
			current = key;
			getVideo(playlistArray[key], play);
		}
	
	});

}

var currentPlayingItemIndex = 0;
function playPlaylistItem(playlistItem)
{
	
    var myPlaylistItem = $('#'+playlistItem.id);
    currentPlayingItemIndex = myPlaylistItem.attr('data-playlistItemIndex');
    
    if(currentPlayingItemIndex === undefined)
    {
        var itemIndex = myPlaylistItems.length - 1;
        currentPlayingItemIndex = myPlaylistItems.length - 1;
    } else
    {
        var itemIndex = parseInt(currentPlayingItemIndex);
    }
    
    var playItemTitle = myPlaylistItems[currentPlayingItemIndex].itemTitle;
    var playItemPath = myPlaylistItems[currentPlayingItemIndex].itemPath;
    var playItemthumb = myPlaylistItems[currentPlayingItemIndex].thumnail;
    var playItemDowloaded = myPlaylistItems[currentPlayingItemIndex].isItemDownloaded;
    var playItemId = myPlaylistItems[currentPlayingItemIndex].itemId;
    
  //  playVideo(playItemPath);
    
    if(isOnline && (playItemDowloaded == true || playItemDowloaded == "true"))
    {
        $('#playlistItemPlayer').attr('src', playItemPath);
       // $('#playlistItemPlayer').attr('poster', playItemthumb);
        $('#playlistItemPlayer').attr('autoplay', true);
        $('#nowPlayingItemTitle').html(playItemTitle);
        document.getElementById('playlistItemPlayer').play();
    } else if(isOnline && (playItemDowloaded == false || playItemDowloaded == "false"))
    {
        $('#playlistItemPlayer').attr('src', playItemPath);
      // $('#playlistItemPlayer').attr('poster', playItemthumb);
        $('#playlistItemPlayer').attr('autoplay', true);
        $('#nowPlayingItemTitle').html(playItemTitle);
        document.getElementById('playlistItemPlayer').play();
    } else if(!isOnline && (playItemDowloaded == true || playItemDowloaded == "true"))
    {
        $('#playlistItemPlayer').attr('src', playItemPath);
       // $('#playlistItemPlayer').attr('poster', playItemthumb);
        $('#playlistItemPlayer').attr('autoplay', true);
        $('#nowPlayingItemTitle').html(playItemTitle);
       document.getElementById('playlistItemPlayer').play();
    } else if(!isOnline && (playItemDowloaded == false || playItemDowloaded == "false"))
    {
        jAlert("Please go Online to view this Video.", "Tech Time");
    }
    
}


function autoplayNextItem(e)
{

    var itemIndex = parseInt(currentPlayingItemIndex) + 1;
    
    if(isOnline && myPlaylistItems[itemIndex].isItemDownloaded == false)
    {
        var itemObject = new Object();
        itemObject.id = "playlistItem"+myPlaylistItems[itemIndex].itemId;
        if(itemIndex <= myPlaylistItems.length)
        {
            playPlaylistItem(itemObject);
        }
        
    } else if(isOnline && myPlaylistItems[itemIndex].isItemDownloaded == true)
    {
        var itemObject = new Object();
        itemObject.id = "playlistItem"+myPlaylistItems[itemIndex].itemId;
        if(itemIndex <= myPlaylistItems.length)
        {
            playPlaylistItem(itemObject);
        }
        
    } else if(!isOnline && myPlaylistItems[itemIndex].isItemDownloaded == false)
    {
        jAlert("Please go online to stream this file.", "Tech Time");
    }

    
}


function getVideo(vid, callback) {

    var e = this;
    $("#PlaylistPlayer").on('canplay', canPlay, false);
    function canPlay(e) {
    	$("#PlaylistPlayer").off('canplay', canPlay);
        vid.isReady = true;
        if (typeof callback === 'function')
            callback(vid);
    }
    $("#PlaylistPlayer").src = vid.trackUrl;
    $("#PlaylistPlayer")[0].play();
    
  //  alert('vid.track----'+vid.track);

	$('#currentTrack').html(vid.track);            

    
}

function play(){

        var next = current;       
        next++;
        if (next > playlistArray.length - 1){
        	//next = 0; //do nothing
        }
        
        if(playlistArray.length > 0)
        	{
        		getVideo(playlistArray[next]);        		 
        		  
        	}
            

        //alert('play---'+playlistArray[next].track);
		  $("#PlaylistPlayer")[0].play();
    
        console.log(next+"***************************"+playlistArray.length);
        	
        		current = next;
        	
    }

function downloadPlaylistThumbnails()
{
    updateThumbnailList();
    
    var playlistItemId = playlistThumbanails[playlistDownloadedThumbIndex].itemId;
    var playlistThumbUrl = playlistThumbanails[playlistDownloadedThumbIndex].thumbUrl;
    var playlistThumbMediaType = playlistThumbanails[playlistDownloadedThumbIndex].mediaType;
    
    numberOfThumbsToDownload = playlistThumbanails.length;
    
    if(playlistDownloadedThumbIndex < numberOfThumbsToDownload)
    {
            downloadPlaylistThumbImages(playlistItemId, "thumb", playlistThumbUrl, playlistThumbMediaType);
    }
    
}

function downloadPlaylistThumbImages(thumbId,imageName,imageLink,mediaType)
{   
    var url = '';
    url = imageLink;
    
    var name = '';
    name = imageName;
    
    var valueReturn = '';
    valueReturn = 'false';
    
    var filePath = '';
    filePath = '';
    
    if(downloadedThumbs.indexOf(playlistThumbanails[playlistDownloadedThumbIndex].itemId+"thumb.png") == -1)
    {
        var fileTransfer = new FileTransfer();
        
        if(isOnline){
            filePath = sPath + "images/"+ thumbId+imageName + ".png";
            if(url!="" ){
                fileTransfer.download(
                                      url,
                                      filePath,
                                      function(entry){
                                      // changePath(thumbId,name,mediaType,filePath);
                                      playlistDownloadedThumbIndex = playlistDownloadedThumbIndex + 1;
                                      if(playlistDownloadedThumbIndex < numberOfThumbsToDownload)
                                      {
                                      downloadPlaylistThumbnails();
                                      }
                                      },
                                      function(error) {
                                      console.log("download error source " + error);
                                      
                                      }
                                      );
            }
        }
    } else
    {
        playlistDownloadedThumbIndex = playlistDownloadedThumbIndex + 1;
        if(playlistDownloadedThumbIndex < numberOfThumbsToDownload)
        {
            downloadPlaylistThumbnails();
        }
    }
    
}

// ---------------------------------- Download Playlist Item ---------------------------------- //
 
function downloadPlaylistItem(item) {
	playlistItemsPageFlag = true;
    var downloadPlaylistItemId = '';
    var downloadPlaylistItemUrl = '';
    var downloadPlaylistItemTitle = '';
 
    var myDownloadButton = $('#' + item.id);
 
    downloadPlaylistItemId = myDownloadButton.attr('data-itemId');
    downloadPlaylistItemUrl = myDownloadButton.attr('data-itemUrl');
    downloadPlaylistItemTitle = myDownloadButton.attr('data-itemTitle');
    downloadPlaylistItemId = downloadPlaylistItemId.replace(/[^a-zA-Z0-9]/g, '');   
    downloadFile(downloadPlaylistItemId, downloadPlaylistItemUrl, false, downloadPlaylistItemTitle, 2);

}
 
 
// ---------------------------------- Download Playlist Item ---------------------------------- //


// ---------------------------------- Rename Playlist ---------------------------------- //
function showRenamePlaylistForm() {
    $('#userPlaylistsRenameDeleteOption').css('display', 'none');
    $('#renamePlaylistNoName').css('display', 'none');
    $('#renamePlaylistNoInternet').css('display', 'none');
    $('#renamePlaylistForm').css('display', 'block');
 
    $('#renamePlaylistNamePlaceholder').val($('#userPlaylistsItemHeader').text());
    //alert("renaming " + $('#userPlaylistsItemHeader').text());
    showHideVideoPlayer("hide");
 
}
 
function cancelRenamePlaylistAction() {
    $('#renamePlaylistForm').css('display', 'none');
    $('#renamePlaylistNoName').css('display', 'none');
    $('#renamePlaylistNoInternet').css('display', 'none');
    $('#userPlaylistsRenameDeleteOption').css('display', 'block');
    showHideVideoPlayer("show");
}
 
var currentOpenPlaylist = '';
 
// TODO: UI - Hide the Rename form and show back the Rename Delete option
// TODO: UI - Change the Name of the Playlist in the Playlist Items Page
// TODO: Compile Details
// TODO: Rename Error Handlers within page
// FIXME: Back of Playlist Items Page, Re-Render the Playlists List Page with the updated names and playlists
function renamePlaylist() {
 
    var renamePlaylistService = 'https://techtime.accenture.com/techtimemobile/playlist-service';
    var renamePlaylistName = $('#renamePlaylistNamePlaceholder').val();
    renamePlaylistName = renamePlaylistName.replace(/[^a-zA-Z0-9 ]/g, "");
    //alert("renamePlaylistName : " + renamePlaylistName);
    var playlistExists = false;
 
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
 
    $.each(jsonData.playlists, function (key, item) {
        if (item.playlistName == renamePlaylistName) {
            playlistExists = true;
        }
    });
 
 
    if (isOnline && !playlistExists) {
        if (renamePlaylistName != "") {
        //alert("true");
            var renamePlaylistJsonData = '{"data":{"mode":"rename","username":"' + loggedInUsername + '","playlistIds":"' + currentOpenPlaylist + '","renamedPlaylist":"' + renamePlaylistName + '"}}';
            $.ajax({
                type: 'POST',
                url: renamePlaylistService,
                data: renamePlaylistJsonData,
                dataType: 'xml',
                contentType: 'application/json',
                success: function (data) {
                    // TODO: UI - Hide the Rename form and show back the Rename Delete option
                    $('#renamePlaylistForm').css('display', 'none');
                    $('#userPlaylistsRenameDeleteOption').css('display', 'block');
 
                    // TODO: UI - Change the Name of the Playlist in the Playlist Items Page
                   $('#userPlaylistsItemHeader').html(renamePlaylistName);
 
                    //TODO: Compile Details
                    // Add the details of the remaned PL to JSON
                    updatePlaylistNameInJson(currentOpenPlaylist, renamePlaylistName);
                    showHideVideoPlayer("show");
                },
                error: function (xhr, textStatus, error) {
                    console.log('In Failure' + JSON.stringify(xhr));
                    jAlert('Oops! There was some error renaming your Playlist. Please try again.', 'Tech Time');
                }
            });
 
        } else {
            $('#renamePlaylistForm').css('display', 'none');
            $('#renamePlaylistNoName').css('display', 'block');
 
        }
    } else if (!isOnline) {
        $('#renamePlaylistForm').css('display', 'none');
        $('#renamePlaylistNoName').css('display', 'none');
        $('#renamePlaylistNoInternet').css('display', 'block');
    } else if (playlistExists) {
        jAlert('Playlist with this name already exists. Please choose a different name.', 'Tech Time');
        playlistExists = false;
    }
 
 
 
}
 
function updatePlaylistNameInJson(playlistId, newPlaylistName) {
//alert("updatePlaylistNameInJson -- " + newPlaylistName);
    $.each(jsonData.playlists, function (key, playlist) {
    
    //alert(playlist.playlistId + " == " + playlistId);
    
        if (playlist.playlistId == playlistId) {
            playlist.playlistName = newPlaylistName;
        }
    });
 
    getFileSystemRefForWriting(jsonData);
}
 
// ---------------------------------- Rename Playlist ---------------------------------- //
 
// ---------------------------------- Delete Playlist ---------------------------------- //
function showDeletePlaylistConfirmation() {
	//alert("deleting " + $('#userPlaylistsItemHeader').text());
    $('#deletePlaylistConfirmation').css('display', 'block');
    $('#deletePlaylistConfirmationLabel').text("Are you sure you want to delete " + $('#userPlaylistsItemHeader').text() + "?");
 
    $('#userPlaylistsRenameDeleteOption').css('display', 'none');
    showHideVideoPlayer("hide");
}
 
function cancelDeletePlaylistAction() {
    $('#deletePlaylistConfirmation').css('display', 'none');
    $('#deletePlaylistNoInternet').css('display', 'none');
    $('#userPlaylistsRenameDeleteOption').css('display', 'block');
    showHideVideoPlayer("show");
}
 
// TODO: UI - Hide the Delete form and go back to Playlists List Page
// TODO: UI - Re-render the Playlists List Page with updated sets pf Playlists/Playlist
// TODO: Compile Details in JSON
// TODO: Delete Playlist Error Handlers within page
// TODO: Auto switch to Playlists List Page
 
function deletePlaylist() {
    var deletePlaylistService = 'https://techtime.accenture.com/techtimemobile/playlist-service';
 
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
 
    if (isOnline) {
        var deletePlaylistJsonData = '{"data":{"mode":"delete","username":"' + loggedInUsername + '","playlistIds":"' + currentOpenPlaylist + '"}}';
 
        $.ajax({
            type: 'POST',
            url: deletePlaylistService,
            data: deletePlaylistJsonData,
            dataType: 'xml',
            contentType: 'application/json',
            success: function (data) {
                // TODO: UI - Hide the Delete form and go back to Playlists List Page
                $('#deletePlaylistConfirmation').css('display', 'none');
                $('#userPlaylistsRenameDeleteOption').css('display', 'block');
                 console.log("file deleted successfully");
                //TODO: Compile Details
                // Add the details of the remaned PL to JSON
                updatePlaylistsInJsonAfterDeletePlaylist(currentOpenPlaylist);
            },
            error: function (xhr, textStatus, error) {
                console.log('In Failure' + JSON.stringify(xhr));
                jAlert('Oops! There was some error deleting your Playlist. Please try again.', 'Tech Time');
            }
        });
 
    } else if (!isOnline) {
        // $('#deletePlaylistConfirmation').css('display', 'none');
        // $('#deletePlaylistNoInternet').css('display', 'block');
 
        jsonData.deletedPlaylistIds.push(currentOpenPlaylist);
        updatePlaylistsInJsonAfterDeletePlaylist(currentOpenPlaylist);
        cancelDeletePlaylistAction();
    }
 
}
 
function updatePlaylistsInJsonAfterDeletePlaylist(playlistToBeRemoved) {
    var indexOfDeletedPlaylist;
 
    $.each(jsonData.playlists, function (key, playlist) {
        if (playlist.playlistId == playlistToBeRemoved) {
            indexOfDeletedPlaylist = key;
        }
    });
 
    if (indexOfDeletedPlaylist != null) {
        if (~indexOfDeletedPlaylist) jsonData.playlists.splice(indexOfDeletedPlaylist, 1);
    }
 
    // TODO: Auto switch to Playlists List Page with updated sets pf Playlists/Playlist
    resetPlaylistLMRParameters();
    displayPlaylist();
    $.mobile.changePage('#PlaylistsPage');
    //alert("getfilesystem : " );
    getFileSystemRefForWriting(jsonData);
    //alert("after get file system : " );
}
 
 
// ---------------------------------- Delete Playlist ---------------------------------- //
















// ---------------------------------- Create New Playlist ---------------------------------- //
 
function showCreateNewPlaylistForm() {
    $('#newPlaylistNamePlaceholder').attr('placeholder','New Playlist Name');
    $('#createNewPlaylistForm').css('display', 'block');
    $('#createNewPlaylistTab').css('display', 'none');
    $('#createPLNoName').css('display', 'none');
 
}
 
function cancelNewPlaylistCreation() {
    $('#createNewPlaylistTab').css('display', 'block');
 
    $('#createNewPlaylistForm').css('display', 'none');
    $('#createPLNoInternet').css('display', 'none');
    $('#createPLNoName').css('display', 'none');
}
 
function createNewPlaylist() {
    var createPlaylistService = 'https://techtime.accenture.com/techtimemobile/playlist-service';
    var createPlaylistName = $('#newPlaylistNamePlaceholder').val();
    var playlistExists = false;
    createPlaylistName = createPlaylistName.replace(/[^a-zA-Z0-9 ]/g, "");
 
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    $.each(jsonData.playlists, function (key, item) {
        if (item.playlistName == createPlaylistName) {
            playlistExists = true;
        }
    });
    if (isOnline && !playlistExists) {
        if (createPlaylistName != "") {
            var createPlaylistJsonData = '{"data" :{"mode" : "create","username":"' + loggedInUsername + '","playlistName":"' + createPlaylistName + '"}}';
 
            $.ajax({
                type: 'POST',
                url: createPlaylistService,
                data: createPlaylistJsonData,
                dataType: 'xml',
                contentType: 'application/json',
                success: function (data) {
                    var dataResult = $(data).find('result');
                    var dataResultItem = $(dataResult).find('item');
                    var dataResultItemId = $(dataResultItem).find('id');
 
                    var createdPlaylistId = dataResultItemId.text();
 
 
                    $('#createNewPlaylistForm').css('display', 'none');
                    $('#createNewPlaylistTab').css('display', 'block');
 
 
                    // TODO: Compile Details
                    // Add the details of the created PL to JSON
                    addPlaylistDetailsToJsonAfterCreation(createPlaylistName, createdPlaylistId);
 
                    // Switch To Detail Page from where Add to PL was pressed.
                },
                error: function (xhr, textStatus, error) {
                    console.log('In Failure' + JSON.stringify(xhr));
                    jAlert('Oops! There was some error creating your Playlist. Please try again.', 'Tech Time');
                }
            });
 
        } else {
            //jAlert('Please enter a valid Playlist Name.', 'Tech Time');
            $('#createNewPlaylistForm').css('display', 'none');
            $('#createPLNoName').css('display', 'block');
 
        }
    } else if (!isOnline) {
        $('#createNewPlaylistForm').css('display', 'none');
        $('#createPLNoInternet').css('display', 'block');
        //jAlert('Please connect to the internet for creating new Playlist', 'Tech Time');
        //        var offlinePlaylists = jsonData.offlinePlaylists.length();
        //  var offlineCreatedPlaylistName = createPlaylistName;
        //  var offlineCreatedPlaylistId = jsonData.offlinePlaylists.length;
 
        // addPlaylistDetailsToJsonAfterCreation(offlineCreatedPlaylistName, offlineCreatedPlaylistId);
    } else if (playlistExists) {
        jAlert('Playlist with this name already exists. Please choose a different name.', 'Tech Time');
        playlistExists = false;
    }
 
}
 
// ---------------------------------- Create New Playlist ---------------------------------- //
 
// ---------------------------------- Add Playlist Details to JSON ---------------------------------- //
var playlistItemToBeAdded = new Object();
 
function getAddToPlaylistItemDetails(addToPlaylistItem) {
    playlistItemToBeAdded = new Object();
 
    playlistItemToBeAdded.playlistItemId = $('#' + addToPlaylistItem.id).attr("data-playlistItemId");
    playlistItemToBeAdded.playlistItemTitle = $('#' + addToPlaylistItem.id).attr("data-playlistItemTitle");
    playlistItemToBeAdded.playlistItemDate = $('#' + addToPlaylistItem.id).attr("data-playlistItemDate");
    playlistItemToBeAdded.playlistItemAuthor = $('#' + addToPlaylistItem.id).attr("data-playlistItemAuthor");
    playlistItemToBeAdded.playlistItemUrl = $('#' + addToPlaylistItem.id).attr("data-playlistItemUrl");
    playlistItemToBeAdded.playlistItemThumb = $('#' + addToPlaylistItem.id).attr("data-playlistItemThumb");
    addedItemName = playlistItemToBeAdded.playlistItemTitle;
}
 
 
function addPlaylistDetailsToJsonAfterCreation(createdPlaylistName, createdPlaylistId) {
    var playlist = new Object();
    playlist.playlistId = createdPlaylistId;
    playlist.playlistName = createdPlaylistName;
    playlist.playlistType = "normal";
    playlist.playlistItems = [];
    playlist.playlistItems.push(playlistItemToBeAdded);
 
    addedItemToPlaylistName = createdPlaylistName;
 
    if (isOnline) {
        playlist.isUpdated = true;
    } else (!isOnline)
    {
        playlist.isUpdated = false;
    }
 
    jsonData.playlists.push(playlist);
 
    $.mobile.changePage("#detailMediaPage");
    if (isOnline) {
        updateAddedItemOnServer(createdPlaylistId, playlistItemToBeAdded.playlistItemId.substring(2, playlistItemToBeAdded.playlistItemId.length - 1));
    }
 
    getFileSystemRefForWriting(jsonData);
}
 
// TODO: DO NOT ALLOW items to be added to Admin Playlist
function addItemToSelectedPlaylist(playlistIdToAdd) {
    if(isOnline)
    {
 
    $.each(jsonData.playlists, function (key, item) {
        if (item.playlistId == playlistIdToAdd) {
            var itemAlreadyInPlaylist = false;
            var isAdminPlaylist = false;
 
            if (item.playlistType == 'admin') {
                isAdminPlaylist = true;
            }
 
            $.each(item.playlistItems, function (key, playlistItem) {
                if (playlistItem.playlistItemId == playlistItemToBeAdded.playlistItemId) {
                    itemAlreadyInPlaylist = true;
                }
            });
 
            if (itemAlreadyInPlaylist == false && isAdminPlaylist == false) {
 
                addedItemToPlaylistName = item.playlistName;
                item.playlistItems.push(playlistItemToBeAdded);
                $.mobile.changePage("#detailMediaPage");
                if (isOnline) {
                    updateAddedItemOnServer(playlistIdToAdd, (playlistItemToBeAdded.playlistItemId).substring(2, (playlistItemToBeAdded.playlistItemId).length-1));
                } if (!isOnline) {
                    item.isUpdated = false;
                }
                getFileSystemRefForWriting(jsonData);
            } else if (itemAlreadyInPlaylist == true && isAdminPlaylist == false) {
                jAlert('Item already exists in this playlist.', 'Tech Time');
            } else if (itemAlreadyInPlaylist == true && isAdminPlaylist == true) {
                jAlert('You cannot add items to an Admin Playlist. Item already exists in this playlist.', 'Tech Time');
            } else if (itemAlreadyInPlaylist == false && isAdminPlaylist == true) {
                jAlert('You cannot add items to an Admin Playlist.', 'Tech Time');
            }
 
        }
    });
    } else if (!isOnline) {
        jAlert('Please go Online to add selected Item to this Playlist.', 'Tech Time');
    }
 
    console.log("jsondata playlist : " + jsonData.playlists);
}
 
var addedItemName = '';
var addedItemToPlaylistName = '';
 
 
function updateAddedItemOnServer(addedToPlaylistId, addedItemId) {
    var localPlaylistId = addedToPlaylistId;
    var localItemId = addedItemId;
    var addItemToPlaylistService = 'https://techtime.accenture.com/techtimemobile/playlist-items-service';
 
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    if (isOnline) {
        var addItemToPlaylistJsonData = '{"data":{"mode":"addItem","username":"' + loggedInUsername + '","playlistIds":"' + localPlaylistId + '","itemId":"' + localItemId + '"}}';
        $.ajax({
            type: 'POST',
            url: addItemToPlaylistService,
            data: addItemToPlaylistJsonData,
            dataType: 'xml',
            contentType: 'application/json',
            success: function (data) {
                console.log("Added Item " + localItemId + " to Playlist Id " + localPlaylistId);
                getFileSystemRefForWriting(jsonData);
                jAlert('"' + addedItemName + '" is added to playlist "' + addedItemToPlaylistName + '".', 'Tech Time');
            },
            error: function (xhr, textStatus, error) {
                console.log('In Failure' + JSON.stringify(xhr));
                jAlert('Oops! There was some error creating your Playlist. Please try again.', 'Tech Time');
            }
        });
 
    }
 
 
}
 
// ---------------------------------- Add Playlist Details to JSON ---------------------------------- //








//---------------------------------- Share Playlists ---------------------------------- //



//{"data":{"mode":"share","username":"ankit.bharat.tanna","playlistIds":"1,2,3","recepients": "pravesh.pesswani,bhavya.anand"}}
var sharePlaylistJson = '{"data":{"mode":"share","username":"ankit.bharat.tanna","playlistIds":"';
var selectedPlaylistsToShare = [];

function selectPlaylistForSharing(selectedPlaylistForSharing)
{
  var sharedPlaylistDetails = new Object();
  sharedPlaylistDetails.selectedPlaylistId = $('#'+selectedPlaylistForSharing.id).attr('data-playlistId');
  sharedPlaylistDetails.selectedPlaylistName = $('#'+selectedPlaylistForSharing.id).attr('data-playlistName');
  
  if(selectedPlaylistForSharing.checked)
  {
          selectedPlaylistsToShare.push(sharedPlaylistDetails);
  } 
  
}

function displaySharePlaylistPage()
{
  $('#sharedPlaylistsNames').empty();
  if(selectedPlaylistsToShare.length > 0 && isOnline)
  {
      //       <label id="myPlayList" style="padding-left:10px;color:#000;font-family:Gotham, 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;">Ankit's Playlist</label>
      var sharedPlaylistsNameHtml = '';
      
      $('#sharePlaylistHeaderText').html('');
      if(selectedPlaylistsToShare.length == 1)
      {
          $('#sharePlaylistHeaderText').html('Playlist you have selected to Share:');
          $('#sharePlaylistBtn').attr('src', 'images/sharePlaylistBtn.png');
      } else if(selectedPlaylistsToShare.length > 1)
      {
          $('#sharePlaylistHeaderText').html('Playlists you have selected to Share:');
          $('#sharePlaylistBtn').attr('src', 'images/sharePlaylistsBtn.png');
      }
      
      $.each(selectedPlaylistsToShare, function(key, item){
             sharedPlaylistsNameHtml += '<label id="myPlayList" style="padding-left:10px;color:#000;font-family:Gotham, Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;">'+item.selectedPlaylistName+'</label><br/>';
             });
      
      sharedPlaylistsNameHtml += '<hr width="100%" size="1" style="padding-left:10px;">';
      
      $('#sharedPlaylistsNames').html(sharedPlaylistsNameHtml);
      resetSharePlaylistForm();
      $.mobile.changePage("#sharePlaylistsPage");
  } else if(selectedPlaylistsToShare.length == 0 && isOnline)
  {
      jAlert('Please select a playlist to Share.', 'Tech Time');
  } else if(!isOnline)
  {
      jAlert('Please check your internet connection or Go Online to share Playlists.', 'Tech Time');
  }
  
}

var currentIndexPL = 3;

function addEmailField()
{
currentIndexPL = currentIndexPL + 1;
var emailInputHTML = '';
emailInputHTML += '<div id="inputMailFormDiv'+currentIndexPL+'" style="width:75%;float:left;padding-left:2%;margin-bottom:10px">';
  emailInputHTML += '<input id="playlistRecepient'+currentIndexPL+'" type="text" class="recepientMailAddress" placeholder="Enter Accenture Mail ID" name="email" id="email" style="width:95%;margin:auto;text-indent:3px;" onfocus="appendEmailDomain(this);">';
  emailInputHTML += '</div><div id="inputMailAddRemoveDiv'+currentIndexPL+'" style="width:17%;float:right">';
  emailInputHTML += '<img id="removeEmailFieldButton'+currentIndexPL+'" src="images/removeOption.png" style="height:24px;width:24px;" onClick="removeEmailField(this)"></img>';
  emailInputHTML += '<img id="addEmailFieldButton'+currentIndexPL+'" src="images/addOption.png" style="height:24px;width:24px;" onClick="addEmailField(this)"></img>';
  emailInputHTML += '</div>';
  
  $('#shareWithInputForm').append(emailInputHTML);
  
  // Refresh Rendering of Text Input
  $('#playlistRecepient'+currentIndexPL).textinput().textinput("refresh");
  emailInputHTML = '';
}

function removeEmailField(recepientToRemove)
{
var recepientToRemoveArray = recepientToRemove.id.split('removeEmailFieldButton');
var recepientToRemoveId = recepientToRemoveArray[1];
$('#inputMailFormDiv'+recepientToRemoveId).remove();
$('#addEmailFieldButton'+recepientToRemoveId).remove();
$('#removeEmailFieldButton'+recepientToRemoveId).remove();
$('#playlistRecepient'+recepientToRemoveId).remove();
$('#inputMailAddRemoveDiv'+recepientToRemoveId).remove();
}

var sharePlaylistJSON = '';

function generateSharePlaylistRecepientsList()
{
var validRecepientsFlag = false;
var inputFields = $(".recepientMailAddress");
  var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
  // {"data":{"mode":"share","username":"ankit.bharat.tanna","playlistIds":"1,2,3","recepients": "pravesh.pesswani,bhavya.anand"}}
  
sharePlaylistJSON = '{"data":{"mode":"share","username":"'+loggedInUsername+'","playlistIds":"';
for(var i=0;i<selectedPlaylistsToShare.length;i++)
{
if(i<selectedPlaylistsToShare.length-1)
{
sharePlaylistJSON += selectedPlaylistsToShare[i].selectedPlaylistId+',';
} else {
sharePlaylistJSON += selectedPlaylistsToShare[i].selectedPlaylistId+'",';
}
}
sharePlaylistJSON += '"recepients":"';
$(".recepientMailAddress").each(function(index, element) {
                                  var sharedToRecepient = $(this).val();
                                  
                                  if((sharedToRecepient != '' || sharedToRecepient == '@accenture.com') && (sharedToRecepient == '' || sharedToRecepient != '@accenture.com'))
                                  {
                                  if(sharedToRecepient.indexOf('@accenture.com') == -1)
                                  {
                                  validRecepientsFlag = false;
                                  }
                                  }
                                  
                                  
                                  if(index < $(".recepientMailAddress").length - 1)
                                  {
                                  // add comma at end
                                  if(sharedToRecepient != '')
                                  {
                                  if(sharedToRecepient != '@accenture.com')
                                  {
                                  sharePlaylistJSON += sharedToRecepient.replace('@accenture.com', '').toLowerCase() + ',';
                                  }
                                  }
                                  } else
                                  {
                                  // dont add comma at end
                                  if(sharedToRecepient != '')
                                  {
                                  if(sharedToRecepient != '@accenture.com')
                                  {
                                  sharePlaylistJSON += sharedToRecepient.replace('@accenture.com', '').toLowerCase();
                                  }
                                  }
                                  }
                                  
                                  if(sharedToRecepient.replace('@accenture.com', '') != '')
                                  {
                                      validRecepientsFlag = true;
                                  }
                                  
                                  
                                  
                                  });
sharePlaylistJSON += '"}}';
  
  if(validRecepientsFlag)
  {
      sharePlaylistsToRecepients(sharePlaylistJSON);
  } else
  {
      jAlert("Please enter the Email address to share the selected Playlists.", "Tech Time");
  }
  
}

function sharePlaylistsToRecepients(serviceJson)
{
  var sharePlaylistService = 'https://techtime.accenture.com/techtimemobile/playlist-service';
  
  if(isOnline)
  {
      var sharePlaylistsJsonData = serviceJson;
      $.ajax({
             type: 'POST',
             url: sharePlaylistService,
             data: sharePlaylistsJsonData,
             dataType: 'xml',
             contentType: 'application/json',
             success: function(data) {
             if(selectedPlaylistsToShare.length > 1)
             {
             jAlert('Email sent successfully.', 'Tech Time');
             } else if(selectedPlaylistsToShare.length == 1)
             {
             jAlert('Email sent successfully.', 'Tech Time');
             }
             resetSharePlaylistForm();
             resetSharePlaylistParameters();
             resetPlaylistLMRParameters();
             displayPlaylist();
             },
             error: function(xhr, textStatus, error){
             console.log('In Failure'+JSON.stringify(xhr));
             if(selectedPlaylistsToShare.length > 1)
             {
             jAlert('Oops! There was some error sharing your Playlists. Please try again.', 'Tech Time');
             } else if(selectedPlaylistsToShare.length == 1)
             {
             jAlert('Oops! There was some error sharing your Playlist. Please try again.', 'Tech Time');
             }
             }
             });
      
  } else if(!isOnline)
  {
      if(selectedPlaylistsToShare.length > 1)
      {
          jAlert('Please check your internet connection or Go Online to share your Playlists.', 'Tech Time');
      } else if(selectedPlaylistsToShare.length == 1)
      {
          jAlert('Please check your internet connection or Go Online to share your Playlist.', 'Tech Time');
      }
  }
}

function appendEmailDomain(emailInputItem)
{
  if($('#'+emailInputItem.id).val() == "@accenture.com" || $('#'+emailInputItem.id).val() == "")
  {
      $('#'+emailInputItem.id).val('@accenture.com');
      $('#'+emailInputItem.id).prop('selectionStart', 0).prop('selectionEnd', 10);
  }
  
}

function resetSharePlaylistForm()
{
  var recepientInputFields = $("input[id^='playlistRecepient']");
  var recepientInputDivs = $("div[id^='inputMailFormDiv']");
  var recepientInputAddRemoveDivs = $("div[id^='inputMailAddRemoveDiv']");
  
  $.each(recepientInputFields, function(){
         $(this).val('');
         });
  
  $.each(recepientInputDivs, function(index){
         if(index > 2)
         {
         $(this).remove();
         }
         
         });
  
  $.each(recepientInputAddRemoveDivs, function(index){
         $(this).remove();
         });
  
  
}

function resetSharePlaylistParameters()
{
  sharePlaylistJSON = '';
  selectedPlaylistsToShare = [];
  $('#sharedPlaylistsNames').empty();
}

//---------------------------------- Share Playlists ---------------------------------- //



function showAddToPlaylist() {

    cancelNewPlaylistCreation();

    var htmlText = '';
    var playId = '';

    htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';

    $.each(jsonData.playlists, function (key, item) {

        var thumbId = item.playlistItems[item.playlistItems.length - 1].playlistItemId.substr(2, item.playlistItems[item.playlistItems.length - 1].playlistItemId.length);
        var thumbUrl = item.playlistItems[item.playlistItems.length - 1].playlistItemThumb;
        var thumbPath = '';

        if (downloadedThumbs.indexOf(thumbId + "thumb.png") != -1) {
            thumbPath = sPath + "/images/" + thumbId + "thumb.png";
        } else if (downloadedThumbs.indexOf(thumbId + "thumb.png") == -1) {
            if (isOnline) {
                thumbPath = thumbUrl;
            } else if (!isOnline) {
                thumbPath = 'images/TechTime.png';
            }
        }

        playId = item.playlistId;

        htmlText = htmlText + '<div id="' + item.playlistId + '" style="width:100%;background-color:#F0EFED;" onclick="addItemToSelectedPlaylist(' + item.playlistId + ')">';
       
        htmlText = htmlText + '<div style="width:2%;float:left;text-align:center;background-color:inherit;padding-top:12px;padding-bottom:12px;background-color:#F0EFED;">';

        htmlText = htmlText + '</div><div style="width:16%;float:left;margin-top:7px;"><img src="' + thumbPath + '" style="max-height:75px;max-width:75px;width:100%;height:100%;"></img></div>';
        htmlText = htmlText + '<div style="width:68%;float:left;padding-top:12px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:#F0EFED;">';
        htmlText = htmlText + '<label style="font-size:16px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;font-weight:bold;color:orange;" >' + item.playlistName + '</label>';
        htmlText = htmlText + '</div><div style="width:10%;padding-top:10px;padding-bottom:9px;float:left;text-align:right;background-color:#F0EFED;">';

        if (item.playlistType == "admin") {
            htmlText = htmlText + '<img src="images/adminPlaylist.png" style="height:20px;width:20px;"><br/>';
        } else {
            htmlText = htmlText + '<br/>';
        }

        htmlText = htmlText + '<img src="images/orange_icon_right.png" style="height:20px;width:20px;"></div></div>';
        htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';

        thumbId = '';
        thumbUrl = '';
        thumbPath = '';



    });

    $('#listOfPlaylists').html(htmlText);
    $.mobile.changePage('#addToPlaylistPage');

}



// ---------------------------------- Offline Playlist Operations ---------------------------------- //
// TODO: Playlist IDs created offline


// ---------------------------------- Offline Playlist Operations ---------------------------------- //


// ---------------------------------- Load More Playlist Items --------------------------------------//

function loadMorePlaylistItems(playlistLoadMoreBand)
{
    isActionLoadMoreResult = true;
    
    playlistItemsStartIndex += 5;
    playlistItemsEndIndex += 5;
                                        
    var localPlaylistId = $('#'+playlistLoadMoreBand.id).attr('data-playlistId');
    displayPlaylistItems(localPlaylistId);
}

function resetPlaylistLMRParameters()
{
    playlistItemsStartIndex = 0;
    playlistItemsEndIndex = 4;
    isActionLoadMoreResult = false;
}

// ---------------------------------- Load More Playlist Items --------------------------------------//


// ---------------------------------- Show Hide Video Player --------------------------------------//

function showHideVideoPlayer(action)
{
    
    if(action == "hide")
    {
        document.getElementById('playlistItemPlayer').pause();
        $('#playlistItemPlayer').css('display', 'none');
    } else if(action == "show")
    {
        document.getElementById('playlistItemPlayer').play();
        $('#playlistItemPlayer').css('display', 'block');
    }
}

// ---------------------------------- Show Hide Video Player --------------------------------------//


