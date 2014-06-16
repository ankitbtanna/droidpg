//----------------------------------- Global Variable used -----------------------------------------------------------------

var noSubscribe = "false";
var subscribeCatList = '';

var jsonData = new Object();
var mainCategoryList = new Array(); // used

var audioListItem = new Array(); // not used
var videoListItem = new Array(); // not used

var eventListItem = new Array();
var documentListItem = new Array();

var contributorListItem = new Array();
var downloadListItemLinks = new Array();

// ----------------------------------- FOR COPY THE CATEGOEY ID IN ARRAY
// -----------------------------------------------------------------

var audioVideoItemId = new Array();
var eventItemId = new Array();
var documentItemId = new Array();

var taggedId = new Array();
// ----------------------------------- Subscription Variable
// -----------------------------------------------------------------

var subscribeCategoryId = new Array(); // LIST OF CATEGORIED REGISTERED
var isSubscribeDocument = "no"; // Document are Subscribe or not ??
var isSubscribePodcast = "no"; // Podcast are Subscribe or not ??
var isSubscribeEvent = "no"; 


// ----------------------------------- RSS LINKS
// --------------------------------------------------------------------------------

var subscribeRss = "https://techtime.accenture.com/techtimemobile/subscribe-service/uid=";
var technologyAreaListUrl = "https://techtime.accenture.com/techtimemobile/subscribe-service/all";

var rssUrl = "https://techtime.accenture.com/techno-areas/0/audio-video-listing-view";
var documentRss = "https://techtime.accenture.com/techno-areas/0/documents-listing-view";
var eventsRss = "https://techtime.accenture.com/techno-areas/0/events-listing-view";

var contributorRss = "https://techtime.accenture.com/mobile-contributor-listing.xml";
var spotlightRss = "https://techtime.accenture.com/mobile-spotlight-feeds.xml";
//spotlightRss = "http://10.0.2.2:8080/spotlight/spotlight.xml";
var aboutTechTimeRss = "https://techtime.accenture.com/mobile-about-us/aboutus.xml";
var faqRss = "https://techtime.accenture.com/mobile-faq-rss/faq.xml";

var techWatchRss = "https://techtime.accenture.com/mobile-tech-watch";

//var playlistsRSS =  "http://10.0.2.2:8080/spotlight/playlists.xml" 

	
	var playlistsRSS = "https://techtime.accenture.com/playlists.xml";

//var techWatchRss = "https://techtime.accenture.com/techwatch_date2.xml";
 //var techWatchQuotesRss = "https://techtime.accenture.com/mobile-quotes-rss";
//var techWatchQuotesRss = "http://10.0.2.2:8080/techWatch/techwatchQuotes.xml";

// ------------------------- Create JSON Structure -------------------------------

var selectedCategoryId = '';
var selectedCategoryName = '';
	
var resFinal = new Array();

var formatTypeArr = new Array();

// ----------------------------------- Create JSON Structure
// --------------------------------------------------------------------------------

function createJsonFormat() {
	//alert("create JSON format");
	jsonData.category = new Array();
	jsonData.audio = new Array();
	jsonData.video = new Array();
	jsonData.events = new Array();
	jsonData.panelDiscussions = new Array();
	jsonData.interviews = new Array();
	jsonData.documents = new Array();
	jsonData.techConf = new Array();
	jsonData.techWatch = new Array();
	
	jsonData.spotLight = new Array();
	jsonData.spotLightDownloaded = new Array();

	
	jsonData.contributor = new Array();
	jsonData.aboutTechTime = new Array();
	jsonData.faq = new Array();
	jsonData.loggedUserName = '';
	jsonData.pendingDownloads = new Array();
	
	jsonData.techWatch = new Array();
    jsonData.techWatchQuotes = new Array();
    
    jsonData.listOfFiles = new Array();
    jsonData.playlists = new Array();
  //Start:Added by Akshay for format change feature on 5/27/2014
	jsonData.technologySessions = new Array();
	//End
}



function createJsonPodtype(podtype)
{
	
	jsonData[podtype] = new Array();
	

}


// ----------------------------------- Get Subscribe Technology Areas List with
// Type -------------------------

function getSubscribeRss() {
	
	var uName = document.getElementById("lblUserName").innerHTML;
	
	uName = uName.replace(/\./g, '_');
	
	window.localStorage.setItem("userName", uName);
	jsonData.loggedUserName = uName;


	
	

	subscribeRss = "https://techtime.accenture.com/techtimemobile/subscribe-service/uid=";
	subscribeRss = subscribeRss + uName;
	
	
	

	$.ajax({
				type : "GET",
				url : subscribeRss,
				dataType : "xml",
				success : subscribeTA,
				error : function(xhr, textStatus, errorThrown) {
					// alert('error');
					console
							.log('*******************************************************')
					console.log('In getSubscribeRss Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************')
				}
			});
}

function subscribeTA(xml) {
	loadAboutTechTimeRss();
	var flag = 0;
  //newAppVersion = $(xml).find('item').attr('availableAppVersion');
	
	$(xml)
			.find('item')
			.each(
					function() { // FIND PARENT CATEGORY

						var scategoryid = $(this).find('categoryid').text();
						var asset_type = $(this).find('asset_type').text();
						var scategoryname = $(this).find('categoryname').text();

						if ((scategoryid != "") && (flag == "1")) {
							subscribeCategoryId.push(scategoryid);

							if (subscribeCatList == '') {
								subscribeCatList = scategoryid;
							} else {
								subscribeCatList = subscribeCatList + '+'
										+ scategoryid;
							}
						}
						if (($(this).find('asset_type').text())
								&& (asset_type == "documents")) {
							isSubscribeDocument = "yes";
						}
						if (($(this).find('asset_type').text())
								&& (asset_type == "podcast")) {
							isSubscribePodcast = "yes";
						}
						
						if (($(this).find('asset_type').text())
								&& (asset_type == "events")) {
								isSubscribeEvent = "yes";
								}


						flag = 1;
					});

	if (subscribeCatList == "") {
		subscribeCatList = '0';
	} else {
		rssUrl = "https://techtime.accenture.com/techno-areas/"
				+ subscribeCatList + "/audio-video-listing-view";
		console.log("Saikat Services -- " + rssUrl);
		
		eventsRss = "https://techtime.accenture.com/techno-areas/"
				+ subscribeCatList + "/events-listing-view";
		documentRss = "https://techtime.accenture.com/techno-areas/"
				+ subscribeCatList + "/documents-listing-view";

		
		
		 console.log('rssUrl-->'+rssUrl+'\n eventsRss'+eventsRss+'\n documentRss'+documentRss);
		 
		// rssUrl = "<item>		<title>TGP SAP Mobility</title>		<description><![CDATA[TGP SAP Mobility by Jordi Paris]]></description>		<author_count>1</author_count>		<author>Jordi Paris</author>		<category><![CDATA[SAP-1|Mobility-3]]></category>		<pods_date>January 28, 2013</pods_date>				<audio length=3360216 type=audio/mpeg>https://techtime.accenture.com/sites/default/files/mobile_audio/TGP_SAP_Mobility_V1_0.mp3</audio>				<video length=21340040 type=video/mp4>https://techtime.accenture.com/sites/default/files/mobile_videos/TGP_SAP_Mobility_V1.0.mp4</video>		<transcript  ></transcript>	<presentation ></presentation>		<qna><![CDATA[]]></qna>	<actual length=38697 type=image/png>https://techtime.accenture.com/sites/default/files/mobile_podcast_large/TGP_SAP_Mobility_mobile_large.png</actual><thumb length=16939 type=image/png>https://techtime.accenture.com/sites/default/files/mobile_podcast_thumb/TGP_SAP_Mobility_mobile_small.png</thumb><contentid>964</contentid><content_type>podcast</content_type><pubDate>March 1, 2013 - 12:09 am</pubDate><pods_formattype>Audios</pods_formattype><Content_lang>en</Content_lang><Content_rating>0</Content_rating></item>"
	}
//	checkForApplicationUpgradeAvailability();

	loadtechnologyAreaListUrl(); // SAGAR
}

// ----------------------------------- Load Main category RSS and Create list of
// Main- Sub category List -------------------------

function loadtechnologyAreaListUrl() {

	$
			.ajax({
				type : "GET",
				url : technologyAreaListUrl,
				dataType : "xml",
				success : displayTAList,
				error : function(xhr, textStatus, errorThrown) {
					// alert('error');
					console
							.log('*******************************************************')
					console.log(' loadtechnologyAreaListUrl In Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************')
				}
			});
}




function displayTAList(xml) {

	$(xml).find('item').each(function() { // FIND PARENT CATEGORY

		if ($(this).find('parentcategoryid').text() == '0') {

			var flagId = "false";
			var id = $(this).find('categoryid').text();

			$.each(subscribeCategoryId, function(index, catid) { // Check for
																	// the
																	// subscription

				if (catid == id) {
					flagId = "true";
					noSubscribe = "true";
				}
			});

			if (flagId == "true") {

				var mainCat = new Object();
				mainCat.categoryid = $(this).find('categoryid').text();
				mainCat.categoryname = $(this).find('categoryname').text();
				mainCat.subCategoryCount = '';
				mainCat.subCategory = '';
				mainCat.subscribe = 'yes';
				mainCat.subscribeDocuments = isSubscribeDocument;
				mainCat.subbscribePodcast = isSubscribePodcast;
				mainCat.subbscribeEvent = isSubscribeEvent;


				mainCategoryList.push(mainCat);
			} else {

				var mainCat = new Object();
				mainCat.categoryid = $(this).find('categoryid').text();
				mainCat.categoryname = $(this).find('categoryname').text();
				mainCat.subCategoryCount = '';
				mainCat.subCategory = '';
				mainCat.subscribe = 'no';
				mainCat.subscribeDocuments = 'no';
				mainCat.subbscribePodcast = 'no';
				mainCat.subbscribeEvent = 'no';


				mainCategoryList.push(mainCat);
			}
		} // IF
	
	});
	//console.log('mainCategoryList---->'+JSON.stringify(mainCategoryList));

	$
			.each(
					mainCategoryList,
					function(index, item) { // FIND SUB-CATEGORY FOR PARENT
											// CATEGORY

						var subCategoryList = new Array();

						var subCat = new Object(); // PUSHING PARENT ELEMENT AS
													// SUB CATEGORY ONLY
						subCat.categoryid = item.categoryid;
						subCat.parentcategoryid = item.categoryid;
						subCat.subCategoryName = item.categoryname;
						subCat.audio = new Array();
						subCat.video = new Array();
						subCat.interviews = new Array();
						subCat.panelDiscussions = new Array();
						subCat.technologySessions = new Array();
						subCat.document = new Array();
						subCat.event = new Array();
						subCat.techConf = new Array();
						subCat.contributor = new Array();
						//subCat.spotlight = new Array();

						subCategoryList.push(subCat);

						$(xml).find('item').each(
										function() { // FIND ANOTHER SUB
														// CATEGORY AND PUSH IT
														// TO ARRAY AS A
														// SUB-CATEGORY

											if ($(this).find('parentcategoryid').text() == item.categoryid) {
												var subCat = new Object();
												subCat.categoryid = $(this).find('categoryid').text();
												subCat.parentcategoryid = $(this).find('parentcategoryid').text();
												subCat.subCategoryName = $(this).find('categoryname').text();

												subCat.audio = new Array();
												subCat.video = new Array();
												subCat.interviews = new Array();
												subCat.panelDiscussions = new Array();
												subCat.document = new Array();
												subCat.event = new Array();
												subCat.techConf = new Array();
												subCat.contributor = new Array();
												//subCat.spotlight = new Array();
												subCat.technologySessions = new Array();

												subCategoryList.push(subCat);
											}
										});

						item.subCategory = subCategoryList;
						item.subCategoryCount = subCategoryList.length;
					});
	
	//console.log('mainCategoryList + subCategory---->'+JSON.stringify(mainCategoryList));

	$.each(mainCategoryList, function(index, item) {

		jsonData.category.push(item);
	});

	//console.log('JSON CATEGORY---->'+JSON.stringify(jsonData.category));
	
	loadAudioVideoURL(); // SAGAR

}

// ---------------------------------------- find Audio and Video List and isnert
// them into array ---------------------------------------------

function loadAudioVideoURL() {

	$
			.ajax({
				type : "GET",
				url : rssUrl,
				dataType : "xml",
				success : getAudioVideoItem,
				error : function(xhr, textStatus, errorThrown) {
					console.log('*******************************************************')
					console.log('In loadAudioVideoURL Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console.log('*******************************************************')
				}
			});
}

function getAudioVideoItem(xml) {
//alert('getAudioVideoItem');

	$(xml).find('item').each(function() {

		try {
			var audioLength = '';
			var videoLength = '';
			var presentationLength = '';
			var transcriptLength = '';

			var scategory = $(this).find('category').text();

			var sguid = $(this).find('contentid').text();
			var sTitle = $(this).find('title').text();
			sTitle = sTitle.replace(/'/g,'');

		//	sTitle= sTitle.replace(/[^A-Za-z\:\,\s]/g, "");
			//console.log('AAAA_--'+sTitle);
			
			var sFormat = $(this).find('pods_formattype').text();
			formatTypeArr.push(sFormat);			
			formatTypeArr = $.unique(formatTypeArr);
			
			var lang  = $(this).find('Content_lang').text();
			//console.log('Language--------------------'+lang);
			var sauthor = $(this).find('author').text().replace(/\|/g, ',');
			var spubDate = $(this).find('pods_date').text();
			var sdescription = $(this).find('description').text();
			var sqna = $(this).find('qna').text();

			var imgThumb = $(this).find('thumb').text();
			var imgActual = $(this).find('actual').text();

			var audioUrl = $(this).find('audio').text();
			var videoUrl = $(this).find('video').text();
			var transcriptUrl = $(this).find('transcript').text();
			var presentationUrl = $(this).find('presentation').text();

			$(this).find('audio').each(function() {
				audioLength = $(this).attr('length');
			});

			$(this).find('video').each(function() {
				videoLength = $(this).attr('length');
			});

			$(this).find('transcript').each(function() {
				transcriptLength = $(this).attr('length');
			});

			$(this).find('presentation').each(function() {
				presentationLength = $(this).attr('length');
			});

			var authorArray = new Array();
			var authorTextArray = sauthor.split(",");

			for (i = 0; i < authorTextArray.length; i++) {
				authorArray.push(authorTextArray[i]);
			}

			if (jQuery.inArray(sguid, audioVideoItemId) == -1) {
				audioVideoItemId.push(sguid);
				//console.log('inserted :'+sguid);

				var tempMedia = new Object();

				tempMedia.itemId = sguid;
				tempMedia.title = sTitle;
				
				
				tempMedia.category = scategory;

				//tempMedia.type = sFormat;
				
                //Start:Akshay, format change
                if((sFormat =="Audios") || (sFormat == "Videos"))
                {
                       sFormat = "Technology Sessions";
                }
                tempMedia.type = sFormat;
     //tempMedia.type = ((sFormat == "Audios") || (sFormat == "Videos"))?"Technology Sessions":sFormat;
                //End

				

				tempMedia.author = authorArray;
				tempMedia.publishedDate = spubDate;
				tempMedia.description = sdescription;
				tempMedia.qna = sqna;

				tempMedia.thumb = imgThumb;
				tempMedia.actual = imgActual;

				tempMedia.audioUrl = audioUrl;
				tempMedia.audioLength = audioLength;
				tempMedia.audioIsDownloaded = "false";

				tempMedia.isDownloadedAudio = 'false';
				tempMedia.localPathAudio = '';
				tempMedia.downloadedDateA = '';

				tempMedia.videoUrl = videoUrl;
				tempMedia.videoLength = videoLength;
				tempMedia.videoIsDownloaded = "false";

				tempMedia.isDownloadedVideo = 'false';
				tempMedia.localPathVideo = '';
				tempMedia.downloadedDateV = '';

				tempMedia.transcriptUrl = transcriptUrl;
				tempMedia.transcriptLength = transcriptLength;
				tempMedia.transcriptIsDownloaded = "false";

				tempMedia.isDownloadedTranscript = 'false';
				tempMedia.localPathTranscript = '';
				tempMedia.downloadedDateT = '';

				tempMedia.presentationUrl = presentationUrl;
				tempMedia.presentationLength = presentationLength;
				tempMedia.presentationIsDownloaded = "false";

				tempMedia.isDownloadedPresentation = 'false';
				tempMedia.localPathPresentation = '';				
				tempMedia.downloadedDateP = '';

				tempMedia.thumbLoc = "";
				tempMedia.actualLoc = "";

				tempMedia.selLanguage = lang;
				
				
					//console.log('FORMAt-------------------'+lang);
				if (sFormat == "Audios") {

					jsonData.audio.push(tempMedia);

				} else if (sFormat == "Videos") {

					jsonData.video.push(tempMedia);

				} else if (sFormat == "Panel Discussions") {

					jsonData.panelDiscussions.push(tempMedia);

				} else if (sFormat == "Interviews") { // Interviews

					jsonData.interviews.push(tempMedia);
				} else if( sFormat == "Technology Conferences")
				
				{
					jsonData.techConf.push(tempMedia);
					
				}
				else if(sFormat == "Technology Sessions") {
					jsonData.technologySessions.push(tempMedia);
				}
				

				var str = JSON.stringify(scategory);

				//console.log('str---json :'+str);
				str = str.substring(1, str.length-1);

			
					//console.log('after substr--- :'+str);
				

				var beg, end, temp;
				var len = str.length;

				beg = 0;

				while (len != 0 && end != 0 && str != "") {
					
					
					str = str.substring(0, str.length);
					//console.log('str.substring(0, str.length-1)---'+str);

					var n=str.split("|");  
                   //console.log("n.length--->>"+n.length);


					end = str.indexOf("-") + 1;
					beg = str.indexOf("|");
					len = str.length;

					temp = str.substring(0, end - 1); 

					
					

					// ---------------------------------------------FOR EACH
					// CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>
					// ---------------------------------------------

				//	console.log('jsonData.category----'+JSON.stringify(jsonData.category));

					$.each(jsonData.category, function(index, item) {

						$.each(item.subCategory, function(index, item) {
							
							 for(var i = 0; i < n.length;i++)
							 	{
								
								// console.log("Sub Category Substring--> : "+temp+"=== n[i]"+n[i]);
								 
								 var tempSubName = n[i].substring(0, n[i].lastIndexOf("-"));
								 
								 var tempSubId = n[i].substring(n[i].indexOf("-")+1,n[i].length);
										//console.log("item.categoryid<====>tempSubId : : "+item.categoryid +"<====>"+tempSubId );
								// console.log("Sub Category name + ID--> : "+tempSubName+"-"+tempSubId);		

								 var completeId = tempSubName+"-"+tempSubId;
								 var completeIdFromRss = item.subCategoryName+"-"+item.categoryid;
								
								 
								 
									//if (tempSubId == item.categoryid && item.subCategoryName == temp) {
								 if (tempSubId == item.categoryid && item.subCategoryName == temp) {
								// if(completeId == completeIdFromRss){
									 
									// console.log(completeId+ " == "+completeIdFromRss);	
									 
										if (sFormat == "Audios") {
											item.audio.push(sguid); 
											
											
											//alert('id  ->'+sguid+'\n  category matched -->'+temp+'\n Audios -->');
											
											
										} 
										else if (sFormat == "Videos") {
											item.video.push(sguid); // alert('id
																	// ->'+sguid+'\n
																	// category matched
																	// -->'+temp+'\n
																	// Videos -->');
										} 
										else if (sFormat == "Panel Discussions") {
											item.panelDiscussions.push(sguid); // alert('id
																				// ->'+sguid+'\n
																				// category
																				// matched
																				// -->'+temp+'\n
																				// Panel
																				// Discussions
																				// -->');
										}
										else if (sFormat == "Technology Conferences")
											{
												item.techConf.push(sguid);
											}
										else if(sFormat == "Technology Sessions") {
											item.technologySessions.push(sguid);
										}
										
										else {
											item.interviews.push(sguid); // alert('interviews
																			// id
																			// ->'+sguid+'\n
																			// category
																			// matched
																			// -->'+temp+'\n
																			// interviews
																			// -->');
										}
										
								}
							}
								
								
						});
					});

					
					
					// ---------------------------------------------FOR EACH
					// CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>
					// ---------------------------------------------

					if (beg == -1) {
						len = 0;
					}

					if (end == 0) {
						len = 0;
					}

					temp = str.substring(beg + 1, str.length);
					str = temp;
					//alert(' CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   :'+temp);

				}// while
				


			} else {
				// console.log('Duplicate item inserted :'+sguid+' : '+sFormat);
			}

			

			
		} catch (error) {
			var txt = " getAudioVideoItem - There was an error on this page.\n\n";
			txt += "Error description: " + error.message + "\n\n";
			txt += "Click OK to continue.\n\n";
			console.log(txt);
		}
	});

	
	
	loadEventsRss(); 
	loadPlaylistsData();

	
}

// ------------------------------------------------------- LOAD Events RSS FROM
// RSS URL ------------------------------------------------

function loadEventsRss() {

	$
			.ajax({
				type : "GET",
				url : eventsRss,
				dataType : "xml",
				success : getEventItem,
				error : function(xhr, textStatus, errorThrown) {
					console
							.log('*******************************************************');
					console.log('In loadEventsRss Failure' + JSON.stringify(xhr));
					console.log('Event error \n' + textStatus);
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************');
				}
			});
}

function getEventItem(xml) {
	var monthArr = [ "January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December" ];

	$(xml).find('item').each(function() {

		try {

			var thumbLength, actualLength;

			var scategory = $(this).find('category').text();
			var sicsfile = $(this).find('icsfile').text();

			var sguid = $(this).find('contentid').text();
			var sTitle = $(this).find('title').text();
			sTitle = sTitle.replace(/'/g,'');

			var sFormat = $(this).find('content_type').text(); // events
			//createTAJson(sFormat);
			formatTypeArr.push(sFormat);			
			formatTypeArr = $.unique(formatTypeArr);			
			//console.log(formatTypeArr);
			
			var etime = $(this).find('etime').text();
			// alert('etime :'+etime);

			var sauthor_count = $(this).find('author_count').text();
			var sauthor = $(this).find('author').text().replace(/\|/g, ',');
			var sdescription = $(this).find('description').text();

			var sdate = $(this).find('event_sdate').text();
			var sstart_date = $(this).find('start_date').text();
			var send_date = $(this).find('end_date').text();

			var sThumb = $(this).find('thumb').text();
			var sActual = $(this).find('actual').text();

			//console.log('sThumb----'+sThumb);
			// var dateString = sstart_date; 
			// dateString = dateString.substr(0,10);
			//                         
			// var monthName = parseInt(dateString.substr(5,2)-1);
			// dateString = monthArr[monthName] +" "+ dateString.substr(8,2) +",
			// " + dateString.substr(0,4);

			$(this).find('thumb').each(function() {
				thumbLength = $(this).attr('length');
			});

			$(this).find('actual').each(function() {
				actualLength = $(this).attr('length');
			});

			// if ($.inArray(eventItemId, sguid) == -1) {
			// eventItemId.push(sguid);
			// }

			var authorArray = new Array();
			var authorTextArray = sauthor.split(",");

			for (i = 0; i < authorTextArray.length; i++) {
				authorArray.push(authorTextArray[i]);
			}

			if (jQuery.inArray(sguid, eventItemId) == -1) {

				eventItemId.push(sguid); // console.log('inserted :'+sguid);

				var tempMedia = new Object();

				tempMedia.itemId = sguid;
				tempMedia.title = sTitle;
				tempMedia.type = sFormat;
				tempMedia.etime = etime;

				tempMedia.icsfile = sicsfile;
				tempMedia.category = scategory;

				tempMedia.publishedDate = sdate;
				tempMedia.startDate = sstart_date;
				tempMedia.endDate = send_date;

				tempMedia.author = authorArray;
				tempMedia.authorCount = sauthor_count;
				tempMedia.description = sdescription;

				tempMedia.thumb = sThumb;
				tempMedia.thumbLength = thumbLength;

				tempMedia.actual = sActual;
				tempMedia.actualLength = actualLength;

				tempMedia.thumbLoc = "";
				tempMedia.actualLoc = "";

				jsonData.events.push(tempMedia);

				var str = JSON.stringify(scategory);

				str = str.substring(1, str.length-1);
			//	console.log('EVNTS str	---'+str);


				var beg, end, temp;
				var len = str.length;

				beg = 0;

				while (len !== 0 && end != 0 && str != "") {
					var n=str.split("|");  
					
					
					end = str.indexOf("-") + 1;
					beg = str.indexOf("|");
					len = str.length;
					
				
					
					temp = str.substring(0, end - 1);

						//console.log('EVNTS temp---'+temp);
					// ---------------------------------------------FOR EACH
					// CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>
					// ---------------------------------------------

					$.each(jsonData.category, function(index, item) {

						$.each(item.subCategory, function(index, item) {
							 for(var i = 0; i < n.length;i++)
							 	{

								 	var tempSubName = n[i].substring(0, n[i].lastIndexOf("-"));
								 
								 var tempSubId = n[i].substring(n[i].indexOf("-")+1,n[i].length);

						//	if (item.subCategoryName == temp) {

									if (tempSubId == item.categoryid && item.subCategoryName == temp) {

								item.event.push(sguid); // alert('id
														// ->'+sguid+'\n
														// category matched
														// -->'+temp+'\n data
														// -->'+JSON.stringify(tempMedia));
							}
							 	}
						});
					});

					// ---------------------------------------------FOR EACH
					// CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>
					// ---------------------------------------------

					if (beg == -1) {
						len = 0;
					}

					if (end == 0) {
						len = 0;
					}

					temp = str.substring(beg + 1, str.length);
					str = temp;
					
					//console.log('temp=='+temp);
				}// while

			} else {
				// console.log('Duplicate item inserted :'+sguid+' : '+sFormat);
			}

			
			//console.log('EVENTS : '+JSON.stringify(formatTypeArr));
		} catch (error) {
			var txt = "loadEventsRss - There was an error on this page.\n\n";
			txt += "Error description: " + error.message + "\n\n";
			txt += "Click OK to continue.\n\n";
			console.log(txt);
		}
	});

	//getFileSystemRefForWriting(jsonData);

	loadDocumentRss();
	//loadPlaylistsData();
	// console.log('eventItemId-->\n\n'+eventItemId)
	// alert('jsonData.events -->'+jsonData.events.length);
	// alert('jsonData.Data -->'+JSON.stringify(jsonData.events));
	// alert('Events Complete .');
	// alert('eventItemId -->>>'+eventItemId);
	// alert('eventd length-->>>'+jsonData.event.length);
	// alert('Documents Data ----->'+JSON.stringify(jsonData.documents));
	// console.log('Documents Data ----->'+JSON.stringify(jsonData.category));
	// alert('Vikram Audio Elements: '+JSON.stringify(jsonData.audio));
	// alert('Vikram Video Elements: '+JSON.stringify(jsonData.video));

}

// --------------------------------------------- LOAD Document RSS FROM RSS URL
// -------------------------------------------------

function loadDocumentRss() {
	$
			.ajax({
				type : "GET",
				url : documentRss,
				dataType : "xml",
				success : getDocumentItem,
				error : function(xhr, textStatus, errorThrown) {
					// alert('error');
					console
							.log('*******************************************************')
					console.log('In loadDocumentRss Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************')
				}
			});
}

function getDocumentItem(xml) {

	$(xml).find('item').each(function() {

		try {

			var thumbLength, actualLength, spdfLength;

			var scategory = $(this).find('category').text();

			var sguid = $(this).find('contentid').text();
			var sTitle = $(this).find('title').text();
			sTitle = sTitle.replace(/'/g,'');

			
			var sdescription = $(this).find('description').text();

			var sFormat = $(this).find('content_type').text(); // documents
			formatTypeArr.push(sFormat);			
			formatTypeArr = $.unique(formatTypeArr);	
			var lang  = $(this).find('Content_lang').text();

			//console.log(formatTypeArr);
			
			var sauthor = $(this).find('author').text().replace(/\|/g, ',');

			var sstart_date = $(this).find('document_date').text();

			var sThumb = $(this).find('thumb').text();
			var sActual = $(this).find('actual').text();

			var spdf = $(this).find('document_pdf').text();

			$(this).find('thumb').each(function() {
				spdfLength = $(this).attr('length');
			});

			$(this).find('thumb').each(function() {
				thumbLength = $(this).attr('length');
			});

			$(this).find('actual').each(function() {
				actualLength = $(this).attr('length');
			});

			// if ($.inArray(documentItemId, sguid) == -1) {
			// documentItemId.push(sguid);
			// //alert('New event inserted-->'+sguid);
			// }

			if (jQuery.inArray(sguid, documentItemId) == -1) {

				documentItemId.push(sguid); // console.log('inserted :'+sguid);

				var authorArray = new Array();
				var authorTextArray = sauthor.split(",");

				for (i = 0; i < authorTextArray.length; i++) {
					// alert("FULL CATEG "+authorTextArray[i]);
					authorArray.push(authorTextArray[i]);
				}

				var tempMedia = new Object();

				tempMedia.itemId = sguid;
				tempMedia.title = sTitle;
				tempMedia.description = sdescription;

				tempMedia.publishedDate = sstart_date;

				tempMedia.type = sFormat;
				tempMedia.author = authorArray;
				tempMedia.category = scategory;

				tempMedia.thumb = sThumb;
				tempMedia.thumbLength = thumbLength;

				tempMedia.actual = sActual;
				tempMedia.actualLength = actualLength;

				tempMedia.thumbLoc = "";
				tempMedia.actualLoc = "";

				tempMedia.pdf = spdf;
				tempMedia.spdfLength = spdfLength;

				tempMedia.isDownloaded = 'false';
				tempMedia.localPath = '';
				tempMedia.downloadedDateD = '';
				
				tempMedia.selLanguage = lang;


				jsonData.documents.push(tempMedia);
		//	console.log("testObj====================================================="+JSON.stringify(jsonData.audio));

				var str = JSON.stringify(scategory);

				str = str.substring(1, str.length-1);

				var beg, end, temp;
				var len = str.length;

				beg = 0;

				while (len !== 0 && end != 0 && str != "") {
					var n=str.split("|");  
					
					
					end = str.indexOf("-") + 1;
					beg = str.indexOf("|");
					len = str.length;

					temp = str.substring(0, end - 1);

					// ---------------------------------------------FOR EACH
					// CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>
					// ---------------------------------------------

					$.each(jsonData.category, function(index, item) {

						$.each(item.subCategory, function(index, item) {
							
							 for(var i = 0; i < n.length;i++)
							 	{

								 var tempSubName = n[i].substring(0, n[i].lastIndexOf("-"));
								 
								 var tempSubId = n[i].substring(n[i].indexOf("-")+1,n[i].length);

							//if (item.subCategoryName == temp) {
							if (tempSubId == item.categoryid && item.subCategoryName == temp) {

								item.document.push(sguid); // alert('id
															// ->'+sguid+'\n
															// category matched
															// -->'+temp+'\n
															// data
															// -->'+JSON.stringify(tempMedia));
								}
							 }
						});
					});
					// ---------------------------------------------FOR EACH
					// CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>
					// ---------------------------------------------

					if (beg == -1) {
						len = 0;
					}
					if (end == 0) {
						len = 0;
					}

					temp = str.substring(beg + 1, str.length);
					str = temp;

				}// while

			} else {
				// console.log('Duplicate item inserted :'+sguid+' : '+sFormat);
			}
			
			
		//	console.log('DOCUMENTS : '+JSON.stringify(formatTypeArr));

		} catch (error) {
			var txt = "getDocumentItem-There was an error on this page.\n\n";
			txt += "Error description: " + error.message + "\n\n";
			txt += "Click OK to continue.\n\n";
			console.log(txt);
		}
	});

	loadContributorRss(); 
	isDataLoaded = true;
                            if(isAppUpgradeAvailable == false)
                             {
                                $.mobile.changePage("#businessCategory");
                             } else if(isAppUpgradeAvailable == true && setCancelAction == true)
                             {
                                $.mobile.changePage("#businessCategory");
                             }
	//$.mobile.changePage("#businessCategory");
	//syncLoaderStart();
	//startSync();
	$("#imgRefreshProgress").hide();
	
	//if (isOnline) {
	//	alert('get doc'+JSON.stringify(jsonData));
	//	getFileSystemRefForWriting(jsonData);

		//getFileSystemRefForReading(false, jsonData);
	//}

}

// --------------------------------------------- LOAD Contributor RSS FROM RSS
// URL -------------------------------------------------

function loadContributorRss() {

	$
			.ajax({
				type : "GET",
				url : contributorRss,
				dataType : "xml",
				success : loadContributorData,
				error : function(xhr, textStatus, errorThrown) {
					// alert('error');
					console
							.log('*******************************************************');
					console.log('In loadContributorRss Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************');
				}
			});

	loadSpotlightUrl();
	loadTechWatchUrl();
	loadFaqRss();
	
}

function loadContributorData(xml) {
	$(xml).find('item').each(function() {

		try {
			var sTitle = $(this).find('title').text();
			var sguid = $(this).find('guid').text();

			var scategory = $(this).find('category').text();
			var sdescription = $(this).find('description').text();

			var sContributor = $(this).find('contributor').text();

			var sThumb = $(this).find('thumb').text();
			var sActual = $(this).find('actual').text();

			var sDate = $(this).find('date').text();
			var n = sDate.lastIndexOf("-");
			sDate = sDate.substring(0, n - 1);
			
			var sEmail = $(this).find('email').text();


			var itemContributor = new Object();
			itemContributor.itemId = sguid;
			itemContributor.title = sTitle;
			itemContributor.category = scategory;
			itemContributor.description = sdescription;
			itemContributor.contributor = sContributor;
			itemContributor.date = sDate;
			itemContributor.type = "contributor";
			itemContributor.email = sEmail;


			itemContributor.thumb = sThumb;
			itemContributor.actual = sActual;
			
		

			itemContributor.thumbLoc = "";
			itemContributor.actualLoc = "";

			jsonData.contributor.push(itemContributor);
		} catch (error) {
			var txt = "loadContributorData-There was an error on this page.\n\n";
			txt += "Error description: " + error.message + "\n\n";
			txt += "Click OK to continue.\n\n";
			console.log(txt);

		}
	});
	
	//alert("loadContributorData function ");
	//if(jsonData)
//		{
//			$.mobile.changePage("#businessCategory");
//			$("#imgRefreshProgress").hide();
//		}
//
//	if (isOnline) {
		getFileSystemRefForWriting(jsonData);

		//getFileSystemRefForReading(false, jsonData);
	//}
		
		//startSync();
}

// --------------------------------------------- LOAD SPOTLIGHT RSS FROM RSS URL
// ------------------------------------------------------------------------------------------

function loadSpotlightUrl() {
	$
			.ajax({
				type : "GET",
				url : spotlightRss,
				dataType : "xml",
				success: loadSpotlightGeneral,
				error : function(xhr, textStatus, errorThrown) {
					console
							.log('********************** SPOTLIGHT *********************************');
					console.log('In loadSpotlightUrl Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************');
				}
				
			});
}


function loadSpotlightGeneral(xml) {
    //alert(JSON.stringify(xml));
    $(xml).find('item').each(function () {

        try {
            var sguid = $(this).find('contentid').text();
            var scontenttype = $(this).find('contenttype').text();
            var sformattype = $(this).find('formattype').text();
            var scategory = $(this).find('category').text();
            var sTitle = $(this).find('title').text();
            var sDesc = $(this).find('description').text();
            var sLang = $(this).find('formatlang').text();
            
            var sAuthor = $(this).find('author').text().replace(/\|/g, ',');
            var contId = $(this).find('contributor_id').text();       
            
            var sAuthorCount = $(this).find('author_count').text();
            var audioTag = $(this).find('audio').text();
            var videoTag = $(this).find('video').text();

            var transcriptTag = $(this).find('transcript').text();
            var presentationTag = $(this).find('presentation').text();
            
            var sqna = $(this).find('qna').text();
            //var sqna = 'Chetan';
			var etime = $(this).find('etime').text();

            var sdocumentPDF = $(this).find('document_pdf').text();
            var publishedDateStart = $(this).find('published_date_start').text();
            var plen = publishedDateStart.length;
//            publishedDateStart = publishedDateStart.substring(0, plen-8 );
            var publishedDateEnd = $(this).find('published_date_end').text();
            var contributorId = $(this).find('contributor_id').text();
            var techArea = $(this).find('tech_area').text();
            var imageThumb = $(this).find('image_thumb').text();
            var imageActual = $(this).find('image_actual').text();
            var specialAds = $(this).find('special_ads').text();
            var saImage = $(this).find('special_ads').children('image').text();
            var saURL = $(this).find('special_ads').children('url').text();
            var saText = $(this).find('special_ads').children('text').text();

            $(this).find('audio').each(function () {
                var audioLength = $(this).attr('length');
            });

            $(this).find('video').each(function () {
                var videoLength = $(this).attr('length');
            });

            $(this).find('transcript').each(function () {
                var transcriptLength = $(this).attr('length');
            });

            $(this).find('presentation').each(function () {
                var presentationLength = $(this).attr('length');
            });

            var authorArray = new Array();
            var authorTextArray = sAuthor.split(",");

            for (i = 0; i < authorTextArray.length; i++) {
                authorArray.push(authorTextArray[i]);
            }

            //alert(imageActual);

            var tempMediaSpot = new Object();

            tempMediaSpot.itemId = sguid;
            tempMediaSpot.type = scontenttype;
            
            tempMediaSpot.formattype = sformattype;
            tempMediaSpot.category = scategory;
            tempMediaSpot.title = sTitle;
            tempMediaSpot.description = sDesc;
            tempMediaSpot.lang = sLang;
            tempMediaSpot.author = authorArray;
            tempMediaSpot.authorCount = sAuthorCount;
            tempMediaSpot.audio = audioTag;
            tempMediaSpot.video = videoTag;
            tempMediaSpot.transcript = transcriptTag;
            tempMediaSpot.presentation = presentationTag;
            tempMediaSpot.qna = sqna;
            tempMediaSpot.document = sdocumentPDF;                  
            tempMediaSpot.publishedDateStart = publishedDateStart;

            tempMediaSpot.contId = contId;
            
            tempMediaSpot.publishedDateEnd = publishedDateEnd;
            tempMediaSpot.contributorId = contributorId;
            tempMediaSpot.techArea = techArea;
            tempMediaSpot.thumb = imageThumb;
            //tempMediaSpot.thumbLength = thumbLength;			
            tempMediaSpot.actual = imageActual;
            //tempMediaSpot.actualLength = actualLength;			
            tempMediaSpot.etime = etime;

            tempMediaSpot.thumbLoc = "";
            tempMediaSpot.actualLoc = "";

            tempMediaSpot.specialAds = specialAds;
            tempMediaSpot.saImage = saImage;
            tempMediaSpot.saURL = saURL;
            tempMediaSpot.saText = saText;


            tempMediaSpot.isDownloadedAudio = 'false';
            tempMediaSpot.localPathAudio = '';
            tempMediaSpot.downloadedDateA = '';


            tempMediaSpot.isDownloadedVideo = 'false';
            tempMediaSpot.localPathVideo = '';
            tempMediaSpot.downloadedDateV = '';


            tempMediaSpot.isDownloadedTranscript = 'false';
            tempMediaSpot.localPathTranscript = '';
            tempMediaSpot.downloadedDateT = '';

            tempMediaSpot.isDownloadedPresentation = 'false';
            tempMediaSpot.localPathPresentation = '';
            tempMediaSpot.downloadedDateP = '';

            tempMediaSpot.isDownloaded = 'false';
            tempMediaSpot.localPath = '';
            tempMediaSpot.downloadedDateD = '';

            jsonData.spotLight.push(tempMediaSpot);
       //     jsonData.spotLightDownloaded.push(tempMediaSpot);
            var str = JSON.stringify(scategory);

            str = str.substring(1, str.length - 1);

            var beg, end, temp;
            var len = str.length;

            beg = 0;

            while (len !== 0 && end != 0 && str != "") {
                var n = str.split(",");


                end = str.indexOf("-") + 1;
                beg = str.indexOf(",");
                len = str.length;

                temp = str.substring(0, end - 1);

                //alert('Stop temp---'+temp);
                $.each(jsonData.category, function (index, item) {

                    $.each(item.subCategory, function (index, item) {

                        for (var i = 0; i < n.length; i++) {

                            var tempSubName = n[i].substring(0, n[i].lastIndexOf("-"));

                            var tempSubId = n[i].substring(n[i].indexOf("-") + 1, n[i].length);

                            //if (item.subCategoryName == temp) {
                            if (tempSubId == item.categoryid && item.subCategoryName == temp) {

                             //  console.log(tempSubName+" & "+tempSubId );
                                item.spotlight.push(sguid); // alert('id
                                // ->'+sguid+'\n
                                // data
                                // -->'+JSON.stringify(tempMedia));
                            }
                        }
                    });
                });


                if (beg == -1) {
                    len = 0;
                }
                if (end == 0) {
                    len = 0;
                }

                temp = str.substring(beg + 1, str.length);
                str = temp;

            }// while

        } catch (error) {
            var txt = "There was an error on this page.\n\n";
            txt += "Error description: " + error.message + "\n\n";
            txt += "Click OK to continue.\n\n";
            //alert(txt);
        }
    });

    if (isOnline) {
          getFileSystemRefForReading(false, jsonData);
    }

    postDownloadedItem();
	//startSync();

}

// --------------------------------------------- LOAD FAQ RSS FROM RSS URL
// ------------------------------------------------------------------------------------------

function loadFaqRss() {
	$
			.ajax({
				type : "GET",
				url : faqRss,
				dataType : "xml",
				success : loadFaq,
				error : function(xhr, textStatus, errorThrown) {
					// alert('error');
					console
							.log('******************* FAQ ************************************');
					console.log('In loadFaqRss Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************');
				}
			});
}

function loadFaq(xml) {
	$(xml).find('item').each(function() {

		try {
			var sTitle = $(this).find('title').text();
			var qOrder = $(this).find('question_order').text();
			var sdescription = $(this).find('description').text();

			var sImage1 = $(this).find('image1').text();
			var sImage2 = $(this).find('image2').text();

			var faqItem = new Object();
			faqItem.title = sTitle;
			faqItem.qOrder = qOrder;
			faqItem.sImage1 = sImage1;
			faqItem.sImage2 = sImage2;
			faqItem.description = sdescription;

			jsonData.faq.push(faqItem);

		} catch (error) {
			var txt = "loadSpotlight-There was an error on this page.\n\n";
			txt += "Error description: " + error.message + "\n\n";
			txt += "Click OK to continue.\n\n";
			console.log(txt);
		}

	});

}

// --------------------------------------------- LOAD ABOUT TECHTIME RSS URL
// ------------------------------------------------------------------------------------------

function loadAboutTechTimeRss() {
	$
			.ajax({
				type : "GET",
				url : aboutTechTimeRss,
				dataType : "xml",
				success : loadAboutTechTime,
				error : function(xhr, textStatus, errorThrown) {
					// alert('error');
					console
							.log('******************* ABOUT TECHTIME ************************************');
					console.log('In loadAboutTechTimeRss Failure' + JSON.stringify(xhr));
					console.log("textStatus:" + textStatus + ':' + errorThrown);
					console
							.log('*******************************************************');
				}
			});
}

function loadAboutTechTime(xml) {
newAppVersion = $(xml).find('androidAppVersion').text();
                             var customUpdateMessage = $(xml).find('updateMessage').text();
                             $('#customUpdateMessage').html(customUpdateMessage);
                             
                             checkForApplicationUpgradeAvailability();

	$(xml).find('item').each(function() {

		try {
			var sTitle = $(this).find('title').text();
			var sImage = $(this).find('image').text();
			var sdescription = $(this).find('description').text();

			var aboutTechTimeItem = new Object();
			aboutTechTimeItem.title = sTitle;
			aboutTechTimeItem.description = sdescription;
			aboutTechTimeItem.image = sImage;

			jsonData.aboutTechTime.push(aboutTechTimeItem);

		} catch (error) {
			var txt = "loadAboutTechTime-There was an error on this page.\n\n";
			txt += "Error description: " + error.message + "\n\n";
			txt += "Click OK to continue.\n\n";
			console.log(txt);
		}

	});
}


function loadTechWatchUrl()
{
            //alert(techWatchRss);
            $.ajax({
            type : "GET",
            url : techWatchRss,
            dataType : "xml",
            success : loadTechWatchData,
            error : function(xhr, textStatus, errorThrown) {
                           console.log('********************** Tech Watch *********************************');
                           	console.log('In Failure'+JSON.stringify(xhr));
                           console.log("textStatus:"+textStatus + ':' + errorThrown);
                           console.log('*******************************************************');
            }
            });
}
     



var currentTechWatchItemId = '';
var currentTechWatchItemIndex = '';
var techWatchTraverseIndex = '';

function loadTechWatchData(techWatchXml) {
	

	$(techWatchXml).find('techwatch').each(
			function(index,element) {
					try{
				var techWatchContentObject = new Object();
				var type = $(this).attr('type');
				var twId = $(this).attr('id');			
				 

				if(type == 'current')
					{
					 	currentTechWatchItemId = twId;
				        currentTechWatchItemIndex = index;
				        
				        window.localStorage.setItem("currentTechWatchItemId", currentTechWatchItemId);
				        window.localStorage.setItem("currentTechWatchItemIndex", currentTechWatchItemIndex);
						
					}
				

				techWatchContentObject.type = type;
				techWatchContentObject.twId = twId;

				var itemList = new Array();
				
				$(this).find('item').each(function(){
					
                    var itemArticleArray = new Array();

                    var itemTitle = $(this).find('title').text();
                    var itemType = $(this).find('type').text();
                    var itemArticle = $(this).find('article');
                    itemArticle.each(function(){
                                     
                                     var articleDetails = new Object();
                                     articleDetails.articleTitle = $(this).find('article_title').text();
                                     articleDetails.articleUrl = $(this).find('article_url').text();
                                     articleDetails.articleDescription = $(this).find('article_description').text();
                                     
                                     itemArticleArray.push(articleDetails);
                                     });
                    
                    var techWatchObject = new Object();
                    techWatchObject.itemTitle = itemTitle;
                    techWatchObject.itemType = itemType;
                    techWatchObject.itemArticleArray = itemArticleArray;
                    
                    itemList.push(techWatchObject);

					
				});
				
				techWatchContentObject.itemSet = itemList;


				//console.log('Multiple contentssss: '+JSON.stringify(techWatchContentObject));
				jsonData.techWatch.push(techWatchContentObject);
				
					}
					catch (error) {
						var txt = "loadTechWatchData-There was an error on this page.\n\n";
						txt += "Error description: " + error.message + "\n\n";
						txt += "Click OK to continue.\n\n";
						console.log(txt);
					}

			});

	//console.log("*TECHWATCH* " + JSON.stringify(jsonData.techWatch));
//	loadTechWatchQuotes();

}

function loadTechWatchDataNew(techWatchXml) {


    $(techWatchXml).find('techwatch').each(
                                        function (index, element) {
                                            try {

                                                var techWatchContentObject = new Object();
                                                var type = $(this).attr('type');
                                                var twId = $(this).attr('id');
                                                var techWatchPublicationDate = $(this).attr('publishedDate');


                                                if (type == 'current') {
                                                    currentTechWatchItemId = twId;
                                                    currentTechWatchItemIndex = index;

                                                    window.localStorage.setItem("currentTechWatchItemId", currentTechWatchItemId);
                                                    window.localStorage.setItem("currentTechWatchItemIndex", currentTechWatchItemIndex);

                                                }


                                                techWatchContentObject.type = type;
                                                techWatchContentObject.twId = twId;
                                                techWatchContentObject.techWatchPublicationDate = techWatchPublicationDate;
                                                techWatchContentObject.techWatchPublicationIndex = index;
                                                techWatchContentObject.techWatchPublicationDateString = getFormattedDate(techWatchPublicationDate);


                                                var itemList = new Array();

                                                $(this).find('item').each(function () {

                                                    var itemArticleArray = new Array();

                                                    var itemTitle = $(this).find('title').text();
                                                    var itemType = $(this).find('type').text();
                                                    var itemArticle = $(this).find('article');
                                                    itemArticle.each(function () {

                                                        var articleDetails = new Object();
                                                        articleDetails.articleTitle = $(this).find('article_title').text();
                                                        articleDetails.articleUrl = $(this).find('article_url').text();
                                                        articleDetails.articleDescription = $(this).find('article_description').text();

                                                        itemArticleArray.push(articleDetails);
                                                    });

                                                    var techWatchObject = new Object();
                                                    techWatchObject.itemTitle = itemTitle;
                                                    techWatchObject.itemType = itemType;
                                                    techWatchObject.itemArticleArray = itemArticleArray;

                                                    itemList.push(techWatchObject);
                                                });

                                                techWatchContentObject.itemSet = itemList;
                                                jsonData.techWatch.push(techWatchContentObject);

                                            }
                                            catch (error) {
                                                var txt = "There was an error on this page.\n\n";
                                                txt += "Error description: " + error.message + "\n\n";
                                                txt += "Click OK to continue.\n\n";
                                                //alert(txt);
                                            }

                                        });


    if (jsonData.techWatch.length == 100) {
        var dd = new Date();
        d = dd;
    }


}

function getFormattedDate(input) {
    var dateFormat = input.replace(/-/g, '/');
    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
    var result = dateFormat.replace(pattern, function (match, p1, p2, p3) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (Math.floor(p1 / 10) != 1) {
            if (Math.floor(p1 % 10) == 1) {
                return p1 + "st " + months[(p2 - 1)] + ", " + p3;
            }
            else if (Math.floor(p1 % 10) == 2) {
                return p1 + "nd " + months[(p2 - 1)] + ", " + p3;
            }
            else if (Math.floor(p1 % 10) == 3) {
                return p1 + "rd " + months[(p2 - 1)] + ", " + p3;
            }
            else {
                return p1 + "th " + months[(p2 - 1)] + ", " + p3;
            }
        }
        else {
            return p1 + "th " + months[(p2 - 1)] + ", " + p3;
        }

    });

    return result;
}


                             




// --------------------------------------------- OFFLINE
// ---------------------------------------------------OFFLINE
// ---------------------------------------
// --------------------------------------------- OFFLINE
// ---------------------------------------------------OFFLINE
// ---------------------------------------
// --------------------------------------------- OFFLINE


function startThumbnailDownload() {
//	alert('startThumbnailDownload');
	var dataTemp = '';
	dataTemp = jsonData;
	console.log('compare');
	compareAndUpdateJSON1(dataTemp);
}


function pendingDownloads(JData)
{
	
	document.getElementById("showProgressBar").innerHTML = '';
	//alert('JDATAAAAA :'+JSON.stringify(JData));
	$.each(JData, function(key, newItem) {
	
			var downloadIdtest = newItem.elementId;
			var downloadtitletest = newItem.elementTitle;
			var isDownloadedFlag = newItem.isDownloadedFlag;
			var elementAudio = newItem.elementAudio;
			var val = newItem.val;
			if (isOnline) {
				downloadFile(downloadIdtest, downloadtitletest, isDownloadedFlag,elementAudio, val);
			}
			
		});	

//getFileSystemRefForWriting(JData);
}



function checkFileExistsEve(filefullpath, testid, name, link, type) {
	if(name == "thumb")
       {
            if(downloadedThumbs.indexOf(testid + "thumb.png") == -1)
                {
                    downloadThumbImages(testid, name, link, type);
                }
       } else if(name == "actual")
       {
            if(downloadedThumbs.indexOf(testid + "actual.png") == -1)
                {
                    downloadThumbImages(testid, name, link, type);
                }
       }
}

function showCategoriesListTT(data) {
	//console.log('showCategoriesListTT'+JSON.stringify(data));

	
	
	var strHTMLCategory = "";

	
	if(data != null) {

		jsonData = data;
		changeDownloadLogoutColor();

		strHTMLCategory = '';

		

	}

}

function createJsonFormatOffline(Obj) {
	jsonData = Obj;
	if (Obj != null) {
		noSubscribe = 'true';
		changeDownloadLoginColor();
		
	
//fix search issue
		//$.mobile.changePage("#businessCategory");
		$("#imgRefreshProgress").hide();
	} 
	else if (Obj == null || Obj == 'null' || Obj == ''){
		// jAlert('If you are accessing Tech Time mobile app for the first time,
		// you will need to connect to the internet to view the content. Please
		// close the application and connect to Internet.', 'Tech Time');
		$('#errormsg')
				.html(
						'If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content.<br> Please close the application and connect to Internet.');
		$.mobile.changePage("#errorPage");
//		$.mobile.changePage("#loggedOutPage");
//		$("#imgRefreshProgress").hide();

	}

}

function downloadedListload(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{
    
	//alert(" itemId"+itemId+ "   elementTitle "+elementTitle+"   isDownloadedFlag"+isDownloadedFlag+"  filePath"+filePath);
   
	if(val == 1)
    {
        type = 'A';
        
    } else if(val == 2)
    {
       type = 'V';

        
    } else if(val == 3)
    {
        type = 'P';

        
        
    } else if(val == 4)
    {
        type = 'T';

        
    } else if(val == 5)
    {
       type = 'D';
   
    }
	
	var tempMedia = new Object();
        
        tempMedia.itemId = itemId;
        tempMedia.title = elementAudio;      
        tempMedia.publishedDate = '';        
        tempMedia.type = type;
        tempMedia.author = '';
        tempMedia.isDownloaded = isDownloadedFlag;
        tempMedia.localPath = filePath; 
        tempMedia.val = val;
        
        
        downloadJson.finalDownload.push(tempMedia);
    
    if(isOnline) {
    	//alert("downloadJson---"+JSON.stringify(downloadJson));
    	getFileSystemRefForWritingDownload(downloadJson);
    }
    
    //alert("downloadJson=----"+JSON.stringify(downloadJson));

}






