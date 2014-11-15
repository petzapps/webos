function NoteList() {
}

NoteList.prototype.initialize = function() {
	this.javaClass = "com.evernote.edam.notestore.NoteList";
	this.startIndex = 0;
	this.totalNotes = 0;
	this.notes = { javaClass: "java.util.ArrayList", list: [] };
	this.stoppedWords = { javaClass: "java.util.ArrayList", list: [] };
	this.searchedWords = { javaClass: "java.util.ArrayList", list: [] };
};