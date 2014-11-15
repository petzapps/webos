function NoteAttributes() {
	this.javaClass = "com.evernote.edam.notestore.NoteFilter";
	this.words = "";
	this.notebookGuid = null;
	this.order = 1;
	this.ascending = true;
}

NoteAttributes.prototype.updateProperties = function(that) {
	for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = that[prop];
            }
        }
};

NoteAttributes.prototype.isEmpty = function() {
	if (this.longitude == 0) 
            return true;
        else
            return false;
};

NoteAttributes.INVALID_LONGITUDE = 0;
NoteAttributes.INVALID_LATITUDE = 0;
