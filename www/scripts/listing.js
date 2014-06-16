var totalItemCount = 0;
//var finalItemCount = 0;

function showSortedTAListing(curCatId, curCatName,sortBySubCat,sortByMediaType,sortByDate, sortByLang)
{
	
	totalItemCount= 0;
//	finalItemCount= 0;
       // console.log('showSortedTAListing :'+sortByLang);
  //  console.log("showSortedTAListing***" + curCatId+" curCatId "+curCatName+" curCatName "+sortBySubCat+" sortBySubCat "+sortByMediaType+" sortByMediaType "+sortByLang);
    //alert("showSortedTAListing***" + curCatId+" curCatId "+curCatName+" curCatName "+sortBySubCat+" sortBySubCat "+sortByMediaType+" sortByMediaType "+sortByLang);

	
	defaultNavigate();
	 // changeDropDown("language","All","All");

   
    selectedCategoryId = '';
    selectedCategoryName = '';
    
    selectedCategoryId = curCatId;
    selectedCategoryName = curCatName;
    
    var strHTMLshowTAList = "";
    var stringToDisplay = "";
    
    
    var resAudio = new Array();
    var resVideo = new Array();
    var resTechConf = new Array();

    
    var resPanelDiscussion = new Array();
    var resInterviews = new Array();
    
    var resDocument = new Array();
    var resEvent = new Array();
    
    var resSubcatList = new Array();
    //Start:akshay format change
	var resTechnologySessions = new Array();
	//End
    
    $('#sbmDiv').html('');
    $('#TAListResultContentArea').html('');
    $('#noTAListResultContentArea').html('');
    
    var subCategoryHTML = '<ul class="submenu1">';
        subCategoryHTML = subCategoryHTML + "<li><div style='style='width:100%;height:30px;margin-left:10px;'><a href='#' onclick='changeDropDown(topic,1,this)' style='font-weight:normal'>Topic</a></div></li>";
    
    resAudio = [];
    resVideo = [];
    resPanelDiscussion = [];
    resInterviews = [];
    resDocument = [];
    resEvent = [];
    resTechConf = [];
    resSubcatList = [];
    resFinal = [];
    resFinalLangAr = [];
    //Start:akshay format change
	resTechnologySessions = [];
	//End
      
    
    
    $.each(jsonData.category, function(key, item) {
                //console.log("obj-------------"+JSON.stringify(item));
       
        if(item.categoryid == curCatId &&  item.categoryname == curCatName){   
           
           $.each(item.subCategory, function(key, subItem) {
                  resSubcatList.push(subItem.subCategoryName);
                  
                 

                  subCategoryHTML += "<li><div style='style='width:100%;height:30px;margin-left:10px;'><a href='#' onclick='changeDropDown(topic,1,this)' style='font-weight:normal'>"+subItem.subCategoryName+"</a></div></li>";
                //	  }
                  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                   
                  if(sortBySubCat == 'false' && sortByMediaType == 'false'){
                                 // console.log('RESULT*** false false');                       
                                                                                                
			                                  $.each(subItem.audio, function(key, audioItem) {
			                                                 // alert(audioItem.selLanguag + "audioItem.lang");
			                                                  if ($.inArray(audioItem, resAudio) == -1) {
			                                                                  resAudio.push(audioItem);
			                                                  }
			                                  });
			                                  $.each(subItem.video, function(key, videoItem) {         
			                                                  if ($.inArray(videoItem, resVideo) == -1) {
			                                                                  resVideo.push(videoItem);  
			                                                  }
			                                  });
			                                  $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
			                                                  if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
			                                                                  resPanelDiscussion.push(panelDiscussionsItem);
			                                                  }
			                                  });
                                              $.each(subItem.interviews, function(key,interviewsItem) {  
                                                  if ($.inArray(interviewsItem, resInterviews) == -1) {
                                                                  resInterviews.push(interviewsItem);
                                                                }
                                              });  
                                              $.each(subItem.techConf, function(key,confItem) {  
                                                  if ($.inArray(confItem, resTechConf) == -1) {
                                                  	resTechConf.push(confItem);
                                                  }
                                              });
                                            
                                              $.each(subItem.document, function(key, documentItem) {         
                                                  if ($.inArray(documentItem, resDocument) == -1) {
                                                                  resDocument.push(documentItem);
                                                  }
                                              });
                                              //Start:Akshay, format change
                            					$.each(subItem.technologySessions, function(key, techSessItem) {
                                                    if ($.inArray(techSessItem, resTechnologySessions) == -1) {
                                                        resTechnologySessions.push(techSessItem);
                                                    }
                                                });
                            					//End
                  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                if(sortBySubCat == 'false' && sortByMediaType != 'false'){   
                                 // console.log('RESULT*** false true');
                                  
                      if(sortByMediaType == 'audios' || sortByMediaType == 'Audios'){ 
                          
                          $.each(subItem.audio, function(key, audioItem) {   
                                 
                                 if ($.inArray(audioItem, resAudio) == -1) {
                                 resAudio.push(audioItem);
                                 }
                          });
                    }
              
                    if(sortByMediaType == 'videos' || sortByMediaType == 'Videos'){ 
                      
                          $.each(subItem.video, function(key, videoItem) {         
                                 if ($.inArray(videoItem, resVideo) == -1) {
                                    resVideo.push(videoItem);
                                 }
                          });
                    }
                      
                    if(sortByMediaType == 'panelDiscussions' || sortByMediaType == 'PanelDiscussions'){ 
              
                        $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                    resPanelDiscussion.push(panelDiscussionsItem);
                                }
                        });
                    }
             
                    if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'){ 
                      
                          $.each(subItem.interviews, function(key,interviewsItem) {  
                                 if ($.inArray(interviewsItem, resInterviews) == -1) {
                                 resInterviews.push(interviewsItem);
                                 }
                          });
                    }
              
                    if(sortByMediaType == 'documents' || sortByMediaType == 'Documents'){ 
                      
                          $.each(subItem.document, function(key, documentItem) {         
                                 if ($.inArray(documentItem, resDocument) == -1) {
                                 resDocument.push(documentItem);
                                 }
                          });
                    }                      
                    
                    if(sortByMediaType == 'TechnologyConferences' || sortByMediaType == 'Technology Conferences' ){ 
                        
                             $.each(subItem.techConf, function(key,confItem) {  
                             if ($.inArray(confItem, resTechConf) == -1) {
                                            resTechConf.push(confItem);
                             }
                       });
                  }
                    
                  //Start:Akshay, format change
					if (sortByMediaType == 'TechnologySessions' || sortByMediaType == 'Technology Sessions'
						|| sortByMediaType == 'technologySessions' || sortByMediaType == 'technologysessions') {
                        mediaTypeForMessage = 'Technology Conferences';
                        $.each(subItem.technologySessions, function(key, sessItem) {
                            if ($.inArray(sessItem, resTechnologySessions) == -1) {
                                resTechnologySessions.push(sessItem);
                            }
                        });
                    }
					//End
                }
                
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                  
                if(sortBySubCat != 'false' && sortByMediaType == 'false'){
                               // console.log('RESULT*** false false');   
                                if(sortBySubCat == subItem.subCategoryName){
                                                $.each(subItem.audio, function(key, audioItem) {
                                                                if ($.inArray(audioItem, resAudio) == -1) {
                                                                                resAudio.push(audioItem);
                                                                }
                                                });

                                                $.each(subItem.video, function(key, videoItem) {         
                                                                if ($.inArray(videoItem, resVideo) == -1) {
                                                                                resVideo.push(videoItem);
                                                                }
                                                });

                                               $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                                                if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                                                                resPanelDiscussion.push(panelDiscussionsItem);
                                                                }
                                                });

                                                $.each(subItem.interviews, function(key,interviewsItem) {  
                                                                if ($.inArray(interviewsItem, resInterviews) == -1) {
                                                                                resInterviews.push(interviewsItem);
                                                                }
                                                });


                                                $.each(subItem.document, function(key, documentItem) {         
                                                                if ($.inArray(documentItem, resDocument) == -1) {
                                                                                resDocument.push(documentItem);
                                                                }
                                                });

                                                $.each(subItem.techConf, function(key,confItem) {  
                                                                if ($.inArray(confItem, resTechConf) == -1) {
                                                                                resTechConf.push(confItem);
                                                                }
                                                });
                                              //Start: Akshay, format change
                        						$.each(subItem.technologySessions, function(key, sessItem) {
                                                    if ($.inArray(sessItem, resTechnologySessions) == -1) {
                                                        resTechnologySessions.push(sessItem);
                                                    }
                                                });
                        						//End
                                }
                }
                
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                
                if(sortBySubCat != 'false' && sortByMediaType != 'false'){ 
                               // console.log('RESULT*** true true');
                                if(sortBySubCat == subItem.subCategoryName){
                                                if(sortByMediaType == 'audios' || sortByMediaType == 'Audios'){                           
                                                                $.each(subItem.audio, function(key, audioItem) {
                                                                                if ($.inArray(audioItem, resAudio) == -1) {
                                                                                                resAudio.push(audioItem);
                                                                                }
                                                                });
                                                }                          
                                                if(sortByMediaType == 'videos' || sortByMediaType == 'Videos'){ 
                          
                                                                $.each(subItem.video, function(key, videoItem) {         
                                                                                if ($.inArray(videoItem, resVideo) == -1) {
                                                                                                resVideo.push(videoItem);
                                                                                }
                                                                });
                                                }
                          
                                                if(sortByMediaType == 'panelDiscussions' || sortByMediaType == 'PanelDiscussions'){ 
                          
                                                                $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                                                                if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                                                                                resPanelDiscussion.push(panelDiscussionsItem);
                                                                                }
                                                                });
                                                }
                          
                                                if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'){ 
                          
                                                                $.each(subItem.interviews, function(key,interviewsItem) {  
                                                                                if ($.inArray(interviewsItem, resInterviews) == -1) {
                                                                                                resInterviews.push(interviewsItem);
                                                                                }
                                                                });
                                                }
                          
                                                if(sortByMediaType == 'documents' || sortByMediaType == 'Documents'){ 
                          
                                                                $.each(subItem.document, function(key, documentItem) {         
                                                                                if ($.inArray(documentItem, resDocument) == -1) {
                                                                                                resDocument.push(documentItem);
                                                                                }
                                                                });
                                                }
                          
                                                if(sortByMediaType == 'TechnologyConferences' || sortByMediaType == 'Technology Conferences'){ 
                              
                                                                $.each(subItem.techConf, function(key,confItem) {  
                                                                                if ($.inArray(confItem, resTechConf) == -1) {
                                                                                                resTechConf.push(confItem);
                                                                                }
                                                                });
                                                }
                                                //Start:Akshay, format change
                        						if (sortByMediaType == 'TechnologySessions' || sortByMediaType == 'Technology Sessions'
                        						|| sortByMediaType == 'technologySessions' || sortByMediaType == 'technologysessions') {
                                                    mediaTypeForMessage = 'Technology Sessions';
                                                    $.each(subItem.technologySessions, function(key, sessItem) {
                                                        if ($.inArray(sessItem, resTechnologySessions) == -1) {
                                                            resTechnologySessions.push(sessItem);
                                                        }
                                                    });
                                                }
                        						//End
                                }

                }
           });
        } 
    });    
    
                                    
    			$.each(resAudio, function(key, itemRes) {
                                                $.each(jsonData.audio, function(key, itemAudio) {                                          
                                                                if(sortByLang =='false'){
                                                                                if(itemRes == itemAudio.itemId){
                                                                                           //     console.log('inn 123')
                                                                                                resFinal.push(itemAudio);
                                                                                }
                                                                }else{
                                                                                if((itemRes == itemAudio.itemId) && (itemAudio.selLanguage == sortByLang)){
                                                                                               // console.log('inn 4 5');
                                                                                                resFinal.push(itemAudio);
                                                                                }                                                                              
                                                                }                
                                                });                   
                                    });                 
            
            $.each(resVideo, function(key, itemRes) {
                $.each(jsonData.video, function(key, itemVideo) {
                                if(sortByLang =='false'){
                                                if(itemRes == itemVideo.itemId){
                                                             //   console.log('inn 123')
                                                                resFinal.push(itemVideo);
                                                }
                                }else{
                                                if((itemRes == itemVideo.itemId) && (itemVideo.selLanguage == sortByLang)){
                                                              //  console.log('inn 4 5');
                                                                resFinal.push(itemVideo);
                                                }
                                }    
                });
            });
            
            $.each(resPanelDiscussion, function(key, itemRes) {
                $.each(jsonData.panelDiscussions, function(key, itemPanelDiscussions) {
                                if(sortByLang =='false'){
                                                if(itemRes == itemPanelDiscussions.itemId){
                                                               // console.log('inn 123')
                                                                resFinal.push(itemPanelDiscussions);
                                                }
                                }else{
                                                if((itemRes == itemPanelDiscussions.itemId) && (itemPanelDiscussions.selLanguage == sortByLang)){
                                                             //   console.log('inn 4 5');
                                                                resFinal.push(itemPanelDiscussions);
                                                }
                                } 
                });
            });
            
            $.each(resInterviews, function(key, itemRes) {
                   $.each(jsonData.interviews, function(key, itemInterviews) {
                         
                          if(sortByLang =='false'){
                                                                if(itemRes == itemInterviews.itemId){
                                                                               // console.log('inn 123')
                                                                                resFinal.push(itemInterviews);
                                                                }
                                                }else{
                                                                if((itemRes == itemInterviews.itemId) && (itemInterviews.selLanguage == sortByLang)){
                                                                                //console.log('inn 4 5');
                                                                                resFinal.push(itemInterviews);
                                                                }
                                                }
                    });
            });
                
            $.each(resDocument, function(key, itemRes) {
                $.each(jsonData.documents, function(key, itemDocument) {
                                if(sortByLang =='false'){
                                                if(itemRes == itemDocument.itemId){
                                                               // console.log('inn 123')
                                                                resFinal.push(itemDocument);
                                                }
                                }else{
                                                if((itemRes == itemDocument.itemId) && (itemDocument.selLanguage == sortByLang)){
                                                                //console.log('inn 4 5');
                                                                resFinal.push(itemDocument);
                                                }
                                } 
                });
            });
            
            $.each(resTechConf, function(key, itemRes) {
                $.each(jsonData.techConf, function(key, itemConf) {
                                if(sortByLang =='false'){
                                                if(itemRes == itemConf.itemId){
                                                                //console.log('inn 123')
                                                                resFinal.push(itemConf);
                                                }
                                }else{
                                                if((itemRes == itemConf.itemId) && (itemConf.selLanguage == sortByLang)){
                                                                //console.log('inn 4 5');
                                                                resFinal.push(itemConf);
                                                }
                                } 
                });
            });
            
          //Start:Akshay, format change
        	$.each(resTechnologySessions, function(key, itemRes) {
                $.each(jsonData.technologySessions, function(key, itemSess) {
                    if (sortByLang == 'false') {
                        if (itemRes == itemSess.itemId) {
                            resFinal.push(itemSess);
                        }
                    } else {
                        if ((itemRes == itemSess.itemId) && (itemSess.selLanguage == sortByLang)) {
                            resFinal.push(itemSess);
                        }
                    }
                });
            });
        	//End
            
           // console.log("resFinal.length"+JSON.stringify(resFinal));
            
         // console.log("resFinal"+resFinal.length);
          
          if(resFinal.length == 0 )
        	  {
        	  $('#numberOfItems').html("(No Items)");
        	  }
           // totalItemCount =resFinal.length;
         
            
    subCategoryHTML = subCategoryHTML + "</ul>";
    $('#sbmDiv').html(subCategoryHTML);
    $.each(resFinal, function(key, item) {
    });
    
    if(sortByDate == 'true'){
        
       // console.log('sort by date TRUeeeeeeeeeeeeeeeeeee');
        
        resFinal.sort(function(a, b){
             var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
             return dateA-dateB // sort by date ascending
        });
        
     //  console.log('after sorting array');
      // console.log('\n');
    }else{
       
        resFinal.sort(function(a, b){
             var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
             return dateB-dateA // sort by date ascending
        });
    }
    
/*    $.each(resFinal, function(key, item) {
    	
      //   console.log('**** Sorted Array : '+item.publishedDate);
         
    });*/
    
    //console.log('1111111111111'); 
    

    
    var count = 0;
    var test = '';
    var keyTemp = resFinal.length-1;
    
   
    
    
    $.each(resFinal, function(key, itemRes) {       // Audios Videos Panel
           
           if(key == 0){
                count = 0;
           }else if(key == keyTemp){
            count = -1;
           }else{
               count = key;
           }
           
          

		   if (resFinal.length == 1) {
			test = '';
			totalItemCount++;
			test = getListElement(itemRes, -100, "techAreaList" + (1), 0);
			
			strHTMLshowTAList = strHTMLshowTAList + test;

		   } else {
			test = '';
			totalItemCount++;
			test = getListElement(itemRes, count, "techAreaList" + (key + 1),key);
			strHTMLshowTAList = strHTMLshowTAList + test;
		}
           
        
    });
    
    
    if(resFinal.length > 5){

        

        strHTMLshowTAList += "<div class = 'linkTransition' id='loadmoreTAList' style='height:30px;width:100%;border:1px solid #B3B3B3; background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;top-margin:-5px;' title='5' onclick='showmoreresultTAlist(this)'><b>Load More Results</b></div>";

    }


    if(resFinal.length==0)
       {
       	
    	displayMessage(sortBySubCat, sortByMediaType, sortByLang);
       
       }else{
           $('#TAListResultContentArea').html(strHTMLshowTAList);
       }
    
    // $('#TAListResultContentArea').html(strHTMLshowTAList);
    $('#selCatName').html(curCatName);
    
    strHTMLshowTAList = '';

    // $.mobile.changePage("#detailMediaPage");
    
}



function displayMessage(sortBySubCat, sortByMediaType, sortByLang)
{
	//alert(sortBySubCat +"sortBySubCat \n "+sortByMediaType+ "sortByMediaType \n "+sortByLang +"sortByLang");
	var element = document.getElementById('type').innerHTML;
	//console.log('Element :'+element);
	//console.log(screen.height);
	var newHeight = 150;
	var footerBottom = 100;
	
	 if(sortBySubCat!="false"  && sortByMediaType!="false" && sortByLang == 'false')
     {
		 if(sortByLang=='es')
		 {
		 var sortByLangdisplay = 'Spanish';
		 }
	 else if(sortByLang=='en')
		 {
		 var sortByLangdisplay = 'English';
		 }
		 	$('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b>'+element+'</b> in the topic <b>'+sortBySubCat+'</b>.</p>');
		 	 $('#TAListResult').css('overflow','hidden');
		 	$('#noTAListResultContentArea').css('height',newHeight);
		 	$('#footerPadding').css('footer',footerBottom);
		 	 
     } 
	 else if(sortBySubCat!="false"  && sortByMediaType!="false" && sortByLang != 'false')
	  {
		 if(sortByLang=='es')
		 {
		 var sortByLangdisplay = 'Spanish';
		 }
	 else if(sortByLang=='en')
		 {
		 var sortByLangdisplay = 'English';
		 }
		 	$('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b>'+element+'</b> in the topic <b>'+sortBySubCat+' </b> for <b> '+sortByLangdisplay+'</b>.</p>');
		 	 $('#TAListResult').css('overflow','hidden');
		 	$('#noTAListResultContentArea').css('height',newHeight);
		 	$('#footerPadding').css('footer',footerBottom);

	  }
	  else if(sortBySubCat!="false" && sortByMediaType =="false"  && sortByLang == 'false')
     {
		  if(sortByLang=='es')
			 {
				 var sortByLangdisplay = 'Spanish';
				 }
			 else if(sortByLang == 'en')
				 {
				 var sortByLangdisplay = 'English';
				 }
   		  $('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b>'+sortBySubCat+'</b>.</p>');
   		 $('#TAListResult').css('overflow','hidden');
   		$('#noTAListResultContentArea').css('height',newHeight);
	 	$('#footerPadding').css('footer',footerBottom);

		}
	  else if(sortBySubCat!="false" && sortByMediaType =="false"  && sortByLang != 'false')
	  		{
		  if(sortByLang=='es')
			 {
			 var sortByLangdisplay = 'Spanish';
			 }
		 else if(sortByLang=='en')
			 {
			 var sortByLangdisplay = 'English';
			 }
   		  $('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b>'+sortBySubCat+' </b> for <b> '+sortByLangdisplay+'</b>.</p>');
   		 $('#TAListResult').css('overflow','hidden');
   		$('#noTAListResultContentArea').css('height',newHeight);
	 	$('#footerPadding').css('footer',footerBottom);

	     
     }
     else if(sortBySubCat =="false" && sortByMediaType !="false" && sortByLang == "false")
     {
    	 if(sortByLang=='es')
		 {
		 var sortByLangdisplay = 'Spanish';
		 }
	 else if(sortByLang=='en')
		 {
		 var sortByLangdisplay = 'English';
		 }
   		  $('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b>'+element+'</b>.</p>');
   		 $('#TAListResult').css('overflow','hidden');
   		$('#noTAListResultContentArea').css('height',newHeight);
	 	$('#footerPadding').css('footer',footerBottom);

	}
    else if(sortBySubCat =="false" && sortByMediaType !="false" && sortByLang != "false")
         {
    	if(sortByLang=='es')
		 {
		 var sortByLangdisplay = 'Spanish';
		 }
	 else if(sortByLang=='en')
		 {
		 var sortByLangdisplay = 'English';
		 }
			 $('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b>'+element+'</b> for<b> '+sortByLangdisplay+'</b>.</p>');
			 $('#TAListResult').css('overflow','hidden');
			 $('#noTAListResultContentArea').css('height',newHeight);
			 	$('#footerPadding').css('footer',footerBottom);

	
            
     }
     else if(sortBySubCat == "false" && sortByMediaType =="false" && sortByLang == 'false')
     {
    	 if(sortByLang=='es')
		 {
		 var sortByLangdisplay = 'Spanish';
		 }
	 else if(sortByLang=='en')
		 {
		 var sortByLangdisplay = 'English';
		 }
    	 $('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b> All</b> in the topic</p>');
    	 $('#TAListResult').css('overflow','hidden');
    	 $('#noTAListResultContentArea').css('height',newHeight);
		 	$('#footerPadding').css('footer',footerBottom);

	}
     else if(sortBySubCat == "false" && sortByMediaType =="false" && sortByLang != 'false')
     {
    	 if(sortByLang=='es')
		 {
		 var sortByLangdisplay = 'Spanish';
		 }
	 else if(sortByLang=='en')
		 {
		 var sortByLangdisplay = 'English';
		 }
    	 
		 $('#noTAListResultContentArea').html('<p style="margin-left:4%;font-size:small">No content is available for <b> '+sortByLangdisplay+'</b> in the topic</p>');
		 $('#TAListResult').css('overflow','hidden');
		 $('#noTAListResultContentArea').css('height',newHeight);
		 	$('#footerPadding').css('footer',footerBottom);

			  
   }



}
