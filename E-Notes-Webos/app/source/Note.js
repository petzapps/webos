function Note() {
}

Note.prototype.initialize = function(guid, title, notebook, content) {
	/**
	 * Evernote API Properties
	 */
	this.javaClass = "com.evernote.edam.type.Note";
	this.guid = guid;
	this.title = title;
	this.content = content;
	this.created = null;
	this.updated = null;
	this.notebookGuid = notebook;
	//this.tagGuids = { javaClass: "java.util.ArrayList", list: [] };
	this.tagGuids = [];
	this.tagNames = [];
	this.active = true;
	this.attributes = new NoteAttributes();
	this.resources = null;
	
	/**
	 * Custom Properties
	 */
	this._status = Note.STATUS_UNKNOWN;
	this.tags = [];
	this.notebook = notebook;
	this.viewId = Note._generateViewId();
	this.formattedContent = null;
	this.highlightedFormattedContent = null;
	this.updateSequenceNum = -1;

	this.todos = new Hash();
	this.unsyncedTodos = false;

	this.file = undefined;
	this.fileSource = undefined;
};

Note.prototype.isNew = function() {
	if (this.getStatus() == Note.STATUS_NEW )
            return true;
        else
            return false;
};

Note.prototype.isPending = function() {
	if (this.isNew() || this.getStatus() == Note.STATUS_PENDING)
            return true;
        else
            return false;
};

Note.prototype.isEmpty = function() {
	return ! this.formattedContent;
};

Note.prototype.getFormattedContent = function() {
	return this.formattedContent;
};
Note.prototype.getHighlightedFormattedContent = function() {
	if (this.highlightedFormattedContent)
            return this.highlightedFormattedContent;
        else if (suppressDefaultContent)
            return "";
        else
            return $L("Tap in this area to edit note content");
};
Note.prototype.getFormattedCreateDate = function() {
	return Note.dateFormatter.format(new Date(this.created));
};
Note.prototype.getFormattedUpdateDate = function() {
	return Note.dateFormatter.format(new Date(this.updated));
};

Note.prototype.getTagNamesAsString = function() {
	if (! this.tags || this.tags.length == 0)
            return $L("Not Tagged");

        var names = [];
        for (var i = 0; i < this.tags.length; i++) {
            var tag = this.tags[i];
            if (tag && tag.name)
                names.push(tag.name);
        }

        return names.join(", ");
};
Note.prototype.getTagGuidsAsString = function() {
	if (! this.tags || this.tags.length == 0)
            return "";

        var guids = [];
        for (var i = 0; i < this.tags.length; i++) {
            var tag = this.tags[i];
            if (tag && tag.name)
                guids.push(tag.guid);
        }

        return guids.join(",");
};

Note.prototype.toSubmittable = function() {
		var submittable = new Note();
        submittable.guid = this.guid;
        submittable.title = encodeURIComponent(this.title);
        if (this.created) {
            submittable.created = this.created;
        }
        else {
            submittable.created = (new Date()).getTime();
        }
        if (this.updated) {
            submittable.updated = this.updated;
        }
        else {
            submittable.updated = (new Date()).getTime();
        }
        submittable.content = encodeURIComponent(this.content);
        submittable.notebookGuid = this.notebookGuid;
		submittable.tagNames = this.tagNames;
        
        submittable.attributes = null;
                
        return submittable;
};
Note.prototype.updatePropertiesBut = function(that,except) {
	var _except = except || new Array();

        for (var prop in this) {
            if (this.hasOwnProperty(prop) && _except.indexOf(prop) == -1) {
                this[prop] = that[prop];
            }
        }
};

Note.prototype.updateProperties = function(that,only) {
	if(!only){
			return;
		}

        for (var prop in this) {
            if (this.hasOwnProperty(prop) && only.indexOf(prop) != -1) {
                this[prop] = that[prop];
            }
        }
};
Note.prototype.getStatus = function() {
	return this._status;
};

Note.prototype.setStatus = function(newStatus) {
	this._status = newStatus;
};
Note.prototype.getStatusName = function(value) {
	switch(this._status) {
            case Note.STATUS_DELETED:
                return "DELETED";
            case Note.STATUS_NEW:
                return "NEW";
            case Note.STATUS_OPEN:
                return "OPEN";
            case Note.STATUS_DIRTY:
                return "DIRTY";
            case Note.STATUS_PENDING:
                return "PENDING";
            default:
                return "UNKNOWN";
        }
};

Note.prototype.hasFile = function() {
	return this.file != undefined;
};

Note.prototype.getFileFullPath = function() {
	if (!this.hasFile()) {
            return undefined;
        }

        return this.file.fullPath;
};

Note.prototype.getFileName = function() {
	if (!this.hasFile()) {
            return undefined;
        }

        var indexOfSlash = this.file.fullPath.lastIndexOf('/');
        var indexOfExt = this.file.fullPath.lastIndexOf('.');
        return this.file.fullPath.substring(indexOfSlash+1,indexOfExt);
};

Note._generateViewId = function() {
    return "NOTE" + "-" + Note._generateGUID() + "-" + Note._generateGUID() + "-" + Note._generateGUID();
};

Note._generateGUID = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1).toUpperCase();
};

Note.dateFormatter = new SimpleDateFormat("MMMM d, yyyy h:mm a");

/**
 * Class properties for this note's status.
 */
Note.STATUS_UNKNOWN = -1;
Note.STATUS_NEW = 0;
Note.STATUS_OPEN = 2;           // Indicates any existing note that is not new
Note.STATUS_DIRTY = 3;          // Indicates that an existing note is known to have been modified
Note.STATUS_PENDING = 4;        // Indicates that an existing note is awaiting to be sync'd with server
Note.STATUS_DELETED = 5;       // Indicates the note is deleted according to the palm-pre

Note.ATTACHED_FILE_SRC_SNAPSHOT = 1;
Note.ATTACHED_FILE_SRC_PHOTO = 2;
Note.ATTACHED_FILE_SRC_FILE = 3;


