var filePath;


var currDownload = '';

var prevPageId = '';
var dwPgflag = false;

function changedwFlag()
{
      dwPgflag = false;
}



function downloadSeqArray(element, isDownloadedFlag, elementAudio, val) {

	spotFlagSet = true;
	stopPlayingMedia();
	var downloadIdtest = element.id;
	var downloadtitletest = element.title;

	downloadFile(downloadIdtest, downloadtitletest, isDownloadedFlag,elementAudio, val);

}

function downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val)
{
	console.log('Download Start');
	dwPgflag = true;
   var alreadyDownloading = 1;
    
    var downloadId = downloadIdtest;
    var downloadtitle = downloadtitletest;

   $.each(downloadList, function(key, downloadListItem) {
           if(downloadListItem.elementId == downloadId){
               alreadyDownloading = 0;
           }
    });
    if(isDownloadedFlag=="true" || isDownloadedFlag == true){
        
        var mediaTypeTemp = (downloadId).substr(1,1);
        
                if(mediaTypeTemp == 'A'){
                    
                    downloadFileAudioMainYes(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    
                }else if(mediaTypeTemp == 'V'){
                    
                    downloadFileVideoMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    
                }else{
                    
                    downloadFileDocMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                }
        
    
    }else if(isOnline){
    
        $.mobile.changePage("#DownloadsPage");
    	showInProgress();
    	
        if(alreadyDownloading){
    
            var mediaTypeTemp = (downloadId).substr(1,1);
            var tempePath = '';
        
            var downloadItem = new Object();
                downloadItem.elementId = downloadId;
                downloadItem.elementTitle = downloadtitle;
                downloadItem.isDownloadedFlag = isDownloadedFlag;
                downloadItem.elementAudio = elementAudio;
                downloadItem.val = val;
                
                if(downloadList.length){
                    
                    
                    if(mediaTypeTemp == 'A'){
                        
                    	tempePath = sPath + "/" +downloadId+ ".mp3";
                    	showProgress(downloadtitle,downloadId,elementAudio,'',val,tempePath);

                        downloadList.push(downloadItem);
                        
                    }else if(mediaTypeTemp == 'V'){
                        
                    	tempePath = sPath + "/" +downloadId+ ".mp4";
                    	showProgress(downloadtitle,downloadId,elementAudio,'',val,tempePath);
                        downloadList.push(downloadItem);
                        
                    }else{
                        
                    	tempePath = sPath + "/" +downloadId+ ".pdf";
                    	showProgress(downloadtitle,downloadId,elementAudio,'',val,tempePath);
                        downloadList.push(downloadItem);
                    }                         
                }else{
                    downloadList.push(downloadItem);                   
                    
                    if(mediaTypeTemp == 'A'){                        
                    	tempePath = sPath + "/" +downloadId+ ".mp3";
                    	showProgress(downloadtitle,downloadId,elementAudio,'',val,tempePath);
                        downloadFileAudioMainYes(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                        
                    }else if(mediaTypeTemp == 'V'){
                        
                    	tempePath = sPath + "/" +downloadId+ ".mp4";
                    	showProgress(downloadtitle,downloadId,elementAudio,'',val,tempePath);
                        downloadFileVideoMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                        
                    }else{
                        
                    	tempePath = sPath + "/" +downloadId+ ".pdf";
                    	showProgress(downloadtitle,downloadId,elementAudio,'',val,tempePath);
                        downloadFileDocMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    }
                }
            
        }else{
        
        }
    }else{
            jAlert('Please go online to download file.', 'Tech Time');

    }
    
}



function findNextDownloadItem(element)
{
    var testVar = '1';
 if(downloadList.length)
    	{
   		$.each(downloadList, function(key, downloadListItem) {
           
           if(testVar == '1'){
                
           
               var elementId = downloadListItem.elementId;
               var elementTitle = downloadListItem.elementTitle;
               var isDownloadedFlag = downloadListItem.isDownloadedFlag;
               var elementAudio = downloadListItem.elementAudio;
               var val  = downloadListItem.val;
               var mediaTypeTemp = (elementId).substr(1,1);
               
               if(mediaTypeTemp == 'A'){               
                   downloadFileAudioMainYes(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               
               }else if(mediaTypeTemp == 'V'){               
                   downloadFileVideoMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               
               }else{              
                   downloadFileDocMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               }
               testVar = '0';
           }
      
           if(downloadListItem.elementId == element){
               testVar = '1';
           }
   });
   }else{


	   fileObj = null;

   }


 
}





function downloadFileAudioMainYes(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
	
  //  console.log('---> '+elementId);console.log('---> '+elementTitle);console.log('---> '+isDownloadedFlag);console.log('---> '+elementAudio);console.log('---> '+val);
												
    												var fileTransfer = new FileTransfer();
    												
												    var url = elementTitle;
												    var name = elementId;
											        var nitem = name.substring(0,1);
											 
											        var gaan = elementTitle.substring(elementTitle.lastIndexOf('/') + 1,elementTitle.lastIndexOf('.'));
									
											        var gaann = gaan.replace(/_/g, ' ').replace(/%20/g, ' ').replace(/%5B/g, ' ').replace(/%5D/g, ' ').split(' ').join(' ');
											  
											        
											        
											        currDownload = '';
											        currDownload = name;
												    if(device.platform == "Android"){
												    
												    	uri = encodeURI(url);
												    
												    	filePath = sPath + "/" +name+ ".mp3.download";
												    
												   	}else {
												    		uri = url;
												    		filePath = window.approotdir.fullpath + "/" +name+ ".mp3.download";
												   	}
												    if(isDownloadedFlag=="true" || isDownloadedFlag == true){
												    	//alert("downloadFileAudioMainYes1 -- " + filePath);
												    	filePath = filePath.substring(0,filePath.lastIndexOf('.'));
												    	//alert("downloadFileAudioMainYes2 -- " + filePath);
												       
												      playMedia(filePath, name, 'audio');
												        
												        
												    }else if(url!="")
												    {
	
												    	if(isOnline){		
												    		var testname = name;
												    		
										                    document.getElementById('PB'+testname).style.display = 'block';   
										                    
															         $("#P" + testname + "L").text("Downloading...");
															      
															         
															         fileTransfer.onprogress = function(progressEvent) {
														                    if (progressEvent.lengthComputable) {
														                    	 $("#P" + name + "Progress").text(""+Math.round(100 * (progressEvent.loaded / progressEvent.total))+"%");
														                     } else {
														                        loadingStatus.increment();
														                     }

														                };


														                fileObj = fileTransfer;
														                
														                
														     
														    			   
														    		
														                
															         
															       fileTransfer.download(
															    		   elementTitle,
															              filePath,
															              function(entry) {
															    			  var dwnnam = filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
															    			 var res = dwnnam.slice(0,-4);
															    			   //alert(res);
															    			   
															    			   
															    			   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
															    				        function (fileSys) {
															    				            fileSys.root.getDirectory("TechTime", {create: true, exclusive: false},
															    				                function (directory) {
															    				                    entry.moveTo(directory, res + ".mp3",
															    				                      success, fail);
															    				            }, fail);
															    				   }, fail);
														
															    			   function success(fileEntry) {
															    				    console.log("New Path: " + fileEntry.fullPath);
															    				}

															    				    function fail(error) {
															    				        console.log(error.code);
															    				    }
															    			   
															    			   
															
															    			   
												
															    	            analytics.trackEvent("AD Audios", "Audio Downloads", gaann, 1, function() {
															    	            
															    	            }, function(error) {
															    	              
															    	            });
															    	      
															    	            
															    	   
															    			   changeIsdownloadStatus(filePath, testname, 'audio');
										                                         var index = -1;								                                                  
										                                         $.each(downloadList, function(key,tempItem){
										                                                if(tempItem.elementId == elementId){
										                                                    index = key;
										                                                }  
										                                           });   
										                                         if(index != -1){
											                                    	  delete downloadList[index];
										                                           downloadList.splice(index,1);
										                                         }
										                                     
										                                         downloadComplete(testname,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
										                                         
										                                         if (spotLightFlag) {
										                                      	   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
										                                             spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
										                                      	   }
										                                         }
										                                         else {
										                                      	   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
										                                             detailPageView(currElementId,currElementtype,currElementcountNum);
										                                      	   }
										                                         }
										                                         
										                                         findNextDownloadItem(testname); 									                                         
										                                         
													                              jsonPostAfterDownload('\"'+currDownload+'\"');
															              },
															              
													
															              
															              function(error) {
															            	  if(error.code!=4 || error.code != '4'){
															            		  jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
															            	  }
															                  console.log("download error" + error.source);
															                  console.log("download error source " + error.source);
															                  console.log("download error target " + error.target);
															                  console.log("upload error code" + error.code);
															              }
															           );
															        
															        
												    	}
												        else{
												        	 jAlert('Please go online to download file.', 'Tech Time');
													            $('.detailPageButton').css("border", "0px");

												        }
												    }
}


function downloadFileVideoMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
    

 //   console.log('---> '+elementId);console.log('---> '+elementTitle);console.log('---> '+isDownloadedFlag);console.log('---> '+elementAudio);console.log('---> '+val);
	
						    var fileTransfer = new FileTransfer();
						    var url = elementTitle;
						    var name = elementId;
						    
						
						    var gaan = elementTitle.substring(elementTitle.lastIndexOf('/') + 1,elementTitle.lastIndexOf('.'));
						    var gaann = gaan.replace(/_/g, ' ').replace(/%20/g, ' ').replace(/%5B/g, ' ').replace(/%5D/g, ' ').split(' ').join(' ');
					  
						  
						    currDownload = '';
					        currDownload = name;
						  
						    if(device.platform == "Android"){
						    	uri = encodeURI(url);
						    	filePath = sPath + "/" +name+ ".mp4.download";
						   	}
						    else {
						    		uri = url;
						    		filePath = window.appRootDir.fullPath + "/" +name+ ".mp4.download";
						   	}
						    
						    if(isDownloadedFlag=="true" ||isDownloadedFlag == true ){
						    	//alert("downloadFileVideoMain1 -- " + filePath);
						    	filePath = filePath.substring(0,filePath.lastIndexOf('.'));
						    	//alert("downloadFileVideoMain2 -- " + filePath);
						        
						        playMedia(filePath, name,'video');
						        
						        
						    }
 						    else {
								if (uri != "") {
						
											if (isOnline) {
								
												document.getElementById('PB' + name).style.display = 'block';
												$("#P" + name + "L").text("Downloading...");
								
												fileTransfer.onprogress = function(progressEvent) {
									                    if (progressEvent.lengthComputable) {
									                    	 $("#P" + name + "Progress").text(""+Math.round(100 * (progressEvent.loaded / progressEvent.total))+"%");
									                     } else {
									                        loadingStatus.increment();
									                     }

									                };


									                fileObj = fileTransfer;
												   
												   
												fileTransfer
														.download(
																elementTitle,
																filePath,
																function(entry) {
																	
																	 var dwnnam = filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
													    			 var res = dwnnam.slice(0,-4);
													    			   //alert(res);
													    			   
													    			   
													    			   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
													    				        function (fileSys) {
													    				            fileSys.root.getDirectory("TechTime", {create: true, exclusive: false},
													    				                function (directory) {
													    				                    entry.moveTo(directory, res + ".mp4",
													    				                      success, fail);
													    				            }, fail);
													    				   }, fail);
												
													    			   function success(fileEntry) {
													    				    console.log("New Path: " + fileEntry.fullPath);
													    				}

													    				    function fail(error) {
													    				        console.log(error.code);
													    				    }
																	
															
														            analytics.trackEvent("AD Videos", "Video Downloads", gaann, 1, function() {
														    
														            }, function(error) {
														          
														            });
														      
														          
																	
																	changeIsdownloadStatus(filePath,name, 'video');
								
																	var index = -1;
								
																	$
																			.each(
																					downloadList,
																					function(key, tempItem) {
																						if (tempItem.elementId == elementId) {
																							index = key;
																						}
																					});
								
																	
																	if (index != -1) {
																		delete downloadList[index];
																		downloadList.splice(index, 1);
																	}
																	
																	downloadComplete(name, elementTitle,
																			isDownloadedFlag, elementAudio,
																			val, filePath);
																	
																	
																	if (spotLightFlag) {
																		   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
																	       spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
																		   }
																	   }
																	   else {
																		   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
																	       detailPageView(currElementId,currElementtype,currElementcountNum);
																		   }
																	   }
								
																									
																	findNextDownloadItem(name);
										                              jsonPostAfterDownload('\"'+currDownload+'\"');

								
																},
																function(error) {
																	jAlert(
																			'Download was not completed due to lost internet connection. Please connect to the Internet and re-download.',
																			'Tech Time');
																	console
																			.log("download error"
																					+ error.source);
																	console.log("download error source "
																			+ error.source);
																	console.log("download error target "
																			+ error.target);
																	console.log("upload error code"
																			+ error.code);
																});
								
											} else {
										jAlert('Please go online to download file.', 'Tech Time');
							            $('.detailPageButton').css("border", "0px");

									}
								}
	}
						    
					    
}


function downloadFileDocMain(elementId,elementTitle, isDownloadedFlag,elementAudio,val)
{		
					var path;
					var fileTransfer = new FileTransfer();
				    var url = elementTitle;
				    var name = elementId;
				    

				    var filtyp = name.substring(1,2);
			
				    var gaan = elementTitle.substring(elementTitle.lastIndexOf('/') + 1,elementTitle.lastIndexOf('.'));
				    var gaann = gaan.replace(/_/g, ' ').replace(/%20/g, ' ').replace(/%5B/g, ' ').replace(/%5D/g, ' ').split(' ').join(' ');

				    currDownload = '';
				    currDownload = name;
				    
				    
				    
				    if(device.platform == "Android"){
				    	
				    	uri = encodeURI(url);
				    
				    	filePath = sPath + "/" +name+ ".pdf.download";
				   	}else {
				    		uri = url;
				    		filePath = window.appRootDir.fullPath + "/" +name+ ".pdf.download";
				   	}
				    
				    if(isDownloadedFlag == "true" || isDownloadedFlag == true){
				    	
				    	document.getElementById('a1').style.display = 'block';                 
				        document.getElementById('a2').style.display = 'block';
			            path = filePath;
						path = path.substring(8);	
						
						openDeleteDocumentPath = filePath;
				      
				        
				    }else if(uri!="")
				    {
				      
				    	if(isOnline){
				    		
				    		var downloadcompleteStatus;
		                    document.getElementById('PB'+name).style.display = 'block';
		                    $("#P" + name + "L").text("Downloading...");
		                    
		                    fileTransfer.onprogress = function(progressEvent) {
				                    if (progressEvent.lengthComputable) {
				                    	 $("#P" + name + "Progress").text(""+Math.round(100 * (progressEvent.loaded / progressEvent.total))+"%");
				                     } else {
				                        loadingStatus.increment();
				                     }
				                };
				              

				                fileObj = fileTransfer;
		                    
		                        fileTransfer.download(
		                        	elementTitle,
						            filePath,
						            function(entry) {
		                        		
		                        		 var dwnnam = filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
						    			 var res = dwnnam.slice(0,-4);
						    			   //alert(res);
						    			   
						    			   
						    			   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						    				        function (fileSys) {
						    				            fileSys.root.getDirectory("TechTime", {create: true, exclusive: false},
						    				                function (directory) {
						    				                    entry.moveTo(directory, res + ".pdf",
						    				                      success, fail);
						    				            }, fail);
						    				   }, fail);
					
						    			   function success(fileEntry) {
						    				    console.log("New Path: " + fileEntry.fullPath);
						    				}

						    				    function fail(error) {
						    				        console.log(error.code);
						    				    }
		                        		
		                        		
		                        		
		                        		
		                  if(filtyp=='P'){
		                        		
                 
		                                
		                                analytics.trackEvent("AD Presentations", "Presentation Downloads", gaann, 1, function() {
		                        
		                                }, function(error) {
		                              
		                                });
		                          
		                                
		                            
		                  }else if(filtyp=='D'){
		                  
                      		

				                                
				                                analytics.trackEvent("AD Documents", "Document Downloads", gaann, 1, function() {
				                      
				                                }, function(error) {
				                         
				                                });
				                          
				                                
				                            
				                  }else{
				                  
			                      		
				              
						                                
						                                analytics.trackEvent("AD Transcripts", "Transcript Downloads", gaann, 1, function() {
						                               ;
						                                }, function(error) {
						                                 
						                                });
						                          
						                                
						                           
						                  };
		                        		
		                        		
		                        		
		                        		
		                        		
		                        		
						                        
		                            	  
						            	changeIsdownloadStatus(filePath, name, 'document');
						            	
						            	
						                path = entry.fullPath;
						    			path = path.substring(8);
						    			
						                var index = -1;
			                              
			                              $.each(downloadList, function(key,tempItem){
			                                if(tempItem.elementId == elementId){
			                                     index = key;
			                                }  
			                              });       
			                              
			                              
			                              if(index != -1){
	                                      delete downloadList[index];
			                              downloadList.splice(index,1);
			                              }
			                             
	                                      downloadComplete(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
	                               
	                                      if (spotLightFlag) {
		                                   	   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
		                                          spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
		                                   	   }
	                                      }
	                                      else {
		                                   	   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
		                                          detailPageView(currElementId,currElementtype,currElementcountNum);
		                                   	   }
	                                      }
	                                      
	                                    

			                              findNextDownloadItem(name);  
			                              jsonPostAfterDownload('\"'+currDownload+'\"');
	                                      
	                                        

						            },
						            function(error) {
						            	jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
						            	console.log("download error" + error.source);
						                console.log("download error source " + error.source);
						                console.log("download error target " + error.target);
						                console.log("upload error code" + error.code);
						                }
						            );
						        
				    	 }else{
				 	        jAlert('Please go online to download file.', 'Tech Time');
				            $('.detailPageButton').css("border", "0px");

				 	    }
				    }
					

}


function playMedia(filePath, name,mediaType)
{
    
    document.getElementById('avPlayer').innerHTML = "";
    $.mobile.changePage("#itemVideo");
    
    if(mediaType == 'audio'){
        var audioPlayer = "";
        //alert("videoStreamUrl1 -- " + filePath);
        //filePath = filePath.substring(0,filePath.lastIndexOf('.'));
        audioStreamUrl = filePath;
        //alert("audioStreamUrl2 -- " + audioStreamUrl);
       
        
            audioPlayer = "<br>"
            +"<video id ='audioComp'  width='300px' height='100px' autobuffer onclick='streamAudio()'>"
            +"<source  type='audio/mpeg'></source>"
            +"Your browser does not support the Audio tag"
            +"</video><br>";
            
            $('#itemTitle').html('Audio Player');
            $('#avPlayer').html(audioPlayer);
            
            $("#audioComp").attr("src", filePath);
            
            var myAudio= document.getElementsByTagName('video')[0];
            myAudio.src = filePath;
            //alert("myAudio.src -- " + myAudio.src);
          
            
    }
    if(mediaType == 'video'){
        
            var videoPlayer = "";
            //alert("videoStreamUrl1 -- " + filePath);
            //filePath = filePath.substring(0,filePath.lastIndexOf('.'));
            videoStreamUrl = filePath;
            //alert("videoStreamUrl2 -- " + videoStreamUrl);
            
            videoPlayer = "<br>"
            +"<video id ='videoComp'  width='300px' height='250px' onclick='streamVideo()' autobuffer >"
            +"<source type='video/wmv'></source>"
            +"our browser does not support the video tag."
            +"</video><br>";
            
            
            
            $('#itemTitle').html('Video Player');
            $('#avPlayer').html(videoPlayer);
            
            var myVideo = document.getElementsByTagName('video')[0];
            myVideo.src = filePath;
            //alert("myVideo.src -- " + myVideo.src);
   
    }
    
}

function openDocument()
{
	var path = '';
	path = openDeleteDocumentPath.substring(8);
	//alert("openDocument path -- " + path);
	path = path.substring(0,path.lastIndexOf('.'));
	//alert("openDocument path -- " + path);
	downloadPDF(path);
    hidePopup();
}

function deleteDocument()
{
    var startIndex = '';
    var endIndex = '';
    var substringTemp = '';
    startIndex = openDeleteDocumentPath.lastIndexOf('/');
    endIndex = openDeleteDocumentPath.lastIndexOf('.');
    endIndex = endIndex -startIndex;
   substringTemp = openDeleteDocumentPath.substr(startIndex+1,endIndex-1);
   //alert("Delete File1 -- " + openDeleteDocumentPath);
   openDeleteDocumentPath = openDeleteDocumentPath.substring(0,openDeleteDocumentPath.lastIndexOf('.'));
   //alert("Delete File2 -- " + openDeleteDocumentPath);

    deleteFile(openDeleteDocumentPath);
    
    if (spotLightFlag) {
 	   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
        spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
 	   }
    }
    else {
 	   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {

 		   
        detailPageView(currElementId,currElementtype,currElementcountNum);
 
 	   }
    }

  
    changeIsdownloadStatusAfterDelete(openDeleteDocumentPath, substringTemp, 'delete');
    
  
    //Start:Akshay, forma change
	//We need to refresh detail media age here

	try
	{
		var fail = function fail(evt)
		{
			//alert(evt.code);
		};

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	}
	catch(ex)
	{
		//alert(JSON.stringify(ex));
	}

	//End
    
    
    //alert("before popup hide");
    hidePopup();
    //alert("after popup hide");
    $(this).css("border", "none");
  
    
    
    if (spotLightFlag) {
    
 	   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
        spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
 	   }
    }
    else {
  
 	   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
        detailPageView(currElementId,currElementtype,currElementcountNum);
    
      
 	   }
    }
    
    

}




function downloadPDF(filePath)
{
	PdfViewer.prototype.showPdf(filePath);
}



function downloadThumbImages(thumbId,imageName, imageLink,mediaType)
{

    var url = '';
        url = imageLink;
   
    
    var name = '';
        name = imageName;
       
    
    var valueReturn = '';
        valueReturn = 'false';
    
    var filePath = '';
        filePath = '';

    var fileTransfer = new FileTransfer();
    
    if(isOnline){
    	
    	if(device.platform == "Android"){
	    	url = encodeURI(url);
    	

	    	//console.log("DTI URI -- " + url);
	    	//console.log('sPath ::::::::::::::::::::'+sPath+"::::::::::thumbId"+thumbId+"imageName"+imageName);
	    	filePath = sPath + "/images/"+ thumbId+imageName + ".png";
	  
	    	//console.log('download images ::::::::::::::::::::'+filePath);
	   	}else {
	    		url = url;
	    		//alert("DTI URI 1 -- " + url);
		    	filePath = sPath + "/images/"+ thumbId+imageName + ".png";
	    		filePath = window.appRootDir.fullPath + "/images/"+ thumbId+imageName + ".png";

	   	}
    
    	
    	    if(url!=""){
            	
                    fileTransfer.download(
                    		imageLink,
                          filePath,
                          function(entry){
                                          
                              
                              changePath(thumbId,name,mediaType,filePath);
                        
                                          
                          },
                          function(error) {
                              console.log("download error source " + error.source);
                              console.log("download error target " + error.target);
                              console.log("upload error code" + error.code);
                                          
                          }
                    );
                    
                }
    }
    
    
}

function changePath(elementId,imageType,typeMedia,localPath)
{


    if(typeMedia == "Audios"){
        
            $.each(jsonData.audio, function(index, item){
                   
                if(item.itemId == elementId){
                   
                   if(imageType == 'thumb'){
                       item.thumbLoc = localPath;   
                      
                   }
                   if(imageType == 'actual'){
                   
                       item.actualLoc = localPath;  
                     
                   }
                }
                   
            });
           
            
        
    }
    
    else if(typeMedia == "Videos"){
        
        $.each(jsonData.video, function(index, item){
               
               if(item.itemId == elementId){
                   if(imageType == 'thumb'){
                       item.thumbLoc = localPath;  
                
                   }
                   if(imageType == 'actual'){
                       item.actualLoc = localPath;     
                
                   }
               }
        });
      
       
        
        
    }else if (typeMedia.toLowerCase() == "technologysessions") {
        $.each(jsonData.technologySessions, function(index, item){
            if(item.itemId == elementId){
                if(imageType == 'thumb'){
                    item.thumbLoc = localPath;   
                }
                if(imageType == 'actual'){
                    item.actualLoc = localPath;  
                }
            }
        });        
    }

    
    
    else if(typeMedia == "Interviews"){     // Interviews    
        
        $.each(jsonData.interviews, function(index, item){
               
               if(item.itemId == elementId){
               
                   if(imageType == 'thumb'){
                   
                       item.thumbLoc = localPath;
           
                   }
                   if(imageType == 'actual'){
                   
                       item.actualLoc = localPath; 
         
                   }
               }
        });
    
    }else if(typeMedia == "Panel Discussions"){
    
        $.each(jsonData.panelDiscussions, function(index, item){
               
               if(item.itemId == elementId){
               
                   if(imageType == 'thumb'){
                   
                       item.thumbLoc = localPath;  
                   }
                   if(imageType == 'actual'){
                   
                       item.actualLoc = localPath; 
                   }
               }
        });
    
    }else if(typeMedia == "documents"){
    
        $.each(jsonData.documents, function(index, item){
               
           if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
                   item.thumbLoc = localPath;  
               }
               if(imageType == 'actual'){
               
                   item.actualLoc = localPath; 
               }
           }
        });
        
    
    
    }else if(typeMedia == "events"){
        
        
            $.each(jsonData.events, function(index, item){
                   
               if(item.itemId == elementId){
                   
                   if(imageType == 'thumb'){
                   
                       item.thumbLoc = localPath;  
                   }
                   if(imageType == 'actual'){
                   
                       item.actualLoc = localPath; 
                   }
                }
            });
        
    }else if(typeMedia == "contributor"){
        
            $.each(jsonData.contributor, function(index, item){
               
                   if(item.itemId == elementId){
                   
                       if(imageType == 'thumb'){
                       
                       item.thumbLoc = localPath;  
                       }
                       if(imageType == 'actual'){
                       
                       item.actualLoc = localPath; 
                       }
                   }
            });
    }else if(typeMedia == "Technology Conferences"){
        
        $.each(jsonData.confTech, function(index, item){
           
               if(item.itemId == elementId){
               
                   if(imageType == 'thumb'){
                   
                   item.thumbLoc = localPath;  
                   }
                   if(imageType == 'actual'){
                   
                   item.actualLoc = localPath; 
                   }
               }
        });
}else if(typeMedia == "spotDownloaded"){
    
    $.each(jsonData.spotLightDownloaded, function(index, item){
           
           if(item.itemId == elementId){
               if(imageType == 'thumb'){
                   item.thumbLoc = localPath; 
               }
               if(imageType == 'actual'){
                   item.actualLoc = localPath;     
               }
           }
    });
    
    
}    

}


function showProgress(link,name,elementTitle,type,val,fp)
{
	var newProgress = '';   
    
    var oldProgress = document.getElementById('showProgressBar').innerHTML;
    
    var downloadContentType = '';
    if(val == 1)
    {
        downloadContentType = "<embed src='images/icon_audio.png' type='image/svg+xml' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";  
       
    } else if(val == 2)
    {
        downloadContentType = "<embed src='images/icon_video.png' type='image/svg+xml' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 3)
    {
        downloadContentType = "<img src='images/icon_presentation.png' style='height:15px; width:20px;border:none;padding:0px;margin-right:10px'/>";
       
    } else if(val == 4)
    {
    	

        downloadContentType = "<img src='images/icon_transcript.png' style='height:15px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 5)
    {
        downloadContentType = "<embed src='images/icon_document.png' type='image/svg+xml' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
    }

    newProgress = newProgress + "<div id='P"+name+"' style='width:100%; border:none; background:#cccccc; color:white; padding-top:5px;'><table style='width:100%;'><tr>";
    newProgress = newProgress + "<td style='width:10%'><label style='margin-left:15px;'>"+downloadContentType+"</label></td>";
    newProgress = newProgress + "<td style='width:80%'><div style='margin-left:2px;'><label style='color:#ffffff;margin-left:14px;'><b> "+ elementTitle +"</b></label></div></td>"
    newProgress = newProgress + "<td style='width:10%'><img id ="+name+" src='images/cross_mark.png' title="+fp+" style='height:18px; width:18px; float:right; margin-right:20px;' onclick='deleteProgress(this);' /></td></tr>";

    newProgress = newProgress + "<tr><td></td><td><label><img id='PB"+name+"' src='images/progressBar.gif' style='width:75%;height :80%;display:none;margin-left:2%'/></label></td>";
    newProgress = newProgress + "<td></td></tr>";
    newProgress = newProgress + "<tr><td></td><td 'width:50%'><label id='P"+name+"L' style='margin-left:15px;color:black;margin-left:14px;'>In queue</label><label id='P"+name+"Progress' style='font-size:14px;color:black;margin-left:5px;'></label>";
    newProgress = newProgress + "<br></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
    
    $('#showProgressBar').append(newProgress);
     
}


var itemToDel;
function abortCurrDownload(itemDel)
{
	itemToDel = itemDel;
	
	fileObj.abort(win, fail);
}

function win() {
	
	 jAlert('File deleted successfully.', 'Tech Time');
	

}




function downloadComplete(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{	
	
	var itemID = itemId;

	var completeProgress = '';
    completeProgress = 'P'+itemId+'L';
    var Pb = 'PB'+itemId;
    itemId = 'P'+itemId;    //document.getElementById(completeProgress).innerHTML = 'Download Complete';
    document.getElementById(Pb).style.display = 'none';	
 
    $("#"+itemId).hide();
    $("#"+itemId).remove();
  
}



function deleteProgress(itemDel) {
	var itemId = itemDel.id;
	var link = itemDel.title;
	var dwStatus = $("#P" + itemId + "L").text();
	jConfirm('Are you sure you want to delete this item?', 'Tech Time',
			function(returnValue) {
				if (returnValue == true) {
					
					if(dwStatus == "Downloading...")
						{
						fileObj.abort(win, errorDeleteFileSystem);
						deleteProgessIfNoFile(link,itemId);
						findNextDownloadItem(itemId);


						}
					else
						{
						deleteProgessIfNoFile(link,itemId);	
						}
				}
			});	
} 



function checkDWFileExists(filefullpath,itemId,crDw){
	
	window.resolveLocalFileSystemURI(filefullpath, function(){
		jConfirm('Are you sure you want to delete this item?', 'Tech Time',
				function(returnValue) {
					if (returnValue == true) {
						deleteProgessIfNoFile(filefullpath,itemId);
						deleteFile(filefullpath);
						
					}
				});
		},function(){
			jConfirm('Are you sure you want to delete this item?', 'Tech Time',
					function(returnValue) {
				
						if (returnValue == true) {
							deleteProgessIfNoFile(filefullpath,itemId);
						}
					});
    });
}



function deleteProgessIfNoFile(link, itemId) {
	
	var newItemId = itemId;
	itemId = 'P' + itemId;
	document.getElementById(itemId).innerHTML = '';
	document.getElementById('showProgressBarImage').style.display = 'none';
	document.getElementById(itemId).style.visibility = 'hidden';
	
		 if(document.getElementById('showProgressBarImage').style.display == 'block')
		{
			document.getElementById('showProgressBarImage').style.display = 'none';
			document.getElementById(itemId).style.visibility = 'hidden';

		}
		
		if(document.getElementById(itemId).style.visibility == 'visible')
		{
			document.getElementById(itemId).style.visibility = 'hidden';			
			$('#'+itemId).remove();
		}
		
	
	var index = -1;
	$.each(downloadList, function(key, tempItem) {

		if (tempItem.elementId == newItemId) {
			index = key;
		}
	});


	
	if (index != -1) {
		var tindex = index;
		delete downloadList[tindex];
		downloadList.splice(index, 1);
	}
	
	  setTimeout(changeIsdownloadStatusAfterDelete(link, newItemId, 'delete'),500);
	  $('#'+itemId).remove();
	  

	  
	  if (spotLightFlag) {
		   if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '') {
	       spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
		   }
	   }
	   else {
		   if (currElementId != '' && currElementtype != '' && currElementcountNum != '') {
	       detailPageView(currElementId,currElementtype,currElementcountNum);
		   }
	   }


}

function copyPendingDownloadstoJson()
{
	
	jsonData.pendingDownloads = downloadList;	
	
	downloadList = [];
}


function readDownloadedList(finaldwn)
{
 var dwnload = '';   
 var filePathDL = '';
 
	$.each(finaldwn, function(key, tItem) {
		
		var dItemId = tItem.id;
        var dTitle = tItem.title;
       var dDate = tItem.ddate;
        
        var val = tItem.val;  
        if(val == "1")
        {
         filePathDL = tItem.path;
        downloadContentType = "images/icon_audio.png";
        type = 'A';
        
        } else if(val == "2")	
        {
         filePathDL = tItem.path;
        downloadContentType = "images/icon_video.png";
        type = 'V';
        
        
        } else if(val == "3")
        {
         filePathDL = tItem.path;
        downloadContentType = "images/icon_presentation.png";
        type = 'P';
        
        
        
        } else if(val == "4")
        {
         filePathDL = tItem.path;
        downloadContentType = "images/icon_transcript.png";
        type = 'T';
        
         
        } else if(val == "5")
        {
        filePathDL = tItem.path;
        downloadContentType = "images/icon_document.png";
        type = 'D';
        
        
        }
        var fpSend = filePathDL.substring((filePathDL.lastIndexOf("/"))+1,filePathDL.length);
        
        var pathtoLocImage = sPath + "/images/" +dItemId+"thumb.png";
        console.log('pathtoLocImage--'+pathtoLocImage);
      
	    dwnload += "<div class='listItemClick'><a id="+dItemId+" title="+fpSend+"  onclick='downloadItemClick(this)' data-transition='slide' style='text-decoration:none;font-style:normal;color:black;display:block;background : #F0EFED'>";
	    dwnload = dwnload + "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
	    dwnload = dwnload + "<tr><td id='"+dItemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='2' >";
	    dwnload = dwnload + "<img src="+pathtoLocImage+" style='height:75px;width:75px;border:solid 1px;margin:auto;margin-left:10px;margin-top:2%'></td>";
	    dwnload = dwnload + "<td id='' style='margin:0px; padding:0px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;padding-top:8px'><b>"+dTitle+"</b></td>";
	    dwnload = dwnload + "<td id='' style='margin:0px; padding:0px; width:15%;' align='right'>";
	    dwnload = dwnload + "<img src='"+downloadContentType+"' style='border:none;padding:0px;margin-right:8px;height:20px;width:25px;vertical-align:middle'/>";
	    dwnload = dwnload + "</td></tr>";
	    dwnload = dwnload + "</table></div><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></a>";

	    
	    });
		$('#allDownloads').html(dwnload);
}


function downloadItemClick(element)
{
	var dItemId = element.id
	 var url = element.title;
    var type = url.charAt(1);
	var tPath = '';
    
	 if(type=="A")
 	{
 		
 		tPath = sPath + "/" +url;
 		//alert("audio downloadItemClick -- " + tPath);
 		playMedia(tPath, dItemId,'audio');
 		
 	}
 else if(type=="V")
 	{
	 	tPath = sPath + "/" +url;
	 	//alert("video downloadItemClick -- " + tPath);
 		playMedia(tPath, dItemId,'video');
 	}
 else 
 	{
 		
 		tPath = sPath + "/"+url;
 		tPath= tPath.substring(8);
 		
 		downloadPDF(tPath);
 	}
	    
}



function CheckAllDownloads()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
	var finaldwn = new Array();

		$.each(jsonData.spotLight, function (key, CheckDownload) {
	        if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
	            {
	                var tempOBJ = new Object();
	                tempOBJ.id = CheckDownload.itemId;
	                tempOBJ.val = "1";
	                tempOBJ.title = CheckDownload.title;
	                tempOBJ.path = CheckDownload.localPathAudio;
	                tempOBJ.ddate = CheckDownload.downloadedDateA;
	                //CheckDownload.val = "1";
	                finaldwn.push(tempOBJ);
	            }

	        }
	        if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
	            {
	                var tempOBJ = new Object();
	                tempOBJ.id = CheckDownload.itemId;
	                tempOBJ.val = "2";

	                tempOBJ.title = CheckDownload.title;
	                tempOBJ.path = CheckDownload.localPathVideo;
	                tempOBJ.ddate = CheckDownload.downloadedDateV;
	                //CheckDownload.val = "1";
	                finaldwn.push(tempOBJ);
	            }
	        }
	        if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
	            //alert("audio .isDownloadedPresentation " +JSON.stringify(CheckDownload));
	            {
	                var tempOBJ = new Object();
	                tempOBJ.id = CheckDownload.itemId;
	                tempOBJ.val = "3";
	                tempOBJ.title = CheckDownload.title;
	                tempOBJ.path = CheckDownload.localPathPresentation;
	                //CheckDownload.val = "1";
	                tempOBJ.ddate = CheckDownload.downloadedDateP;
	                finaldwn.push(tempOBJ);
	            }
	        }

	        if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
	            //alert("audio .isDownloadedTranscript " +JSON.stringify(CheckDownload));
	            {
	                var tempOBJ = new Object();
	                tempOBJ.id = CheckDownload.itemId;
	                tempOBJ.val = "4";
	                tempOBJ.title = CheckDownload.title;
	                tempOBJ.path = CheckDownload.localPathTranscript;
	                //CheckDownload.val = "1";
	                tempOBJ.ddate = CheckDownload.downloadedDateT;
	                finaldwn.push(tempOBJ);
	            }
	        }
	        
	        
	        if(CheckDownload.isDownloaded == "true" ||  CheckDownload.isDownloaded == true)
			{
				
					var tempOBJ = new Object();
						tempOBJ.id = CheckDownload.itemId;
						tempOBJ.val = "5";
						tempOBJ.title = CheckDownload.title;
						tempOBJ.path = CheckDownload.localPath;
						tempOBJ.ddate = CheckDownload.downloadedDateD;
					//CheckDownload.val = "1";
					finaldwn.push(tempOBJ);
				
			}


	    });
		
		
	

	$.each(jsonData.audio, function(key, CheckDownload) {
		if(CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true)
		{
				{
			var tempOBJ = new Object();
				tempOBJ.id = CheckDownload.itemId;
				tempOBJ.val = "1";
				tempOBJ.title = CheckDownload.title;
				tempOBJ.path = CheckDownload.localPathAudio;
				//alert("Audio tempOBJ.path -- " + tempOBJ.path);
				tempOBJ.ddate = CheckDownload.downloadedDateA;
			//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
				}
			
		}
		if(CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true)
		{
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "2";
			
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathVideo;
			//alert("Audio tempOBJ.path -- " + tempOBJ.path);
			tempOBJ.ddate = CheckDownload.downloadedDateV;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
			}
		}
		if(CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true)
		{				 
			//alert("audio .isDownloadedPresentation " +JSON.stringify(CheckDownload));
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "3";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathPresentation;
		//CheckDownload.val = "1";
			tempOBJ.ddate = CheckDownload.downloadedDateP;
			finaldwn.push(tempOBJ);
			}
		}
		
		if(CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) 
		{
			//alert("audio .isDownloadedTranscript " +JSON.stringify(CheckDownload));
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "4";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathTranscript;
		//CheckDownload.val = "1";
			tempOBJ.ddate = CheckDownload.downloadedDateT;
			finaldwn.push(tempOBJ);
			}
		}
			
		
	});
	//alert("finaldwn.audios"+finaldwn.length);
	
	
	$.each(jsonData.video, function(key, CheckDownload) {
				if(CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true)
				{
					{
					var tempOBJ = new Object();
					tempOBJ.id = CheckDownload.itemId;
					tempOBJ.val = "1";
					tempOBJ.title = CheckDownload.title;
					tempOBJ.path = CheckDownload.localPathAudio;
					//alert("Video tempOBJ.path -- " + tempOBJ.path);
					tempOBJ.ddate = CheckDownload.downloadedDateA;
				//CheckDownload.val = "1";
				finaldwn.push(tempOBJ);
					}
				}
				if(CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true)
				{
					{
					var tempOBJ = new Object();
					tempOBJ.id = CheckDownload.itemId;
					tempOBJ.val = "2";
					
					tempOBJ.title = CheckDownload.title;
					tempOBJ.path = CheckDownload.localPathVideo;
					//alert("Video tempOBJ.path -- " + tempOBJ.path);
					tempOBJ.ddate = CheckDownload.downloadedDateV;
				//CheckDownload.val = "1";
					finaldwn.push(tempOBJ);
					}
				}
				if(CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true)
				{
					{
					var tempOBJ = new Object();
					tempOBJ.id = CheckDownload.itemId;
					tempOBJ.val = "3";
					tempOBJ.title = CheckDownload.title;
					tempOBJ.path = CheckDownload.localPathPresentation;
					tempOBJ.ddate = CheckDownload.downloadedDateP;
				//CheckDownload.val = "1";
					finaldwn.push(tempOBJ);
					}
				}
				
				if(CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true)
				{
					{
					var tempOBJ = new Object();
					tempOBJ.id = CheckDownload.itemId;
					tempOBJ.val = "4";
					tempOBJ.title = CheckDownload.title;
					tempOBJ.path = CheckDownload.localPathTranscript;
					tempOBJ.ddate = CheckDownload.downloadedDateT;
				//CheckDownload.val = "1";
					finaldwn.push(tempOBJ);
					}
				}
	
	
		
	});
	//alert("finaldwn.video"+finaldwn.length);
	
	
	//Start:Akshay, format change
	$.each(jsonData.technologySessions, function(key, CheckDownload) {

		//alert(JSON.stringify(downloadedFiles));
		//alert(CheckDownload.itemId);

		/*if(JSON.stringify(downloadedFiles).indexOf(CheckDownload.itemId.toString())!=-1)
		{
			alert(JSON.stringify(downloadedFiles));
			alert(CheckDownload.itemId);
		}*/

        //if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
        if (downloadedFiles.indexOf("VA" + CheckDownload.itemId + ".mp3") != -1) {
            var tempOBJ = new Object();
            tempOBJ.id = CheckDownload.itemId;
            tempOBJ.val = "1";
            tempOBJ.title = CheckDownload.title;
            tempOBJ.path = CheckDownload.localPathAudio;
            tempOBJ.ddate = CheckDownload.downloadedDateA;

			//alert('A');
			//alert(JSON.stringify(tempOBJ));

            finaldwn.push(tempOBJ);
        }
       // }
        //if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
        if (downloadedFiles.indexOf("VV" + CheckDownload.itemId + ".mp4") != -1) {
            var tempOBJ = new Object();
            tempOBJ.id = CheckDownload.itemId;
            tempOBJ.val = "2";
            tempOBJ.title = CheckDownload.title;
            tempOBJ.path = CheckDownload.localPathVideo;
            tempOBJ.ddate = CheckDownload.downloadedDateV;

			//alert('V');
			//alert(JSON.stringify(tempOBJ));

            finaldwn.push(tempOBJ);
        }
        //}
        //if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
        if (downloadedFiles.indexOf("VP" + CheckDownload.itemId + ".pdf")!=-1 || downloadedFiles.indexOf("AP" + CheckDownload.itemId + ".pdf")!=-1) {    
        var tempOBJ = new Object();
            tempOBJ.id = CheckDownload.itemId;
            tempOBJ.val = "3";
            tempOBJ.title = CheckDownload.title;
            tempOBJ.path = CheckDownload.localPathPresentation;
            tempOBJ.ddate = CheckDownload.downloadedDateP;

			//alert('P');
			//alert(JSON.stringify(tempOBJ));

            finaldwn.push(tempOBJ);
        }
        //if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
        if (downloadedFiles.indexOf("VT" + CheckDownload.itemId + ".pdf")!=-1 || downloadedFiles.indexOf("AT" + CheckDownload.itemId + ".pdf")!=-1) {    
        var tempOBJ = new Object();
            tempOBJ.id = CheckDownload.itemId;
            tempOBJ.val = "4";
            tempOBJ.title = CheckDownload.title;
            tempOBJ.path = CheckDownload.localPathTranscript;
            tempOBJ.ddate = CheckDownload.downloadedDateT;            

			//alert('T');
			//alert(JSON.stringify(tempOBJ));

            finaldwn.push(tempOBJ);
        }
    });   
	//End
	
	$.each(jsonData.panelDiscussions, function(key, CheckDownload) {
		if(CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true)
		{
			var tempOBJ = new Object();
				tempOBJ.id = CheckDownload.itemId;
				tempOBJ.val = "1";
				tempOBJ.title = CheckDownload.title;
				tempOBJ.path = CheckDownload.localPathAudio;
				tempOBJ.ddate = CheckDownload.downloadedDateA;
			//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		if(CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true)
		{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "2";
			
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathVideo;
			tempOBJ.ddate = CheckDownload.downloadedDateV;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		//if(CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true)
		//{
		 if (downloadedFiles.indexOf("PP" + CheckDownload.itemId + ".pdf")!=-1) {    
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "3";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathPresentation;
			tempOBJ.ddate = CheckDownload.downloadedDateP;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		
		//if(CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true)
		//{
		 if (downloadedFiles.indexOf("PT" + CheckDownload.itemId + ".pdf")!=-1) {    
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "4";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathTranscript;
			tempOBJ.ddate = CheckDownload.downloadedDateT;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
	});
	
	$.each(jsonData.spotLightDownloaded, function(key, CheckDownload) {
		if(CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true)
		{
			var tempOBJ = new Object();
				tempOBJ.id = CheckDownload.itemId;
				tempOBJ.val = "1";
				tempOBJ.title = CheckDownload.title;
				tempOBJ.path = CheckDownload.localPathAudio;
				tempOBJ.ddate = CheckDownload.downloadedDateA;
			//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		if(CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true)
		{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "2";
			
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathVideo;
			tempOBJ.ddate = CheckDownload.downloadedDateV;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		if(CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true)
		{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "3";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathPresentation;
			tempOBJ.ddate = CheckDownload.downloadedDateP;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		
		if(CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true)
		{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "4";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathTranscript;
			tempOBJ.ddate = CheckDownload.downloadedDateT;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
	});
	
	//alert("finaldwn.panelDiscussions"+finaldwn.length);
	
	
	$.each(jsonData.interviews, function(key, CheckDownload) {
		if(CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true)
		{
			var tempOBJ = new Object();
				tempOBJ.id = CheckDownload.itemId;
				tempOBJ.val = "1";
				tempOBJ.title = CheckDownload.title;
				tempOBJ.path = CheckDownload.localPathAudio;
				tempOBJ.ddate = CheckDownload.downloadedDateA;
			//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		if(CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true)
		{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "2";
			
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathVideo;
			tempOBJ.ddate = CheckDownload.downloadedDateV;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		//if(CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true)
		//{
		 if (downloadedFiles.indexOf("IP" + CheckDownload.itemId + ".pdf")!=-1) { 
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "3";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathPresentation;
			tempOBJ.ddate = CheckDownload.downloadedDateP;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
		
		//if(CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true)
		//{
		 if (downloadedFiles.indexOf("IT" + CheckDownload.itemId + ".pdf")!=-1) { 
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "4";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathTranscript;
			tempOBJ.ddate = CheckDownload.downloadedDateT;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
		}
	});
//	alert("finaldwn.interviews"+finaldwn.interviews.length);
	
	/*****************Document****************************/

	$.each(jsonData.documents, function(key, CheckDownload) {
			
		//if(CheckDownload.isDownloaded == "true")
		//{
		 if (downloadedFiles.indexOf("DD" + CheckDownload.itemId + ".pdf")!=-1) {
			
				var tempOBJ = new Object();
					tempOBJ.id = CheckDownload.itemId;
					tempOBJ.val = "5";
					tempOBJ.title = CheckDownload.title;
					tempOBJ.path = CheckDownload.localPath;
					tempOBJ.ddate = CheckDownload.downloadedDateD;
				//CheckDownload.val = "1";
				finaldwn.push(tempOBJ);
			
		}
	});
	
	/*****************Technology COnf****************************/

	$.each(jsonData.techConf, function(key, CheckDownload) {
		if(CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true)
		{
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "1";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathAudio;
			tempOBJ.ddate = CheckDownload.downloadedDateA;
		//CheckDownload.val = "1";
		finaldwn.push(tempOBJ);
			}
		}
		if(CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true)
		{
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "2";
			
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathVideo;
			tempOBJ.ddate = CheckDownload.downloadedDateV;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
			}
		}
		if(CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true)
		{
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "3";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathPresentation;
			tempOBJ.ddate = CheckDownload.downloadedDateP;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
			}
		}
		
		if(CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true)
		{
			{
			var tempOBJ = new Object();
			tempOBJ.id = CheckDownload.itemId;
			tempOBJ.val = "4";
			tempOBJ.title = CheckDownload.title;
			tempOBJ.path = CheckDownload.localPathTranscript;
			tempOBJ.ddate = CheckDownload.downloadedDateT;
		//CheckDownload.val = "1";
			finaldwn.push(tempOBJ);
			}
		}
	});

	

//	alert(finaldwn.length);
//	alert("after unique"+finaldwn.length);
		finaldwn.sort(function(a, b){
	        var dateA1=new Date(a.ddate), dateB1=new Date(b.ddate);
	        return dateB1-dateA1; // sort by date ascending
	   });
		
		
		//console.log("before unique "+JSON.stringify(finaldwn));

		var arrUnique = unique(finaldwn);
	//	console.log("unsorted"+JSON.stringify(arrUnique));
	
	readDownloadedList(arrUnique);
	
}



function refreshList()
{
	$('.toggleButtonDiv').show();
    showSortedTAListing(selectedCategoryId,selectedCategoryName,'false','false','false','false') //updated
    changeDropDown("type","All","All");
    changeDropDown("language","All","All");
}

function resetFilter()
{
	$('.toggleButtonDiv').show();
    changeDropDown("type","All","All");
    changeDropDown("language","All","All");	

}



function backnav(pageId)
{
	
    backPage(pageId);
    
}






function backPage(pageIdnew)
{
    if(pageIdnew == "detailMediaPage")
    {

    	
    	var sptFlagGlobal = window.localStorage.getItem("spotLightFlag");
  	
           if(eventsFlag)
           	{
               var eveMnt = window.localStorage.getItem("eventmonth");               
               var currMonthName =  window.localStorage.getItem("currMonth");               
               showUpcomingEventList(eveMnt,currMonthName);
       
               $.mobile.changePage("#UpcomingEventsPage",{transition: "none"});
             //  refreshList();
               resetFilter();
            }
             else if(mediaFlag == true && searchFromMainPage == false)
            {
                if(!spotLightFlag)
				{		
            	var catName = window.localStorage.getItem("currentCategoryOff");
                var catId = window.localStorage.getItem("currentCategoryIdOff");
                selectedCategoryId = catId;
                selectedCategoryName = catName;
    	        showTAListResult(catName, catId);
	            $.mobile.changePage("#TAListResult",{transition: "none"});
				}
                else if(spotLightFlag == true  && mediaFlag == true ){ 
                	
                	var catName = window.localStorage.getItem("currentCategoryOff");
                    var catId = window.localStorage.getItem("currentCategoryIdOff");
                    selectedCategoryId = catId;
                    selectedCategoryName = catName;
        	        showTAListResult(catName, catId);

    	             $.mobile.changePage("#TAListResult",{transition: "none"});
                }else{
                        
                     	$.mobile.changePage("#businessCategory",{transition: "none"});
                     }	
                
             
            } else if(mediaFlag == true && searchFromMainPage == true){
            	var sEle = window.localStorage.getItem("searchelement");
                var sMed = window.localStorage.getItem("media");
                var vEle = window.localStorage.getItem("valueElement");
                var srEle = window.localStorage.getItem("searchString");
               // alert("sEle"+sEle+"sMed"+sMed+"vEle"+vEle+"srEle"+srEle);
                
                showSearchResult(sEle,sMed,vEle,srEle);
                $.mobile.changePage("#searchResultPage",{transition: "none"});
            }
            else
            {
                        
		               $.mobile.changePage("#businessCategory",{transition: "none"});
		               //refreshList();
		               resetFilter();
            }
      //
        //clearDetailPage();

        
    }
    else if(pageIdnew == 'qnaPage')
    	{
	    	var eleId = window.localStorage.getItem("detailPageelementId");
	        var eleType = window.localStorage.getItem("detailPagetype");
	        var eleNum = window.localStorage.getItem("detailPagecountNum");
	        detailPageView(eleId,eleType,eleNum);

	        $.mobile.changePage("#detailMediaPage",{transition: "none"});
        
        
    	}
else if(pageIdnew =='TAListResult' || pageIdnew=='UpcomingEventsPage'|| pageIdnew=='aboutTectTimePage' || pageIdnew=='contactUsPage' || pageIdnew=='faqPage')
    {
	alert("contactUsPage : "+pageIdnew);
        setSearchTips();
        $.mobile.changePage("#businessCategory",{transition: "none"});
    }
else if(pageIdnew =='playlistsItemPage')
{
resetPlaylistLMRParameters();
displayPlaylist();
	currentPlayingItemIndex = 0;
	document.getElementById('playlistItemPlayer').pause();
//alert("contactUsPage : "+pageIdnew);
    $.mobile.changePage("#PlaylistsPage",{transition: "none"});
}
    
else if(pageIdnew =='sharePlaylistsPage')
{
resetPlaylistLMRParameters();
displayPlaylist();
//alert("contactUsPage : "+pageIdnew);
resetSharePlaylistParameters();
    $.mobile.changePage("#PlaylistsPage",{transition: "none"});
}

else if(pageIdnew =='addToPlaylistPage')
{
//alert("contactUsPage : "+pageIdnew);
    $.mobile.changePage("#detailMediaPage",{transition: "none"});
}
    else if(pageIdnew == 'subscribePage' )
    {
        //alert("pageIdnew"+pageIdnew);
        
         $('#subscribePageContentArea').html('');
        //$('#subscribePage').html('');
        $.mobile.changePage("#businessCategory",{transition: "none"});
      //   $.mobile.changePage("#businessCategory");
        
    }
    else if(pageIdnew == 'DownloadsPage')
    {
      //    alert("in dwPgflag"+dwPgflag);
        //  alert("in SpotLightContentFlag"+SpotLightContentFlag);
   
          
          
    	if(dwPgflag)
        {
    		
    		 if (spotLightFlag)
             {
    		 eleId = window.localStorage.getItem("detailPageelementIdSpot");
             eleType = window.localStorage.getItem("detailPagetypeSpot");
             eleNum = window.localStorage.getItem("detailPagecountNumSpot");
             //     var eleCnt = window.localStorage.getItem("detailPageitemCount");
             dwPgflag = false;
             spotlightDataTypes(eleId, eleType, eleNum);
         }else if(playlistItemsPageFlag){
         	$.mobile.changePage("#playlistsItemPage");
         }
         else
         {
        	 var eleId = window.localStorage.getItem("detailPageelementId");
             var eleType = window.localStorage.getItem("detailPagetype");
             var eleNum = window.localStorage.getItem("detailPagecountNum");
        //     var eleCnt = window.localStorage.getItem("detailPageitemCount");
             
             //alert("downloaded files list -- " + JSON.stringify(downloadedFiles));
             //dwPgflag = false;
            // alert("back page data -- " + eleId + " " + eleType + " " + eleNum);
  
             detailPageView(eleId,eleType,eleNum);
    		 $.mobile.changePage("#detailMediaPage",{transition: "none"});
    		 

         }	
        }
        
        else
        {
            $.mobile.changePage("#businessCategory",{transition: "none"});
        }
    }
    else if(pageIdnew == 'detailAuthor')
    {
//    	console.log('detailAuthor');    	
//    	console.log('eventsFlag'+eventsFlag);
//    	console.log('mediaFlag'+mediaFlag);
//    	console.log('spotLightFlag'+spotLightFlag);

        if(eventsFlag)
        {
        	//console.log('eventsFlag non-spotlight content');
        	
            var upeveID = window.localStorage.getItem("eventitemId");
            UpcomingEventsDetail(upeveID);
            $.mobile.changePage("#detailMediaPage",{transition: "none"});
			
        }
        //
        else if(mediaFlag)
        {
        	
        		if(spotLightFlag)
				{		
                	$.mobile.changePage("#businessCategory");

				}else{
					var eleId = window.localStorage.getItem("detailPageelementId");
					var eleType = window.localStorage.getItem("detailPagetype");
					var eleNum = window.localStorage.getItem("detailPagecountNum");

					detailPageView(eleId,eleType,eleNum);
					$.mobile.changePage("#detailMediaPage",{transition: "none"});
				}
        		
        			
        } else if(spotLightFlag){
        	
        	console.log('spotlight content');
        	$.mobile.changePage("#businessCategory");
        	
        }
         else
        {
         	console.log('spotlight content elseeeeee');

            showSpotLightContent();
            $.mobile.changePage("#detailMediaPage",{transition: "none"});
        }
    }
    
    else if(pageIdnew == 'itemVideo')
    {
     //  alert("itemVideo  "+mediaFlag);
      //  alert("dwFlag"+dwFlag);
        
        if(mediaFlag == true && dwFlag == false)
        {
            var eleId = window.localStorage.getItem("detailPageelementId");
            var eleType = window.localStorage.getItem("detailPagetype");
            var eleNum = window.localStorage.getItem("detailPagecountNum");
           // var eleCnt = window.localStorage.getItem("detailPageitemCount");
            //
            detailPageView(eleId,eleType,eleNum);
            //
            $.mobile.changePage("#detailMediaPage",{transition: "none"});
        }
        else
        {
            $.mobile.changePage("#DownloadsPage",{transition: "none"});
        }
    }
    
    
   
    else if(pageIdnew == 'searchResultPage')
    {
//    	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
//    	 console.log("searchFromMediaPage"+searchFromMediaPage);
//    	 console.log("searchFromEventsPage"+searchFromEventsPage);
//    	 console.log("searchFromSpotlightPage"+searchFromSpotlightPage);
//    	 console.log("searchFromUpcomingEventsPage"+searchFromUpcomingEventsPage);
//    	 console.log("searchFromTAListResultPage"+searchFromTAListResultPage);
//    	 console.log("searchFromAuthorDetailPage"+searchFromAuthorDetailPage);
//    	 console.log("searchFromDownloadsPage"+searchFromDownloadsPage);
//    	 console.log("searchFromMainPage"+searchFromMainPage);
//    	 console.log("searchFromContactUsPage"+searchFromContactUsPage);
//    	 console.log("searchFromAboutPage"+searchFromAboutPage);
//    	 console.log("searchFromFaqPage"+searchFromFaqPage);
//    	 console.log("searchFroSubscribPage"+searchFroSubscribPage);
//     	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");


    	 
    	 
	    if(searchFromMediaPage)
	    {
	    	
	    	if(spotLightFlag)
            {

	    		eleId = window.localStorage.getItem("detailPageelementIdSpot");
	    		eleType = window.localStorage.getItem("detailPagetypeSpot");
            	eleNum = window.localStorage.getItem("detailPagecountNumSpot");
            	spotlightDataTypes(eleId, eleType, eleNum);
        }
	        else
	        {
	
	       	 	var eleId = window.localStorage.getItem("detailPageelementId");
	            var eleType = window.localStorage.getItem("detailPagetype");
	            var eleNum = window.localStorage.getItem("detailPagecountNum");
	
	            detailPageView(eleId,eleType,eleNum);
		        $.mobile.changePage("#detailMediaPage",{transition: "none"});
	
	        }
   		

	    }
	    else if(searchFromEventsPage)
	    {
	        var upeveID = window.localStorage.getItem("eventitemId");
	        //
	        
	        UpcomingEventsDetail(upeveID);
	        $.mobile.changePage("#detailMediaPage",{transition: "none"});
	    }
	    else if(searchFromSpotlightPage)
	    {
	        showSpotLightContent();
	        $.mobile.changePage("#detailMediaPage",{transition: "none"});
	    }
	    else if(searchFromUpcomingEventsPage)
	    {
	        var eveMnt = window.localStorage.getItem("eventmonth");
	        var eveCnt = window.localStorage.getItem("eventcount");
	        
	        showUpcomingEventList(eveMnt,eveCnt);
	        
	        //$("#UpcomingEventsPage").show();
	        $.mobile.changePage("#UpcomingEventsPage",{transition: "none"});
	    }
	    else if(searchFromTAListResultPage)
	    {
	        var catName = window.localStorage.getItem("currentCategoryOff");
	        var catId = window.localStorage.getItem("currentCategoryIdOff");
	        selectedCategoryId = catId;
	        selectedCategoryName = catName;
	        
	        showTAListResult(catName, catId);
	        $.mobile.changePage("#TAListResult",{transition: "none"});
	        
	        //Clear search strip
	        clearSearchTipfromSearch();
	        
	    }
	    else if(searchFromAuthorDetailPage)
	    {
	       
	        
	        var authorN =  window.localStorage.getItem("authorName");
	        showAuthorDetailPage(authorN);
	        $.mobile.changePage("#detailAuthor",{transition: "none"});
	    }
	    else if(searchFromDownloadsPage)
	    {
	        
	        showInProgress();
	        $.mobile.changePage("#DownloadsPage",{transition: "none"});
	    }
	    
	    else if(searchFromContactUsPage)
	    {
	        contactUsFocus();
	        $.mobile.changePage("#contactUsPage",{transition: "none"});
	    }
	    else if(searchFromAboutPage)
	    {
	    
	   
	        showAboutTTArea();
	        $.mobile.changePage("#aboutTectTimePage",{transition: "none"});
	    }
	    
	    else if(searchFromplaylistPage)
	    {
	       resetPlaylistLMRParameters();
			displayPlaylist();
	        $.mobile.changePage("#PlaylistsPage",{transition: "none"});
	    }
	    else if(searchFromplaylistitemPage)
	    {
	       
	        $.mobile.changePage("#playlistsItemPage",{transition: "none"});
	    }
        else if(searchSharePlaylistsPage)
	    {
	       resetSharePlaylistForm();
			resetSharePlaylistParameters();
	        $.mobile.changePage("#sharePlaylistsPage",{transition: "none"});
	    }
        else if(searchAddToPlaylistPage)
	    {
	       
	        $.mobile.changePage("#addToPlaylistPage",{transition: "none"});
	    }
        else if(searchContributePage)
	    {
	       
	        $.mobile.changePage("#ContributePage",{transition: "none"});
	    }
	    
	    
	    
	    else if(searchFromFaqPage)
	    {
	    alert("faq");
	    clearSearchTipfromSearch();
	        showFaqContent();
	        $.mobile.changePage("#faqPage",{transition: "none"});
	    }
	    else if(searchFroSubscribPage)
	    {
	        showSubscribeContent();
	        $.mobile.changePage("#subscribePage",{transition: "none"});
	        $.mobile.changePage("#subscribePage",{transition: "none"});
	    }
	    else if(searchFromtechWatchPage)
	    	{
	    	
	    		currentTechWatchItemId = window.localStorage.getItem("currentTechWatchItemId");

	    		currentTechWatchItemIndex = window.localStorage.getItem("currentTechWatchItemIndex");


	    		showTechWatchContent(currentTechWatchItemId, currentTechWatchItemIndex);
		        $.mobile.changePage("#techWatchPage",{transition: "none"});
	    	
	    	}
	    else
	    {
	       // $(".navigateBackBtn").hide();
	        $.mobile.changePage("#businessCategory",{transition: "none"});
	    }
	}    
    else
    	{
    	$.mobile.changePage("#businessCategory",{transition: "none"});
    }
  //  clearSearch();
   
   
}



var unique = function(origArr) {

	var newArr = [], origLen = origArr.length, found, x, y;

	for (x = 0; x < origLen; x++) {
		
		found = '';

		for (y = 0; y < newArr.length; y++) {

			if (origArr[x].path === newArr[y].path) {

				found = true;

				break;

			}
		}
		if (!found) {

			newArr.push(origArr[x]);
		}
	}
	return newArr;

}







