function showContri(){
	if(isOnline){

showRecordingOption('assisted');
$.mobile.changePage('#ContributePage');
	} else{
		
		jAlert("Please go online to Contribute to Tech Time.", "Tech Time")
	}
}



// ---------------------------------- Show-Hide Contribute Forms ---------------------------------- //

function showRecordingOption(recordingType)
{
    var userEmailAddress = jsonData.loggedUserName.replace(/_/g, '.') + "@accenture.com";
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingEmailInput').attr('value', userEmailAddress);
        $('#contributeTypeOption').css('display', 'none');
        $('#assistedRecordingSection').css('display', 'block');
        $('#selfRecordingSection').css('display', 'none');
        
    } else if(recordingType == 'self')
    {
        $('#selfRecordingEmailInput').attr('value', userEmailAddress);
        $('#contributeTypeOption').css('display', 'none');
        $('#selfRecordingSection').css('display', 'block');
        $('#assistedRecordingSection').css('display', 'none');
        
    } else if(recordingType == 'cancel')
    {
       /* $('#contributeTypeOption').css('display', 'block');
        $('#assistedRecordingSection').css('display', 'none');
        $('#selfRecordingSection').css('display', 'none'); */
    }
}

// ---------------------------------- Show-Hide Contribute Forms ---------------------------------- //

// ---------------------------------- Show-Hide Format Options ---------------------------------- //

function showSelectFormatOptions(recordingType)
{
    var optionsHtml = $('#assistedSelfRecordingSelectFormatOption').html();

    if(recordingType == 'assisted')
    {
        $('#assistedRecordingFormatInputOptions').html(optionsHtml).css('display', 'block');
    } else if(recordingType == 'self')
    {
        $('#selfRecordingFormatInputOptions').html(optionsHtml).css('display', 'block');
    }
}

// ---------------------------------- Show-Hide Format Options ---------------------------------- //

// ---------------------------------- Show-Hide Level Options ---------------------------------- //

function showSelectLevelOptions(recordingType)
{
    var optionsHtml = $('#assistedSelfRecordingSelectLevelOption').html();
    
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingLevelInputOptions').html(optionsHtml).css('display', 'block');
    } else if(recordingType == 'self')
    {
        $('#selfRecordingLevelInputOptions').html(optionsHtml).css('display', 'block');
    }
}

// ---------------------------------- Show-Hide Level Options ---------------------------------- //

// ---------------------------------- Show-Hide Area Options ---------------------------------- //

function showSelectAreaOptions(recordingType)
{
    var optionsHtml = $('#assistedSelfRecordingSelectAreaOption').html();
    
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingAreaInputOptions').html(optionsHtml).css('display', 'block');
    } else if(recordingType == 'self')
    {
        $('#selfRecordingAreaInputOptions').html(optionsHtml).css('display', 'block');
    }
}

// ---------------------------------- Show-Hide Area Options ---------------------------------- //

// ---------------------------------- Select Format Type ---------------------------------- //

function selectFormatType(formatOptionItem)
{
    var currentRecordingOption = '';
    
    if($('#assistedRecordingFormatInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'assisted';
    } else if($('#selfRecordingFormatInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'self';
    }
    
    var formatOptionSelected = '';
    formatOptionSelected = $('#'+formatOptionItem.id).attr('data-formatType');
    
    if(currentRecordingOption == 'assisted')
    {
        var selectedFormatButtonHTML = '<button id="assistedRecordingFormatInput" type="button" onclick=showSelectFormatOptions("assisted")>'+formatOptionSelected+'</button>';
        $('#assistedRecordingFormatInputDiv').html(selectedFormatButtonHTML);
        $('#assistedRecordingFormatInput').button().button('refresh');
        $('#assistedRecordingFormatInputOptions').css('display', 'none');
    } else if(currentRecordingOption == 'self')
    {
        var selectedFormatButtonHTML = '<button id="selfRecordingFormatInput" type="button" onclick=showSelectFormatOptions("self")>'+formatOptionSelected+'</button>';
        $('#selfRecordingFormatInputDiv').html(selectedFormatButtonHTML);
        $('#selfRecordingFormatInput').button().button('refresh');
        $('#selfRecordingFormatInputOptions').css('display', 'none');
    }
    


}

// ---------------------------------- Select Format Type ---------------------------------- //


// ---------------------------------- Select Level ---------------------------------- //

function selectLevel(levelOptionItem)
{
    var currentRecordingOption = '';
    
    if($('#assistedRecordingLevelInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'assisted';
    } else if($('#selfRecordingLevelInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'self';
    }
    
    var levelOptionSelected = '';
    levelOptionSelected = $('#'+levelOptionItem.id).attr('data-level');
    
    if(currentRecordingOption == 'assisted')
    {
        var selectedLevelButtonHTML = '<button id="assistedRecordingLevelInput" type="button" onclick=showSelectLevelOptions("assisted")>'+levelOptionSelected+'</button>';
        $('#assistedRecordingLevelInputDiv').html(selectedLevelButtonHTML);
        $('#assistedRecordingLevelInput').button().button('refresh');
        $('#assistedRecordingLevelInputOptions').css('display', 'none');
    } else if(currentRecordingOption == 'self')
    {
        var selectedLevelButtonHTML = '<button id="selfRecordingLevelInput" type="button" onclick=showSelectLevelOptions("self")>'+levelOptionSelected+'</button>';
        $('#selfRecordingLevelInputDiv').html(selectedLevelButtonHTML);
        $('#selfRecordingLevelInput').button().button('refresh');
        $('#selfRecordingLevelInputOptions').css('display', 'none');
    }
    
    
    
}

// ---------------------------------- Select Level ---------------------------------- //

// ---------------------------------- Select Area ---------------------------------- //

function selectArea(formatOptionItem)
{
    var currentRecordingOption = '';
    //alert("1");
    
    if($('#assistedRecordingAreaInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'assisted';
    } else if($('#selfRecordingAreaInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'self';
    }
    //alert("2");
    
    var areaOptionSelected = '';
    areaOptionSelected = $('#'+formatOptionItem.id).attr('data-area');
   // alert("3");
    if(currentRecordingOption == 'assisted')
    {
        var selectedAreaButtonHTML = '<button id="assistedRecordingAreaInput" type="button" onclick=showSelectAreaOptions("assisted")>'+areaOptionSelected+'</button>';
        $('#assistedRecordingAreaInputDiv').html(selectedAreaButtonHTML);
        $('#assistedRecordingAreaInput').button().button('refresh');
        $('#assistedRecordingAreaInputOptions').css('display', 'none');
    } else if(currentRecordingOption == 'self')
    {
        var selectedAreaButtonHTML = '<button id="selfRecordingAreaInput" type="button" onclick=showSelectAreaOptions("self")>'+areaOptionSelected+'</button>';
        $('#selfRecordingAreaInputDiv').html(selectedAreaButtonHTML);
        $('#selfRecordingAreaInput').button().button('refresh');
        $('#selfRecordingAreaInputOptions').css('display', 'none');
        
    }
    //alert("4");
    
    
    
}

// ---------------------------------- Select Area ---------------------------------- //

// ---------------------------------- Reset Recording Forms ---------------------------------- //

function resetRecordingForms()
{
    
}

// ---------------------------------- Reset Recording Forms ---------------------------------- //