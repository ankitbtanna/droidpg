$(document).ready(function(){
    
    		$("body, li, #type, #topic, #topic1").click(function(event){
    					
    				 if(event.target.id == 'type' || event.target.id == 'type1'){
    				 	//console.log('11111');
    				 }else{    				 
    				 	$("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout    				 
    				 }    				 
    				 
    				 if(event.target.id == 'topic' || event.target.id == 'topic1'){
    				 	//console.log('2222');
    				 }else{
    				 	$("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
    				 }	
                                    
                      if(event.target.id == 'typeS' || event.target.id == 'typeS1'){
                                                       
                       }else{
                             $("ul.navigation li label").parent().find("ul.submenu2").slideUp('slow'); //Hiding Submenu when mouseout
                    }
                     
                      if(event.target.id == 'language' || event.target.id == 'language1'){
      				 	//console.log('11111');
      				 }else{    				 
      				 	$("ul.navigation li label").parent().find("ul.submenu3").slideUp('slow'); //Hiding Submenu when mouseout    				 
      			}    
                      
                                                        
                                                        
    		});
  										
									
			$("ul.navigation li label ").click(function(){
			
                $(this).parent().find("ul.submenu").slideDown('slow').show(); //Showing Submenu when mouseover
                $(this).parent().find("ul.submenu1").slideDown('slow').show();
                $(this).parent().find("ul.submenu2").slideDown('slow').show();
                $(this).parent().find("ul.submenu3").slideDown('slow').show();	
							
			});
	
});



function changeDropDown(id,title,element)
{
                $("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout
                $("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
                $("ul.navigation li label").parent().find("ul.submenu3").slideUp('slow');   
                                
                var mediaType = 'false';
                var subCatName = 'false';
                var sortByDateVal = 'false';
                var sortByLang = 'false';
               // var displayString = '';
                if(id == 'type'){
                	
                                document.getElementById('type').innerHTML = element;
                                subCatName = document.getElementById('topic').innerHTML;
                                mediaType = title;
                                sortByLang = document.getElementById('language').innerHTML;
                                if(sortByLang == ''){
                                                sortByLang = 'false';
                                }
                                else
                            	{
                                	 if(sortByLang=='English')
                                 	{
                                 		sortByLang= 'en';
                                 	}
	                                 if(sortByLang=='Spanish')
	                             	{
	                             		sortByLang= 'es';
	                             	}
                            		
                            	}
                                
                }              
                
                if(title == '1'){    
                	
                                subCatName = element.text;
                                document.getElementById('topic').innerHTML = subCatName;
                                mediaType = document.getElementById('type').innerHTML;
                                sortByLang = document.getElementById('language').innerHTML;
                                if(sortByLang == ''){
                                                sortByLang = 'false';
                                }
                                else
                                	{
	                                	 if(sortByLang=='English')
	                                 	{
	                                 		sortByLang= 'en';
	                                 	}
		                                 if(sortByLang=='Spanish')
		                             	{
		                             		sortByLang= 'es';
		                             	}
                                		
                                	}
                            
                }              
                
                if(id == "language"){
                	
                                document.getElementById('language').innerHTML = element;
                                sortByLang = title;
                                mediaType = document.getElementById('type').innerHTML;
                                subCatName = document.getElementById('topic').innerHTML;
                                if(sortByLang=='English')
                                	{
                                		sortByLang= 'en';
                                	}
                                if(sortByLang=='Spanish')
                            	{
                            		sortByLang= 'es';
                            	}
                }
                
                if(subCatName == 'Topic'){
                                subCatName = 'false';
                }
                if(mediaType == 'All'){
                                mediaType = 'false';
                }
                if(sortByLang == 'All'){
                                sortByLang = 'false';
                }
                    
                showSortedTAListing(selectedCategoryId,selectedCategoryName,subCatName,mediaType,sortByDateVal,sortByLang);    
}




function generateClick(element)
{

    $('#'+ element).click();

}





