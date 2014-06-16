/* Refresh Page
 * 
 *  jQuery.mobile.changePage(window.location.href, {
    	        allowSamePageTransition: true,
    	        transition: 'none',
    	        reloadPage: true
    	    });
 */


function syncLoaderStart() {

	$("#SyncCheck").click(function() {

		var pageSyncId = $(this).parents('div').attr('id');

		$.mobile.loading('show', {
			theme : "c",
			text : "syncing...",
			textonly : true,
			textVisible : true
		});

		setTimeout(function() {
			startSync();
		}, 50);

	});
}





function startSync()
{

    var finaldwn = new Array();
    
    console.log('Sync Started');
    $.each(jsonData.techConf, function(key, CheckDownload) {
           
    	 var tempOBJ = new Object();
         tempOBJ.id = CheckDownload.itemId;
         tempOBJ.val = "1";
         tempOBJ.title = CheckDownload.title;
         
         var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
         var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
         
         
         var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
         var createPath = globalPath;

         createPath = createPath + "/TA" + CheckDownload.itemId + extractFormatType;
         
         createdFileName = "TA"+CheckDownload.itemId;

         
         tempOBJ.path = createPath;
         
  
        // var returnFromUrl = createPath.fileExists();
         var returnFromUrl = entriesList.indexOf(createdFileName);

         
         if(returnFromUrl != -1)
         {
         CheckDownload.isDownloadedAudio = 'true';
         CheckDownload.localPathAudio = createPath;
         }
    
        
         var tempOBJ = new Object();
         tempOBJ.id = CheckDownload.itemId;
         tempOBJ.val = "2";
         
         tempOBJ.title = CheckDownload.title;
         
         var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
         var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
         
         
         
         var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
         var createPath = globalPath;

         createPath = createPath + "/TV" + CheckDownload.itemId + extractFormatType;
         createdFileName = "TV"+CheckDownload.itemId;

      // var returnFromUrl = createPath.fileExists();
         var returnFromUrl = entriesList.indexOf(createdFileName);
         
         if(returnFromUrl != -1)
         {
         CheckDownload.isDownloadedVideo = 'true';
         CheckDownload.localPathVideo = createPath;
         }
        
         
         var tempOBJ = new Object();
         tempOBJ.id = CheckDownload.itemId;
         tempOBJ.val = "3";
         tempOBJ.title = CheckDownload.title;
         
         
         
         var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
         var createPath = globalPath;

         createPath = createPath + "/TP" + CheckDownload.itemId + ".pdf";
         createdFileName = "TP"+CheckDownload.itemId;

        
         
      // var returnFromUrl = createPath.fileExists();
         var returnFromUrl = entriesList.indexOf(createdFileName);
         
         if(returnFromUrl != -1)
         {
         CheckDownload.isDownloadedPresentation = 'true';
         CheckDownload.localPathPresentation = createPath;
         }
        
         var tempOBJ = new Object();
         tempOBJ.id = CheckDownload.itemId;
         tempOBJ.val = "4";
         tempOBJ.title = CheckDownload.title;
         
         var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
         var createPath = globalPath;

         createPath = createPath + "/TT" + CheckDownload.itemId + ".pdf";
         createdFileName = "TT"+CheckDownload.itemId;

         // var returnFromUrl = createPath.fileExists();
         var returnFromUrl = entriesList.indexOf(createdFileName);
         
         if(returnFromUrl != -1)
         {
         CheckDownload.isDownloadedTranscript = 'true';
         CheckDownload.localPathTranscript = createPath;
         }
        
         
           
           });
    
    $.each(jsonData.audio, function(key, CheckDownload) {
           
    	
    		$.mobile.loadingMessageTheme = 'a';
    		$.mobile.loadingMessageTextVisible = true;
           
           //$.mobile.showPageLoadingMsg('b','Syncing..Audio.', false);
    	
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           var createPath = globalPath;

           createPath = createPath + "/AA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "AA"+CheckDownload.itemId;

           tempOBJ.path = createPath;
           
   
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
          
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
        //   var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;

           createPath = createPath + "/AV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "AV"+CheckDownload.itemId;

      //     console.log("createPath AV"+createPath);
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
          // console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
      //     console.log("returnFromUrl AV"+returnFromUrl);
          
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           // /Users/administrator/Library/Application Support/iPhone Simulator/6.0/Applications/4C42C928-EB79-4B61-9E80-A3C93A4272E0/Documents/Videos/VP569.pdf
           
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
          // var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;

           createPath = createPath + "/AP" + CheckDownload.itemId + ".pdf";
           createdFileName = "AP"+CheckDownload.itemId;

          
           
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
           //console.log("returnFromUrl AP"+returnFromUrl);
          
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
         //  var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;

           createPath = createPath + "/AT" + CheckDownload.itemId + ".pdf";
           createdFileName = "AT"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
           //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
     //      console.log("returnFromUrl AT"+returnFromUrl);
          
           
           
           });
   
    
    
    $.each(jsonData.video, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           // alert("-------------> " + extractFormatType);
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           //    var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/VA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "VA"+CheckDownload.itemId;

           tempOBJ.path = createPath;
           
     //      console.log("createPath VA"+createPath);
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                      //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
     //      console.log("returnFromUrl VA"+returnFromUrl);
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           // alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           //   var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/VV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "VV"+CheckDownload.itemId;

       //    console.log("createPath VV"+createPath);
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                      //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
     //      console.log("returnFromUrl VV"+returnFromUrl);
           
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           // /Users/administrator/Library/Application Support/iPhone Simulator/6.0/Applications/4C42C928-EB79-4B61-9E80-A3C93A4272E0/Documents/Videos/VP569.pdf
           
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           // var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/VP" + CheckDownload.itemId + ".pdf";
           createdFileName = "VP"+CheckDownload.itemId;

//           var returnFromUrl = UrlExists(createPath);
//           console.log('returnFromUrl======='+returnFromUrl+'returnFromUrl');
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
          // console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
        	   //alert("HERE VP"+CheckDownload.itemId);
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
        //   console.log("returnFromUrl VP"+returnFromUrl);
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           //  var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/VT" + CheckDownload.itemId + ".pdf";
           createdFileName = "VT"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
          // console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
        	   //alert("HERE VT"+CheckDownload.itemId);

           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
        //   console.log("returnFromUrl VT"+returnFromUrl);
           
           
           
           });
    
    
    
    
    $.each(jsonData.technologySessions, function(key, CheckDownload) {
        
        var tempOBJ = new Object();
        tempOBJ.id = CheckDownload.itemId;
        tempOBJ.val = "1";
        tempOBJ.title = CheckDownload.title;
        
        var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
        var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
        
        // alert("-------------> " + extractFormatType);
        
        var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
        //    var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
        var createPath = globalPath;
        
        createPath = createPath + "/VA" + CheckDownload.itemId + extractFormatType;
        createdFileName = "VA"+CheckDownload.itemId;

        tempOBJ.path = createPath;
        
  //      console.log("createPath VA"+createPath);
        // var returnFromUrl = createPath.fileExists();
        var returnFromUrl = entriesList.indexOf(createdFileName);
        
                   //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
        if(returnFromUrl != -1)
        {
        CheckDownload.isDownloadedAudio = 'true';
        CheckDownload.localPathAudio = createPath;
        }
  //      console.log("returnFromUrl VA"+returnFromUrl);
        
        var tempOBJ = new Object();
        tempOBJ.id = CheckDownload.itemId;
        tempOBJ.val = "2";
        
        tempOBJ.title = CheckDownload.title;
        
        var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
        var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
        
        // alert("-------------> " + extractFormatType);
        
        
        var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
        //   var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
        var createPath = globalPath;
        
        createPath = createPath + "/VV" + CheckDownload.itemId + extractFormatType;
        createdFileName = "VV"+CheckDownload.itemId;

    //    console.log("createPath VV"+createPath);
        // var returnFromUrl = createPath.fileExists();
        var returnFromUrl = entriesList.indexOf(createdFileName);
        
                   //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
        if(returnFromUrl != -1)
        {
        CheckDownload.isDownloadedVideo = 'true';
        CheckDownload.localPathVideo = createPath;
        }
  //      console.log("returnFromUrl VV"+returnFromUrl);
        
        
        var tempOBJ = new Object();
        tempOBJ.id = CheckDownload.itemId;
        tempOBJ.val = "3";
        tempOBJ.title = CheckDownload.title;
        
        // /Users/administrator/Library/Application Support/iPhone Simulator/6.0/Applications/4C42C928-EB79-4B61-9E80-A3C93A4272E0/Documents/Videos/VP569.pdf
        
        
        var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
        // var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
        var createPath = globalPath;
        
        createPath = createPath + "/VP" + CheckDownload.itemId + ".pdf";
        createdFileName = "VP"+CheckDownload.itemId;

//        var returnFromUrl = UrlExists(createPath);
//        console.log('returnFromUrl======='+returnFromUrl+'returnFromUrl');
        // var returnFromUrl = createPath.fileExists();
        var returnFromUrl = entriesList.indexOf(createdFileName);
        
        
       // console.log('File Exist======='+returnFromUrl+'returnFromUrl');
        if(returnFromUrl != -1)
        {
     	   //alert("HERE VP"+CheckDownload.itemId);
        CheckDownload.isDownloadedPresentation = 'true';
        CheckDownload.localPathPresentation = createPath;
        }
     //   console.log("returnFromUrl VP"+returnFromUrl);
        
        var tempOBJ = new Object();
        tempOBJ.id = CheckDownload.itemId;
        tempOBJ.val = "4";
        tempOBJ.title = CheckDownload.title;
        
        var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
        //  var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
        var createPath = globalPath;
        
        createPath = createPath + "/VT" + CheckDownload.itemId + ".pdf";
        createdFileName = "VT"+CheckDownload.itemId;

        // var returnFromUrl = createPath.fileExists();
        var returnFromUrl = entriesList.indexOf(createdFileName);
        
        
       // console.log('File Exist======='+returnFromUrl+'returnFromUrl');
        if(returnFromUrl != -1)
        {
     	   //alert("HERE VT"+CheckDownload.itemId);

        CheckDownload.isDownloadedTranscript = 'true';
        CheckDownload.localPathTranscript = createPath;
        }
     //   console.log("returnFromUrl VT"+returnFromUrl);
        
        
        
        });
 
    
    
    $.each(jsonData.panelDiscussions, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           // alert("-------------> " + extractFormatType);
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           //    var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/PA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "PA"+CheckDownload.itemId;

           tempOBJ.path = createPath;
           
          // console.log("createPath PA"+createPath);
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
           //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
         //  console.log("returnFromUrl PA"+returnFromUrl);
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           // alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           //   var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/PV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "PV"+CheckDownload.itemId;

        //   console.log("createPath PV"+createPath);
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           
           //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
        //   console.log("returnFromUrl PV"+returnFromUrl);
           
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           // /Users/administrator/Library/Application Support/iPhone Simulator/6.0/Applications/4C42C928-EB79-4B61-9E80-A3C93A4272E0/Documents/Videos/VP569.pdf
           
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           // var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/PP" + CheckDownload.itemId + ".pdf";
           createdFileName = "PP"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                     // console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
      //     console.log("returnFromUrl PP"+returnFromUrl);
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           //  var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/PT" + CheckDownload.itemId + ".pdf";
           createdFileName = "PT"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                    //  console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
      //     console.log("returnFromUrl PT"+returnFromUrl);
           
           
           
           });
    
    
    $.each(jsonData.interviews, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           // alert("-------------> " + extractFormatType);
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           //    var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/IA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "IA"+CheckDownload.itemId;

           tempOBJ.path = createPath;
           
       //    console.log("createPath IA"+createPath);
           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                    //  console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
         //  console.log("returnFromUrl IA"+returnFromUrl);
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           // alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           //   var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/IV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "IV"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                      //console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
      //     console.log("returnFromUrl IV"+returnFromUrl);
           
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           // /Users/administrator/Library/Application Support/iPhone Simulator/6.0/Applications/4C42C928-EB79-4B61-9E80-A3C93A4272E0/Documents/Videos/VP569.pdf
           
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           // var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/IP" + CheckDownload.itemId + ".pdf";
           createdFileName = "IP"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
                    //  console.log('File Exist======='+returnFromUrl+'returnFromUrl');
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
       //    console.log("returnFromUrl IP"+returnFromUrl);
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           //  var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           var createPath = globalPath;
           
           createPath = createPath + "/IT" + CheckDownload.itemId + ".pdf";
           createdFileName = "IT"+CheckDownload.itemId;

           // var returnFromUrl = createPath.fileExists();
           var returnFromUrl = entriesList.indexOf(createdFileName);
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
       //    console.log("returnFromUrl IT"+returnFromUrl);
           
           
           
           });

    
    
    $.each(jsonData.documents, function(key, CheckDownload) {
           
          
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "5";
           tempOBJ.title = CheckDownload.title;
           
           
           var lastInstance = CheckDownload.localPath.lastIndexOf("/");
           var createPath = globalPath;
           
              createPath = createPath + "/DD" + CheckDownload.itemId + ".pdf";
              createdFileName = "DD"+CheckDownload.itemId;

              // var returnFromUrl = createPath.fileExists();
              var returnFromUrl = entriesList.indexOf(createdFileName);
              
              
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloaded = 'true';
           CheckDownload.localPath = createPath;
           }
          // console.log("returnFromUrl IT"+returnFromUrl);
           

           });
    
getFileSystemRefForWriting(jsonData);
    
 console.log('Complete Sync');
 //$.mobile.hidePageLoadingMsg();
 
 
}




String.prototype.fileExists = function() {
	
	 
 
	filename = this.trim();
	var response = $.ajax({
		url: filename,
		type: 'HEAD',
		async: false
	}).status;	
	
	return (response != "200") ? false : true;
	

}





function UrlExists(url)
{

	
	$.get(url)
    .done(function() { 
    	console.log('Page found.'+url);
      return true;
    }).fail(function() { 
    	console.log('Page not found.'+url);
      return false;
    })

}

