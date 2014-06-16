var currElementIdSpot = '';
currElementtypeSpot = '';
currElementcountNumSpot = '';

function showSpotLightContent() {
  
	spotLightFlag = true;
    eventsFlag = false;
    mediaFlag = false;
    alldownloadFlag = false;
    spotFlagSet = false;
    dwPgflag = false;
    var stringIWant = '';
    playlistItemsPageFlag = false;
    


    var allCatArray = new Array();
    
    var strHTMLshowTAList = "";
    $('#spotlightContentArea').empty('');    

    document.getElementById('spotlightList').style.display = 'block';

    $.each(jsonData.spotLight, function (index, itemRes) {
        var count = '-100';
        var imgsrc = '';

        var actualThumb = '';
        actualThumb = '';
        
        
        stringIWant = '';
        var stringIGet = itemRes.category;
        var cat = itemRes.category;   
        var allCat = itemRes.category;
        
        
        arrayOfCategories = stringIGet.split(",");

        for (var i = 0; i < arrayOfCategories.length; i++) {
            var getCategoryName = new Array();
            getCategoryName = arrayOfCategories[i]
                    .split("-");

            if (i == arrayOfCategories.length - 1) {
                stringIWant += getCategoryName[0];
            } else {
                stringIWant += getCategoryName[0] + ", ";
            }
        }

        if (stringIWant.length > 25) {
            var stringToDisplay = stringIWant.substring(0,
                    22);
            var trimmedCatDisplay = stringToDisplay + "...";
            stringIWant = stringToDisplay;
        }
        

        if (itemRes.type == 'podcast' || itemRes.type == 'documents' || itemRes.type == 'events' || itemRes.type == 'contributor') {     
            if (itemRes.type == 'events') {
                itemRes.formattype = itemRes.type;
            }
            else if (itemRes.type == 'contributor') {
                itemRes.formattype = itemRes.type;
                itemRes.itemId = itemRes.contributorId;
            }
          
            
           
            
            if (isOnline && itemRes.thumbLoc == '') {
                actualThumb = itemRes.thumb;
            } else if (isOnline && itemRes.thumbLoc != '') {
                actualThumb = sPath + "/images/" + itemRes.itemId + "thumb.png";
            } else if (!isOnline && itemRes.thumbLoc == '') {
                actualThumb = 'images/TechTime.png';
            } else if (!isOnline && itemRes.thumbLoc != '') {
                actualThumb = sPath + "/images/" + itemRes.itemId + "thumb.png";
            } else {
                actualThumb = sPath + "/images/" + itemRes.itemId + "thumb.png";
            }

            var authoNames = '';
            $.each(itemRes.author, function (key, itemAuthor) {
                if (key == 0) {
                    authoNames = authoNames + itemAuthor;
                } else if (key <= (itemRes.author.length - 1)) {
                    authoNames = authoNames + ', ' + itemAuthor;
                } else {
                    authoNames = authoNames + ' ' + itemAuthor;
                }
            });

            var typeFormat = '';
            if (itemRes.formattype == 'Audios') {
				imgsrc = 'images/icon_audio.png';
				typeFormat = 'Audios';
			}
			if (itemRes.formattype == 'Videos') {
				imgsrc = 'images/icon_video.png';
				typeFormat = 'Videos';

			}
			if (itemRes.type == 'contributor') {
			imgsrc = 'images/icon_interview.png';
				typeFormat = 'contributor';

			}
	
			if (itemRes.formattype == 'Panel Discussions'
					|| type == 'PanelDiscussions') {
				imgsrc = 'images/icon_panelDiscussion.png';
				typeFormat = 'PanelDiscussions';

			}
			if (itemRes.formattype == 'Interviews') {
				imgsrc = 'images/icon_interview.png';
				typeFormat = 'Interviews';

			}
			if (itemRes.formattype == 'documents') {
				imgsrc = 'images/icon_document.png';
				typeFormat = 'documents';

			}
			if (itemRes.formattype == 'events') {
				imgsrc = 'images/icon_event.png';
				typeFormat = 'events';

            }
			if (itemRes.formattype == 'Technology Conferences' || itemRes.formattype == 'TechnologyConferences' ) {
				imgsrc = 'images/icon_techConf.png';
				typeFormat = 'TechnologyConferences';

			}
            
            
 
            var catIndex = cat.lastIndexOf('-');
            var itemResCategory=''; 
            if(catIndex > 0)  
            	{
            	itemResCategory = itemRes.category.substring(0, catIndex);
            }else{
            	itemResCategory = itemRes.category +"...";
            	}
            
            
            
            $.each(jsonData.category, function (key, item) {
            	
            	allCat = allCat.substring(0, allCat.length);
            	var n = allCat.split(",");

            	 $.each(jsonData.spotLightDownloaded, function(key, oldItem){
             		chkpath = sPath + "/images/" + oldItem.itemId + "thumb.png";
             		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,'spotDownloaded');
                 });
                 
            	 spotlightSubFlag = false;
                     var formatType = itemRes.formattype.replace(/\s+/g, '');
        //    	if(tempSubName == item.categoryname){
                    if (item.subscribe == "yes") {
                    	spotlightSubFlag = true;
                    	//console.log('Subscribe yes'+item.categoryname);
                        SpotLightContentFlag = false;
                       strHTMLshowTAList = strHTMLshowTAList + "<div class='listItemClick'><a   onclick=spotlightDataTypes('" + itemRes.itemId + "','" + formatType + "','" + count + "'); style='text-decoration:none;font-style:normal;color:black;'>";
                    }
                    else {

                    	if(spotlightSubFlag != true)
                    		{
                    		spotlightSubFlag = false;
                    		//console.log('Subscribe No'+item.categoryname);
                            SpotLightContentFlag = true;
                            
                    		}
                    	strHTMLshowTAList = strHTMLshowTAList + "<div class='listItemClick'><a   onclick=spotlightDataTypes('" + itemRes.itemId + "','" + formatType + "','" + count + "'); style='text-decoration:none;font-style:normal;color:black;'>";
                    
                    }


            });
            
            strHTMLshowTAList = strHTMLshowTAList + "<table border=0  cellpadding='0' cellspacing='0' class='tableList'>";
      
	            if(itemResCategory){
	    	     		strHTMLshowTAList = strHTMLshowTAList + "<tr><td></td><td id='' style='margin :0px; padding 0 px; width:65%;font-style:bold;padding-left:12px;font-size:14px;'><b><div style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width:80%;'> "+stringIWant+"</div></b></td><td></td></tr>";
	            }

                strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='"+itemRes.itemId+"' class='listItemId' rowspan='3' >";
               
                if(itemRes.author.length >=2)
                {
                     strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
                
                } else if(itemRes.author.length <2)
                {
                     strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
                }
                
                strHTMLshowTAList = strHTMLshowTAList + "<td class='tdTableListTitle'><b>"+itemRes.title+"</b></td>";
                if(itemRes.type == 'contributor')
                {
                $.each(jsonData.contributor, function(key, itemContributor) {
                 if(itemRes.title == itemContributor.title){
                strHTMLshowTAList = strHTMLshowTAList + "<td class='tdTableListIcons' rowspan='2' align='right'>";
                strHTMLshowTAList = strHTMLshowTAList + "<embed src='"+imgsrc+"' type='image/svg+xml' style='height:20px;width:100%;border:none;padding:0px;margin-right:25px'/>";
                strHTMLshowTAList = strHTMLshowTAList + "</td></tr> <tr><td id='' class='tdTableAuthor'>"+itemContributor.contributor+"</td></tr>"; 
                       
                       }
                       });
                
                }else{
                	strHTMLshowTAList = strHTMLshowTAList + "<td class='tdTableListIcons' rowspan='2' align='right'>";
                    strHTMLshowTAList = strHTMLshowTAList + "<embed src='"+imgsrc+"' type='image/svg+xml' style='height:20px;width:100%;border:none;padding:0px;margin-right:15px'/>";
                    strHTMLshowTAList = strHTMLshowTAList + "</td></tr> <tr><td id='' class='tdTableAuthor'>"+itemRes.author+"</td></tr>";
                }

                
                
                strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='' class='tdTableDate'>"+itemRes.publishedDateStart+"";
                if(itemRes.type == 'contributor')
                {
                	strHTMLshowTAList = strHTMLshowTAList +"</td>";
                }else{
                	strHTMLshowTAList = strHTMLshowTAList + showDownloadedIcons(itemRes)+"</td>";
                }

                strHTMLshowTAList = strHTMLshowTAList + "<td id='' class='tdIconArrow' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='100%' height='20px;' style='margin-right:15px;'/></td></tr></table>";
                strHTMLshowTAList = strHTMLshowTAList + "</a></div>";
                
             document.getElementById('spotlightListNoSubscribe').style.display = 'none';
            $('#spotlightList').html(strHTMLshowTAList);
            //console.log('----------------------->>> strHTMLshowTAList'+strHTMLshowTAList);

        } else if (itemRes.type == 'tech_area') {
            console.log('TECH AREA');            
      	  var strHTMLCategory = "";
      	    $('#spotlightListArea').empty('');
      	 
      		 	
  		    	  $.each(jsonData.category, function(key, item) {

  		    		 if( item.subscribe == "yes")
  		    			 {
  		    			
  				    		  if(item.categoryid  == itemRes.techArea)
  				                 {
  				                     strHTMLCategory = strHTMLCategory + "<div class='listItemClick'><div class=dynamicDivList><li><a id="+ item.categoryname+" class='anchorCategory'  href='#TAListResult' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+")'>";
  				                     strHTMLCategory = strHTMLCategory+ "<div style='color:white;margin-left:3.5%'> "+item.categoryname+"<img src='images/icon_whiteRight.png' width='13' height='13' style='float:right;padding-right:4%;'/>";
  				                     strHTMLCategory = strHTMLCategory+ "</div></a></li></div></div>";
  				                 }
  		    			 }
  		    		 else{

				    		  if(item.categoryid  == itemRes.techArea)
				                 {
  	                     strHTMLCategory = strHTMLCategory + "<div class='listItemClick'><div class=dynamicDivList><li><a id="+itemRes.specialAds+" class='anchorCategory'   onclick='displayTA(this);'>";	                    
  		                 strHTMLCategory = strHTMLCategory+ "<div style='color:white;margin-left:3.5%'> "+itemRes.specialAds+"<img src='images/icon_whiteRight.png' width='13' height='13' style='float:right;padding-right:4%;'/>";
  		                strHTMLCategory = strHTMLCategory+ "</div></a></li></div></div>";
				                 }
  		 			}
  		    		 
  	            	
  		    		 
  		          	});
      		 
      		 $('#spotlightListArea').html(strHTMLCategory);
      	    strHTMLCategory = '';

        }
        else if (itemRes.type == 'special_ads') {

            var strHtmlContent = "";
            $('#spotlightList').html('');            
            
            if (itemRes.techArea == "" || itemRes.techArea == null || itemRes.techArea == "null") {
                if (itemRes.saURL == "" || itemRes.saURL == null || itemRes.saURL == "null") {
                    if (itemRes.saText == "Tech Watch") {
                        strHtmlContent = strHtmlContent + "<div class='listItemClick' style='border :none' onclick = 'showTechWatchContent(currentTechWatchItemId, currentTechWatchItemIndex);'>";                        
                    }
                } else {                    
                    strHtmlContent = strHtmlContent + "<div class='listItemClick' style='border :none' onclick='readMoreDetails(\"" + itemRes.saURL + "\");'>";
                }

            } else {
                strHtmlContent = strHtmlContent + "<div id=" + itemRes.saText + " data-categoryId=" + itemRes.techArea + " class='listItemClick' style='border :none' onclick = 'displayTA1(this)'>";
            }
            
            strHtmlContent = strHtmlContent + "<table border='0' class='tableList'><tr><td style='width : 50%'>";
            strHtmlContent = strHtmlContent + "<img src='" + itemRes.saImage + "' typeof='foaf:Image' style='padding-left:10px;height:114px; width:139px'></img></td>";
            strHtmlContent = strHtmlContent + "<td class='tdTableListTitle' style='font-size: large'><b>" + itemRes.saText + "</b></td></tr></table><div>";

            document.getElementById('spotlightListNoSubscribe').style.display = 'none';
            $('#spotlightList').html(strHtmlContent);


        }

    });



}

var spotlightID = "";
var spotlightCategoryID = "";



function displayTA(element)
{
	 jConfirm('Please subscribe to this Technology Area to view the content.', 'Tech Time', function (returnValue) {
         if (returnValue == true) {
             showSubscribeContent();
         }
     });
}


function displayTA1(element) {    
    var elementData = element.id;

    var categoryId = element["data-categoryId"];
        
    
    if (categoryId == "" || categoryId == "null" || categoryId == null) {
        categoryId = window.localStorage.getItem("spotlightCategoryID");
        //alert("Local Storage : " + categoryId);
    } else {
        window.localStorage.setItem("spotlightID", elementData);
        window.localStorage.setItem("spotlightCategoryID", categoryId);
    }

    var isSubscribe;
 
  
    // Check whether this TA is subscribed or not.
    $.each(jsonData.category, function (key, itemCategory) {
        //var parseitemCategory = JSON.parse(itemCategory);
        if (itemCategory.categoryid == categoryId) {

            isSubscribe = itemCategory.subscribe;
        }

    });
    
    if (isSubscribe == 'yes') {
        //alert("categoryId: " + categoryId);
        showTAListResult(elementData,categoryId);
    }
    else {       
        jConfirm('Please subscribe to this Technology Area to view the content.', 'Tech Time', function (returnValue) {
            if (returnValue == true) {
                showSubscribeContent();
            }
        });

    }
}



function spotlightDataTypes(elementId, type, countNum) //earlier 1100lines now 400
{
	console.log(elementId+"<-------->"+type+"<-------->"+countNum);	
	console.log('spotlightDataTypes dwPgflag'+dwPgflag);
	console.log('spotlightDataTypes spotFlagSet'+spotFlagSet);
    clearSearchTipfromSearch();


	window.localStorage.setItem("detailPageelementIdSpot",elementId);
    window.localStorage.setItem("detailPagetypeSpot",type);
    window.localStorage.setItem("detailPagecountNumSpot",countNum);
    
    spotLightFlag = true;
    eventsFlag = false;
    mediaFlag = false;
    alldownloadFlag = false;
    searchFromMainPage = false;
    searchFromAuthorDetailPage = false;
    detailFlag = false; 
 
   hidePopup();	
	var strHTMLDetail = '';
    var strHTML = '';
    var stringIWant = '';
    
    currElementIdSpot = elementId;
    currElementtypeSpot = type;
    currElementcountNumSpot = countNum;

    showNavigateDiv("navigateDiv");
    
    
    
    		var icons = '';
		
    		if (type == 'contributor') {

    	        $.each(jsonData.spotLight, function (key, itemType) {

    	               showAuthorDetailPage(itemType.title);

    	               defaultNavigate();

    	               $.mobile.changePage('#detailAuthor');

    	               });

    	    }else{
        $.each(jsonData.spotLight, function(key, itemType) {    
        	
        	console.log(itemType.itemId+' =||||= '+elementId);
            if(itemType.itemId == elementId){
            	
            	
            	
            	 var cId = '';
            	 var cDId = '';
            	 var aURL = '';
                 var vURL = '';
                 var pURL = '';
                 var tURL = '';
                 var dURL = '';
                 
                 var titleE = '';
                 var actualLocal = '';                 
                 
                 
            	cId  = itemType.itemId;
                aURL = itemType.audio;
                vURL = itemType.video;
                pURL = itemType.presentation;
                tURL = itemType.transcript;
                dURL = itemType.document;
                
                titleE = JSON.stringify(itemType.title);
               
                
       
                
                
                if (type == 'Audios') {


                    icons = "images/icon_audio.png";
                    if (vURL != "") {
                        var cVId = "AV" + cId;
                    }
                    if (aURL != "") {
                        var cAId = "AA" + cId;
                    }
                    if (pURL != "") {
                        var cPId = "AP" + cId;
                    }
                    if (tURL != "") {
                        var cTId = "AT" + cId;
                    }

                }

                if (type == 'Videos') {


                    icons = "images/icon_video.png";
                    if (vURL != "") {

                        var cVId = "VV" + cId;
                    }

                    if (aURL != "") {

                        var cAId = "VA" + cId;
                    }

                    if (pURL != "") {

                        var cPId = "VP" + cId;
                    }

                    if (tURL != "") {

                        var cTId = "VT" + cId;
                    }


                }

                if (type == 'Panel Discussions' || type == 'PanelDiscussions') {


                    icons = "images/icon_panelDiscussion.png";
                    if (vURL != "") {

                        var cVId = "PV" + cId;
                    }

                    if (aURL != "") {

                        var cAId = "PA" + cId;
                    }

                    if (pURL != "") {

                        var cPId = "PP" + cId;
                    }

                    if (tURL != "") {

                        var cTId = "PT" + cId;
                    }


                }

                if (type == 'Interviews') {


                    icons = "images/icon_interview.png";
                    if (vURL != "") {

                        var cVId = "IV" + cId;
                    }

                    if (aURL != "") {

                        var cAId = "IA" + cId;
                    }

                    if (pURL != "") {

                        var cPId = "IP" + cId;
                    }

                    if (tURL != "") {

                        var cTId = "IT" + cId;
                    }
                }

                if (type == 'documents') {


                    icons = "images/icon_document.png";
                    if (dURL != "") {

                        cDId = "DD" + cId;
                    }
                    dURL = itemType.document;
                    lURL = itemType.localPath;

                }

                if (type == 'events') {


                    icons = "images/icon_event.png";
                    var cEId = itemType.itemId;
                    var eURL = itemType.icsfile;


                    $.each(jsonData.spotLight, function(key, eventItem) {

                        stringIWant = '';
                        var stringIGet = eventItem.category;

                        arrayOfCategories = stringIGet.split("|");

                        for (var i = 0; i < arrayOfCategories.length; i++) {
                            var getCategoryName = new Array();
                            getCategoryName = arrayOfCategories[i].split("-");
                            // console.log('getCategoryName[0]---'+getCategoryName[0]); 
                            if (i == arrayOfCategories.length - 1) {
                                stringIWant += getCategoryName[0];
                            } else {
                                stringIWant += getCategoryName[0] + ", ";
                            }
                            // console.log('Event string expected :'+stringIWant);
                        }

                        if (stringIWant.length > 35) {
                            stringToDisplay = stringIWant.substring(0, 32);
                            // console.log(stringToDisplay);
                            var trimmedCatDisplay = stringToDisplay + "...";
                            // console.log("Trimmed Cat Display --------> " + trimmedCatDisplay);
                            stringIWant = trimmedCatDisplay;
                        }

                    });


                }

                if (type == 'Technology Conferences' || type == 'TechnologyConferences') {


                    icons = "images/icon_techConf.png";
                    if (vURL != "") {

                        var cVId = "TV" + cId;
                    }

                    if (aURL != "") {

                        var cAId = "TA" + cId;
                    }

                    if (pURL != "") {

                        var cPId = "TP" + cId;
                    }

                    if (tURL != "") {

                        var cTId = "TT" + cId;
                    }

                }
                

				   if(isOnline && itemType.actualLoc  == '')
				   {
				   //online and not downloaded
					   actualLocal = itemType.actual;
				   //console.log("//online and not downloaded"+itemType.actual);
				   }
				   else if(isOnline && itemType.actualLoc  != '')
				   {
				   // online and downloaded
					   actualLocal = sPath + "/images/" +itemType.itemId+"thumb.png";
				  // console.log("//online and  downloaded"+actualThumb);

				   }
				   else if(!isOnline && itemType.actualLoc  == '')
				   {
				   //offline and not downloaded
				   
					   actualLocal = 'images/TechTime.png';
				    //console.log("//offline and not downloaded"+actualThumb);

				   }
				   else if(!isOnline && itemType.actualLoc  != '')
				   {
				   //offline and downloaded
					   actualLocal = sPath + "/images/" +itemType.itemId+"thumb.png";
				  // console.log("//offline and  downloaded"+actualThumb);

				   }
				   else
				   {
				   //defaul  
					   actualLocal = sPath + "/images/" +itemType.itemId+"thumb.png";
				    //console.log("default"+actualThumb);
				   }
				   
            
					posterImage = actualLocal;	
				
               
             
               
					//alert('spotlight.js---'+type);
                           
                   	 if(type == 'Audios' || type == 'Videos' || type == 'Interviews' || type == 'Technology Conferences' || type == 'TechnologyConferences' || type == 'Panel Discussions' || type == 'PanelDiscussions' )  
            	   		{
                   		 strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
            	   		
            
		              if(vURL != ""){
		            	  
		                  if(itemType.isDownloadedVideo == "true" || itemType.isDownloadedVideo == true) {
		                     strHTMLDetail = strHTMLDetail + "<img id="+cVId+" title='"+itemType.localPathVideo+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedVideo+","+titleE+", 2)' src='"+actualLocal+"' class ='actualDetailThumb'  /></div><br><br>";
		                     
		                  }else{
		                     
		                	  if(isOnline)
		                		  {
				                	 strHTMLDetail = strHTMLDetail + "<video id ='liveVid' class ='actualDetailThumb' poster='"+actualLocal+"' >"
				             		 strHTMLDetail = strHTMLDetail +"<source src='"+vURL+"' type='video/mp4'></source>"
				             		 strHTMLDetail = strHTMLDetail +"our browser does not support the video tag."
				             		 strHTMLDetail = strHTMLDetail +"</video></div><br>";
		                		  }
		                	  else
		                		  {
			                		  strHTMLDetail = strHTMLDetail + "<img id ='liveVid1' class ='actualDetailThumb' src='"+actualLocal+"' onlick='jAlert('Please go online to view the video.', 'Tech Time');>"
						       		  strHTMLDetail = strHTMLDetail +"</div><br>";
			                		  
		                		  }
		                	
		                	  
		                     }
		              }else if(vURL == "" && aURL != ""){
		            	  
		            	strHTMLDetail = strHTMLDetail + "<div id='audioStreamer'><img id='"+cVId+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cId+")' class ='actualDetailThumb' />";
		            	strHTMLDetail = strHTMLDetail + "<video id='audioP' style='width:150px; height:20px;margin:20px 20px;' ><source src='"+aURL+"' type='video/mpeg'>Your browser does not support the video tag.</video></div>";
		              }
              
              			strHTMLDetail = strHTMLDetail + "</td><td style='width:50%;'><br>";
       
//   console.log("type"+type);
//   console.log("itemType.isDownloadedAudio"+itemType.isDownloadedAudio);
//   console.log("itemType.isDownloadedPresentation"+itemType.isDownloadedPresentation);
//   console.log("itemType.isDownloadedTranscript"+itemType.isDownloadedTranscript);
//   console.log("itemType.isDownloadedVideo"+itemType.isDownloadedVideo);
   
    
					   if(aURL != ""){
					    	
					        
					        if(itemType.isDownloadedAudio == "true"){
					           
			                   

					           strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+itemType.localPathAudio+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedAudio+","+titleE+",1)' class='detailPageButtonDiv' ><img src='images/btn_viewAudio.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
					           // strHTMLDetail = strHTMLDetail + "<div id='AA"+cId+"' title='"+itemAudio.localPathAudio+"' onclick='streamAudio();' style='border:none;width:120px;;height:40px;z-index:100;'><img src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
					
					           }else{
					           
					           strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+aURL+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedAudio+","+titleE+",1)' class='detailPageButtonDiv' ><img src='images/btn_downloadAudio.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
					          // console.log(' localpath='+itemType.isDownloadedAudio+"\n titleE  "+titleE+"\n id "+cAId );
					           }
					    }
               
    
	    				if(pURL != ""){
	               
					               if(itemType.isDownloadedPresentation == 'true'){
					               
					               strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+itemType.localPathPresentation+"' onclick= 'downloadSeqArray(this,"+itemType.isDownloadedPresentation+","+titleE+",3)' class='detailPageButtonDiv' ><img src='images/btn_viewPresentation.png' height='100%' width='100%' class='detailPageButton'></div><br>";
					               
					               
					               }else{
					               
					               strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+pURL+"' onclick= 'downloadSeqArray(this,"+itemType.isDownloadedPresentation+","+titleE+",3)' class='detailPageButtonDiv' ><img src='images/btn_downloadPresentation.png' height='100%' width='100%' class='detailPageButton'></div><br>";
					               
					               
					               }
	    				}
               
					    if(tURL != ""){
					               
					               if(itemType.isDownloadedTranscript == 'true'){
					               
					               strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+itemType.localPathTranscript+"' onclick= 'downloadSeqArray(this,"+itemType.isDownloadedTranscript+","+titleE+",4)' class='detailPageButtonDiv' ><img src='images/btn_viewTranscript.png' height='100%' width='100%' class='detailPageButton'/></div><br>";
					               
					               
					               }else{
					               
					               strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+tURL+"' onclick= 'downloadSeqArray(this,"+itemType.isDownloadedTranscript+","+titleE+",4)' class='detailPageButtonDiv'><img src='images/btn_downloadTranscript.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
					               
					               
					               }
					    }
					    
    
						if(vURL != ""){
						        
						    	
						        if(itemType.isDownloadedVideo == "true" || itemType.isDownloadedVideo == true){
						        strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title='"+itemType.localPathVideo+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedVideo+","+titleE+", 2)' class='detailPageButtonDiv' ><img src='images/btn_viewVideo.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
						
						        }else{
						          
						             strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title='"+vURL+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedVideo+","+titleE+", 2)' class='detailPageButtonDiv'><img src='images/btn_downloadVideo.png' height='100%' width='100%' class='detailPageButton'/></div><br>";
						
						        }
						}
				  
						
					    if(itemType.qna != ""){
				            strHTMLDetail = strHTMLDetail + "<a style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
				            strHTMLDetail = strHTMLDetail + "<div id='"+itemType.title+"' title='"+itemType.qna+"' onclick= 'showQnA(this)' class='detailPageButtonDiv'><img src='images/btn_viewQA.png' height='100%' width='100%' class='detailPageButton' /></div></a><br>";
					    }
				    
				               
				               strHTMLDetail = strHTMLDetail + "</td></tr>";
				            
				               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><embed src='"+icons+"' type='image/svg+xml' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
				               
				               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemType.title+"</label><br>";
				    
               
					} else if(type == 'documents'){
						
							strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 40%'>";
			              
							
							if(itemType.isDownloaded == 'true'){
			                   strHTMLDetail = strHTMLDetail + "<img id='"+cDId+"' title= '"+itemType.localPath+"'  src='"+actualLocal+"' class ='actualDetailThumb'/><br><br>";//onclick= 'downloadSeqArray(this,"+documentItem.isDownloaded+","+titleE+",5)'
			                   }else{
			                   strHTMLDetail = strHTMLDetail + "<img id='"+cDId+"' title= '"+dURL+"' src='"+actualLocal+"' class ='actualDetailThumb'/><br><br>";//onclick= 'downloadSeqArray(this,"+documentItem.isDownloaded+","+titleE+",5)'
			                   }
			               strHTMLDetail = strHTMLDetail + "</td><td style='width : 60%'><br>";
				               
			               
			               if(dURL != "")
			            	   {
				               		if(itemType.isDownloaded == 'true'){
					              strHTMLDetail = strHTMLDetail + "<div id='"+cDId+"' title= '"+itemType.localPath+"' onclick= 'downloadSeqArray(this,"+itemType.isDownloaded+","+titleE+",5)' class='detailPageButtonDiv'><img src='images/btn_viewPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
					               }else{
					               strHTMLDetail = strHTMLDetail + "<div id='"+cDId+"' title= '"+dURL+"' onclick= 'downloadSeqArray(this,"+itemType.isDownloaded+","+titleE+",5)' class='detailPageButtonDiv'><img src='images/button_downloadPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
					               }
			            	   }
			              strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='"+icons+"' style='height:20px; width:20px; border:none;;margin:5px;'/>";
			              strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemType.title+"</label><br>";
			               
						
						}else if(type == 'events'){							
							

							strHTMLDetail = strHTMLDetail+ "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";

							if (itemType.authorCount == 1) {
		
								strHTMLDetail = strHTMLDetail + "<img id='docImg' src='"+ actualLocal+ "' style='border:none; width:90%; margin:10px 10px;'/><br></td>";
		
							} else if (itemType.authorCount == 2) {
		
								strHTMLDetail = strHTMLDetail+ "<img id='docImg' src='"+ actualLocal+ "' style='border:none; width:90%; margin:10px 10px'/><br></td>";
		
							} else {
		
								strHTMLDetail = strHTMLDetail+ "<img id='docImg' src='"+ actualLocal+ "' style='border:none; width:90%;  margin:10px 10px'/><br></td>";
		
							}

					strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%'></tr><br>";
					if(stringIWant!= ""){
			           strHTMLDetail += "<tr><td style='width : 100%' colspan='2'style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+stringIWant+"</td> </tr>";
					}

					strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='"+icons+"' style='height:20px; width:20px; border:none;margin:5px; '/>";

					strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+ itemType.title + "</label><br>";

						}
                }   
       
	               
	               
	               
	    $.each(itemType.author, function(key, tempAuthor) {
	    	authornamefromid = tempAuthor;
	    	//console.log('tempAuthor--' +tempAuthor);

           strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"'  style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id);' href='#detailAuthor'>";
        strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";    
              
	    });
                  
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemType.publishedDateStart+"</label><br>";
               if(type == 'events'){
            	   
               strHTMLDetail += "<label id='vTime' style='font-size: 14px;'>"+itemType.etime+"</label><br><br><br>";
               }
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemType.description+"</label>"; 
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
             //  console.log('1111111');
           	console.log('spotlightDataTypes dgsdfgfsh dwPgflag'+dwPgflag);
            	    	if(dwPgflag == false || dwPgflag == 'false' )
            	        {
            	    		$.mobile.changePage('#detailMediaPage');
            	        }
       		//console.log('22222');
               
           
        });
	}
 
    		
    	console.log('spotLightFlag'+spotLightFlag);
    	console.log('spotLightFlag'+eventsFlag);
    	console.log('alldownloadFlag'+alldownloadFlag);
    	console.log('mediaFlag'+mediaFlag);
    	   

    document.getElementById('spotItemContent').style.display = "none";
    $('#detailPageArea').html(strHTMLDetail);
    
    $('#prevNextContentArea').html(''); 
    $('#prevNextContentArea').css('background', 'transparent'); 


//    
//	if(countNum == 0 || countNum == '0'){
//		 document.getElementById("prevBtn").style.display = "none";
//    }
//	
//    if(countNum == -1 || countNum == '-1'){
//         document.getElementById('nextBtn').style.display = "none";
//    }
//    
//    if(countNum == -100 || countNum == '-100' ){
//   	 document.getElementById('prevBtn').style.display = "none";
//     document.getElementById('nextBtn').style.display = "none";
//    }

    
	
   
	strHTMLDetail = '';
    
 $('video').bind('play', stopMedia);
   // $('video').bind('onprogress', stopMedia); 

}

