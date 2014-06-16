

function showprevnextTW(direction, indexItem)
{
	
    var itemIndex = indexItem;
    var itemId = '';
    
    $.each(jsonData.techWatch, function(index,element){
               if(index == indexItem)
               {
               itemId = element.twId;
               }
           });
    
    showTechWatchContent(itemId,itemIndex);

}


var nextItemIndex = '';
var previousItemIndex = '';
var currentItemIndex = '';
var currentItemId = '';


function showTechWatchContent(itemId, itemIndex) 
{
	
    var publicationsLength = jsonData.techWatch.length;
	 showNavigateDiv("navigateDiv");
	 
	 if(!isOnline && itemId == '' && itemIndex == '')
	    {
		 
		 //	jAlert('Please go online manually to view the content','Tech Time');
	        
		 	 
			 $.each(jsonData.techWatch, function(index, itemMain){
			 if(itemMain.type == 'current')
				{

				 	currentTechWatchItemId = itemMain.twId;
			        currentTechWatchItemIndex = index;
			        
			        window.localStorage.setItem("currentTechWatchItemId", currentTechWatchItemId);
			        window.localStorage.setItem("currentTechWatchItemIndex", currentTechWatchItemIndex);
				 
	        
	        itemId = currentTechWatchItemId;
	        itemIndex = currentTechWatchItemIndex;
				}
			 });

	    }
	 

    nextItemIndex = parseInt(itemIndex) + 1;
    previousItemIndex = parseInt(itemIndex) - 1;
    currentItemIndex = parseInt(itemIndex);
    currentItemId = parseInt(itemId);
    
    window.localStorage.setItem("currentItemId",currentItemId);
    window.localStorage.setItem("currentItemIndex",currentItemIndex);
    

    var headerHtml = '';
    
    headerHtml += "<div style='display:inline-block;border:none;width:100%'><br><label style='font-size:1.35em; margin-left: 4%;font-family:AgfaRotisSans;font-weight:bolder;'>Tech Watch</label>";
    headerHtml += "<div style='width:40%;float:right;border:none'>"; 
   //headerHtml += "<img id ='twPrev' src='images/btn_previous1.png' style='width:53%; border:none' onclick='showprevnextTW(\"previous\",\""+previousItemIndex+"\")'/>";
   // headerHtml += "<img id ='twNext' src='images/btn_next.png' style='width:35%; border:none;margin-left:3%' onclick='showprevnextTW(\"next\",\""+nextItemIndex+"\")'/>";
     
    headerHtml += "<img id ='twPrev' src='images/btn_previous1.png' width='70' onclick='showprevnextTW(\"previous\",\""+previousItemIndex+"\")'/>";
    headerHtml += "<img id ='twNext' src='images/btn_next.png' width='46' style='margin-left:3%' onclick='showprevnextTW(\"next\",\""+nextItemIndex+"\")'/>";
    
    
    headerHtml += "</div></div><br>";
    
    $('#techWatchHeader').html(headerHtml);
    
    if(nextItemIndex >= publicationsLength)
    {
        $('#twNext').css('visibility','hidden');
    } else if(nextItemIndex < publicationsLength)
    {
        $('#twNext').css('visibility','visible');
    }
    
    if(previousItemIndex < 0)
    {
        $('#twPrev').css('visibility','hidden');
    } else if(previousItemIndex >= 0)
    {
        $('#twPrev').css('visibility','visible');
    }
    
    
    headerHtml = '';    

    

	 
    var strTechWatchHtml = '';
    //console.log("JSONTECHWATCH " + JSON.stringify(jsonData.techWatch));
    $.each(jsonData.techWatch, function(index, itemMain){           
    	
    	var twId = itemMain.twId;
    	var type = itemMain.type;
    	
    	
    	if(index == itemIndex){
    		$('#techWatchPubDateLabel').text(' ' + itemMain.techWatchPublicationDate);

    	$.each(itemMain.itemSet, function(index, item){
    	
           var itemType = item.itemType;
           var itemTitle = item.itemTitle;
           
           
           if(itemType == 'normal')
           {
           strTechWatchHtml += "<div style='width:100%;'>";
           strTechWatchHtml += "<div style='width:100%;background:#555555;color:orange;font-weight:bolder;font-size:17px;padding-left:4%;padding-right:2%;padding-top:5px;padding-bottom:4px;'>"+itemTitle+"</div><br/>";
            //strTechWatchHtml += "<div style='width:100%;'><img style='width:100%;' src='"+imagePath+"'></img></div><br/>";
           $.each(item.itemArticleArray, function(index, itemArticle){
                  var articleUrl = itemArticle.articleUrl;
                  var articleDescription = itemArticle.articleDescription;
                  var articleTitle = itemArticle.articleTitle;
                  
                  strTechWatchHtml += "<div style='width:97%;padding-left:4%;padding-right:2%;' class = 'buttonClickEffect'><b><a onclick='readMoreDetails(\""+articleUrl+"\");' href='#' style='text-decoration:none;color:orange;font-size:16px;' class = 'buttonClickEffect'>"+articleTitle+"</a></b></div>";
                  strTechWatchHtml += "<div style='width:96%;padding-left:4%;margin-right:4%;display:inline-block;'>"+articleDescription+"<div align='right' style='float:right;text-align:right;width:auto;padding-left:1%;padding-right:4%;display:inline-block;' class = 'buttonClickEffect'><a onclick='readMoreDetails(\""+articleUrl+"\");' href='#' style='text-decoration:none;color:orange;font-size:14px;' ><b>Read more</b></a></div></div><br/><br></div>";


                  
                  });
           
           strTechWatchHtml += "</div><br/>";
           
           } else if(itemType == 'povs')
           {
          // var povUrl = itemArticle.articleUrl;
           strTechWatchHtml += "<br><hr align='center' width='96%' size=1px><br><div style='width:98%;background:#FF9900;border-radius:10px;margin:0 auto;'>";
           strTechWatchHtml += "<div style='color:white;font-weight:bold;font-size:17px;padding-left:3%;padding-top:10px;'>Interesting POVs</div>";
           $.each(item.itemArticleArray, function(index, itemArticle){
                  
                  var articleUrl = itemArticle.articleUrl;
                  var articleDescription = itemArticle.articleDescription;
                  var articleTitle = itemArticle.articleTitle;
                  
                  strTechWatchHtml += "<div style='color:white;font-weight:bolder;font-size:12px;padding-left:4%;padding-top:10px;' class = 'buttonClickEffect'><b><a style='text-decoration:none;color:white;' onclick='readMoreDetails(\""+articleUrl+"\");' href='#' class = 'buttonClickEffect'>"+articleTitle+"</a></b></div>";
                 // strTechWatchHtml += "<span style='color:white;font-weight:bold;font-size:12px;padding-left:3%;padding-top:5px;padding-bottom:3px;'><a style='text-decoration:none;color:white;font-weight:bolder;float:right' onclick='readMoreDetails(\""+articleUrl+"\");' href='#'><i>Read More</i></a></span></div>";
                  //strTechWatchHtml += "<div style='color:white;font-weight:bolder;font-size:12px;padding-left:3%;padding-top:10px;'><i>"+articleDescription+"</i></div><br/>";
                  strTechWatchHtml += "<div style='width:96%;color:white;font-weight:bolder;font-size:12px;padding-left:4%;padding-top:10px;'><i>"+articleDescription+"</i><div align='right' style='color:white;float:right;display:inline-block;text-align:right;font-weight:bold;font-size:12px;padding-left:3%;padding-right:4%;width:auto;' class = 'buttonClickEffect'><a  style='text-decoration:none;color:white;font-weight:bolder;' onclick='readMoreDetails(\""+articleUrl+"\");' href='#'>Read More</a></div></div><br/>";
                  
                  });
           
           strTechWatchHtml += "</div>";
           
           }else if(itemType == 'quotes')
           {
               strTechWatchHtml += "<br><hr align='center' width='96%' size=1px><div style='width:98%;'>";
               strTechWatchHtml += "<div style='width:98%;color:orange;font-weight:bold;font-size:17px;padding-left:3%'>"+itemTitle+"</div><br/>";
              $.each(item.itemArticleArray, function(index, itemArticle){
                     
                     strTechWatchHtml += "<div style='width:96%;background:white;border-radius:10px;margin:0 2px 0 11px;border:1px solid gray;'>";
                     strTechWatchHtml += "<div style='font-size:12px;padding-left:3%;padding-right:5%;padding-top:8px;'><i>"+itemArticle.articleTitle+"</i></div>";
                     strTechWatchHtml += "<div style='font-weight:bold;font-size:14px;padding-left:3%;padding-right:5%;padding-top:8px;'><i>"+itemArticle.articleUrl+"</i></div>";
                     strTechWatchHtml += "<div style='font-size:12px;padding-left:3%;padding-top:8px;padding-bottom:5px;'><i>"+itemArticle.articleDescription+"</i></div>";
                     strTechWatchHtml += "</div><br/>";
                     
                     });
              
               strTechWatchHtml += "</div>";
              }

        
           
           });
    	}
    	
    });
    

    $('#techWatchContentArea').html(strTechWatchHtml);
    
}
