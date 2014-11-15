function Tag() {
}

Tag.prototype.initialize = function(guid, name) {
	this.javaClass = "com.evernote.edam.type.Tag";
	this.guid = guid;
	this.name = name;
};

Tag.prototype.isNew = function() {
	if (this.guid == null)
		return true;
	else
		return false;
};

Tag.prototype.toString = function() {
	return '[' + this.guid + ':' + this.name + ']';   
};

Tag.prototype.toCSV = function(tags) {
    var tagNames = [];
    for (var i = 0; i < tags.length; i++) {
        tagNames.push(tags[i].name);
    }
    return tagNames.join(", ");
};

Tag.prototype.fromCSV = function(tagNames) {
    var tagArray = [];
    var tags = tagNames.split(',');

    for (var i = 0; i < tags.length; i++) {
        var tagName = Tag.trim(tags[i]);
        if (tagName.length == 0) {
            continue;
        }
        tagArray.push(tagName);
    }

    return tagArray;
};

Tag.prototype.trim = function(tagName) {
	console.log("[Tag] trim: entered.");
    return tagName.replace(/^\s*/, "").replace(/\s*$/, "");
};

