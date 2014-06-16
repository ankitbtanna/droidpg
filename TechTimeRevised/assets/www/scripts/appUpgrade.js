// -------------------------- Current App Version  -------------------------- //

var currentAppVersion = 3.0;

// -------------------------- Current App Version  -------------------------- //

// -------------------------- New App Version  -------------------------- //

var newAppVersion = 0;

// -------------------------- New App Version  -------------------------- //

// -------------------------- Data Loaded  -------------------------- //

var isDataLoaded = false;

// -------------------------- Data Loaded  -------------------------- //

// -------------------------- App Upgrade Availability  -------------------------- //

var isAppUpgradeAvailable = false;

function checkForApplicationUpgradeAvailability()
{
    newAppVersion = Number(newAppVersion);
    
    if((newAppVersion != 0) && (newAppVersion != currentAppVersion) && (newAppVersion > currentAppVersion))
    {
        isAppUpgradeAvailable = true;
    } else if((newAppVersion == 0) || (typeof newAppVersion === 'undefined') || (newAppVersion <= currentAppVersion))
    {
        isAppUpgradeAvailable = false;
    } 
    //alert(isAppUpgradeAvailable);
    // isAppUpgradeAvailable = true;
    displayAppUpgradeOptionToUser(isAppUpgradeAvailable);
}

// -------------------------- App Upgrade Availability  -------------------------- //

// -------------------------- App Upgrade Option Page  -------------------------- //

function displayAppUpgradeOptionToUser(appUpgradeAvailability)
{
    if(appUpgradeAvailability == true)
    {
        $.mobile.changePage('#upgradeApplicationPage');
    } else if(appUpgradeAvailability == false)
    {
        // TODO: Do Nothing and reset Upgrade Parameters
        isAppUpgradeAvailable == false;
    }
}

// -------------------------- App Upgrade Option Page  -------------------------- //

// -------------------------- Warn User -------------------------- //

function warnUserForUpgrade(upgradeCheckboxElement)
{
    if(upgradeCheckboxElement.checked == true)
    {   
        jConfirm('You will not be prompted to update this application again. If you still wish to upgrade to our latest Tech Time application, please visit https://techtime.accenture.com from your Safari browser of iPhone or iPad.', 'Tech Time', function(userConfirmation) {
                     if(userConfirmation == true){
                            window.localStorage.setItem("promptUserForUpgrade",false);
                                 if(isDataLoaded == true)
                                 {
                                        $.mobile.changePage('#businessCategory');
                                 } else if(isDataLoaded == false)
                                 {
                                        $.mobile.changePage('#intialPage');
                                 }
                     } else if(userConfirmation == false){
                            window.localStorage.setItem("promptUserForUpgrade",true);
                            $('#upgradeApplicationCheckbox').attr('checked', false);
                     }
                 });
        
    } else if(upgradeCheckboxElement.checked == false)
    {
        window.localStorage.setItem("promptUserForUpgrade",true);
    }
    
}

// -------------------------- Warn User -------------------------- //

// -------------------------- Upgrade App -------------------------- //

function upgradeUserApplication()
{
    window.open("https://techtime.accenture.com", "_system");
}

// -------------------------- Upgrade App -------------------------- //


// -------------------------- Cancel App Upgrade -------------------------- //
var setCancelAction = false;
function cancelUpgrade()
{
    if(isDataLoaded == true)
    {
            $.mobile.changePage('#businessCategory');
    } else if(isDataLoaded == false)
    {
            $.mobile.changePage('#intialPage');
            setCancelAction = true;
    }
    
}

// -------------------------- Cancel App Upgrade -------------------------- //