                         // Load the Google data JavaScript client library.
                                google.load('gdata', '2.x', {packages: ['analytics']});
                                google.load('jquery','1.4.2');
                                
                                // Set the callback function when the library is ready.
                                google.setOnLoadCallback(init);
                                
                                //vars
                                var profiles = {};
                                var num_results = 30;
                                var prefs = new gadgets.Prefs(128);
                                
                                /**
                                 * This is called once the Google Data JavaScript library has been loaded.
                                 * It creates a new AnalyticsService object, adds a click handler to the
                                 * authentication button and updates the button text depending on the status.
                                 */
                                function init() {
                                  myService = new google.gdata.analytics.AnalyticsService('gaExportAPI_acctSample_v2.0');
                                  scope = 'https://www.google.com/analytics/feeds';
                                  var button = document.getElementById('authButton');
                                                                  
                                  // Add a click handler to the Authentication button.
                                  button.onclick = function() {
                                    // Test if the user is not authenticated.
                                    if (!google.accounts.user.checkLogin(scope)) {
                                      // Authenticate the user.
                                      google.accounts.user.login(scope);
                                    } else {
                                      // Log the user out.
                                      google.accounts.user.logout();
                                      getStatus();
                                    }
                                  }
                                  getStatus();
                                }
                                
                                /**
                                 * Checks if this is the first, by seeing if any preferences have been saved
                                 * @return bool
                                 */
                                function gadgetFirstRun(){
                                        
                                        var profileStates = prefs.getArray('profiles');
                                        if(!profileStates || profileStates=='') return true;
                                        else return false;
                                }
                                
                                /**
                                 * Utility method to display the user controls if the user is 
                                 * logged in. If user is logged in, get Account data and
                                 * get Report Data buttons are displayed.
                                 */
                                function getStatus() {
                                        
                                        /*
                                  var getAccountButton = document.getElementById('getAccount');
                                  getAccountButton.onclick = getAccountFeed;
                                  
                                  var getDataButton = document.getElementById('getData');
                                  getDataButton.onclick = getDataFeed;
                                        */
                                
                                  var dataControls = document.getElementById('dataControls');
                                  var loginButton = document.getElementById('authButton');
                                  
                                  if (!google.accounts.user.checkLogin(scope)) {
                                    dataControls.style.display = 'none';   // hide control div
                                    loginButton.innerHTML = 'Access Google Analytics';
                                    
                                  } else {
                                    dataControls.style.display = 'block';  // show control div
                                    loginButton.innerHTML = 'Logout';
                                    
                                    
                                        //get profiles
                                        getAccountFeed();
                                  }
                                }
                                
                                /**
                                 * Main method to get account data from the API.
                                 */
                                function getAccountFeed() {
                                  var myFeedUri =
                                      'https://www.google.com/analytics/feeds/accounts/default?max-results=50';
                                  myService.getAccountFeed(myFeedUri, handleAccountFeed, handleError);
                                }
                                
                                /**
                                 * Handle the account data returned by the Export API by constructing the inner parts
                                 * of an HTML table and inserting into the HTML file.
                                 * @param {object} result Parameter passed back from the feed handler.
                                      object.getPropertyValue('ga:AccountName'),
                                      object.getTitle().getText(),
                                      object.getPropertyValue('ga:ProfileId'),
                                      object.getTableId().getValue()
                                 */
                                function handleAccountFeed(result) {
                                        
                                        //vars
                                        profiles = result.feed.getEntries();            //global profiles var
                                        /*
                                        var options = '<option value="">Select Profile</option>';       //select html
                                        var profileSelect = document.getElementById('profileSelect');
                                        var obj = [];
                                        
                                        //loop through profiles and append select[profileSelect] html
                                        for(var i=0, profile; profile=profiles[i]; i++){
                                                options += '<option value="'+i+'">'+profile.getTitle().getText()+'</option>';
                                                obj.push({
                                                        profileId : profile.getTableId().getValue(),
                                                        name : profile.getTitle().getText()
                                                });
                                        }
                                        
                                        //store profiles in global obj
                                        profiles = obj;
                                        */
                                        
                                        //if first run, show settings
                                        if(gadgetFirstRun()) gadgetShowSettings();
                                        
                                        //else display profiles
                                        else{
                                                
                                                //show settings btn
                                                $('#settingsButton').show();
                                                
                                                profilesOn = prefs.getArray('profiles');
                                                for(var i=0; i<profilesOn.length; i++){
                                                        getProfile(profilesOn[i]);
                                                }
                                        }
                                        
                                        //drop-down select box
                                        /*
                                        profileSelect.innerHTML = options;
                                        profileSelect.style.display = 'inline';
                                        */
                                 }
                                                                
                                /*
                                 * displays the settings for the gadget
                                 */
                                function gadgetShowSettings(){
                                        
                                        //toggle display of settings
                                        if($('#gadgetSettings').css('display')!='none'){
                                                $('#gadgetSettings').css('display','none');
                                                return;
                                        }
                                        else $('#gadgetSettings').css('display','block');
                                        
                                        //if form elements already drawn, return
                                        if($('#prefsForm').attr('id')) return;
                                        
                                        //get prefs profiles obj
                                        profilesOn = prefs.getArray('profiles');
                                        
                                        //build settings html form
                                        html = '<form id="prefsForm">';
                                        
                                        //checkbox's for turning profile display on/off
                                        for(var i=0; i<profiles.length; i++){
                                                id = profiles[i].getTableId().getValue();
                                                
                                                //if profileId is in profilesOn[] then checked=checked
                                                html += '<input type="checkbox" value="' + id + '" id="settingsProfile'+i+'" name="profile"';
                                                if($.inArray(id, profilesOn) >= 0) html += ' checked="checked"';
                                                html += '/>' + 
                                                        '<label for="settingsProfile'+i+'">'+profiles[i].getPropertyValue('ga:AccountName')+'</label><br/>';
                                        }

                                        //finish form, submit btn
                                        html += '</form>';
                                        html += '<button onclick="gadgetSetSettings()">Save</button>';
                                        
                                        //append form
                                        document.getElementById('gadgetSettings').innerHTML = html;
                                        
                                        //resize window
                                        _IG_AdjustIFrameHeight();
                                }
                                
                                /**
                                 * save the settings from form:prefsForm
                                 * @return false so form doesn't try submitting
                                 */
                                function gadgetSetSettings(){
                                        
                                        //vars
                                        var form = document.getElementById('prefsForm');
                                        var profileStates = [];
                                        
                                        //add checked profiles to array
                                        for(var i=0; i<form.profile.length; i++){
                                                if(form.profile[i].checked){
                                                        profileStates.push(form.profile[i].value);
                                                }
                                        }
                                        
                                        //set prefs
                                        
                                        prefs.setArray('profiles',profileStates);
                                        var json = 
                                        prefs.set('foo','bar');
                                        
                                        //reload gadget
                                        alert('saving...');                                     
                                        //window.location.reload(true);
                                }
                                
                                /**
                                 * Returns the numberic id for a profile
                                 * @return int
                                 */
                                function getId(profileId){
                                        
                                        var ret = new String(profileId).split(":");
                                        return ret[1];
                                }
                                
                                /*
                                 * profileSelect.onchange handle
                                 *              grabs feed for selected profile
                                 */
                                function getProfile(profileId){
                                        
                                        //create div container to hold this profile
                                        $('#visitorsDiv').append('<div id="' + profileId + '"></div>');
                                        
                                        getDataFeed(profileId);
                                }
                                
                                /**
                                 * Main method to get report data from the Export API.
                                 */
                                function getDataFeed(tableId) {
                                        
                                        var dates = getDates();                                 
                                        var myFeedUri = 'https://www.google.com/analytics/feeds/data' +
                                                         '?start-date=' + dates.start + 
                                                         '&end-date=' + dates.end + 
                                                         '&dimensions=ga:day,ga:visitorType' +
                                                         '&metrics=ga:visits' +
                                                         '&sort=ga:day' +
                                                         '&max-results=1000' + //num_results +
                                                         '&ids=' + tableId;
                                        
                                        myService.getDataFeed(myFeedUri, handleDataFeed, handleError);
                                }
                                
                                /**
                                 * Returns the date for yesterday:
                                 * @return object year-month-date
                                 */
                                function getDates(){
                                        
                                        //months need to be in 2 digit format.
                                        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
                                        var days = ['','01','02','03','04','05','06','07','08','09'];
                                        
                                        //get start/end objects
                                        var enddate= new Date();
                                        enddate.setDate(enddate.getDate()-1);
                                        var startdate = new Date();
                                        startdate.setDate(startdate.getDate()-num_results);
                                        
                                        //end date str
                                        var endyear=enddate.getFullYear();
                                        var endmonth=months[enddate.getMonth()];
                                        var endday=enddate.getDate();
                                        if(days[endday]) endday = days[endday]; //make sure day is 2 digits
                                        end = endyear+"-"+endmonth+"-"+endday;
                                        
                                        //start date str
                                        var startyear = startdate.getFullYear();
                                        var startmonth = months[startdate.getMonth()];
                                        var startday = startdate.getDate();
                                        if(days[startday]) startday = days[startday];   //make sure day is 2 digits
                                        start = startyear+"-"+startmonth+"-"+startday;
                                        
                                        //return as hash
                                        return {start: start,end: end};
                                }
                                
                                /**
                                 * Handle the data returned by the Export API by constructing the 
                                 * inner parts of an HTML table and inserting into the HTML File.
                                 * @param {object} result Parameter passed back from the feed handler.
                                 */
                                function handleDataFeed(result) {
                                        
                                        // An array of Analytics feed entries.
                                        var entries = result.feed.getEntries();
                                        var title = result.feed.dxp$dataSource[0].dxp$property[2].value;
                                        
                                        //get base bar chart
                                        var gaChartData = getVisitorChartData(result);
                                        var chart = getBarChart(gaChartData);
                                        chart.setParam('chs','370x200');
                                        chart.setParam('chtt', title);
                                        chart.setParam('chts','000000,10');
                                        chart.setParam('chdlp','b');
                                        //drawChart('visitorsDiv', chart.getURL()); 
                                         
                                        //draw up line chart
                                        var lineChart = getLineChartFromBarChart(chart);
                                        drawChart('visitorsDiv', lineChart.getURL());
                                        
                                        //resize window
                                        _IG_AdjustIFrameHeight();
                                        
                                        //clear loader
                                        loader(false);
                                }
                                
                                /**
                                 * if false is passed the loader is stopped, else a string is passed to be displayed
                                 * @param (bool|str)
                                 */
                                function loader(str){
                                        
                                        var div = document.getElementById('outputDiv');
                                        
                                        if(!str){
                                                div.innerHTML = '';
                                                return;
                                        }
                                        
                                        div.innerHTML = str;
                                }
                                
                                /**
                                 * Alert any errors that come from the API request.
                                 * @param {object} e The error object returned by the Analytics API.
                                 */
                                function handleError(e) {
                                  var error = 'Analytics Widget\n\nThere was an error!\nMake sure start and end dates in feed uri are 2 digits not 1';
                                  if (e.cause) {
                                    error += e.cause.status;
                                  } else {
                                    error.message;
                                  }
                                  alert(error);
                                }          