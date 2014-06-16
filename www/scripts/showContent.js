var spotlightSubFlag = false;
$(document)
		.ready(
				function() {

					$('.searchBar').attr('placeholder', 'Search');
					$('.searchBar').css('padding-left', '4%');

					$('.searchBar')
							.focus(
									function() {
										if ($(this).attr('placeholder') == 'Search') {
											$(this).attr('placeholder', '');
										} else if ($(this).attr('placeholder') == currentSearchKey) {
											$(this).attr('placeholder',
													currentSearchKey);
										} else if ($(this).val() != ''
												|| $(this).val() != 'Search'
												|| $(this).val() != '   ') {
											// $(this).val(' ' +
											// currentSearchKey);
											$(this).attr('placeholder',
													currentSearchKey);
										}

										if ($(this).val().trim() == 'Search') {
											$(this).val('');
										}

										$(this).val().trim();
									});

					$('.searchBar').blur(function() {

						var stringLen = $(this).val().trim();

						if (stringLen.length == 0 || $(this).val() == '') {

							$('.searchBar').attr('placeholder', 'Search');
							$(this).val().trim();
						}

						$(this).val().trim();
					});

				});

// var downloadList = new Array();
var currD = new Date();
var currM = 0;
var currY = 0;

var monthArr = [ "January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December" ];

var resUpcomingEvents = new Array();
var searchResultArray = new Array();

// --------------------------------------------- Display Upcomig Events DATA
// ------------------------------------------------------------------------------------------
function pageFlagSet(currentPage) {
	// $("#searchBusinessCategory").text('SEARCH THIS');

	if (currentPage == "businessCategory") {

		searchFromMainPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromsearchResultPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromMainPage + "searchFromMainPage");

	} else if (currentPage == "searchResultPage") {

		searchFromsearchResultPage = true;
		searchFromTAListResultPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchResultPage + "searchResultPage");

	} else if (currentPage == "TAListResult") {
		searchFromTAListResultPage = true;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromsearchResultPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromTAListResultPage +
		// "searchFromTAListResultPage");
	} else if (currentPage == "UpcomingEventsPage") {
		searchFromUpcomingEventsPage = true;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFromsearchResultPage = false;
		searchFroSubscribPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromUpcomingEventsPage +
		// "searchFromUpcomingEventsPage");

	} else if (currentPage == "subscribePage") {
		searchFroSubscribPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromsearchResultPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFroSubscribPage + "searchFroSubscribPage");

	} else if (currentPage == "aboutTechTimePage") {
		searchFromAboutPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromsearchResultPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromAboutPage + "searchFromAboutPage");

	} else if (currentPage == "contactUsPage") {
		searchFromContactUsPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromsearchResultPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromContactUsPage + "searchFromContactUsPage");

	} else if (currentPage == "DownloadsPage") {
		searchFromDownloadsPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFromsearchResultPage = false;
		searchFroSubscribPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromDownloadsPage + "searchFromDownloadsPage");

	} else if (currentPage == "faqPage") {
		searchFromFaqPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromsearchResultPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFroSubscribPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromFaqPage + "searchFromFaqPage");

	} else if (currentPage == "detailMediaPage") {

		searchFromMediaPage = true;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromAuthorDetailPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromsearchResultPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromMediaPage + "searchFromMediaPage");

	} else if (currentPage == "detailAuthor") {
		searchFromAuthorDetailPage = true;

		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromtechWatchPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;

		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	} else if (currentPage == "techWatchPage") {
		searchFromtechWatchPage = true;

		searchFromAuthorDetailPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;
		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	} else if (currentPage == "PlaylistsPage") {
		searchFromtechWatchPage = false;

		searchFromAuthorDetailPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromplaylistPage = true;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;
		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	} else if (currentPage == "playlistsItemPage") {
		searchFromtechWatchPage = false;

		searchFromAuthorDetailPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = true;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = false;
		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	} else if (currentPage == "sharePlaylistsPage") {
		searchFromtechWatchPage = false;

		searchFromAuthorDetailPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = true;
		searchAddToPlaylistPage = false;
		searchContributePage = false;
		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	} else if (currentPage == "addToPlaylistPage") {
		searchFromtechWatchPage = false;

		searchFromAuthorDetailPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = true;
		searchContributePage = false;
		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	} else if (currentPage == "ContributePage") {
		searchFromtechWatchPage = false;

		searchFromAuthorDetailPage = false;
		searchFromMediaPage = false;
		searchFromEventsPage = false;
		searchFromSpotlightPage = false;
		searchFromUpcomingEventsPage = false;
		searchFromTAListResultPage = false;
		searchFromDownloadsPage = false;
		searchFromMainPage = false;
		searchFromContactUsPage = false;
		searchFromsearchResultPage = false;
		searchFromAboutPage = false;
		searchFromFaqPage = false;
		searchFroSubscribPage = false;
		searchFromplaylistPage = false;
		searchFromplaylistitemPage = false;
		searchSharePlaylistsPage = false;
		searchAddToPlaylistPage = false;
		searchContributePage = true;
		// console.log(searchFromAuthorDetailPage +
		// "searchFromAuthorDetailPage");

	}

}

function showUpcomingEventList(viewMonth, monthName) {
	defaultNavigate();
	window.localStorage.setItem("eventmonth", viewMonth);

	spotLightFlag = false;
	eventsFlag = true;
	mediaFlag = false;
	alldownloadFlag = false;
	// alert('eventsFlag-----'+eventsFlag+'\n mediaFlag----------'+mediaFlag);

	// alert('showUpcomingEventList');
	var tempEvemnts = new Array();

	var arrayOfCategoryNames = new Array();
	var arrayOfCategories = new Array();
	var stringIWant = '';

	var strHTMLshowTAList = '';
	resUpcomingEvents = [];

	$('#UpcomingEventsContentArea').html('');
	$('#noUpcomingEventsContentArea').html('');

	// console.log('jsonData.events-----------------------'+JSON.stringify(jsonData.events));
	$.each(jsonData.events, function(key, item) {

		// console.log(item.itemId+'Event Category Array : '+item.category);
		tempEvemnts.push(item);
	});

	tempEvemnts
			.sort(function(a, b) {
				var dateA = new Date(a.publishedDate), dateB = new Date(
						b.publishedDate)
				return dateA - dateB // sort by date ascending
			});

	$.each(tempEvemnts, function(key, item) {

		var s = new Date(item.publishedDate);
		s = s.getMonth();

		// console.log('SORTED Array : '+item.publishedDate + ' -> '+s);
	});

	if (monthName != null) {

		currD = new Date();
		currM = currD.getMonth();
		currY = currD.getFullYear();

		document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - "
				+ monthName + " " + currY;

		for ( var a = 0; a <= monthArr.length; a++) {
			if (monthArr[a] == monthName) {
				currM = a;
			}
		}

		$.each(tempEvemnts, function(key, item) {

			var M = new Date(item.publishedDate);
			var c = M.getFullYear();
			var s = M.getMonth();

			// console.log('item.publishedDate : '+item.publishedDate+'\nc full
			// year :'+c+'/nS full month :'+s);

			if ((currM == s) && (currY == c)) {
				resUpcomingEvents.push(item);
			}
		});
	} else {
		if (viewMonth == 'curr') {

			currD = new Date();
			currM = currD.getMonth();
			currY = currD.getFullYear();

			// console.log('currD :'+currD+'\ncurrM :'+currM+'\ncurrY :'+currY);

			document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - "
					+ monthArr[currM] + " " + currY;

			window.localStorage.setItem("currMonth", monthArr[currM]);

			$.each(tempEvemnts, function(key, item) {

				var M = new Date(item.publishedDate);
				var c = M.getFullYear();
				var s = M.getMonth();

				// console.log('item.publishedDate : '+item.publishedDate+'\nc
				// full
				// year :'+c+'/nS full month :'+s);

				if ((currM == s) && (currY == c)) {
					resUpcomingEvents.push(item);
				}
			});

		} else if (viewMonth == 'prev') {

			currM = currD.getMonth();
			currD.setMonth(currM - 1);

			currM = currD.getMonth();
			currY = currD.getFullYear();

			document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - "
					+ monthArr[currM] + " " + currY;

			window.localStorage.setItem("currMonth", monthArr[currM]);

			$.each(tempEvemnts, function(key, item) {

				var s = new Date(item.publishedDate);
				var c = s.getFullYear();
				s = s.getMonth();

				if (currM == s && currY == c) {
					resUpcomingEvents.push(item);
				}

			});

		} else {

			// currM = currD.getMonth();

			currD.setMonth(currM + 1);

			currM = currD.getMonth();
			currY = currD.getFullYear();

			// console.log('Curr :'+currM);

			document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - "
					+ monthArr[currM] + " " + currY;

			window.localStorage.setItem("currMonth", monthArr[currM]);

			$.each(tempEvemnts, function(key, item) {

				var s = new Date(item.publishedDate);
				var c = s.getFullYear();
				s = s.getMonth();

				if (currM == s && currY == c) {
					resUpcomingEvents.push(item);
				}

			});

		}
	}

	resUpcomingEvents
			.sort(function(a, b) {
				var dateA = new Date(a.publishedDate), dateB = new Date(
						b.publishedDate)
				return dateB - dateA // sort by date ascending
			});

	$
			.each(
					resUpcomingEvents,
					function(key, itemRes) {

						var s = new Date(itemRes.publishedDate);
						s = s.getMonth();

						var actualThumb = '';
						actualThumb = '';

						// if(itemRes.thumbLoc!= ''){
						//
						// actualThumb = itemRes.thumbLoc;
						//
						// }else if(!isOnline){
						//
						// actualThumb = sPath + "/images/"
						// +itemRes.itemId+"thumb.png";
						//
						// }else{
						//
						// actualThumb = itemRes.thumb;
						//
						// }

						if (isOnline && itemRes.thumbLoc == '') {
							// online and not downloaded
							actualThumb = itemRes.thumb;
							// console.log("//online and not
							// downloaded"+actualThumb);
						} else if (isOnline && itemRes.thumbLoc != '') {
							// online and downloaded
							actualThumb = sPath + "/images/" + itemRes.itemId
									+ "thumb.png";
							// console.log("//online and
							// downloaded"+actualThumb);

						} else if (!isOnline && itemRes.thumbLoc == '') {
							// offline and not downloaded

							actualThumb = 'images/TechTime.png';
							// console.log("//offline and not
							// downloaded"+actualThumb);

						} else if (!isOnline && itemRes.thumbLoc != '') {
							// offline and downloaded
							actualThumb = sPath + "/images/" + itemRes.itemId
									+ "thumb.png";
							// console.log("//offline and
							// downloaded"+actualThumb);

						} else {
							// defaul

							actualThumb = sPath + "/images/" + itemRes.itemId
									+ "thumb.png";
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

						// console.log(itemRes.itemId+'Event Category Array :
						// '+itemRes.category);

						stringIWant = '';
						var stringIGet = itemRes.category;
						// stringIGet = stringIGet.replace(","," ");

						arrayOfCategories = stringIGet.split("|");

						for ( var i = 0; i < arrayOfCategories.length; i++) {
							var getCategoryName = new Array();
							getCategoryName = arrayOfCategories[i].split("-");

							if (i == arrayOfCategories.length - 1) {
								stringIWant += getCategoryName[0];
							} else {
								stringIWant += getCategoryName[0] + ", ";
							}
							// console.log('Event string expected
							// :'+stringIWant);
						}

						var tempId = "upcoming" + (key + 1);

						if (key < 5) {
							strHTMLshowTAList += "<div style='width:100%;' class='listItemClick'><a id='"
									+ tempId
									+ "' href='#detailMediaPage' data-transition='slide' onclick=UpcomingEventsDetail('"
									+ itemRes.itemId
									+ "') style='text-decoration:none;font-style:normal;color:black;display:block'>";
						} else {
							strHTMLshowTAList += "<div style='width:100%;' class='listItemClick'><a id='"
									+ tempId
									+ "' href='#detailMediaPage' data-transition='slide' onclick=UpcomingEventsDetail('"
									+ itemRes.itemId
									+ "') style='text-decoration:none;font-style:normal;color:black;display:none'>";
						}
						strHTMLshowTAList = strHTMLshowTAList
								+ "<table border=0 style=';width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;;margin-right: 2px;' cellpadding='0' cellspacing='0'>";

						strHTMLshowTAList = strHTMLshowTAList
								+ "<tr><td style='margin:0px;padding:0px;width:25%;'>";

						if (itemRes.authorCount == 1) {
							strHTMLshowTAList = strHTMLshowTAList
									+ "<div style='width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
						} else if (itemRes.authorCount == 2) {
							strHTMLshowTAList = strHTMLshowTAList
									+ "<div style='width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
						} else {
							strHTMLshowTAList = strHTMLshowTAList
									+ "<div style='width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
						}

						strHTMLshowTAList = strHTMLshowTAList
								+ "<td class='eventsListingTA'><b><div style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis;max-width:30%;'><label>"
								+ stringIWant
								+ "</label></div></b></td></tr></table>";

						// listing table
						strHTMLshowTAList = strHTMLshowTAList
								+ "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;;margin-right: 2px;' cellpadding='0' cellspacing='0'>";
						// strHTMLshowTAList = strHTMLshowTAList +
						// "table-layout:fixed<tr><td></td><td id=''
						// style='margin :0px; padding 0 px;
						// width:65%;font-style:bold;padding-left:12px;font-size:14px;'><b><div
						// style='white-space: nowrap; overflow: hidden;
						// text-overflow: ellipsis; width:80%;'>
						// "+stringIWant+"</div></b></td><td></td></tr>";

						strHTMLshowTAList = strHTMLshowTAList
								+ "<tr><td id='"
								+ itemRes.itemId
								+ "' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";

						if (itemRes.authorCount == 1) {
							strHTMLshowTAList = strHTMLshowTAList
									+ "<img src='"
									+ actualThumb
									+ "' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
						} else if (itemRes.authorCount == 2) {
							strHTMLshowTAList = strHTMLshowTAList
									+ "<img src='"
									+ actualThumb
									+ "' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
						} else {
							strHTMLshowTAList = strHTMLshowTAList
									+ "<img src='"
									+ actualThumb
									+ "' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
						}

						strHTMLshowTAList = strHTMLshowTAList
								+ "<td id='' style='margin :0px; padding 0 px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;'><b>"
								+ itemRes.title + "</b></td>";
						strHTMLshowTAList = strHTMLshowTAList
								+ "<td id='' style='margin :0px; padding 0 px; width:10%;' rowspan='2' align='right'>";
						strHTMLshowTAList = strHTMLshowTAList
								+ "<embed src='images/icon_event.png' type='image/svg+xml' style='height:20px;width:80%;border:none;padding:0px;margin-right:15px'/>";
						strHTMLshowTAList = strHTMLshowTAList
								+ "</td></tr><tr><td id='' style='margin:0px; padding:0px;width:65%;color: orange;font-style:normal;padding-left:10px;font-size:14px;font-weight:100;'>"
								+ authoNames + "</td></tr>";
						strHTMLshowTAList = strHTMLshowTAList
								+ "<tr><td id='' style='margin :0px; padding:0px; width:65%;font-style:normal;padding-left:10px;font-size:16px;font-weight:100;'>"
								+ itemRes.publishedDate + "</td>";
						strHTMLshowTAList = strHTMLshowTAList
								+ "<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='100%' height='20px;' style='margin-right:15px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></a></div>";
					});

	if (resUpcomingEvents.length > 5) {

		strHTMLshowTAList += "<div class = 'linkTransition' id='loadmoreUpcoming' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresult(this)'><b>Load More Results</b></div>";
	}

	if (resUpcomingEvents.length == 0) {
		$('#noUpcomingEventsContentArea')
				.html(
						'<p style="margin-left:4%;font-size:small">There are no events scheduled in this month.</p>');
		$('#noUpcomingEventsContentArea').css('height', '150');
		$('#footerPadding').css('footer', '100');
	} else {
		$('#UpcomingEventsContentArea').html(strHTMLshowTAList);
	}
}
var authornamefromid;

function UpcomingEventsDetail(itemId) {

	// console.log('itemId---'+itemId); //itemId---1632
	window.localStorage.setItem("eventitemId", itemId);
	spotLightFlag = false;
	eventsFlag = true;
	mediaFlag = false;
	playlistItemsPageFlag = false;
	alldownloadFlag = false;
	// alert('eventsFlag-----'+eventsFlag+'\n mediaFlag----------'+mediaFlag);

	var arrayOfCategoryNames = new Array();
	var arrayOfCategories = new Array();
	var stringIWant = '';

	var strHTMLDetail = '';
	strHTMLDetail = '';

	var strHTML = '';
	strHTML = '';

	var prev = 'false';
	var next = 'false';
	var index = 'false'

	if (resUpcomingEvents.length == '1') {
		prev = next = 'false';
	}

	$
			.each(
					resUpcomingEvents,
					function(key, eventItem) {
						// console.log('check------'+eventItem.category);

						stringIWant = '';
						var stringIGet = eventItem.category;

						arrayOfCategories = stringIGet.split("|");

						for ( var i = 0; i < arrayOfCategories.length; i++) {
							var getCategoryName = new Array();
							getCategoryName = arrayOfCategories[i].split("-");
							// console.log('getCategoryName[0]---'+getCategoryName[0]);
							if (i == arrayOfCategories.length - 1) {
								stringIWant += getCategoryName[0];
							} else {
								stringIWant += getCategoryName[0] + ", ";
							}
							// console.log('Event string expected
							// :'+stringIWant);
						}

						if (stringIWant.length > 35) {
							stringToDisplay = stringIWant.substring(0, 32);
							// console.log(stringToDisplay);
							var trimmedCatDisplay = stringToDisplay + "...";
							// console.log("Trimmed Cat Display --------> " +
							// trimmedCatDisplay);
							stringIWant = trimmedCatDisplay;
						}

						if (eventItem.itemId == itemId) {

							var actualLocal = '';
							actualLocal = '';
							// alert("eventItem--->"+eventItem);
							if (eventItem.actualLoc != '') {
								actualLocal = eventItem.actualLoc;
							} else if (!isOnline) {
								// Events Change
								actualLocal = sPath + "/images/"
										+ eventItem.itemId + "actual.png";

							} else {
								actualLocal = eventItem.actual;
							}

							index = key;

							strHTMLDetail += "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
							if (eventItem.authorCount == 1) {
								strHTMLDetail += "<img id='docImg' src='"
										+ actualLocal
										+ "' style='border:none; width:90%;margin:10px 10px;'/><br></td>";
							} else if (eventItem.authorCount == 2) {
								strHTMLDetail += "<img id='docImg' src='"
										+ actualLocal
										+ "' style='border:none; width:90%;margin:10px 10px;'/><br></td>";
							} else {
								strHTMLDetail += "<img id='docImg' src='"
										+ actualLocal
										+ "' style='border:none; width:90%;  margin:10px 10px;'/><br></td>";
							}

							strHTMLDetail += "<td style='width : 50%'><br><br><br></td></tr>";

							strHTMLDetail += "<tr><td style='width : 100%' colspan='2'style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"
									+ stringIWant + "</td> </tr>";
							strHTMLDetail += "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_event.png' style='height:20px; width:20px; border:none;margin:5px; '/>";
							strHTMLDetail += "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"
									+ eventItem.title + "</label><br>";

							$
									.each(
											eventItem.author,
											function(key, tempAuthor) {
												authornamefromid = tempAuthor;

												strHTMLDetail += "<a id='"
														+ tempAuthor
														+ "' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id);' href='#detailAuthor'>";
												strHTMLDetail += "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"
														+ tempAuthor
														+ "</label></a><br>";

											});

							strHTMLDetail += "<label id='videoDate' style='font-size: 14px;'>"
									+ eventItem.publishedDate + "</label><br>";
							strHTMLDetail += "<label id='videotime' style='font-size: 14px;'>"
									+ eventItem.etime + "</label><br><br><br>";
							strHTMLDetail += "<label id='videoDescription' style='font-size: 14px;'>"
									+ eventItem.description + "</label>";
							strHTMLDetail += "<br><br></td></tr></table>";
						}

					});

	var nextItem = 'false';

	$.each(resUpcomingEvents, function(key, eventItem) {

		if (key < index) {
			prev = eventItem.itemId;
		}
		if (nextItem == 'true') {
			next = eventItem.itemId;
			nextItem = 'false';
		}
		if (eventItem.itemId == itemId) {
			nextItem = 'true';
		}
	}); // alert('prev

	strHTML += "<div style='background-color: white; width: 100%; height: 30px'>";
	strHTML += "<table style='width: 100%;' border='0'><tr>";
	strHTML += "<td id='prevBtn' style='padding-left:3%; padding-top:7px; vertical-align:middle; width:50%' align='left'>";

	if (prev != 'false') { // strHTML += "<div
							// onclick='UpcomingEventsDetail("+prev+")'
							// style='height:100%; width:100%;border:none'><img
							// src='images/btn_previous.png' width='90'
							// class='nextprevEffects'/></div>";
		strHTML += "<div onclick='UpcomingEventsDetail("
				+ prev
				+ ")' style='height:100%; width:100%;border:none'><img src='images/btn_previous.png' height='25' width='90' class='nextprevEffects'/></div>";

	}

	strHTML += "</td><td id='nextBtn' style='padding-right:3%; padding-top:7px; vertical-align:middle;width:50%;border:none;' align='right'>";

	if (next != 'false') {

		strHTML += "<div onclick=UpcomingEventsDetail('"
				+ next
				+ "') style='border:none; height:100%; width:100%' class='nextprevEffects'><img src='images/btn_next.png' height='22' width='75' class='nextprevEffects' /></div>";
		// strHTML += "<div onclick=UpcomingEventsDetail('"+next+"')
		// style='border:none; height:100%; width:100%'
		// class='nextprevEffects'><img src='images/btn_next.png' width='60'
		// class='nextprevEffects' /></div>";
		// strHTML += "<div style='border:none;height:100%;
		// width:100%'>asdasdsad</div>";

	}

	strHTML += "</td></tr></table></div></div><hr style='width:100%;background-color: white; color: grey; height:0.5px;margin-top:-30px;'>";

	$('#detailPageArea').html(strHTMLDetail);
	$('#prevNextContentArea').html(strHTML);

}

function showmoreresult(variable) {
	// alert("in show more result");
	var titleCount = parseInt(variable.title) + 5;
	document.getElementById('loadmoreUpcoming').title = titleCount;
	if (resUpcomingEvents.length) {
		$
				.each(
						resUpcomingEvents,
						function(key, itemRes) {
							if ((key + 1) < titleCount) {
								document.getElementById('upcoming' + (key + 1)).style.display = "block";
							}
						});
	}
	// if((resUpcomingEvents.length - titleCount) < 0){
	// document.getElementById('loadmoreUpcoming').style.display = "none";
	// }

	if (titleCount >= resUpcomingEvents.length) {
		document.getElementById('loadmoreUpcoming').style.display = "none";
	}
}

// --------------------------------------------- Display spotResult DATA
// ------------------------------------------------------------------------------------------

function showSpotData() {

	$('#detailPageArea').html('');
	document.getElementById('spotItemContent').style.display = "block";
	$.mobile.changePage("#detailMediaPage");
}

function setFlag(a) {
	if (a == "spotlight") {
		mediaFlag = false;
		spotLightFlag = true;
		playlistItemsPageFlag = false;

	} else if (a == "media") {
		mediaFlag = true;
		spotLightFlag = false;
		playlistItemsPageFlag = false;
	}

	eventsFlag = false;

}
// ----------------------------------------------List Of subscribed
// TAs----------------------------------

function getList() {
	var strHTMLCategory = "";
	$('#TAcontentArea').empty('');

	document.getElementById('noSubscribeDiv').style.display = "none";

	// alert("noSubscribe---"+noSubscribe);
	if (noSubscribe == "true") {

		$
				.each(
						jsonData.category,
						function(key, item) {

							if (item.subscribe == "yes") {

								strHTMLCategory = strHTMLCategory
										+ "<div class='listItemClick'><div class=dynamicDivList><li><a id="
										+ item.categoryname
										+ " class='anchorCategory'  href='#TAListResult' onclick='showTAListResult("
										+ JSON.stringify(item.categoryname)
										+ " , "
										+ JSON.stringify(item.categoryid)
										+ ")'>";
								strHTMLCategory = strHTMLCategory
										+ "<div style='color:white;margin-left:3.5%'> "
										+ item.categoryname
										+ "<img src='images/icon_whiteRight.png' width='13' height='13' style='float:right;padding-right:4%;'/>";
								strHTMLCategory = strHTMLCategory
										+ "</div></a></li></div></div>";
							}
						});
	} else {
		document.getElementById('noSubscribeDiv').style.display = "block";
	}
	$('#TAcontentArea').html(strHTMLCategory);
	strHTMLCategory = '';
}

var chkfileFlag = false;
// appendPath = "file:///mnt/sdcard/Videos/images/";
var appendPath = ' ';
var chkpath = '';
var newid = ' ';
var newname = ' ';
var newlink = ' ';
var newtype = ' ';

function checkFileExists(filefullpath, testid, name, link, type) {
	newid = ' ';
	newid = testid;
	newname = name;
	newlink = link;
	// alert("newlink" + newlink);
	newtype = type;
	// console.log("testid"+testid+"newid"+newid+"filefullpath"+filefullpath);

	window.resolveLocalFileSystemURI(filefullpath, function() {
	}, function() {
		// console.log("checkFileExists fail new"+testid);
		downloadThumbImages(testid, name, link, type);
		// alert(testid + " " + name + " " + link + " " + type);
	});
}

var currentCategoryOff = '';
var currentCategoryIdOff = '';

function showTAListResult(currentCategory, currentCategoryId) {

	analytics.trackEvent("AD Technology Area", "Technology Area visits",
			currentCategory, 1, function() {
				// alert("analytics.trackEvent successful!");
			}, function(error) {
				// alert("analytics.trackEvent Failed! " + error);

			});

	// console.log(currentCategory+'<---->'+currentCategoryId);
	searchFlag = false;

	// console.log('searchFlag-else-'+searchFlag);

	window.localStorage.setItem("currentCategoryOff", currentCategory);
	window.localStorage.setItem("currentCategoryIdOff", currentCategoryId);

	appendPath = sPath + "/images/";
	document.getElementById('type').innerHTML = 'All';
	document.getElementById('topic').innerHTML = 'Topic';

	// showNavigateDiv("navigateDiv");

	$.each(jsonData.audio, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		// console.log("check file path" + chkpath);
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);

	});
	$.each(jsonData.video, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});
	$.each(jsonData.documents, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});

	$.each(jsonData.panelDiscussions, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});

	$.each(jsonData.interviews, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});

	$.each(jsonData.techConf, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});
	$.each(jsonData.technologySessions, function(key, oldItem) {
		chkpath = appendPath + oldItem.itemId + "thumb.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'thumb', oldItem.thumb,
				oldItem.type);

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});
	
	
		$.each(jsonData.contributor, function(key, oldItem) {
		

		chkpath = '';
		chkpath = appendPath + oldItem.itemId + "actual.png";
		checkFileExistsEve(chkpath, oldItem.itemId, 'actual', oldItem.actual,
				oldItem.type);
	});

	// compareAndUpdateJSON1(jsonData);
	// setTimeout(getFileSystemRefForWriting(jsonData),2000);

	showSortedTAListing(currentCategoryId, currentCategory, 'false', 'false',
			'false', 'false'); // updated

}

var currElementId = '';
var currElementtype = '';
var currElementcountNum = '';

function UrlExistsImage(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	// alert("httP"+http.status);
	return http.status;
}

var isAudioStreaming = 'false';

function showAudioStreaming(cId)

{
	if (isAudioStreaming == 'false') {
		document.getElementById('audioP').play();
		isAudioStreaming = 'true';

	} else if (isAudioStreaming == 'true') {
		document.getElementById('audioP').pause();
		isAudioStreaming = 'false';
	}
}

function showAuthorDetailPage(authorName) {

	window.localStorage.setItem("authorName", authorName);
	var strHTMLDetail = "";
	var author = '';
	author = authorName;

	$('#AuthorContentArea').html('');

	$
			.each(
					jsonData.contributor,
					function(key, itemContributor) {

						// console.log(itemContributor.title +'=='+ author);
						if (itemContributor.title == author) {

							var actualLocal = '';
							
							//alert("itemContributor.itemId  -- " + itemContributor.itemId );
						
						if(isOnline)
						{
							if(downloadedActuals.indexOf(itemContributor.itemId + "actual.png") != -1)
								{
									actualLocal = sPath + "/images/"+itemContributor.itemId + "actual.png";
								} else if(downloadedActuals.indexOf(itemContributor.itemId + "actual.png") == -1)
								{
									if(itemContributor.actual != "")
									{
									actualLocal = itemContributor.actual;
									} else if(itemContributor.actual == "")
									{
									actualLocal = 'images/TechTime.png';
									}
								}
						} else if(!isOnline)
						{
							if(downloadedActuals.indexOf(itemContributor.itemId + "actual.png") != -1)
								{
									actualLocal = sPath + "/images/"+itemContributor.itemId + "actual.png";
								} else if(downloadedActuals.indexOf(itemContributor.itemId + "actual.png") == -1)
								{
									actualLocal = 'images/TechTime.png';
								}
						}
						
					
						


							strHTMLDetail = strHTMLDetail
									+ "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 30%'>";
							strHTMLDetail = strHTMLDetail
									+ "<img id='videoImg' src='"
									+ actualLocal
									+ "' style='border : none; height:170px; width:120px; margin:10px 10px;'/><br><br></td>";
							strHTMLDetail = strHTMLDetail
									+ "<td style='width : 70%'><br>";
							strHTMLDetail = strHTMLDetail + "</td></tr>";

							strHTMLDetail = strHTMLDetail
									+ "<tr><td style='width : 100%' colspan='2'>";

							strHTMLDetail = strHTMLDetail
									+ "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"
									+ itemContributor.title + "</label><br>";
							if (itemContributor.email != "")

							{

								strHTMLDetail = strHTMLDetail
										+ "<label id='emailAuthor' style='font-size: 14px;font-family: AgfaRotisSans;'>"
										+ itemContributor.email
										+ "</label><br>";

							}

							strHTMLDetail = strHTMLDetail
									+ "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;'>"
									+ itemContributor.contributor
									+ "</label><br><br>";

							strHTMLDetail = strHTMLDetail
									+ "<label id='videoDescription' style='font-size: 14px;'>"
									+ itemContributor.description + "</label>";

							strHTMLDetail = strHTMLDetail
									+ "<br><br></td></tr></table></div>";

						}

					});

	// console.log("strHTMLDetail"+strHTMLDetail);

	$('#AuthorContentArea').html(strHTMLDetail);

	strHTMLDetail = '';

}

// --------------------------------------------- Subscribe content
// ------------------------------------------------------------------------------------------

var flagSubscribeCount = 0;
var atleastOneAssetTypeChecked = 'false';
var atleastOneTAChecked = 'false';

function showSubscribeContent() {

	defaultNavigate();
	// alert('showSubscribeContent');
	var xmlArr = '';

	flagSubscribeCount = '0';
	atleastOneAssetTypeChecked = 'false';

	var flagPodcast = "false";
	var flagDocument = "false";
	var flagEvent = "false";

	$('#subscribePageContentArea').html('');

	xmlArr += '<table id="technologyAreas" border="0" style="width: 100%; margin: 0px; padding: 0px;">';
	xmlArr += '<tr><td style="width: 60%">';
	xmlArr += '<fieldset id="techAreasCB" data-role="controlgroup" name="technologyAreasCheck" style="border:none;">';
	xmlArr += '<legend style="font-weight: bold; font-size:16px;background : #F0EFED;width:100%">Areas:</legend>';

	// console.log('123456789 *****-->\n\n'+JSON.stringify(jsonData.category));

	$
			.each(
					jsonData.category,
					function(key, item) {

						// alert('-->'+item.categoryname);

						if (item.subscribe == "yes") {

							xmlArr += '<div style="width:100%; background:#F0EFED;"><table border="0"><tr id="digiHide"><td valign="top"><input type="checkbox" data-mini="true" name="category'
									+ item.categoryid
									+ '" id="checkbox'
									+ item.categoryid
									+ '"  class="techAreasCheckBox" checked="checked"/></td><td><label class="techAreasLabel" >'
									+ item.categoryname
									+ '</label></td></tr></table></div>';

							flagSubscribeCount++;

						} else {

							if (item.categoryname.toLowerCase() != 'digital') {

								xmlArr += '<div style="width:100%; background:#F0EFED;"><table border="0"><tr><td valign="top"><input type="checkbox" data-mini="true" name="category'
										+ item.categoryid
										+ '" id="checkbox'
										+ item.categoryid
										+ '" class="techAreasCheckBox" /></td><td><label class="techAreasLabel">'
										+ item.categoryname
										+ '</label></td></tr></table></div>';
							}
						}

						if (item.subbscribePodcast == "yes") {
							flagPodcast = "yes";
							atleastOneAssetTypeChecked = 'true';
						}
						if (item.subscribeDocuments == "yes") {
							flagDocument = "yes";
							atleastOneAssetTypeChecked = 'true';
						}
						if (item.subbscribeEvent == "yes") {

							flagEvent = "yes";
							atleastOneAssetTypeChecked = 'true';

						}

					}); // Entries.Each function

	xmlArr += '</fieldset>';
	xmlArr += '<label id="selectAllTechAreas" style="color: orange; padding-left: 10px;" onclick=subAllTechAreas()><b><div class = "backButtonClickEffect">Select All</div></b></label>';
	xmlArr += '</td>';
	xmlArr += '<td id="cellAT" style="width: 60%" valign="top">';
	xmlArr += '<fieldset id="assetTypesCB" data-role="controlgroup">';
	xmlArr += '<legend style="font-weight: bold; font-size:16px;background : #F0EFED;;width:100%">Types:</legend>';

	if ((flagPodcast == "yes" && flagDocument == "yes" && flagEvent == "yes")
			|| (flagPodcast != "yes" && flagDocument != "yes" && flagEvent != "yes")) {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';

	} else if (flagPodcast == "yes" && flagDocument == "yes"
			&& flagEvent != "yes") {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox"/></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';
	} else if (flagPodcast == "yes" && flagDocument != "yes"
			&& flagEvent == "yes") {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';

	} else if (flagPodcast == "yes" && flagDocument != "yes"
			&& flagEvent != "yes") {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';

	} else if (flagPodcast != "yes" && flagDocument == "yes"
			&& flagEvent == "yes") {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';
	} else if (flagPodcast != "yes" && flagDocument == "yes"
			&& flagEvent != "yes") {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';
	} else if (flagPodcast != "yes" && flagDocument != "yes"
			&& flagEvent == "yes") {
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel">Audio/Videos</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Documents</label></td></tr></table></div>';
		xmlArr += '<div style="width:100%;background : #F0EFED;"><table><tr><td valign="top"><input type="checkbox" data-mini="true" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></td></tr></table></div>';
	}

	xmlArr += '</fieldset><label class = "backButtonClickEffect" id="selectAllAssetTypes" style="color: orange; padding-left: 10px" onclick=subAllAssetTypes()><b><div class = "backButtonClickEffect">Select All</div></b></label></td></tr>';
	xmlArr += '<tr><td style="height:60px"><br><img id="clearAllSelections" src="images/btn_clear.png" style="float:left; margin-left: 2%;width:100px;background:#F8991D;" class = "buttonClickEffect"/></td><td style="height:60px"><br><img id="subnscribeNow" src="images/btn_subscribeNow.png" style="float:left; padding-right:2px;width:100px;padding-left:5px;background:#F8991D;"  onclick="showa(this)" class = "buttonClickEffect" /><td></tr></table>';

	if (flagSubscribeCount) {
		xmlArr += '</div><br><br>';

	}

	xmlArr += '<br><br><div class = "buttonClickEffect" style="width:100%;padding-left: 10px"><a href="#" data-role="button" data-mini="true" data-inline="true" style="text-decoration:none;float:left;color:orange" onclick="unSubAlert()"><div id="unsubnscribeNow">How to Un-Subscribe?</div></a></div><br><br> ';

	$.mobile.changePage("#subscribePage");

	$('#subscribePageContentArea').html(xmlArr);

	// showNavigateDiv("navigateDiv");

	xmlArr = '';
}

function unSubAlert() {
	jAlert(
			'To unsubscribe, un-select the Area or Asset Type and select "Subscribe Now"',
			'Tech Time');
}

function subAllTechAreas() {
	$('.techAreasCheckBox').attr('checked', true);
}

function subAllAssetTypes() {
	$('.assetTypeCheckBox').attr('checked', true);
}

$("#clearAllSelections").live("click", function(event) {

	$('.assetTypeCheckBox').attr('checked', false);
	$('.techAreasCheckBox').attr('checked', false);

});

function showa(mode) {
	var csMode = '';

	if (mode.id == 'subnscribeNow') {
		csMode = 'subscribe';
	} else {
		csMode = 'unsubscribe';
	}

	var technologyAreas = $('.techAreasCheckBox');
	var assetTypes = $('.assetTypeCheckBox');

	flagSubscribeCount = atleastOneAssetTypeChecked = 'false';

	technologyAreas.each(function() {
		if ($(this).is(':checked')) {
			flagSubscribeCount = "true";
		}
	});

	assetTypes.each(function() {
		if ($(this).is(':checked')) {
			atleastOneAssetTypeChecked = "true";
		}
	});

	// alert('1223 -->'+flagSubscribeCount+'-->'+atleastOneAssetTypeChecked);

	/* Checkboxes Checked Condition */

	if (flagSubscribeCount == "false" && atleastOneAssetTypeChecked == "true") {
		// alert("You should select at least one technology area");
		jAlert('You should select at least one area.', 'Tech Time');

		flagSubscribeCount = "false;"
		atleastOneAssetTypeChecked = "false";

	} else if (flagSubscribeCount == "true"
			&& atleastOneAssetTypeChecked == "false") {

		// alert("You should select at least one asset type");
		jAlert('You should select at least one asset type.', 'Tech Time');

		flagSubscribeCount = "false;"
		atleastOneAssetTypeChecked = "false";

	} else if (flagSubscribeCount == "false"
			&& atleastOneAssetTypeChecked == "false") {

		// alert("You should select at least one technology area and one
		// asset type");
		jAlert('You should select at least one area and one asset type.',
				'Tech Time');

		flagSubscribeCount = "false;"
		atleastOneAssetTypeChecked = "false";

	} else if (flagSubscribeCount == "true"
			&& atleastOneAssetTypeChecked == "true" && csMode == "subscribe") {

		checkedCategoryList(csMode);

	} else if (flagSubscribeCount == "true"
			&& atleastOneAssetTypeChecked == "true" && csMode == "unsubscribe") {

		checkedCategoryList(csMode);
	}

}

// Gets the list of Checked Checkboxes
function checkedCategoryList(mode) {
	var checkedArray = $('#techAreasCB :checkbox:checked');
	var categoryId = [];
	var clMode = mode;

	checkedArray.each(function() {

		var categoryName = $(this).attr("name");
		var categoryNumber = categoryName.slice(8);

		categoryId.push(categoryNumber);
	});

	// alert('1234567890--->'+categoryId);

	prepareJSON(categoryId, clMode)
}

// Prepares JSON Data to be submitted to the User
function prepareJSON(technologyAreas, mode) {
	var localTechnologyAreas = technologyAreas;
	var localMode = mode;

	var JSONData = [];

	if (localMode == "subscribe") {
		JSONData += '{"data":{"mode" : "subscribe","technologyareas":[';

	} else if (localMode == "unsubscribe") {

		JSONData += '{"data":{"mode" : "unsubscribe","technologyareas":[';

	}

	for (i = 0; i < localTechnologyAreas.length; i++) {
		if (i < localTechnologyAreas.length - 1) {
			JSONData += localTechnologyAreas[i] + ',';

		} else {

			JSONData += localTechnologyAreas[i];
		}
	}

	var typeAV = $('#audioVideo');
	var typeDoc = $('#documents');
	var typeEvent = $('#events');

	if (typeAV.is(':checked') && typeDoc.is(':checked')
			&& typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["podcast","documents","events"]}}';
	} else if (typeAV.is(':checked') && typeDoc.is(':checked')
			&& !typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["podcast","documents"]}}';
	} else if (typeAV.is(':checked') && !typeDoc.is(':checked')
			&& typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["podcast","events"]}}';
	} else if (typeAV.is(':checked') && !typeDoc.is(':checked')
			&& !typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["podcast"]}}';
	} else if (!typeAV.is(':checked') && typeDoc.is(':checked')
			&& typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["documents","events"]}}';
	} else if (!typeAV.is(':checked') && typeDoc.is(':checked')
			&& !typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["documents"]}}';
	} else if (!typeAV.is(':checked') && !typeDoc.is(':checked')
			&& typeEvent.is(':checked')) {
		JSONData += '],"assettypes":["events"]}}';
	} else if (!typeAV.is(':checked') && !typeDoc.is(':checked')
			&& !typeEvent.is(':checked')) {
		JSONData += '],"assettypes":[]}}';
	}

	// if(typeAV.is(':checked') && typeDoc.is(':checked'))
	// {
	// JSONData += '],"assettypes":["podcast","documents"]}}';
	// }
	//    
	// if(typeAV.is(':checked') && !typeDoc.is(':checked'))
	// {
	// JSONData += '],"assettypes":["podcast"]}}';
	// }
	//    
	// if(!typeAV.is(':checked') && typeDoc.is(':checked'))
	// {
	// JSONData += '],"assettypes":["documents"]}}';
	// }
	//    
	// if(!typeAV.is(':checked') && !typeDoc.is(':checked'))
	// {
	// JSONData += '],"assettypes":[]}}'
	// }

	/* postJSONData(JSONData, localMode); */

	postJSONData(JSONData, localMode);
}

function postJSONData(localJSONData, postMode) {

	var uName = document.getElementById("lblUserName").innerHTML;
	uName = uName.replace(/\./g, '_');

	var linkSubscribe = 'https://techtime.accenture.com/techtimemobile/subscribe-service/uid=';
	linkSubscribe = linkSubscribe + uName;

	// alert('-->'+linkSubscribe);
	// console.log('-->'+postMode);
	// console.log('-->'+linkSubscribe);
	// console.log('-->'+JSON.stringify(localJSONData));

	var localJSONData1 = {
		"data" : {
			"mode" : "logout"
		}
	};

	if (postMode == 'logout') {
		localJSONData = JSON.stringify(localJSONData1);
		// getFileSystemRefForWriting(jsonData);
		// compareAndUpdateJSON1(jsonData);
	}

	// alert('-->'+localJSONData);
	// alert('-->'+JSON.stringify(localJSONData));
	if (isOnline) {

		// alert('isOnline');
		$
				.ajax({

					type : 'POST',
					url : linkSubscribe,
					data : localJSONData,
					dataType : 'xml',
					contentType : 'application/json',
					success : function(data) {

						if (postMode == 'subscribe') {
							jAlert(
									'Thank you for your Subscription to Tech Time.',
									'Tech Time');

						} else if (postMode == 'logout') {
							jAlert('Logged Out Successfully.', 'Tech Time');
							$.mobile.changePage("#loggedOutPage");

						} else {
							jAlert(
									'Thank you for your Un-Subscription to Tech Time.',
									'Tech Time');
						}
						// $("#imgRefreshProgress").show();
						// getSubscribeRss();

					},
					error : function(xhr, textStatus, error) {
						// alert("ERROR POSTING THE JSON");
						jAlert(
								'Could not subscribe you to the selected Areas. Please try again.',
								'Tech Time');
						console
								.log('*******************************************************')
						console.log('In Failure' + JSON.stringify(xhr));
						console.log("textStatus:" + textStatus + ':' + error);
						console
								.log('*******************************************************')
					}

				}); // Ajax Call
	} else {
		if (postMode == 'logout') {

			// $.mobile.changePage("#loggedOutPage");
			// jAlert('Logged Out Succesfully.', 'Tech Time');

		} else {
			jAlert('To \"Subscribe\" or \"Unsubscribe"\, please go online.',
					'Tech Time');
		}

	}

	// $.mobile.changePage("#businessCategory");
}

// --------------------------------------------- About TechTime content
// ------------------------------------------------------------------------------------------

function showAboutTTArea() {
	var strHTMLAboutTT = "";

	$('#aboutTectTimeContentArea').empty('');

	defaultNavigate();
	// searchFromMediaPage = false;
	// searchFromEventsPage = false;
	// searchFromSpotlightPage = false;
	// searchFromUpcomingEventsPage = false;
	// searchFromTAListResultPage = false;
	// searchFromAuthorDetailPage = false;
	// searchFromDownloadsPage = false;
	// searchFromMainPage = false;
	// searchFromContactUsPage = false;
	// searchFromAboutPage = true;
	// searchFromFaqPage = false;
	// searchFroSubscribPage = false;

	$
			.each(
					jsonData.aboutTechTime,
					function(key, ATTitem) {

						strHTMLAboutTT = strHTMLAboutTT
								+ "<div style='margin :0px; padding 0px; background:none; width:90%; border:none;font-size:x-small'>"
								+ ATTitem.title + "</div>";
						strHTMLAboutTT = strHTMLAboutTT
								+ "<div style='margin :0px; padding 0px; background:none; width:90%; border:none;font-size:x-small'>"
								+ ATTitem.description + "</div>";

						if (ATTitem.image != '') {

							if (isOnline) {
								strHTMLAboutTT = strHTMLAboutTT
										+ "<div style='width:90%;padding 0px;'><img src='"
										+ ATTitem.image
										+ "' style = 'width : 100%;' /></div>";
							} else {
								strHTMLAboutTT = strHTMLAboutTT
										+ "<div style='width:90%;padding 0px;'><img src='images/aboutTechtime.png' style = 'width : 100%;' /></div>";
							}
						}

					});

	$('#aboutTectTimeContentArea').html(strHTMLAboutTT);

	// showNavigateDiv("navigateDiv");

}

// --------------------------------------------- Contribute content
// ------------------------------------------------------------------------------------------

function contributePageArea() {
	var strHTMLContributeTT = "";

	strHTMLContributeTT = strHTMLContributeTT
			+ "<label style='font-size: 24px; padding-left: 15px;font-family: AgfaRotisSans;font-weight:bold'>Contribute</label>";
	strHTMLContributeTT = strHTMLContributeTT + "<div id='#record'></div>";

	$('#contributeContentArea').html(strHTMLContributeTT);

	// showNavigateDiv("navigateDiv");

};

// --------------------------------------------- Display FAQ DATA
// ------------------------------------------------------------------------------------------

function showHideFaq(element) {
	var bTemp = $('#' + element.id + 'Content').is(':visible');

	if (!bTemp) {
		$('#' + element.id + 'Content').show('fast');
		document.getElementById(element.id).innerHTML = "Hide Answer";
		$("#" + element.id).addClass("backButtonClickEffect");

	} else {
		$('#' + element.id + 'Content').hide('fast');
		document.getElementById(element.id).innerHTML = "Show Answer";
		$("#" + element.id).addClass("backButtonClickEffect");

	}
}

function showFaqContent() {

	$('#faqContentArea').empty('');

	defaultNavigate();
	// searchFromMediaPage = false;
	// searchFromEventsPage = false;
	// searchFromSpotlightPage = false;
	// searchFromUpcomingEventsPage = false;
	// searchFromTAListResultPage = false;
	// searchFromAuthorDetailPage = false;
	// searchFromDownloadsPage = false;
	// searchFromMainPage = false;
	// searchFromContactUsPage = false;
	// searchFromAboutPage = false;
	// searchFromFaqPage = true;
	// searchFroSubscribPage = false;

	var strHTMLCategory = "";

	$
			.each(
					jsonData.faq,
					function(index, item) {
						var indexTemp = item.qOrder + "Index";
						var titleTemp = item.qOrder + "Toggle";
						var tmpImage1 = item.qOrder + "ToggleContent";
						var tmpImage2 = item.qOrder + "ToggleContent";
						var displayTemp = item.qOrder + "ToggleContent";
						var image1 = item.sImage1;
						var image2 = item.sImage2;

						strHTMLCategory = strHTMLCategory
								+ "<table border=0 style='width:100%; margin :0px; padding 0 px; border:none;' cellpadding='0' cellspacing='0'>";

						if (image1 != "" || image2 != "") {

							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ indexTemp
									+ " style='margin:0px; padding:0px; background:none; width:10%; border: none;margin-left: 4%;font-size:small;font-weight: bold;vertical-align : top;' align='center'>"
									+ item.qOrder + ". </td>";
							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ item.qOrder
									+ " style='margin :0px; padding 0px; background:none; width:70%; border:none; margin-left: 2%;font-size:small;font-weight: bold;vertical-align : top'>"
									+ item.title + "</td>";
							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ titleTemp
									+ " style='margin:0px; padding:0px; background:none; width:20%; border:none;color:orange;font-size:x-small;vertical-align : bottom;' onclick='showHideFaq(this)' align='left'>Show Answer</td></tr>";
							strHTMLCategory = strHTMLCategory
									+ "<tr><td style='margin :0px; padding 0 px;background:none ; width : 100%;border:none' colspan='3'><hr style='color:red;width:95%'></td></tr><tr>";
							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ displayTemp
									+ " style='margin :0px; padding:0px; background:none; width:100%; display:none; border:none;font-size:small;' colspan='3'><div style='width : 90%; margin-left: 4%'>"
									+ item.description + "<br><br>";
							strHTMLCategory = strHTMLCategory
									+ "<div style='margin-left: 0%;border:none;width:50%'><img src='"
									+ image1
									+ "' height='250' width='300' /></div><br>";
							strHTMLCategory = strHTMLCategory
									+ "<br><div style='width:50%;border:none;'><img src='"
									+ image2
									+ "'  height='90' width='300' /></div></div></td></tr></table><br>";

						} else {

							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ indexTemp
									+ " style='margin:0px; padding:0px; background:none; width:10%; border:none;margin-left: 4%;font-size:small;font-weight: bold;vertical-align : top;' align='center';>"
									+ item.qOrder + ". </td>";
							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ item.qOrder
									+ " style='margin :0px;padding 0px; background:none; width:70%; border:none;margin-left: 2%;font-size:small;font-weight: bold;'>"
									+ item.title + "</td>";
							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ titleTemp
									+ " style='margin:0px; padding:0px; background:none; width:20%; border:none;color:orange;font-size:x-small;vertical-align : bottom; font-size:x-small;' onclick='showHideFaq(this)' align='left'>Show Answer</td></tr>";
							strHTMLCategory = strHTMLCategory
									+ "<tr><td style='margin :0px; padding 0 px;background:none ; width : 100%;border:none' colspan='3'><hr style='color:red;width:95%'></td></tr><tr>";
							strHTMLCategory = strHTMLCategory
									+ "<td id="
									+ displayTemp
									+ " style='margin :0px; padding:0px; background:none; width:100%; display:none; border:none;font-size:small;' colspan='3'><div style='width : 90%; margin-left: 4%'>"
									+ item.description
									+ "</td></tr></table><br>";

						}

					});

	$('#faqContentArea').html(strHTMLCategory);

}

function changeIsdownloadStatusAfterDelete(tempfilePath, itemId, type) {

	//alert('changeIsdownloadStatusAfterDelete itemId 1 :' + itemId);
	// downloadedFiles.splice(downloadedFiles.indexOf('itemId'),1));
	itemId = itemId.substring(2, itemId.length);
	//alert('changeIsdownloadStatusAfterDelete itemId 2 :' + itemId);

	var testChar = tempfilePath.lastIndexOf('/');
	var tempMedia = tempfilePath.substr(testChar + 1, 1);
	var tempDocument = tempfilePath.substr(testChar + 2, 1);

	// console.log('item Id :'+itemId+'\n tempMedia --->'+tempMedia+'\n
	// tempDocument --->'+tempDocument);

	if (tempMedia == 'D') {

		$.each(jsonData.documents, function(key, documentItem) {

			if (documentItem.itemId == itemId) {

				if (tempDocument == 'D') {

					documentItem.isDownloaded = 'false';
					documentItem.localPath = "";
				}
			}
		});
		$.each(jsonData.spotLight, function(key, documentItem) {

			if (documentItem.itemId == itemId) {

				if (tempDocument == 'D') {

					documentItem.isDownloaded = 'false';
					documentItem.localPath = "";
				}
			}
		});

		$.each(jsonData.spotLightDownloaded, function(key, documentItem) {

			if (documentItem.itemId == itemId) {

				if (tempDocument == 'D') {

					documentItem.isDownloaded = 'false';
					documentItem.localPath = "";
				}
			}
		});
	}

	if (tempMedia == 'A') {

		$.each(jsonData.audio, function(key, audioItem) {

			// alert('audioItem.itemId-----'+audioItem.itemId+'\n
			// itemId--->'+itemId);
			if (audioItem.itemId == itemId) {

				if (tempDocument == 'A') {
					audioItem.localPathAudio = "";
					audioItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					audioItem.localPathVideo = "";
					audioItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					audioItem.localPathTranscript = "";
					audioItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					audioItem.localPathPresentation = "";
					audioItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLight, function(key, audioItem) {

			// alert('audioItem.itemId-----'+audioItem.itemId+'\n
			// itemId--->'+itemId);
			if (audioItem.itemId == itemId) {

				if (tempDocument == 'A') {
					audioItem.localPathAudio = "";
					audioItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					audioItem.localPathVideo = "";
					audioItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					audioItem.localPathTranscript = "";
					audioItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					audioItem.localPathPresentation = "";
					audioItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLightDownloaded, function(key, audioItem) {

			if (audioItem.itemId == itemId) {

				if (tempDocument == 'A') {
					audioItem.localPathAudio = "";
					audioItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					audioItem.localPathVideo = "";
					audioItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					audioItem.localPathTranscript = "";
					audioItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					audioItem.localPathPresentation = "";
					audioItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.technologySessions, function(key, audioItem) {
			if (audioItem.itemId == itemId) {
				if (tempDocument == 'A') {
					audioItem.localPathAudio = "";
					audioItem.isDownloadedAudio = 'false';
				}
				if (tempDocument == 'V') {
					audioItem.localPathVideo = "";
					audioItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					audioItem.localPathTranscript = "";
					audioItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					audioItem.localPathPresentation = "";
					audioItem.isDownloadedPresentation = 'false';
				}
			}
		});
	}

	if (tempMedia == 'V') {

		$.each(jsonData.video, function(key, videoItem) {

			if (videoItem.itemId == itemId) {

				if (tempDocument == 'A') {
					videoItem.localPathAudio = "";
					videoItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					videoItem.localPathVideo = "";
					videoItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					videoItem.localPathTranscript = "";
					videoItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					videoItem.localPathPresentation = "";
					videoItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLight, function(key, videoItem) {

			if (videoItem.itemId == itemId) {

				if (tempDocument == 'A') {
					videoItem.localPathAudio = "";
					videoItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					videoItem.localPathVideo = "";
					videoItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					videoItem.localPathTranscript = "";
					videoItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					videoItem.localPathPresentation = "";
					videoItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLightDownloaded, function(key, videoItem) {

			if (videoItem.itemId == itemId) {

				if (tempDocument == 'A') {
					videoItem.localPathAudio = "";
					videoItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					videoItem.localPathVideo = "";
					videoItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					videoItem.localPathTranscript = "";
					videoItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					videoItem.localPathPresentation = "";
					videoItem.isDownloadedPresentation = 'false';
				}
			}
		});

		// Start:Akshay, Format change
		$.each(jsonData.technologySessions, function(key, techSessItem) {
			if (techSessItem.itemId == itemId) {
				if (tempDocument == 'A') {
					techSessItem.localPathAudio = "";
					techSessItem.isDownloadedAudio = 'false';
				}
				if (tempDocument == 'V') {
					techSessItem.localPathVideo = "";
					techSessItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					techSessItem.localPathTranscript = "";
					techSessItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					techSessItem.localPathPresentation = "";
					techSessItem.isDownloadedPresentation = 'false';
				}
			}
		});
		// End

	}

	if (tempMedia == 'I') {

		$.each(jsonData.interviews, function(key, interviewItem) {

			if (interviewItem.itemId == itemId) {

				if (tempDocument == 'A') {
					interviewItem.localPathAudio = "";
					interviewItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					interviewItem.localPathVideo = "";
					interviewItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					interviewItem.localPathTranscript = "";
					interviewItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					interviewItem.localPathPresentation = "";
					interviewItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLight, function(key, interviewItem) {

			if (interviewItem.itemId == itemId) {

				if (tempDocument == 'A') {
					interviewItem.localPathAudio = "";
					interviewItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					interviewItem.localPathVideo = "";
					interviewItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					interviewItem.localPathTranscript = "";
					interviewItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					interviewItem.localPathPresentation = "";
					interviewItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLightDownloaded, function(key, interviewItem) {

			if (interviewItem.itemId == itemId) {

				if (tempDocument == 'A') {
					interviewItem.localPathAudio = "";
					interviewItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					interviewItem.localPathVideo = "";
					interviewItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					interviewItem.localPathTranscript = "";
					interviewItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					interviewItem.localPathPresentation = "";
					interviewItem.isDownloadedPresentation = 'false';
				}
			}
		});
	}

	if (tempMedia == 'P') {

		$.each(jsonData.panelDiscussions, function(key, panelDiscussionsItem) {

			if (panelDiscussionsItem.itemId == itemId) {

				if (tempDocument == 'A') {
					panelDiscussionsItem.localPathAudio = "";
					panelDiscussionsItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					panelDiscussionsItem.localPathVideo = "";
					panelDiscussionsItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					panelDiscussionsItem.localPathTranscript = "";
					panelDiscussionsItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					panelDiscussionsItem.localPathPresentation = "";
					panelDiscussionsItem.isDownloadedPresentation = 'false';
				}
			}
		});
		$.each(jsonData.spotLight, function(key, panelDiscussionsItem) {

			if (panelDiscussionsItem.itemId == itemId) {

				if (tempDocument == 'A') {
					panelDiscussionsItem.localPathAudio = "";
					panelDiscussionsItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					panelDiscussionsItem.localPathVideo = "";
					panelDiscussionsItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					panelDiscussionsItem.localPathTranscript = "";
					panelDiscussionsItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					panelDiscussionsItem.localPathPresentation = "";
					panelDiscussionsItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(
						jsonData.spotLightDownloaded,
						function(key, panelDiscussionsItem) {

							if (panelDiscussionsItem.itemId == itemId) {

								if (tempDocument == 'A') {
									panelDiscussionsItem.localPathAudio = "";
									panelDiscussionsItem.isDownloadedAudio = 'false';
								}

								if (tempDocument == 'V') {
									panelDiscussionsItem.localPathVideo = "";
									panelDiscussionsItem.isDownloadedVideo = 'false';
								}
								if (tempDocument == 'T') {
									panelDiscussionsItem.localPathTranscript = "";
									panelDiscussionsItem.isDownloadedTranscript = 'false';
								}
								if (tempDocument == 'P') {
									panelDiscussionsItem.localPathPresentation = "";
									panelDiscussionsItem.isDownloadedPresentation = 'false';
								}
							}
						});
	}

	if (tempMedia == 'T') {

		$.each(jsonData.techConf, function(key, confItem) {

			if (confItem.itemId == itemId) {

				if (tempDocument == 'A') {
					confItem.localPathAudio = "";
					confItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					confItem.localPathVideo = "";
					confItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					confItem.localPathTranscript = "";
					confItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					confItem.localPathPresentation = "";
					confItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLight, function(key, confItem) {

			if (confItem.itemId == itemId) {

				if (tempDocument == 'A') {
					confItem.localPathAudio = "";
					confItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					confItem.localPathVideo = "";
					confItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					confItem.localPathTranscript = "";
					confItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					confItem.localPathPresentation = "";
					confItem.isDownloadedPresentation = 'false';
				}
			}
		});

		$.each(jsonData.spotLightDownloaded, function(key, confItem) {

			if (confItem.itemId == itemId) {

				if (tempDocument == 'A') {
					confItem.localPathAudio = "";
					confItem.isDownloadedAudio = 'false';
				}

				if (tempDocument == 'V') {
					confItem.localPathVideo = "";
					confItem.isDownloadedVideo = 'false';
				}
				if (tempDocument == 'T') {
					confItem.localPathTranscript = "";
					confItem.isDownloadedTranscript = 'false';
				}
				if (tempDocument == 'P') {
					confItem.localPathPresentation = "";
					confItem.isDownloadedPresentation = 'false';
				}
			}
		});

	}

	console.log('before jsonData.spotLight'
			+ JSON.stringify(jsonData.spotLightDownloaded));

	getFileSystemRefForWriting(jsonData);
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

function changeIsdownloadStatus(tempfilePath, itemId, type) {
	//alert("Change Staus -- " + tempfilePath + " " +itemId + " " +  type);
	
	var newIte = itemId;
	
	//alert("type of element to push -- " + itemId + " " + type);

	itemId = itemId.substr(2, itemId.length);

	var testChar = tempfilePath.lastIndexOf('/');
	var tempMedia = tempfilePath.substr(testChar + 1, 1);
	var tempDocument = tempfilePath.substr(testChar + 2, 1);

	if (tempMedia == 'D') {

		$.each(jsonData.documents, function(key, documentItem) {

			if (documentItem.itemId == itemId) {

				if (tempDocument == 'D') {

					documentItem.isDownloaded = 'true';
					documentItem.localPath = tempfilePath;
					documentItem.downloadedDateD = new Date();

				}
			}
		});
		$.each(jsonData.spotLight, function(key, documentItemSpot) {

			if (documentItemSpot.itemId == itemId) {

				if (tempDocument == 'D') {

					documentItemSpot.isDownloaded = 'true';
					documentItemSpot.localPath = tempfilePath;
					documentItemSpot.downloadedDateD = new Date();

				}
			}
		});
	}

	if (tempMedia == 'A') {

		$.each(jsonData.audio, function(key, audioItem) {

			if (audioItem.itemId == itemId) {

				if (tempDocument == 'A') {
					audioItem.localPathAudio = tempfilePath;
					audioItem.isDownloadedAudio = 'true';
					audioItem.downloadedDateA = new Date();
				}

				if (tempDocument == 'V') {
					audioItem.localPathVideo = tempfilePath;
					audioItem.isDownloadedVideo = 'true';
					audioItem.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					audioItem.localPathTranscript = tempfilePath;
					audioItem.isDownloadedTranscript = 'true';
					audioItem.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					audioItem.localPathPresentation = tempfilePath;
					audioItem.isDownloadedPresentation = 'true';
					audioItem.downloadedDateP = new Date();
				}
			}
		});

		$.each(jsonData.spotLight, function(key, audioItemSpot) {

			console.log(audioItemSpot.itemId + '==' + itemId);

			if (audioItemSpot.itemId == itemId) {

				if (tempDocument == 'A') {
					audioItemSpot.localPathAudio = tempfilePath;
					audioItemSpot.isDownloadedAudio = 'true';
					audioItemSpot.downloadedDateA = new Date();
				}

				if (tempDocument == 'V') {
					audioItemSpot.localPathVideo = tempfilePath;
					audioItemSpot.isDownloadedVideo = 'true';
					audioItemSpot.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					audioItemSpot.localPathTranscript = tempfilePath;
					audioItemSpot.isDownloadedTranscript = 'true';
					audioItemSpot.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					audioItemSpot.localPathPresentation = tempfilePath;
					audioItemSpot.isDownloadedPresentation = 'true';

					audioItemSpot.downloadedDateP = new Date();
				}
			}
		});
	}

	if (tempMedia == 'V') {

		$.each(jsonData.video, function(key, videoItem) {

			if (videoItem.itemId == itemId) {

				if (tempDocument == 'A') {
					videoItem.localPathAudio = tempfilePath;
					videoItem.isDownloadedAudio = 'true';
					videoItem.downloadedDateA = new Date();
				}
				if (tempDocument == 'V') {
					videoItem.localPathVideo = tempfilePath;
					videoItem.isDownloadedVideo = 'true';
					videoItem.downloadedDateV = new Date();

				}
				if (tempDocument == 'T') {
					videoItem.localPathTranscript = tempfilePath;
					videoItem.isDownloadedTranscript = 'true';
					videoItem.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					videoItem.localPathPresentation = tempfilePath;
					videoItem.isDownloadedPresentation = 'true';
					videoItem.downloadedDateP = new Date();
				}
			}
		});

		$.each(jsonData.spotLight, function(key, videoItemSpot) {

			if (videoItemSpot.itemId == itemId) {

				if (tempDocument == 'A') {
					videoItemSpot.localPathAudio = tempfilePath;
					videoItemSpot.isDownloadedAudio = 'true';
					videoItemSpot.downloadedDateA = new Date();
				}
				if (tempDocument == 'V') {
					videoItemSpot.localPathVideo = tempfilePath;
					videoItemSpot.isDownloadedVideo = 'true';
					videoItemSpot.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					videoItemSpot.localPathTranscript = tempfilePath;
					videoItemSpot.isDownloadedTranscript = 'true';
					videoItemSpot.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					videoItemSpot.localPathPresentation = tempfilePath;
					videoItemSpot.isDownloadedPresentation = 'true';
					videoItemSpot.downloadedDateP = new Date();
				}
			}
		});

		// Start:Akshay, format change
		$.each(jsonData.technologySessions, function(key, techSessItem) {
			if (techSessItem.itemId == itemId) {
				if (tempDocument == 'A') {
					techSessItem.localPathAudio = tempfilePath;
					techSessItem.isDownloadedAudio = 'true';
					techSessItem.downloadedDateA = new Date();
				}
				if (tempDocument == 'V') {
					techSessItem.localPathVideo = tempfilePath;
					techSessItem.isDownloadedVideo = 'true';
					techSessItem.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					techSessItem.localPathTranscript = tempfilePath;
					techSessItem.isDownloadedTranscript = 'true';
					techSessItem.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					techSessItem.localPathPresentation = tempfilePath;
					techSessItem.isDownloadedPresentation = 'true';
					techSessItem.downloadedDateP = new Date();
				}
			}
		});
		// End

	}

	if (tempMedia == 'I') {

		$.each(jsonData.interviews, function(key, interviewItem) {

			if (interviewItem.itemId == itemId) {

				if (tempDocument == 'A') {
					interviewItem.localPathAudio = tempfilePath;
					interviewItem.isDownloadedAudio = 'true';
					interviewItem.downloadedDateA = new Date();
				}
				if (tempDocument == 'V') {
					interviewItem.localPathVideo = tempfilePath;
					interviewItem.isDownloadedVideo = 'true';
					interviewItem.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					interviewItem.localPathTranscript = tempfilePath;
					interviewItem.isDownloadedTranscript = 'true';
					interviewItem.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					interviewItem.localPathPresentation = tempfilePath;
					interviewItem.isDownloadedPresentation = 'true';
					interviewItem.downloadedDateP = new Date();
				}
			}
		});

		$.each(jsonData.spotLight, function(key, interviewItemSpot) {

			if (interviewItemSpot.itemId == itemId) {

				if (tempDocument == 'A') {
					interviewItemSpot.localPathAudio = tempfilePath;
					interviewItemSpot.isDownloadedAudio = 'true';
					interviewItemSpot.downloadedDateA = new Date();
				}
				if (tempDocument == 'V') {
					interviewItemSpot.localPathVideo = tempfilePath;
					interviewItemSpot.isDownloadedVideo = 'true';
					interviewItemSpot.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					interviewItemSpot.localPathTranscript = tempfilePath;
					interviewItemSpot.isDownloadedTranscript = 'true';
					interviewItemSpot.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					interviewItemSpot.localPathPresentation = tempfilePath;
					interviewItemSpot.isDownloadedPresentation = 'true';
					interviewItemSpot.downloadedDateP = new Date();
				}
			}
		});
	}

	if (tempMedia == 'P') {

		$.each(jsonData.panelDiscussions, function(key, panelDiscussionsItem) {

			if (panelDiscussionsItem.itemId == itemId) {

				if (tempDocument == 'A') {
					panelDiscussionsItem.localPathAudio = tempfilePath;
					panelDiscussionsItem.isDownloadedAudio = 'true';
					panelDiscussionsItem.downloadedDateA = new Date();
				}

				if (tempDocument == 'V') {
					panelDiscussionsItem.localPathVideo = tempfilePath;
					panelDiscussionsItem.isDownloadedVideo = 'true';
					panelDiscussionsItem.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					panelDiscussionsItem.localPathTranscript = tempfilePath;
					panelDiscussionsItem.isDownloadedTranscript = 'true';
					panelDiscussionsItem.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					panelDiscussionsItem.localPathPresentation = tempfilePath;
					panelDiscussionsItem.isDownloadedPresentation = 'true';
					panelDiscussionsItem.downloadedDateP = new Date();
				}
			}
		});

		$
				.each(
						jsonData.spotLight,
						function(key, panelDiscussionsItemSpot) {

							if (panelDiscussionsItemSpot.itemId == itemId) {

								if (tempDocument == 'A') {
									panelDiscussionsItemSpot.localPathAudio = tempfilePath;
									panelDiscussionsItemSpot.isDownloadedAudio = 'true';
									panelDiscussionsItemSpot.downloadedDateA = new Date();
								}

								if (tempDocument == 'V') {
									panelDiscussionsItemSpot.localPathVideo = tempfilePath;
									panelDiscussionsItemSpot.isDownloadedVideo = 'true';
									panelDiscussionsItemSpot.downloadedDateV = new Date();
								}
								if (tempDocument == 'T') {
									panelDiscussionsItemSpot.localPathTranscript = tempfilePath;
									panelDiscussionsItemSpot.isDownloadedTranscript = 'true';
									panelDiscussionsItemSpot.downloadedDateT = new Date();
								}
								if (tempDocument == 'P') {
									panelDiscussionsItemSpot.localPathPresentation = tempfilePath;
									panelDiscussionsItemSpot.isDownloadedPresentation = 'true';
									panelDiscussionsItemSpot.downloadedDateP = new Date();
								}
							}
						});
	}

	if (tempMedia == 'T') {
		// alert('inside T');
		$.each(jsonData.techConf, function(key, ConfItem) {

			if (ConfItem.itemId == itemId) {

				if (tempDocument == 'A') {
					ConfItem.localPathAudio = tempfilePath;
					ConfItem.isDownloadedAudio = 'true';
					ConfItem.downloadedDateA = new Date();
				}

				if (tempDocument == 'V') {
					ConfItem.localPathVideo = tempfilePath;
					ConfItem.isDownloadedVideo = 'true';
					ConfItem.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					ConfItem.localPathTranscript = tempfilePath;
					ConfItem.isDownloadedTranscript = 'true';
					ConfItem.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					ConfItem.localPathPresentation = tempfilePath;
					ConfItem.isDownloadedPresentation = 'true';
					ConfItem.downloadedDateP = new Date();
				}
			}
		});

		$.each(jsonData.spotLight, function(key, ConfItemSpot) {

			if (ConfItemSpot.itemId == itemId) {

				if (tempDocument == 'A') {
					ConfItemSpot.localPathAudio = tempfilePath;
					ConfItemSpot.isDownloadedAudio = 'true';
					ConfItemSpot.downloadedDateA = new Date();
				}

				if (tempDocument == 'V') {
					ConfItemSpot.localPathVideo = tempfilePath;
					ConfItemSpot.isDownloadedVideo = 'true';
					ConfItemSpot.downloadedDateV = new Date();
				}
				if (tempDocument == 'T') {
					ConfItemSpot.localPathTranscript = tempfilePath;
					ConfItemSpot.isDownloadedTranscript = 'true';
					ConfItemSpot.downloadedDateT = new Date();
				}
				if (tempDocument == 'P') {
					ConfItemSpot.localPathPresentation = tempfilePath;
					ConfItemSpot.isDownloadedPresentation = 'true';
					ConfItemSpot.downloadedDateP = new Date();
				}
			}
		});

	}

	$.each(jsonData.spotLight, function(key, spotItem) {

		jsonData.spotLightDownloaded.push(spotItem);
	});

	getFileSystemRefForWriting(jsonData);
	
	//alert("checking1");
	downloadedFiles.push(newIte);
	//("checking2 -- " + JSON.stringify(downloadedFiles));
	//alert("checking3");

	console.log('After jsonData.spotLight'
			+ JSON.stringify(jsonData.spotLightDownloaded));

}

function showmoreresultTAlist(variable) {

	var titleCount = parseInt(variable.title) + 5;
	document.getElementById('loadmoreTAList').title = titleCount;

	if (resFinal.length) {
		$
				.each(resFinal,
						function(key, itemRes) {
							if ((key + 1) <= titleCount) {
								document.getElementById('techAreaList'
										+ (key + 1)).style.display = "block";
							}
						});
	}

	if (titleCount >= resFinal.length) {
		document.getElementById('loadmoreTAList').style.display = "none";
	}
}

function stopPlayingMedia() {

	if (document.getElementById('liveVid')) {
		document.getElementById('liveVid').pause();
	}

	if (document.getElementById('audioP')) {
		document.getElementById('audioP').pause();
	}

	// alert('stop playing media');
}

function showpreItem(elementId) {
	// alert('showpreItem');
	var prevId = '';
	var prevType = '';

	stopPlayingMedia();

	var count = 0;
	var keyTemp = resFinal.length - 1;

	$.each(resFinal, function(key, resItem) {

		if (key == 0) {
			count = 0;
		} else if (key == keyTemp) {
			count = key;
		} else {
			count = key;
		}

		if (resItem.itemId == elementId && key > 0) {
			// alert('Found @ posiotion '+key);
			detailPageView(prevId, prevType, count - 1);
		} else {
			prevId = resItem.itemId;
			prevType = resItem.type;
		}
	});
}

function showNextItem(elementId) {

	var nextIndex = '-1';
	var testVar = '-1';

	stopPlayingMedia();

	var count = 0;
	var keyTemp = resFinal.length - 1;

	$.each(resFinal, function(key, resItem) {

		if (key == 0) {
			count = 0;
		} else if (key == keyTemp) {
			count = -1;
		} else {
			count = key;
		}

		if (resItem.itemId == elementId && key <= resFinal.length) {
			testVar = key;
		}
		if (nextIndex != '-1') {
			detailPageView(resItem.itemId, resItem.type, count);
			nextIndex = '-1';
			testVar = '-1';
		}

		nextIndex = testVar;
	});
}

function showQnA(elementDetail) {

	var ida = elementDetail.id;
	var data = elementDetail.title;

	$('#qnaTitle').html('');
	$('#qnaPageContentArea').html('');

	ida = "Q & A For " + ida;
	$('#qnaTitle').html(ida);
	$('#qnaPageContentArea').html(data);
	// document.getElementById('qnaPageContentArea').style.border="1px solid
	// blue";
	// document.getElementById("qnaPageContentArea").style.marginRight="14%";
}

// -----------------------------------------Contact US
// ------------------------------------------------------

var isCommentEntered = "false";
var isSubmitHit = "false";

function hitBackButton() {
	var userComment = '';

	// alert("HIT BACK BTN");

	$('#commentTextArea').val('Enter Your Comments Here');
	if ($('#commentTextArea').val() == "") {
		isCommentEntered = "false";
		setTextArea();

	}
}

function setTextArea() {
	$('#commentTextArea').val('Enter Your Comments Here');
}

function contactUsFocus() {
	var textAreaRefresh = "false";

	// alert("Focused on TextArea");
	// var uName = document.getElementById("lblUserName").innerHTML;
	// $('#lblUserN').text(uName);

	$('#commentTextArea').focus(function() {

		if ($(this).val() == 'Enter Your Comments Here') {
			$(this).val('');
			textAreaRefresh = "true";
		} else {
			$(this).val() = $(this).val();

		}
	});

	$('#clearText').click(function() {
		$('#commentTextArea').val('Enter Your Comments Here');
	});

	showNavigateDiv("navigateDiv");

}

function contactUsArea() {

	var commentSubmit = '';
	var commentJSON = '{"data":{"comment":"';

	var commentEntered = 'false';

	var uName = document.getElementById("lblUserName").innerHTML;

	uName = uName.replace(/\./g, '_');

	var linkContact = 'https://techtime.accenture.com/techtimemobile/contactus/uid=';
	linkContact = linkContact + uName;

	// alert("SUBMIT BUTTON CLICKED");
	commentSubmit = $('#commentTextArea').val();

	commentSubmit = commentSubmit.replace(/(\r\n|\n|\r)/gm, " ");

	isSubmitHit = "true";

	// alert(commentSubmit);

	if (commentSubmit == '' || commentSubmit == 'Enter Your Comments Here'
			|| (commentSubmit.length > 0 && commentSubmit.trim().length == 0)) {
		jAlert('Please enter your comments.', 'Tech Time');
		commentEntered = 'false';
	} else {
		commentJSON = commentJSON + commentSubmit + '"}}';
		commentEntered = 'true';
	}

	if (commentEntered == 'true') {
		if (isOnline) {
			$.ajax({

				type : 'POST',
				url : linkContact,
				data : commentJSON,
				dataType : 'xml',
				contentType : 'application/json',
				success : function(data) {
					jAlert('Thank you for contacting Tech Time.', 'Tech Time');
					setTextArea();
				},
				error : function(xhr, textStatus, error) {
					jAlert('Could not post your comment. Please try again.',
							'Tech Time');
					console.log('' + JSON.stringify(xhr));
					console.log(textStatus);
					console.log(error);
				}
			});
		} else {
			jAlert('Please go online to post your comment.', 'Tech Time');
		}

	}

	// setTextArea();

}

function showSearchResult(element, media, displayData, a) {
	// alert("element"+element+"sMed"+media+"displayData"+displayData+"a"+a);

	window.localStorage.setItem("searchelement", element);
	window.localStorage.setItem("media", media);
	window.localStorage.setItem("valueElement", displayData);

	searchFlag = true;

	saveSearchKey(element);

	// console.log('searchFlag-if-'+searchFlag);

	if (document.getElementById('liveVid')) {
		document.getElementById('liveVid').pause();
	}

	if (document.getElementById('audioP')) {
		document.getElementById('audioP').pause();
	}

	var searchString = '';

	var sortByMediaType = '';
	sortByMediaType = media;

	searchResultArray = [];

	var searchResult = new Array();
	searchResult = [];

	var displaySearchString = '';

	if (element == 'prevSearch') {
		searchString = document.getElementById('searchLabel').innerHTML;
	} else {
		searchString = document.getElementById(element).value;

	}

	if (a != "null") {
		searchString = a;

	}

	var searchStr = searchString.length;
	var searchTrim = searchString.trim();

	displaySearchString = searchTrim;

	searchTrim = searchTrim.replace(/[^a-zA-Z0-9 ]/g, "");

	window.localStorage.setItem("searchString", searchTrim);

	window.localStorage.setItem("searchstringsave", searchTrim);

	// alert('searchStr...'+searchString+'. !!!....-->'+searchStr);
	if (searchStr > 0 && searchTrim.length != 0 && searchTrim != 'Search') {

		document.getElementById('searchLabel').innerHTML = searchTrim;
		document.getElementById('typeS').innerHTML = displayData;

		$('#searchResultDiv').html('');
		$('#nosearchResultDiv').html('');

		/*if (sortByMediaType == 'audios' || sortByMediaType == 'Audios'
				|| sortByMediaType == 'All') {
			$.each(jsonData.audio, function(key, item) {
				searchResult.push(item);
			});
		}

		if (sortByMediaType == 'videos' || sortByMediaType == 'Videos'
				|| sortByMediaType == 'All') {
			$.each(jsonData.video, function(key, item) {
				searchResult.push(item);
			});
		}*/

		if (sortByMediaType == 'panelDiscussions'
				|| sortByMediaType == 'PanelDiscussions'
				|| sortByMediaType == 'All') {
			$.each(jsonData.panelDiscussions, function(key, item) {
				searchResult.push(item);
			});
		}

		if (sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'
				|| sortByMediaType == 'All') {
			$.each(jsonData.interviews, function(key, item) {
				searchResult.push(item);
			});
		}

		if (sortByMediaType == 'documents' || sortByMediaType == 'Documents'
				|| sortByMediaType == 'All') {
			$.each(jsonData.documents, function(key, item) {
				searchResult.push(item);
			});
		}

		if (sortByMediaType == 'TechnologyConferences'
				|| sortByMediaType == 'Technology Conferences'
				|| sortByMediaType == 'All') {
			$.each(jsonData.techConf, function(key, item) {
				searchResult.push(item);
			});
		}
		
		if (sortByMediaType == 'TechnologySessions'
			|| sortByMediaType == 'Technology Sessions'
			|| sortByMediaType == 'technologySessions'
			|| sortByMediaType == 'All') {
		$.each(jsonData.technologySessions, function(key, item) {
			searchResult.push(item);
		});
	}

		// if(sortByMediaType == 'events' || sortByMediaType == 'Events' ||
		// sortByMediaType == 'All'){
		// $.each(jsonData.events, function(key, item) {
		// searchResult.push(item);
		// });
		// }

		// console.log('------------------------------------------\n\n\n');

		$.each(searchResult, function(key, item) {

			var flag = 'false';
			var titleSearch = item.title.search(new RegExp(
					"" + searchTrim + "", "gi"));

			if (titleSearch != "-1") {
				// console.log(key+' : '+item.type+'<-----> '+item.title);
				flag = 'true';
			}

			$.each(item.author, function(key, itemAuthor) {

				var authorSearch = itemAuthor.search(new RegExp("" + searchTrim
						+ "", "gi"));

				if (authorSearch != "-1") {
					// console.log(item.type+'<---Author-->
					// '+item.title+'<---Author--> '+itemAuthor);
					flag = 'true';
				}
			});

			if (flag == 'true') {
				searchResultArray.push(item);
			}
		});

		$.mobile.changePage("#searchResultPage");

		var searchDateColor = document.getElementById('sortByDateSearchField').style.color;

		if (searchDateColor != 'orange') {

			searchResultArray.sort(function(a, b) {
				var dateA = new Date(a.publishedDate), dateB = new Date(
						b.publishedDate) // sort
				// ascending
				return dateB - dateA;
			});
		}
	} else {
		jAlert('Please enter some valid keywords.', 'Tech Time');
	}

	var count = 0;
	var textHtml = '';
	var test = '';
	var keyTemp = searchResultArray.length - 1;

	$.each(searchResultArray, function(key, item) {

		if (key == 0) {
			count = 0;
		} else if (key == keyTemp) {
			count = -1;
		} else {
			count = key;
		}

		test = '';
		// totalItemCount++;
		test = getListElement(item, -100, "searchList" + (key + 1), key);
		textHtml = textHtml + test;

	});

	var newHeight = screen.height - 670;

	if (searchResultArray.length > 5) {
		textHtml += "<div class = 'linkTransition' id='loadmoreSearch' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresultSearch(this)'><b>Load More Results</b></div>";
	}

	if (searchResultArray.length == '0') {
		$('#nosearchResultDiv')
				.html(
						'<p style="margin-left:4%;">No items found for the search criteria.</p>');
		$('#nosearchResultDiv').css('height', newHeight); // last change

	} else {
		$('#searchResultDiv').html(textHtml);
	}

}

function showmoreresultSearch(variable) {
	var titleCount = parseInt(variable.title) + 5;
	document.getElementById('loadmoreSearch').title = titleCount;

	if (searchResultArray.length) {
		$
				.each(searchResultArray,
						function(key, itemRes) {
							if ((key + 1) <= titleCount) {
								document.getElementById('searchList'
										+ (key + 1)).style.display = "block";
							}
						});
	}

	if (titleCount >= searchResultArray.length) {
		document.getElementById('loadmoreSearch').style.display = "none";
	}
}

function showDownloadedIcons(itemRes) {
	var appendIconsHTML = '';
	var fileName = '';
	

	if(itemRes.type == "Audios")
	{
		fileName = 'A';
	} else if(itemRes.type == "Videos")
	{
		fileName = 'V';
	} else if(itemRes.type == "Technology Sessions")
	{
		fileName = 'V';
	} else if(itemRes.type == "Panel Discussions" || itemRes.type == "Panel Discussion" || itemRes.type == "Pannel Discussions")
	{
		fileName = 'P';
	} else if(itemRes.type == "Interviews")
	{
		fileName = 'I';
	} else if(itemRes.type == "Technology Conferences" || itemRes.type == "Technology Conference")
	{
		fileName = 'T'
	} else if(itemRes.type == "Documents" || itemRes.type == "documents")
	{
		fileName = 'D';
	} 


	if (downloadedFiles.indexOf(fileName+'A'+itemRes.itemId + '.mp3') != -1) {
		appendIconsHTML += "<img src='images/icon_audio.png' style='height:11px;width:11px;'/>&nbsp;";
	}

	if (downloadedFiles.indexOf(fileName+'V'+itemRes.itemId + '.mp4') != -1) {
		appendIconsHTML += "<img src='images/icon_video.png' style='height:11px;width:11px;'/>&nbsp;";
	}

	if (downloadedFiles.indexOf(fileName+'P'+itemRes.itemId + '.pdf') != -1) {
		appendIconsHTML += "<img src='images/icon_presentation.png' style='height:11px;width:11px;'/>&nbsp;";
	}

	if (downloadedFiles.indexOf(fileName+'T'+itemRes.itemId + '.pdf') != -1) {
		appendIconsHTML += "<img src='images/icon_transcript.png' style='height:11px;width:11px;'/>&nbsp;";
	}

	if (downloadedFiles.indexOf(fileName+'D'+itemRes.itemId + '.pdf') != -1) {
	alert("checking -- " + downloadedFiles.indexOf(fileName+'D'+itemRes.itemId + '.pdf') != -1);
		appendIconsHTML += "<img src='images/icon_document.png' style='height:11px;width:11px;'/>&nbsp;";
	}

	return appendIconsHTML;
	appendIconsHTML = '';
}

function clearSearchTipfromSearch() {
	$('#searchTAListResult').val('Search');
	$('#searchDetailMediaPage').val('Search');
	$('#searchdetailAuthor').val('Search');
	$('#searchUpcomingEventsPage').val('Search');
	$('#searchSubscribePage').val('Search');
	$('#searchAboutTectTimePage').val('Search');
	$('#searchContactUsPage').val('Search');
	$('#searchFaqPage').val('Search');
	$('#searchsearchResultPage').val('Search');
	$('#searchBusinessCategory').val('Search');
	$('#searchTechWatchPage').val('Search');
	$('#searchPlaylistsPage').val('Search');
	$('#searchplaylistsItemPage').val('Search');
	$('#searchSharePlaylistsPage').val('Search');
	$('#searchAddToPlaylistPage').val('Search');	
}

function setSearchTips() {
	$('#searchTAListResult').val('Search');
	$('#searchDetailMediaPage').val('Search');
	$('#searchdetailAuthor').val('Search');
	$('#searchUpcomingEventsPage').val('Search');
	$('#searchSubscribePage').val('Search');
	$('#searchAboutTectTimePage').val('Search');
	$('#searchContactUsPage').val('Search');
	$('#searchFaqPage').val('Search');
	$('#searchsearchResultPage').val('Search');
	$('#searchBusinessCategory').val('Search');
	$('#searchTechWatchPage').val('Search');
	$('#searchPlaylistsPage').val('Search');
	$('#searchplaylistsItemPage').val('Search');
	$('#searchSharePlaylistsPage').val('Search');
	$('#searchAddToPlaylistPage').val('Search');	
}

function clearSearchTip() {
	if (currElementId != '' && currElementtype != ''
			&& currElementcountNum != '') {
		detailPageView(currElementId, currElementtype, currElementcountNum);
	}
}

function changeDownloadLogoutColor() {
	document.getElementById('logoutLabelHomescreen').style.color = "grey";
	document.getElementById('homescreenLogout').style.background = "grey";
	document.getElementById('showProgressBar').innerHTML = '';
	// $('input[type="radio"]').attr("disabled",'disabled');

}

function changeDownloadLoginColor() {
	document.getElementById('logoutLabelHomescreen').style.color = "#FF9900";
	document.getElementById('homescreenLogout').style.background = "#FF9900";
	// $('input[type="radio"]' ).removeAttr("disabled");

}
var dwFlag = false;

function showInProgress() {

	gotFS(fileSystem);

	console.log('*****************Length later : ' + entriesList.length
			+ '***************************');

	startSync();
	postDownloadedItem();

	dwFlag = true;

	$('label[id="completedDownloads"]').css({
		"color" : "orange",
		"font-weight" : "normal"
	})
	$('label[id="inProgressDownloads"]').css({
		"color" : "black",
		"font-weight" : "bolder"
	});
	document.getElementById('showProgressBar').style.display = 'block';
	document.getElementById('allDownloads').style.display = 'none';
}

function showAllDown() {

	dwFlag = true;
	$.mobile.changePage("#DownloadsPage");
	$('label[id="inProgressDownloads"]').css({
		"color" : "orange",
		"font-weight" : "normal"
	});

	$('label[id="completedDownloads"]').css({
		"color" : "black",
		"font-weight" : "bolder"
	});
	document.getElementById('showProgressBar').style.display = 'none';
	document.getElementById('allDownloads').style.display = 'block';
}

function switchDownloadsDiv(type) {
	// prevPageId = 'businessCategory';
	// alert("prevPage= switchDownloadsDiv= pageId"+prevPageId);

	gotFS(fileSystem);

	console.log('*****************Length later : ' + entriesList.length
			+ '***************************');

	startSync();

	if (type == "inProgress") {
		// alert("IN PROGRESS DIV");

		$('label[id="completedDownloads"]').css({
			"color" : "orange",
			"font-weight" : "normal"
		})
		$('label[id="inProgressDownloads"]').css({
			"color" : "black",
			"font-weight" : "bolder"
		});

		$('div[id="showProgressBar"]').show();
		$('div[id="allDownloads"]').hide();

	} else if (type == "allDownloads") {
		alldownloadFlag = true;

		$('label[id="completedDownloads"]').css({
			"color" : "black",
			"font-weight" : "bolder"
		});
		$('label[id="inProgressDownloads"]').css({
			"color" : "orange",
			"font-weight" : "100"
		})
		$('div[id="allDownloads"]').show();
		$('div[id="showProgressBar"]').hide();
	}
}

function jsonPostAfterDownload(currDownload) {

	var jsonPost = '{"data":{"username":"' + jsonData.loggedUserName
			+ '", "downloadedItems":[' + currDownload + '],"devicePlatform": "'
			+ device.platform + '", "deviceUUID": "' + device.uuid
			+ '", "deviceModel": "' + device.model + '"}}';
	postUserDownloads(jsonPost);

	console.log(JSON.stringify(jsonPost));

}

function postDownloadedItem() {

	var localDownloadedData = '{"data":{"username":"' + jsonData.loggedUserName
			+ '", "downloadedItems":[';

	var downloadArray = new Array();

	$.each(jsonData.audio, function(key, CheckDownload) {
		if (CheckDownload.isDownloadedAudio == 'true'
				|| CheckDownload.isDownloadedAudio == "true"
				|| CheckDownload.isDownloadedAudio == true) {

			var downloadId = CheckDownload.localPathAudio.substring(
					(CheckDownload.localPathAudio.lastIndexOf("/")) + 1,
					(CheckDownload.localPathAudio.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedVideo == 'true'
				|| CheckDownload.isDownloadedVideo == "true"
				|| CheckDownload.isDownloadedVideo == true) {

			var downloadId = CheckDownload.localPathVideo.substring(
					(CheckDownload.localPathVideo.lastIndexOf("/")) + 1,
					(CheckDownload.localPathVideo.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedPresentation == 'true'
				|| CheckDownload.isDownloadedPresentation == "true"
				|| CheckDownload.isDownloadedPresentation == true) {

			var downloadId = CheckDownload.localPathPresentation.substring(
					(CheckDownload.localPathPresentation.lastIndexOf("/")) + 1,
					(CheckDownload.localPathPresentation.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}

		if (CheckDownload.isDownloadedTranscript == 'true'
				|| CheckDownload.isDownloadedTranscript == "true"
				|| CheckDownload.isDownloadedTranscript == true) {
			var downloadId = CheckDownload.localPathTranscript.substring(
					(CheckDownload.localPathTranscript.lastIndexOf("/")) + 1,
					(CheckDownload.localPathTranscript.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}

	});
	// alert("finaldwn.audios"+finaldwn.length);

	$.each(jsonData.video, function(key, CheckDownload) {
		if (CheckDownload.isDownloadedAudio == 'true'
				|| CheckDownload.isDownloadedAudio == "true"
				|| CheckDownload.isDownloadedAudio == true) {

			var downloadId = CheckDownload.localPathAudio.substring(
					(CheckDownload.localPathAudio.lastIndexOf("/")) + 1,
					(CheckDownload.localPathAudio.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedVideo == 'true'
				|| CheckDownload.isDownloadedVideo == "true"
				|| CheckDownload.isDownloadedVideo == true) {

			var downloadId = CheckDownload.localPathVideo.substring(
					(CheckDownload.localPathVideo.lastIndexOf("/")) + 1,
					(CheckDownload.localPathVideo.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedPresentation == 'true'
				|| CheckDownload.isDownloadedPresentation == "true"
				|| CheckDownload.isDownloadedPresentation == true) {

			var downloadId = CheckDownload.localPathPresentation.substring(
					(CheckDownload.localPathPresentation.lastIndexOf("/")) + 1,
					(CheckDownload.localPathPresentation.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}

		if (CheckDownload.isDownloadedTranscript == 'true'
				|| CheckDownload.isDownloadedTranscript == "true"
				|| CheckDownload.isDownloadedTranscript == true) {
			var downloadId = CheckDownload.localPathTranscript.substring(
					(CheckDownload.localPathTranscript.lastIndexOf("/")) + 1,
					(CheckDownload.localPathTranscript.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}

	});
	// alert("finaldwn.video"+finaldwn.length);

	$.each(jsonData.panelDiscussions, function(key, CheckDownload) {
		if (CheckDownload.isDownloadedAudio == 'true'
				|| CheckDownload.isDownloadedAudio == "true"
				|| CheckDownload.isDownloadedAudio == true) {

			var downloadId = CheckDownload.localPathAudio.substring(
					(CheckDownload.localPathAudio.lastIndexOf("/")) + 1,
					(CheckDownload.localPathAudio.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedVideo == 'true'
				|| CheckDownload.isDownloadedVideo == "true"
				|| CheckDownload.isDownloadedVideo == true) {

			var downloadId = CheckDownload.localPathVideo.substring(
					(CheckDownload.localPathVideo.lastIndexOf("/")) + 1,
					(CheckDownload.localPathVideo.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedPresentation == 'true'
				|| CheckDownload.isDownloadedPresentation == "true"
				|| CheckDownload.isDownloadedPresentation == true) {

			var downloadId = CheckDownload.localPathPresentation.substring(
					(CheckDownload.localPathPresentation.lastIndexOf("/")) + 1,
					(CheckDownload.localPathPresentation.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}

		if (CheckDownload.isDownloadedTranscript == 'true'
				|| CheckDownload.isDownloadedTranscript == "true"
				|| CheckDownload.isDownloadedTranscript == true) {
			var downloadId = CheckDownload.localPathTranscript.substring(
					(CheckDownload.localPathTranscript.lastIndexOf("/")) + 1,
					(CheckDownload.localPathTranscript.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
	});
	// alert("finaldwn.interviews"+finaldwn.interviews.length);

	/** ***************Document*************************** */

	$.each(jsonData.documents, function(key, CheckDownload) {

		if (CheckDownload.isDownloaded == "true") {

			var downloadId = CheckDownload.localPath.substring(
					(CheckDownload.localPath.lastIndexOf("/")) + 1,
					(CheckDownload.localPath.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';
			downloadArray.push(downloadId);

		}
	});

	/** ***************Technology COnf*************************** */

	$.each(jsonData.techConf, function(key, CheckDownload) {
		if (CheckDownload.isDownloadedAudio == 'true'
				|| CheckDownload.isDownloadedAudio == "true"
				|| CheckDownload.isDownloadedAudio == true) {
			var downloadId = CheckDownload.localPathAudio.substring(
					(CheckDownload.localPathAudio.lastIndexOf("/")) + 1,
					(CheckDownload.localPathAudio.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';
			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedVideo == 'true'
				|| CheckDownload.isDownloadedVideo == "true"
				|| CheckDownload.isDownloadedVideo == true) {

			var downloadId = CheckDownload.localPathVideo.substring(
					(CheckDownload.localPathVideo.lastIndexOf("/")) + 1,
					(CheckDownload.localPathVideo.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';
			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedPresentation == 'true'
				|| CheckDownload.isDownloadedPresentation == "true"
				|| CheckDownload.isDownloadedPresentation == true) {

			var downloadId = CheckDownload.localPathPresentation.substring(
					(CheckDownload.localPathPresentation.lastIndexOf("/")) + 1,
					(CheckDownload.localPathPresentation.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';
			downloadArray.push(downloadId);

		}

		if (CheckDownload.isDownloadedTranscript == 'true'
				|| CheckDownload.isDownloadedTranscript == "true"
				|| CheckDownload.isDownloadedTranscript == true) {
			var downloadId = CheckDownload.localPathTranscript.substring(
					(CheckDownload.localPathTranscript.lastIndexOf("/")) + 1,
					(CheckDownload.localPathTranscript.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
	});

	/** **********************Interview*********************************** */
	$.each(jsonData.interviews, function(key, CheckDownload) {
		if (CheckDownload.isDownloadedAudio == 'true'
				|| CheckDownload.isDownloadedAudio == "true"
				|| CheckDownload.isDownloadedAudio == true) {
			var downloadId = CheckDownload.localPathAudio.substring(
					(CheckDownload.localPathAudio.lastIndexOf("/")) + 1,
					(CheckDownload.localPathAudio.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedVideo == 'true'
				|| CheckDownload.isDownloadedVideo == "true"
				|| CheckDownload.isDownloadedVideo == true) {

			var downloadId = CheckDownload.localPathVideo.substring(
					(CheckDownload.localPathVideo.lastIndexOf("/")) + 1,
					(CheckDownload.localPathVideo.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}
		if (CheckDownload.isDownloadedPresentation == 'true'
				|| CheckDownload.isDownloadedPresentation == "true"
				|| CheckDownload.isDownloadedPresentation == true) {

			var downloadId = CheckDownload.localPathPresentation.substring(
					(CheckDownload.localPathPresentation.lastIndexOf("/")) + 1,
					(CheckDownload.localPathPresentation.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';

			downloadArray.push(downloadId);

		}

		if (CheckDownload.isDownloadedTranscript == 'true'
				|| CheckDownload.isDownloadedTranscript == "true"
				|| CheckDownload.isDownloadedTranscript == true) {
			var downloadId = CheckDownload.localPathTranscript.substring(
					(CheckDownload.localPathTranscript.lastIndexOf("/")) + 1,
					(CheckDownload.localPathTranscript.lastIndexOf(".")));
			downloadId = '\"' + downloadId + '\"';
			downloadArray.push(downloadId);

		}
	});

	// console.log(JSON.stringify(downloadArray));

	localDownloadedData = localDownloadedData + downloadArray
			+ '],"devicePlatform": "' + device.platform + '", "deviceUUID": "'
			+ device.uuid + '", "deviceModel": "' + device.model + '"}}';
	console.log(JSON.stringify(localDownloadedData));

	postUserDownloads(localDownloadedData);

}

function postUserDownloads(localDownloadedData) {

	var uName = document.getElementById("lblUserName").innerHTML;
	uName = uName.replace(/\./g, '_');

	var downloadLink = 'https://techtime.accenture.com/techtimemobile/mobiletrack';

	// 'https://techtime.accenture.com/mobile_download_items/save';
	// downloadLink = downloadLink + uName;

	var localDownloadedData = localDownloadedData;

	if (isOnline) {

		$
				.ajax({

					type : 'POST',
					url : downloadLink,
					data : localDownloadedData,
					dataType : 'text',
					contentType : 'application/json',
					success : function(data) {

						console.log('All downloaded Items succcessfully posted'
								+ data);

					},
					error : function(xhr, textStatus, error) {
						console
								.log('*******************************************************')
						console.log('Post downloaded Item In Failure'
								+ JSON.stringify(xhr));
						console.log("textStatus:" + textStatus + ':' + error);
						console
								.log('*******************************************************')
					}

				}); // Ajax Call
	}

}

function generateTechWatchPublicationList() {
	// alert("Div Generate");
	$.mobile.changePage('#techwatchSelectIssuePage');
	var currentTechWatchPublicationId = '';
	var currentTechWatchPublicationIndex = '';
	var currentTechWatchPublicationDate = '';

	var displayTechWatchPublicationsHTML = '';

	$
			.each(
					jsonData.techWatch,
					function(key, techWatchItem) {
						currentTechWatchPublicationId = techWatchItem.twId;
						currentTechWatchPublicationIndex = techWatchItem.techWatchPublicationIndex;
						currentTechWatchPublicationDate = techWatchItem.techWatchPublicationDate;
						currentTechWatchPublicationDateString = techWatchItem.techWatchPublicationDateString;

						displayTechWatchPublicationsHTML += "<div id='techWatchPublication"
								+ currentTechWatchPublicationId
								+ "' data-techWatchPubId='"
								+ currentTechWatchPublicationId
								+ "' data-techWatchPubDate='"
								+ currentTechWatchPublicationDate
								+ "' data-techWatchPubIndex='"
								+ currentTechWatchPublicationIndex
								+ "' style='width:100%;border-style:solid;border:1px solid;border-top-color:#7C7B7F;border-bottom-color:#7C7B7F;border-right:0px; border-left:0px;' onclick='loadTechWatchPublication(this);'>";
						displayTechWatchPublicationsHTML += "<div id='techWatchPublicationIdDiv' style='width:15%;background:white;float:left;text-align:center;padding-top:25px;padding-bottom:25px;'>";
						displayTechWatchPublicationsHTML += "<label style='font-size:20px;font-family:AgfaRotisSans;font-weight:bolder;color:#343338;'>#"
								+ currentTechWatchPublicationId + "</label>";
						displayTechWatchPublicationsHTML += "</div>";
						displayTechWatchPublicationsHTML += "<div id='techWatchPublicationDateDiv' style='width:75%;background:white;float:left;text-align:left;padding-top:25px;padding-bottom:25px;'>";
						displayTechWatchPublicationsHTML += "<label style='font-size:20px;font-family:AgfaRotisSans;font-weight:bolder;color:#343338;padding-left:2%;'>"
								+ currentTechWatchPublicationDateString
								+ "</label>";
						displayTechWatchPublicationsHTML += "</div>";
						displayTechWatchPublicationsHTML += "<div id='techWatchPublicationIconDiv' style='width:10%;background:white;float:left;text-align:left;padding-top:28px;padding-bottom:25px;'>";
						displayTechWatchPublicationsHTML += "<img src='images/orange_icon_right.png' width='20px' height='20px;'/>";
						displayTechWatchPublicationsHTML += "</div>";
						displayTechWatchPublicationsHTML += "<br/><br/><br/><br/>";
						displayTechWatchPublicationsHTML += "</div>";

					});

	$('#techWatchPublicationsList').html(displayTechWatchPublicationsHTML);

}

function loadTechWatchPublication(techWatchPublication) {
	var selectedTechWatchElementId = techWatchPublication.id;
	var selectedTechWatchPubId = '';
	var selectedTechWatchPubDate = '';
	var selectedTechWatchPubIndex = '';

	selectedTechWatchPubId = document.getElementById(techWatchPublication.id)
			.getAttribute('data-techWatchPubId');
	selectedTechWatchPubDate = document.getElementById(techWatchPublication.id)
			.getAttribute('data-techWatchPubDate');
	selectedTechWatchPubIndex = document
			.getElementById(techWatchPublication.id).getAttribute(
					'data-techWatchPubIndex');

	// alert("selectedTechWatchPubId " + selectedTechWatchPubId + "
	// selectedTechWatchPubIndex" + selectedTechWatchPubIndex);
	showTechWatchContent(selectedTechWatchPubId, selectedTechWatchPubIndex);

	$.mobile.changePage('#techWatchPage');

}