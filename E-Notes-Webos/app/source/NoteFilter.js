function NoteFilter() {
	this.javaClass = "com.evernote.edam.notestore.NoteFilter";
	this.words = "";
	this.notebookGuid = null;
	this.tagGuids = null;
	this.order = 1;
	this.ascending = true;
	this.__isset = true;
	this.setTagCounts = true;
	this.setNotebookCounts = true;
}

NoteFilter.prototype.initialize = function() {
	this.javaClass = "com.evernote.edam.notestore.NoteFilter";
	this.words = "";
	this.notebookGuid = null;
	this.tagGuids = null;
	this.order = 1;
	this.ascending = true;
	this.__isset = true;
};

NoteFilter.prototype.setQueryString = function(queryString) {
	this.words = "";
	if (queryString.length == 0)
		return;

	var words = queryString.split("|");
	for (var i = 0; i < words.length; i++)
	{
		var word = words[i];
		this.words += " " + word;// + "*";
	}
};

NoteFilter.prototype.setSearchString = function(searchString) {
	//this.words = "";
	if (searchString.length == 0)
		return;

	var words = searchString.split(" ");
	for (var i = 0; i < words.length; i++)
	{
		var word = words[i];
		this.words += " " + word + "*";
	}
};

NoteFilter.prototype.setNotebook = function(notebook) {
	if(notebook === 'null'){
		this.notebookGuid = null;
	}
	else{
		this.notebookGuid = notebook;
	}
};

NoteFilter.prototype.setOrder = function(order) {
	this.order = order;
};

NoteFilter.prototype.setAscendingFlag = function(ascending) {
	this.ascending = ascending;
};

NoteFilter.prototype.setTags = function(tags) {
	if(tags === 'null'){
		this.tagGuids = null;
	}
	else{
		var list = [];
		console.log("tags.length: "+tags.length);
		for (var i = 0; i < tags.length; i++) {
		  list[i] = tags[i];
		}
		this.tagGuids = list;
	}
};

NoteFilter.prototype.hasNotebook = function() {
	return this.notebookGuid;
};

NoteFilter.prototype.hasWords = function() {
	return this.words || this.words.length > 0;
};

NoteFilter.prototype.toString = function() {
	return (this.tagGuids) || "no filter";
};