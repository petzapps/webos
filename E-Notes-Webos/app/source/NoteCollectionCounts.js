function NoteCollectionCounts(notebookCountsSize, tagCountsSize) {
	this.javaClass = "com.evernote.edam.notestore.NoteCollectionCounts";
	this.notebookCountsSize = notebookCountsSize;
	this.tagCountsSize = tagCountsSize;
	this.notebookCounts = { javaClass: "java.util.HashMap", map: [] };
	this.tagCounts = { javaClass: "java.util.HashMap", map: [] };
};

NoteCollectionCounts.prototype.setNotebookCounts = function(notebookCounts) {
	this.notebookCounts = notebookCounts;
};

NoteCollectionCounts.prototype.setTagCounts = function(tagCounts) {
	this.tagCounts = tagCounts;
};

NoteCollectionCounts.prototype.toString = function() {
	return "[NoteCollectionCounts] notebookCounts: "+this.notebookCounts;
};