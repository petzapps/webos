function Notebook() {
}

Notebook.prototype.initialize = function(guid, name) {
    this.javaClass = "com.evernote.edam.type.Notebook";
	this.guid = guid;
	this.name = name;
	this.defaultNotebook = false;
};