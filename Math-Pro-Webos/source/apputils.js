function AppUtils() {
}

AppUtils.setSortingOrder = function(sortingMethod) {
	if(sortingMethod == 1) {
		enyo.application.sortorder = 1;
		enyo.application.ascendingflag = false;
	} else if(sortingMethod == 2) {
		enyo.application.sortorder = 1;
		enyo.application.ascendingflag = true;
	} else if(sortingMethod == 3) {
		enyo.application.sortorder = 2;
		enyo.application.ascendingflag = false;
	} else if(sortingMethod == 4) {
		enyo.application.sortorder = 2;
		enyo.application.ascendingflag = true;
	} else if(sortingMethod == 5) {
		enyo.application.sortorder = 5;
		enyo.application.ascendingflag = true;
	} else if(sortingMethod == 6) {
		enyo.application.sortorder = 5;
		enyo.application.ascendingflag = false;
	}
};

AppUtils.convertMapToObject = function(inputMapStr, type) {
	//console.log("convertMapToObject: ");
	var callbackVal = inputMapStr;
	var startIndex = callbackVal.indexOf('{');
	var endIndex = callbackVal.lastIndexOf('}');
	//If startIndex and endIndex is -1, return
	if(startIndex == -1 
		&& endIndex == -1) {
			return;
	}
	var jsonStr = callbackVal.substring(startIndex+1, endIndex);
	var noteTags = jsonStr.split(",");
	var list = [];
	//console.log("length: "+noteTags.length);
	for (var i = 0; i < noteTags.length; i++) {
		var guid_count = noteTags[i].split(":");
		//console.log("guid_count[1]: "+guid_count[1]);
		list[i] = new NotebookTagCounts(guid_count[0].replace(/\"/g,''), guid_count[1],type);
	}
	if(type == "NOTEBOOK") {
		enyo.application.notebookCountsList = list;
	} else if(type == "TAG") {
		enyo.application.tagCountsList = list;
	}
};

AppUtils.getTotalNotes = function() {
	var totalNotes = 0;
	for (var i = 0; i < enyo.application.notebookCountsList.length; i++) {
		var counts = enyo.application.notebookCountsList[i];
		totalNotes += parseInt(counts.count);	
	}
	return totalNotes;
};