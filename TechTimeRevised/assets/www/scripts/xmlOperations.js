
function setTaFlag()
{
                spotLightFlag = false;
    eventsFlag = false;
    mediaFlag = true;         
}

function setSpotLightFlag()
{
                spotLightFlag = true;
    eventsFlag = false;
    mediaFlag = false;        
}
function getListElement(itemRes,count,itemId,itemIndex)
{

                
                //spotLightFlag = false;
                mediaFlag = true;
    if(spotLightFlag) //coming from spotligh(search)
                {
                                
                                 spotLightFlag = true;
                }
    else //coming from any other page than spotlight
                {
                                spotLightFlag = false;
                }
    
   
    eventsFlag = false;
    
    dwFlag = false;
    alldownloadFlag = false;
    spotFlagSet = false

  
                
                
                var strHTMLshowTAList = '';
                var actualThumb = '';
                
    

   if(isOnline && itemRes.thumbLoc == '')
   {
   //online and not downloaded
   actualThumb = itemRes.thumb;
   //alert("online and not downloaded " + actualThumb);
   //console.log("//online and not downloaded"+actualThumb);
   }
   else if(isOnline && itemRes.thumbLoc != '')
   {
   // online and downloaded
   actualThumb = sPath + "/images/" +itemRes.itemId+"thumb.png";
   //alert("online and downloaded " + actualThumb);
  // console.log("//online and  downloaded"+actualThumb);

   }
   else if(!isOnline && itemRes.thumbLoc == '')
   {
   //offline and not downloaded
   
   //actualThumb = 'images/TechTime.png';
                   actualThumb = sPath + "/images/" +itemRes.itemId+"thumb.png";
  // alert("offline and not downloaded " + actualThumb);
   // console.log("//offline and not downloaded"+actualThumb);

   }
   else if(!isOnline && itemRes.thumbLoc != '')
   {
//  offline and downloaded
   actualThumb = sPath + "/images/" +itemRes.itemId+"thumb.png";
   
   //alert("offline and downloaded " + actualThumb);
  // console.log("//offline and  downloaded"+actualThumb);

   }
   else
   {
   //default  
   actualThumb = sPath + "/images/" +itemRes.itemId+"thumb.png";
   //alert("default " + actualThumb);
   // console.log("default"+actualThumb);
   }
   


  
                    var authoNames = '';
                $.each(itemRes.author, function(key, itemAuthor) {
                                if (key == 0) {
                                                authoNames = authoNames + itemAuthor;
                                } else if (key <= (itemRes.author.length - 1)) {
                                                authoNames = authoNames + ', ' + itemAuthor;
                                } else {
                                                authoNames = authoNames + ' ' + itemAuthor;
                                }
                });
    
    
    var type1;
    var icons;
    
    
   // console.log('itemRes.type------------'+itemRes.type);
    if(itemRes.type == "Audios"){
                
                itemId = itemId;
                type1 = 'Audios';
                count = count;
                icons = "images/icon_audio.png";
                 }
    
    if(itemRes.type == "Videos"){
                itemId = itemId;
                type1 = 'Videos';
                count = count;
                icons = "images/icon_video.png";
    }
    
    if(itemRes.type == "Panel Discussions")
                {
                itemId = itemId;
                type1 = 'PanelDiscussions';
                count = count;
                icons = "images/icon_panelDiscussion.png";
    }
    
    if(itemRes.type == "Interviews")
                {
                                itemId = itemId;
                                type1 = 'Interviews';
                                count = count;
                icons = "images/icon_interview.png";
    }   
       
    if(itemRes.type == "documents")
                {
                                itemId = itemId;
                                type1 = 'documents';
                                count = count;
                                icons = "images/icon_document.png";
    }
    
    if(itemRes.type == "Technology Conferences")
                {
                                itemId = itemId;
                                type1 = 'TechnologyConferences';
                                count = count;
                icons = "images/icon_techConf.png";
    }
    //Start: Akshay, format change
                if (itemRes.type == "Technology Sessions") {
        itemId = itemId;
        type1 = 'TechnologySessions';
        count = count;
        icons = "images/icon_video.png";
    }
                //End
                
   // console.log('count in the list '+totalItemCount);
    
    if(totalItemCount == 1)
    {
        $('#numberOfItems').html("("+totalItemCount+" Item)");
    } else if(totalItemCount > 1){
         $('#numberOfItems').html("("+totalItemCount+" Items)");
    } else if(totalItemCount == 0)
    {
       $('#numberOfItems').html("(No Items)");
    }
    
    strHTMLshowTAList += "<div class='listItemClick'>"
                if(itemIndex < 5){
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+type1+"',"+count+") style='text-decoration:none;font-style:normal;color:black;display:block;overflow :hidden' >";
                }else{
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+type1+"',"+count+") style='text-decoration:none;font-style:normal;color:black;display:none;overflow :hidden' >";
        } 
        strHTMLshowTAList = strHTMLshowTAList + "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border-bottom:1px solid grey;' cellpadding='0' cellspacing='0' >";
        strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:75px;border:solid 1px;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
        strHTMLshowTAList = strHTMLshowTAList + "<td style='margin:0px; padding:0px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList = strHTMLshowTAList + "<td style='margin:0px; padding:0px; width:10%;' rowspan='2' align='right'>";
        strHTMLshowTAList = strHTMLshowTAList + "<embed src='"+icons+"' type='image/svg+xml' style='height:20px;width:100%;border:none;padding:0px;margin-right:15px'/>";
        strHTMLshowTAList = strHTMLshowTAList + "</td></tr> <tr><td id='' style='margin:0px;padding:0px;width:65%;color: orange;font-size:14px;font-weight:100;padding-left:12px;'>"+authoNames+"</td></tr>";
        strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='' style='margin:0px;padding:0px;width : 65%;font-size:16px;padding-left:16px;font-weight:100;'>"+itemRes.publishedDate+"\n";
        strHTMLshowTAList = strHTMLshowTAList +showDownloadedIcons(itemRes)+"</td>";
        strHTMLshowTAList = strHTMLshowTAList + "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='100%' height='20px;' style='margin-right:15px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; margin-bottom:-10px;'></a></div>";
        
     
    
return strHTMLshowTAList;

}



function renderItemCount(totalItemCount)
{


}




var posterImage = '';
function detailPageView(elementId,type,countNum) //earlier 1100lines now 400
{
	  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
                
                //alert("detailpage" + elementId + " " + type + " " +  countNum);
    dwFlag = false;
    detailFlag = true; 
    alldownloadFlag = false;

                window.localStorage.setItem("detailPageelementId",elementId);
    window.localStorage.setItem("detailPagetype",type);
    window.localStorage.setItem("detailPagecountNum",countNum);

    
                hidePopup();
                
                var strHTMLDetail = '';
    var strHTML = '';
    var stringIWant = '';
    
    currElementId = elementId;
    currElementtype = type;
    currElementcountNum = countNum;
    

    showNavigateDiv("navigateDiv");
    
    
                                var icons = '';
                                    var jsonArr = new Array();
                                    
                                    if(type == 'Audios'){
                                                
                                                                jsonArr = jsonData.audio;
                                                icons = "images/icon_audio.png";
                                                
                                    }
                                    
                                    if(type == 'Videos'){
                                                
                                                jsonArr = jsonData.video;
                                                icons = "images/icon_video.png";
                                                
                                    }
                                    
                                    if(type == 'Panel Discussions' || type == 'PanelDiscussions'){
                                                
                                                jsonArr = jsonData.panelDiscussions;
                                                icons = "images/icon_panelDiscussion.png";
                                                
                                    }
                                    
                                    if(type == 'Interviews'){
                                                
                                                jsonArr = jsonData.interviews;
                                                icons = "images/icon_interview.png";
                                    }
                                    
                                    if(type == 'documents'){
                                                
                                                jsonArr = jsonData.documents;
                                                icons = "images/icon_document.png";
                                                
                                    }
                                    
                                    if(type == 'events'){
                                                
                                                jsonArr = jsonData.events;
                                                icons = "images/icon_event.png";
                                                
                                                
                                                
                                                 $.each(jsonData.spotLight, function(key, eventItem) {
                                                
                                                                 stringIWant = '';
                                          var stringIGet = eventItem.category;
                                          
                                          arrayOfCategories = stringIGet.split("|");
                                          
                                          for(var i=0;i<arrayOfCategories.length;i++)
                                          {
                                           var getCategoryName = new Array();
                                           getCategoryName = arrayOfCategories[i].split("-");
                                           if(i==arrayOfCategories.length - 1)
                                           {
                                            stringIWant += getCategoryName[0];
                                           } else {
                                            stringIWant += getCategoryName[0] + ", ";
                                           }
                                          }

                                        if(stringIWant.length > 35)
                                          {
                                                          stringToDisplay = stringIWant.substring(0,32);
                                                          var trimmedCatDisplay = stringToDisplay + "...";
                                                          stringIWant =  trimmedCatDisplay;
                                          }
                                        
                                                 });
                                                
                                                
                                    }
                                    
                                    if(type == 'Technology Conferences' || type == 'TechnologyConferences'){
                                                
                                                jsonArr = jsonData.techConf;
                                                icons = "images/icon_techConf.png";
                                                
                                    }
                                    //Start:Akshay, format change
                                                if (type == 'Technology Sessions' || type == 'TechnologySessions') {
                                        jsonArr = jsonData.technologySessions;
                                                                //Change icon
                                        icons = "images/icon_video.png";
                                    }
                                                //End
                                    
        $.each(jsonArr, function(key, itemType) {               
                
            if(itemType.itemId == elementId){
                
                
                
                 var cId = '';
                 var cDId = '';
                 var aURL = '';
                 var vURL = '';
                 var pURL = '';
                 var tURL = '';
                 var dURL = '';
                 var alen = '';
                 var vlen = '';
                 var plen = '';
                 var tlen = '';
                 var videoLen = '';
                 var titleE = '';
                 var actualLocal = '';                 
                 
                 
                cId  = itemType.itemId;
                aURL = itemType.audioUrl;
                vURL = itemType.videoUrl;
                pURL = itemType.presentationUrl;
                tURL = itemType.transcriptUrl;

                alen = itemType.audioLength;
                vlen = itemType.videoLength;
                plen = itemType.presentationLength;
                tlen = itemType.transcriptLength;
                videoLen = getFileSize(vlen);               
                titleE = JSON.stringify(itemType.title);
                
                                                                if (itemType.actualLoc != '') {
                                                                                actualLocal = itemType.actualLoc;
                                                                } else if (!isOnline) {

                                                                                actualLocal = sPath + "/images/" + cId
                                                                                                                + "actual.png";
                                                                                
                                                
                                                                                
                                                                                
                                                                                

                                                                } else {
                                                                                var testF = UrlExistsImage(sPath + "/images/"+ cId + "actual.png");
                                                                                
                                                
                                                                                if (testF == 0) {
                                                                                                actualLocal = sPath + "/images/" + cId+ "actual.png";
                                                                                } else {
                                                                                                actualLocal = itemType.actual;
                                                                                                
                                                                                }
                                                                }
        
                                                                posterImage = actualLocal;
                if(jsonArr == jsonData.audio){                                   
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
                                    

                                                if (jsonArr == jsonData.video) {

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
                                    

                                                                if (jsonArr == jsonData.panelDiscussions) {

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
                                    
                                    if(jsonArr == jsonData.interviews){
                                                
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
                                    
                                 if (jsonArr == jsonData.techConf) {

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
                                    
                                    
                                    if(jsonArr == jsonData.documents){
                                                

                                                                                
                                                 cDId = "DD" + cId;
                                                                
                                                dURL = itemType.pdf;
                                                lURL = itemType.localPath;
                                                
                                    }
                                    
                                 if(jsonArr == jsonData.events){
                                                
                                                 var cEId = itemType.itemId;
                                                 var eURL = itemType.icsfile;
                                                
                                    }
                                 
                //Start:Akshay, format change
                                 if (jsonArr == jsonData.technologySessions) {
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
                                                //End
            

             
               
               if(jsonArr == jsonData.audio || jsonArr == jsonData.video || jsonArr == jsonData.panelDiscussions || jsonArr == jsonData.interviews || jsonArr == jsonData.techConf || jsonArr == jsonData.technologySessions)
                                                                                {                                                
                                   
                                                strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
                                                
                 
       
            
                                              if(vURL != ""){
                                                  
                                                  if(itemType.isDownloadedVideo == "true" || itemType.isDownloadedVideo == true) {
                                                    // console.log(' title='+itemType.localPathVideo+"\n titleE  "+titleE+"\n id "+cVId );
                                                     strHTMLDetail = strHTMLDetail + "<img id="+cVId+" title='"+itemType.localPathVideo+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedVideo+","+titleE+", 2)' src='"+actualLocal+"' class ='actualDetailThumb'  /></div><br><br>";
                                                     
                                                  }else{
                                                     
                                                                 
                                                                  if(isOnline)
                                                                                  {
                                                                
                                                                                                 strHTMLDetail = strHTMLDetail + "<video id ='liveVid' class ='actualDetailThumb' poster='"+actualLocal+"' >"
                                                                                                 strHTMLDetail = strHTMLDetail +"<source src='"+vURL+"'></source>"// type='video/mp4'
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
       
               
   
    
                                                                                   if(aURL != ""){
                                                                                                  // alert("itemType.isDownloadedAudio -- " + itemType.isDownloadedAudio);
                                                                                        if(itemType.isDownloadedAudio == "true"){
                                                                                                                //alert('Audio T');

                                                                                                
                                                                                           strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+itemType.localPathAudio+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedAudio+","+titleE+",1)' class='detailPageButtonDiv' ><img src='images/btn_viewAudio.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
                                                                                           // strHTMLDetail = strHTMLDetail + "<div id='AA"+cId+"' title='"+itemAudio.localPathAudio+"' onclick='streamAudio();' style='border:none;width:120px;;height:40px;z-index:100;'><img src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
                                                                                
                                                                                           }else{
                                                                                           
                                                                                                   //alert('Audio F');
                                                                                           strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+aURL+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedAudio+","+titleE+",1)' class='detailPageButtonDiv' ><img src='images/btn_downloadAudio.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
                                                                                           
                                                                                           }
                                                                                    }
               
    
                                                                                if(pURL != "")
                                                                                {
                                                                                               
                                                                                                
                                                                                                
                                                                                               
                                                                                                //if(itemType.isDownloadedPresentation == 'true' && ('P' + itemType.itemId)!=-1)
                                                                                                
                                                                                            
                                                                                                
                                                                                                if(downloadedFiles.indexOf(cPId + '.pdf') !=-1)
                                                                                                {
                                                                                                                strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+itemType.localPathPresentation+"' onclick= 'downloadSeqArray(this,true,"+titleE+",3)' class='detailPageButtonDiv' ><img src='images/btn_viewPresentation.png' height='100%' width='100%' class='detailPageButton'></div><br>";
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                                strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+pURL+"' onclick= 'downloadSeqArray(this,false,"+titleE+",3)' class='detailPageButtonDiv' ><img src='images/btn_downloadPresentation.png' height='100%' width='100%' class='detailPageButton'></div><br>";
                                                                                                }
                                                                                }
               
                                                                                    if(tURL != ""){
                                                                                    
                                                                                                //alert("itemType.isDownloadedTranscript -- " + itemType.isDownloadedTranscript);
                                                                                               
                                                                                               if(downloadedFiles.indexOf(cTId  + '.pdf')!=-1){
                                                                                                                //alert('T T');
                                                                                               strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+itemType.localPathTranscript+"' onclick= 'downloadSeqArray(this,true,"+titleE+",4)' class='detailPageButtonDiv' ><img src='images/btn_viewTranscript.png' height='100%' width='100%' class='detailPageButton'/></div><br>";
                                                                                               
                                                                                               
                                                                                               }else{
                                                                                                                //alert('T F');
                                                                                               strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+tURL+"' onclick= 'downloadSeqArray(this,false,"+titleE+",4)' class='detailPageButtonDiv'><img src='images/btn_downloadTranscript.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
                                                                                               
                                                                                               
                                                                                               }
                                                                                    }
                                                                                    
    
                                                                                                if(vURL != ""){
                                                                                                        
                                                                                                                //alert("itemType.isDownloadedVideo -- " + itemType.isDownloadedVideo);

                                                                                                        if(itemType.isDownloadedVideo == "true" || itemType.isDownloadedVideo == true){
                                                                                                                //alert('V T');
                                                                                                        // console.log(' title='+itemType.localPathVideo+"\n titleE  "+titleE+"\n id "+cVId );
                                                                                                        strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title='"+itemType.localPathVideo+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedVideo+","+titleE+", 2)' class='detailPageButtonDiv' ><img src='images/btn_viewVideo.png' height='100%' width='100%' class='detailPageButton' /></div><br>";
                                                                                                                                // strHTMLDetail = strHTMLDetail + "<div id='playlistItem" + cVId + "' data-playlistItemId=" + cVId + "'  data-playlistItemTitle='" + itemType.title + "' data-playlistItemDate='" + itemType.publishedDate + "' data-playlistItemAuthor='" + itemType.author + "' data-playlistItemUrl='" + vURL + "' data-playlistItemThumb='" + itemType.actual + "' class='detailPageButtonDiv' onclick='getAddToPlaylistItemDetails(this);showAddToPlaylist()'><img  src='images/addToPlaylist.png' height='100%' width='100%' class='detailPageButton''/></div><br>";
                                                                                                                                  
                                                                                                                                
                                                                                                                                                


                                                                                                        }else{
                                                                                                                //alert('V F');
                                                                                                             strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title='"+vURL+"' onclick='downloadSeqArray(this,"+itemType.isDownloadedVideo+","+titleE+", 2)' class='detailPageButtonDiv'><img src='images/btn_downloadVideo.png' height='100%' width='100%' class='detailPageButton'/></div><br>";
                                                                                                                                                

 


                                                                                                        }
                                                                                                        strHTMLDetail = strHTMLDetail + "<div id='playlistItem" + cVId + "' data-playlistItemId=" + cVId + "'  data-playlistItemTitle='" + itemType.title + "' data-playlistItemDate='" + itemType.publishedDate + "' data-playlistItemAuthor='" + itemType.author + "' data-playlistItemUrl='" + vURL + "' data-playlistItemThumb='" + itemType.actual + "' class='detailPageButtonDiv' onclick='getAddToPlaylistItemDetails(this);showAddToPlaylist()'><img  src='images/addToPlaylist.png' height='100%' width='100%' class='detailPageButton''/></div><br>";

                                                                                                }
                                                                  alert(itemType.qna + " " + itemType.qna.length);
                                                                                                
                                                                                    if(itemType.qna != "" || itemType.qna != " " ){
                                                                            strHTMLDetail = strHTMLDetail + "<a style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
                                                                                        
                                                                            strHTMLDetail = strHTMLDetail + "<div id='"+itemType.title+"' title='"+itemType.qna+"' onclick= 'showQnA(this)' class='detailPageButtonDiv'><img src='images/btn_viewQA.png' height='100%' width='100%' class='detailPageButton' /></div></a><br>";
                                                                                    }
                                                                    
                                                                               
                                                                               
                    
                                                                               console.log("QQNNAA -- " + strHTMLDetail);
                                                                               
                                                                               
                                                                               
                                                                               strHTMLDetail = strHTMLDetail + "</td></tr>";
                                                                               
                                                                               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><embed src='"+icons+"' type='image/svg+xml' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
                                                                               
                                                                               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemType.title+"</label><br>";
                                                                    
               
                                                                                }else if(jsonArr == jsonData.documents)
                                                                                                {
                                                                                	
                                                                                	
                                                                                	
                                                                                                
                                                                         strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 40%'>";
                                                              
                                                                        
                                                                                                                if(downloadedFiles.indexOf(cDId) !=-1){
                                                                   strHTMLDetail = strHTMLDetail + "<img id='"+cDId+"' title= '"+itemType.localPath+"'  src='"+actualLocal+"' onclick= 'downloadSeqArray(this,true,"+titleE+",5)' class ='actualDetailThumb'/><br><br>";//onclick= 'downloadSeqArray(this,"+documentItem.isDownloaded+","+titleE+",5)'
                                                                   }else{
                                                                   strHTMLDetail = strHTMLDetail + "<img id='"+cDId+"' title= '"+dURL+"' src='"+actualLocal+"' onclick= 'downloadSeqArray(this,false,"+titleE+",5)' class ='actualDetailThumb'/><br><br>";//onclick= 'downloadSeqArray(this,"+documentItem.isDownloaded+","+titleE+",5)'
                                                                   }
                                                               strHTMLDetail = strHTMLDetail + "</td><td style='width : 60%'><br>";
                                                                               
                                                        

                                                                                                if(downloadedFiles.indexOf(cDId  + '.pdf') !=-1){
                                                                                                                //alert("itemType.isDownloaded2 -- " + itemType.isDownloaded);
                                                                                              strHTMLDetail = strHTMLDetail + "<div id='"+cDId+"' title= '"+itemType.localPath+"' onclick= 'downloadSeqArray(this,true,"+titleE+",5)' class='detailPageButtonDiv'><img src='images/btn_viewPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
                                                                                               }else{
                                                                                                  // alert("itemType.isDownloaded1 -- " + itemType.isDownloaded);
                                                                                               strHTMLDetail = strHTMLDetail + "<div id='"+cDId+"' title= '"+dURL+"' onclick= 'downloadSeqArray(this,false,"+titleE+",5)' class='detailPageButtonDiv'><img src='images/button_downloadPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
                                                                                               }
                                                              strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='"+icons+"' style='height:20px; width:20px; border:none;;margin:5px;'/>";
                                                              strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemType.title+"</label><br>";
                                                               
                                                                                                
                                                                                                }else if(jsonArr == jsonData.events)
                                                                                                                {
                                                                                                                
                                                                                                                
                                                                                                                
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
                                                                                                
                               
                    $.each(itemType.author, function(key, tempAuthor) {
                                authornamefromid = tempAuthor;

           strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"'  style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id);' href='#detailAuthor'>";
        strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";    
              
                    });
                  
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemType.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemType.description+"</label>"; 
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               strHTML = strHTML + "<div style='width: 100%; height: 20px;background:white;border:none'>";
               strHTML = strHTML + "<table style='width: 100%;background:white'><tr>";
              strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+")' ><img width='90' src='images/btn_previous.png' class='nextprevEffects'></img></td>";
               strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+")' ><img width='60' src='images/btn_next.png' class='nextprevEffects'></img></td>";
               strHTML = strHTML + "</tr><tr><td><hr style='width:100%;background-color: white; color: grey; height:0.5px;margin-top:-5px;'></td></tr></table></div></div>";
               
               //<hr style='width:100%;background: white; color: grey; height:0.5px;'><div style='width: 100%;background-color:white;border:none'><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></div>
            }
        });

     

                
    document.getElementById('spotItemContent').style.display = "none";
    $('#detailPageArea').html(strHTMLDetail);
    $('#prevNextContentArea').html(strHTML); 


    
                                if(countNum == 0){
                                                document.getElementById("prevBtn").style.display = "none";
                    }
                                
                    if(countNum == -1){
                         document.getElementById('nextBtn').style.display = "none";
                    }
                    
                    if(countNum == -100){
                    //        alert(elementId+"    "+type+"   "+countNum);

                                 document.getElementById('prevBtn').style.display = "none";
                     document.getElementById('nextBtn').style.display = "none";
                    }
                                //$('#showWid').html(strRendering); 

                    
                strHTMLDetail = '';
    strHTML = '';
    
 $('video').bind('play', stopMedia);
// $('video').bind('progress', stopMedia);


   // $('video').bind('onprogress', stopMedia); 
      
}



function stopMedia(state, player) {

                                $.each($('video'), function() {

                                var a = this.poster;
                                //alert(isOnline);
                                if (isOnline == false || isOnline == 'false') {
                                                this.poster = a;
                                                this.src = " ";
                                                this.load();
                                                jAlert('Please go online to view the video.', 'Tech Time');
                                                
                                }
                });

}


        
       
    


function compareAndUpdateJSON1(data) {
                var technologySessionsFiles = [];


                
                $("#imgRefreshProgress").hide();
                //$.mobile.changePage("#businessCategory");
//console.log("compareAndUpdateJSON1"+JSON.stringify(data));


console.log('Downloading images started .....');

$.each(data.documents, function(key, oldItem) {
if (oldItem.isDownloaded == 'true') {
                $.each(jsonData.documents, function(key, newItem) {
                                if (oldItem.itemId == newItem.itemId) {
                                                newItem.isDownloaded = oldItem.isDownloaded;
                                                newItem.localPath = oldItem.localPath;
                
                                                
                                                newItem.downloadedDateD = oldItem.downloadedDateD;
                                                
                                }
                });
}

});


$.each(data.audio, function(key, oldItem){

if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' ){

                $.each(jsonData.audio, function(key, newItem){
                       
                     if(oldItem.itemId == newItem.itemId){
                       
//                           console.log('Audio--->>>> $$$$$ '+oldItem.title);
                           
                           newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                           newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                           newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                           newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                           
                           newItem.localPathAudio = oldItem.localPathAudio;
                           newItem.localPathVideo = oldItem.localPathVideo;
                           newItem.localPathTranscript = oldItem.localPathTranscript;
                           newItem.localPathPresentation = oldItem.localPathPresentation;
                           
                           newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                                                                newItem.downloadedDateT = oldItem.downloadedDateT;
                       }
                 });
}

});




$.each(data.video, function(key, oldItem){

if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' ){
   
           $.each(jsonData.video, function(key, newItem){

                                                                                                                                                                if (oldItem.itemId == newItem.itemId) {

                                                                                                                                                                                

                                                                                                                                                                                newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                                                                                                                                                                                newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                                                                                                                                                                                newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                                                                                                                                                                                newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;

                                                                                                                                                                                newItem.localPathAudio = oldItem.localPathAudio;
                                                                                                                                                                                newItem.localPathVideo = oldItem.localPathVideo;
                                                                                                                                                                                newItem.localPathTranscript = oldItem.localPathTranscript;
                                                                                                                                                                                newItem.localPathPresentation = oldItem.localPathPresentation;
                                                                                                                                                                                
                                                                                                                                                                                newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                                                                                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                                                                                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                                                                                                                                newItem.downloadedDateT = oldItem.downloadedDateT;
                                                                                                                                                                }

                                                                                                                                                });
                                                                }

                                                });


$.each(data.TechnologySessions, function(key, oldItem){

                if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' ){
                   
                           $.each(jsonData.technologySessions, function(key, newItem){

                                                                                                                                                                                if (oldItem.itemId == newItem.itemId) {

                                                                                                                                                                                                

                                                                                                                                                                                                newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                                                                                                                                                                                                newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                                                                                                                                                                                                newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                                                                                                                                                                                                newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;

                                                                                                                                                                                                newItem.localPathAudio = oldItem.localPathAudio;
                                                                                                                                                                                                newItem.localPathVideo = oldItem.localPathVideo;
                                                                                                                                                                                                newItem.localPathTranscript = oldItem.localPathTranscript;
                                                                                                                                                                                                newItem.localPathPresentation = oldItem.localPathPresentation;
                                                                                                                                                                                                
                                                                                                                                                                                                newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                                                                                                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                                                                                                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                                                                                                                                                newItem.downloadedDateT = oldItem.downloadedDateT;
                                                                                                                                                                                }

                                                                                                                                                                });
                                                                                }

                                                                });

$.each(data.panelDiscussions, function(key, oldItem){

if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' ){
   
           $.each(jsonData.panelDiscussions, function(key, newItem){

                                                                                                                                                                if (oldItem.itemId == newItem.itemId) {

                                                                                                                                                                                // console.log('panelDiscussions--->>>>
                                                                                                                                                                                // $$$$$ '+oldItem.title);

                                                                                                                                                                                newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                                                                                                                                                                                newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                                                                                                                                                                                newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                                                                                                                                                                                newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;

                                                                                                                                                                                newItem.localPathAudio = oldItem.localPathAudio;
                                                                                                                                                                                newItem.localPathVideo = oldItem.localPathVideo;
                                                                                                                                                                                newItem.localPathTranscript = oldItem.localPathTranscript;
                                                                                                                                                                                newItem.localPathPresentation = oldItem.localPathPresentation;
                                                                                                                                                                                
                                                                                                                                                                                newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                                                                                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                                                                                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                                                                                                                                newItem.downloadedDateT = oldItem.downloadedDateT;
                                                                                                                                                                }
                                                                                                                                                });
                                                                }

                                                });

$.each(data.interviews, function(key, oldItem){

if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true'){
   
   $.each(jsonData.interviews, function(key, newItem){

                                                                                                                                                                if (oldItem.itemId == newItem.itemId) {

                                                                                                                                                                                // console.log('interviews--->>>>
                                                                                                                                                                                // $$$$$ '+oldItem.title);

                                                                                                                                                                                newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                                                                                                                                                                                newItem.localPathAudio = oldItem.localPathAudio;

                                                                                                                                                                                newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                                                                                                                                                                                newItem.localPathVideo = oldItem.localPathVideo;

                                                                                                                                                                                newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                                                                                                                                                                                newItem.localPathTranscript = oldItem.localPathTranscript;

                                                                                                                                                                                newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                                                                                                                                                                                newItem.localPathPresentation = oldItem.localPathPresentation;
                                                                                                                                                                                
                                                                                                                                                                                newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                                                                                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                                                                                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                                                                                                                                newItem.downloadedDateT = oldItem.downloadedDateT;

                                                                                                                                                                }
                                                                                                                                                });
                                                                }

                                                });



$.each(data.techConf, function(key, oldItem){


                if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' ){

                                $.each(jsonData.techConf, function(key, newItem){
                                       
                                     if(oldItem.itemId == newItem.itemId){
                                       
//                                       console.log('Audio--->>>> $$$$$ '+oldItem.title);
                                           
                                           newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                                           newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                                           newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                                           newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                                           
                                           newItem.localPathAudio = oldItem.localPathAudio;
                                           newItem.localPathVideo = oldItem.localPathVideo;
                                           newItem.localPathTranscript = oldItem.localPathTranscript;
                                           newItem.localPathPresentation = oldItem.localPathPresentation;
                                           
                                           newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                                                                                newItem.downloadedDateT = oldItem.downloadedDateT;
                                       }
                                 });
                }

                });




$.each(data.events, function(key, oldItem) {

if (oldItem.thumbLoc == '') {
                var eventsPath = sPath + "/images/";
                var eventschkpath = eventsPath + oldItem.itemId + "thumb.png";
                // console.log("check file path" + eventschkpath);
                checkFileExistsEve(eventschkpath, oldItem.itemId, 'thumb',
                                                oldItem.thumb, oldItem.type);
                // downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
} else {

                $.each(jsonData.events, function(key, newItem) {

                                if (oldItem.itemId == newItem.itemId) {

                                                newItem.thumbLoc = oldItem.thumbLoc;
                                                // console.log('thumbnail events
                                                // replaceeeeeeeeeeeeeeeeeeeeeee');
                                }
                });
}

if (oldItem.actualLoc == '') {

                var eventsPath = sPath + "/images/";
                var eventschkpath = eventsPath + oldItem.itemId + "actual.png";
                checkFileExistsEve(eventschkpath, oldItem.itemId, 'actual',
                                                oldItem.actual, oldItem.type);
} else {
                $.each(jsonData.events, function(key, newItem) {
                                if (oldItem.itemId == newItem.itemId) {
                                                newItem.actualLoc = oldItem.actualLoc;
                                }
                });
}
});

$.each(data.contributor, function(key, oldItem) {

if (oldItem.thumbLoc == '') {
                var eventsPath = sPath + "/images/";
                var eventschkpath = eventsPath + oldItem.itemId + "thumb.png";
                // /console.log("check file path" + eventschkpath);
                checkFileExistsEve(eventschkpath, oldItem.itemId, 'thumb',
                                                oldItem.thumb, oldItem.type);
                // downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
} else {

                $.each(jsonData.contributor, function(key, newItem) {

                                if (oldItem.itemId == newItem.itemId) {
                                                newItem.thumbLoc = oldItem.thumbLoc;
                                }
                });
}

if (oldItem.actualLoc == '') {
                var eventsPath = sPath + "/images/";
                var eventschkpath = eventsPath + oldItem.itemId + "actual.png";
                checkFileExistsEve(eventschkpath, oldItem.itemId, 'actual',
                                                oldItem.actual, oldItem.type);
} else {
                $.each(jsonData.contributor, function(key, newItem) {
                                if (oldItem.itemId == newItem.itemId) {
                                                newItem.actualLoc = oldItem.actualLoc;
                                }
                });
}
});
//alert( 'spotLightDownloaded'+jsonData.spotLightDownloaded.length);
//alert( 'spotLight'+jsonData.spotLight.length);

$.each(data.spotLight, function(key, oldItem) {
                
                if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' || oldItem.isDownloaded == 'true'){
                                                $.each(jsonData.spotLight, function(key, newItem) {
                                                
                                                                if(oldItem.itemId == newItem.itemId){

                                                                console.log('updating SpotLight JSON');
                                
                                                                newItem.isDownloaded = oldItem.isDownloaded;
                                                                newItem.localPath = oldItem.localPath;
                                                                newItem.downloadedDateD = oldItem.downloadedDateD;
                                                                
                                                                newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                
                newItem.localPathAudio = oldItem.localPathAudio;
                newItem.localPathVideo = oldItem.localPathVideo;
                newItem.localPathTranscript = oldItem.localPathTranscript;
                newItem.localPathPresentation = oldItem.localPathPresentation;
                
                newItem.downloadedDateA = oldItem.downloadedDateA;
                                                                newItem.downloadedDateV = oldItem.downloadedDateV;
                                                                newItem.downloadedDateP = oldItem.downloadedDateP;
                                                                newItem.downloadedDateT = oldItem.downloadedDateT;
                                                
                                                                console.log('SpotLight JSON updated');
                                                                }
                                                                
                                                
                                });
                }

                });


//this hs to be worked on

$.each(data.spotLightDownloaded, function(key, oldItem) {
                jsonData.spotLightDownloaded.push(oldItem);
                });


//Start:Akshay, formt change upgrade scenario

//Algorithm for integrating existing audios and video to technology sessions
//1.Declare TechnologySessions array.
//2.For each audio in JSON data, copy it to the technology session array which is downloaded
//3.For each video in JSON data, copy it to the technology session array which is downloaded
//4.Compare the corresponding element in JSONData technology sessions and update localPath


$.each(jsonData.audio, function (key, audioItem){
                if (downloadedFiles.indexOf("AA" + audioItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==audioItem.itemId){
                                                                techSessItem.audioIsDownloaded = audioItem.audioIsDownloaded;
                                                                techSessItem.isDownloadedAudio = audioItem.isDownloadedAudio;
                                                                techSessItem.localPathAudio = audioItem.localPathAudio;
                                                                techSessItem.downloadedDateA = audioItem.downloadedDateA;
                                                }
                                });
                }
                if (downloadedFiles.indexOf("AV" + audioItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==audioItem.itemId){
                                                                techSessItem.videoIsDownloaded = audioItem.videoIsDownloaded;
                                                                techSessItem.isDownloadedVideo = audioItem.isDownloadedVideo;
                                                                techSessItem.localPathVideo = audioItem.localPathVideo;
                                                                techSessItem.downloadedDateV = audioItem.downloadedDateV;
                                                }
                                });
                }
                if (downloadedFiles.indexOf("AP" + audioItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==audioItem.itemId){
                                                                techSessItem.presentationIsDownloaded = audioItem.presentationIsDownloaded;
                                                                techSessItem.isDownloadedPresentation = audioItem.isDownloadedPresentation;
                                                                techSessItem.localPathPresentation = audioItem.localPathPresentation;
                                                                techSessItem.downloadedDateP = audioItem.downloadedDateP;
                                                }
                                });
                }
                if (downloadedFiles.indexOf("AT" + audioItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==audioItem.itemId){
                                                                techSessItem.transcriptIsDownloaded = audioItem.transcriptIsDownloaded;
                                                                techSessItem.isDownloadedTranscript = audioItem.isDownloadedTranscript;
                                                                techSessItem.localPathTranscript = audioItem.localPathTranscript;
                                                                techSessItem.downloadedDateT = audioItem.downloadedDateT;
                                                }
                                });
                }
});

$.each(jsonData.video, function (key, videoItem){
                if (downloadedFiles.indexOf("VA" + videoItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==videoItem.itemId){
                                                                techSessItem.audioIsDownloaded = videoItem.audioIsDownloaded;
                                                                techSessItem.isDownloadedAudio = videoItem.isDownloadedAudio;
                                                                techSessItem.localPathAudio = videoItem.localPathAudio;
                                                                techSessItem.downloadedDateA = videoItem.downloadedDateA;
                                                }
                                });
                }
                if (downloadedFiles.indexOf("VV" + videoItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==videoItem.itemId){
                                                                techSessItem.videoIsDownloaded = videoItem.videoIsDownloaded;
                                                                techSessItem.isDownloadedVideo = videoItem.isDownloadedVideo;
                                                                techSessItem.localPathVideo = videoItem.localPathVideo;
                                                                techSessItem.downloadedDateV = videoItem.downloadedDateV;
                                                }
                                });
                }
                if (downloadedFiles.indexOf("VP" + videoItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==videoItem.itemId){
                                                                techSessItem.presentationIsDownloaded = videoItem.presentationIsDownloaded;
                                                                techSessItem.isDownloadedPresentation = videoItem.isDownloadedPresentation;
                                                                techSessItem.localPathPresentation = videoItem.localPathPresentation;
                                                                techSessItem.downloadedDateP = videoItem.downloadedDateP;
                                                }
                                });
                }
                if (downloadedFiles.indexOf("VT" + videoItem.itemId) != -1)
                {
                                $.each(jsonData.technologySessions, function (techSesskey, techSessItem){
                                                if(techSessItem.itemId==videoItem.itemId){
                                                                techSessItem.transcriptIsDownloaded = videoItem.transcriptIsDownloaded;
                                                                techSessItem.isDownloadedTranscript = videoItem.isDownloadedTranscript;
                                                                techSessItem.localPathTranscript = videoItem.localPathTranscript;
                                                                techSessItem.downloadedDateT = videoItem.downloadedDateT;
                                                }
                                });
                }
});
//End



getFileSystemRefForWriting(jsonData);


//postDownloadedItem();
}


var uniqueDownloaded = function(origArr) {

                var newArr = [], origLen = origArr.length, found, x, y;

                for (x = 0; x < origLen; x++) {
                                console.log('origArr[x]----'+JSON.stringify(origArr[x]));
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


