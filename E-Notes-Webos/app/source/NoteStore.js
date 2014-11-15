function NoteStore(remote, authToken, splashUpdate) {
    this.remote = remote;
    this.authToken = authToken;
	this.splashScreenUpdate = splashUpdate;
	this.totalLength = 0;
}

NoteStore.prototype.createNote = function(onSuccessCB, onFailureCB, note) {
	
	var converter = function(note, transport) {
			//console.log("createNote: "+JSON.stringify(transport));
			var converted = NoteStore.convertToObject(note);
			onSuccessCB(converted, transport);
		};
	var self = this;	
	var failure = function(transport) {
		//console.log("createNote FAILURE: "+JSON.stringify(transport));
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.createNote(converter, onFailureCB, self.authToken, note);				
			} else if (onFailureCB)
				onFailureCB();
		};
		
    this.remote.NoteStore.createNote(converter, failure, this.authToken, note);
};

NoteStore.prototype.updateNote = function(onSuccessCB, onFailureCB, note) {
    var converter = function(note, transport) {
			//console.log("updateNote: "+JSON.stringify(transport));
			var converted = NoteStore.convertToObject(note);
			onSuccessCB(converted, transport);
		};
		
	var self = this;	
	var failure = function(transport) {
		console.log("updateNote FAILURE: "+JSON.stringify(transport));
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.updateNote(converter, onFailureCB, self.authToken, note);				
			} else if (onFailureCB)
				onFailureCB();
		};
		
    this.remote.NoteStore.updateNote(converter, failure, this.authToken, note);
};

NoteStore.prototype.emailNote = function(onSuccessCB, onFailureCB, noteparams) {
    var self = this;	
	var failure = function(transport) {
		console.log("updateNote FAILURE: "+JSON.stringify(transport));
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.emailNote(onSuccessCB, onFailureCB, self.authToken, noteparams);				
			} else if (onFailureCB)
				onFailureCB();
		};
		
    this.remote.NoteStore.emailNote(onSuccessCB, failure, this.authToken, noteparams);
};

NoteStore.prototype.listTags = function(onSuccess, onFailure, forceRemote) {
	var converter = function(list, transport) {
			var converted = NoteStore.convertToObject(list);
			onSuccess(converted, transport);
		};
		
	var self = this;	
	var failure = function(transport) {
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.listTags(converter, onFailure, self.authToken);				
			} else if (onFailure)
				onFailure();
		};
		
	this.remote.NoteStore.listTags(converter, failure, this.authToken);
};

NoteStore.prototype.listNotebooks = function(onSuccess, onFailure, forceRemote) {
	var converter = function(list, transport) {
			var converted = NoteStore.convertToObject(list);
			onSuccess(converted, transport);
		};
		
	var self = this;	
	var failure = function(transport) {
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.listNotebooks(converter, onFailure, self.authToken);				
			} else if (onFailure)
				onFailure();
		};
		
	this.remote.NoteStore.listNotebooks(converter, failure, this.authToken);
};

NoteStore.prototype.getNote = function(onSuccess, onFailure, guid, withContent) {
	try{
		var self = this;
		var converter = function(note, transport) {
			var converted = NoteStore.convertToObject(note);
			//self._postProcessNote(converted);
			onSuccess(converted, transport);
		};
		
		var failure = function(transport) {
			//console.log("[NoteStore] ERROR: "+JSON.stringify(transport));
			try{
				//console.log("AUTH_EXPIRED: "+JSON.stringify(transport).indexOf("AUTH_EXPIRED"));
				if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
					enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
					self.remote.NoteStore.getNote(converter, onFailure, self.authToken, guid, withContent, false, false, false);				
				} else if (onFailure)
					onFailure();
			}catch(e) {
				console.log("Error: "+e);
			}
		};

		this.remote.NoteStore.getNote(converter, failure, this.authToken, guid, withContent, false, false, false);
	}catch(e) {
		console.log("Error: "+e);
	}
};

NoteStore.prototype.findNotes = function(onSuccess, onFailure, noteFilter, offset, max) {
	try{
		var self = this;
		var metaData = new NotesMetadataResultSpec();
		var failure = function(transport) {
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.findNotesMetadata(self._onFindNotesSuccess.bind(self,onSuccess), onFailure,
															self.authToken, noteFilter, offset, max,metaData);				
			} else if (onFailure)
				onFailure();
		};
		
		this.remote.NoteStore.findNotesMetadata(
            this._onFindNotesSuccess.bind(this,onSuccess),
            failure,
            this.authToken, noteFilter, offset, max,metaData);
		/*this.remote.NoteStore.findNotes(
            this._onFindNotesSuccess.bind(this,onSuccess),
            this._onFindNotesFailure.bind(this,onFailure),
            this.authToken, noteFilter, offset, max);
		this.remote.NoteStoreExtra.findBasicNotes(
            this._onFindNotesSuccess.bind(this,onSuccess),
            this._onFindNotesFailure.bind(this,onFailure),
            this.authToken, noteFilter, offset, max);
			*/	
	} catch(e) {
		console.log("Error: "+e);
	}
};

NoteStore.prototype.findNoteCounts = function(onSuccess, onFailure, noteFilter) {
	try{
		var self = this;	
		var failure = function(transport) {
			if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
				enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
				self.remote.NoteStore.findNoteCounts(onSuccess, onFailure, self.authToken, noteFilter, false);				
			} else if (onFailure)
				onFailure();
		};
		
		this.remote.NoteStore.findNoteCounts(
			onSuccess,
            failure,
            this.authToken, noteFilter, false);
	} catch(e) {
		console.log("Error: "+e);
	}
};


NoteStore.prototype._onFindNotesSuccess = function(onSuccess,noteList, transport) {
	try{
		var converted = NoteStore.convertToObject(noteList);
		onSuccess(converted, transport);
	} catch(e) {
		console.log("Error: "+e);
	}
};

NoteStore.prototype._onFindNotesFailure = function(onFailure,transport) {
    //var err = EvernoteContext.getErrorManager().getErrorMessage(transport);
    //console.log("[NoteStore] Failed to find notes: "+JSON.stringify(transport));
    if (onFailure)
        onFailure();
};

NoteStore.prototype.createNotebook = function(onSuccess, onFailure, nb) {
    var self = this;	
	var failure = function(transport) {
		if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
			enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
			self.remote.NoteStore.createNotebook(onSuccess, onFailure, self.authToken, nb);				
		} else if (onFailure)
			onFailure();
	};
		
	this.remote.NoteStore.createNotebook(onSuccess, failure, this.authToken, nb);
};

NoteStore.prototype.updateNotebook = function(onSuccess, onFailure, nb) {
    var self = this;	
	var failure = function(transport) {
		if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
			enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
			self.remote.NoteStore.updateNotebook(onSuccess, onFailure, self.authToken, nb);				
		} else if (onFailure)
			onFailure();
	};
    
	this.remote.NoteStore.updateNotebook(onSuccess, failure, this.authToken, nb);
};

NoteStore.prototype.createTag = function(onSuccess, onFailure, tag) {
    var self = this;	
	var failure = function(transport) {
		if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
			enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
			self.remote.NoteStore.createTag(onSuccess, onFailure, self.authToken, tag);				
		} else if (onFailure)
			onFailure();
	};
    
	this.remote.NoteStore.createTag(onSuccess, failure, this.authToken, tag);
};

NoteStore.prototype.updateTag = function(onSuccess, onFailure, tag) {
    var self = this;	
	var failure = function(transport) {
		if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
			enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
			self.remote.NoteStore.updateTag(onSuccess, onFailure, self.authToken, tag);				
		} else if (onFailure)
			onFailure();
	};
    
	this.remote.NoteStore.updateTag(onSuccess, failure, this.authToken, tag);
};

NoteStore.prototype.deleteNote = function(onSuccessCB, onFailureCB, guid) {
	var self = this;	
	var failure = function(transport) {
		if(JSON.stringify(transport).indexOf("AUTH_EXPIRED") != -1) {
			enyo.application.EvernoteInstance.refreshRemoteInstances(enyo.application.username,enyo.application.password);
			self.remote.NoteStore.deleteNote(onSuccessCB, onFailureCB, self.authToken, guid);				
		} else if (onFailureCB)
			onFailureCB();
	};
    this.remote.NoteStore.deleteNote(onSuccessCB, failure, this.authToken, guid);
};

NoteStore.convertToObject = function(data) {
    if (! data)
        return data;
    try{
		var converted = data;
		if (converted.list && converted.list.length) {
			// this.totalLength = 0;
			//console.log("[NoteStore] convertToObject - List found, reset counter.."+converted.list.length); 
			for (var i = 0; i < converted.list.length; i++) {
				converted.list[i] = NoteStore.convertToObject(converted.list[i]);
			}
			//console.log("After conversion");
		}
		else if (converted.length && converted.length > 0) {
			//console.log("2");
			for (i = 0; i < converted.length; i++) {
				converted[i] = NoteStore.convertToObject(converted[i]);
			}
		} 
		else if (converted.notes && converted.notes.list && converted.notes.list.length) {
			//console.log("3");
				for (i = 0; i < converted.notes.list.length; i++) {
					converted.notes.list[i] = NoteStore.convertToObject(converted.notes.list[i]);
				}
			}
		else if (converted.javaClass) {
			//console.log("4");
			var arr = converted.javaClass.split(".");
			var jc = arr[arr.length - 1];
			//console.log("jc: "+jc);
			switch (jc) {
				case "NoteStoreExtras$BasicNoteInfo":
				case "NoteMetadata":
				case "Note":        converted = new Note(); 
									converted.initialize(data.guid,data.title,data.notebook,data.content);
									break;
				case "Notebook":    converted = new Notebook();
									//console.log("data.name: "+data.name);
									converted.initialize(data.guid,data.name);
									break;
				case "NoteFilter":  converted = new NoteFilter();  break;
				case "NoteList":    converted = new NoteList();    
									converted.initialize();
									break;
				//case "SavedSearch": converted = new SavedSearch(); break;
				//case "SyncState":   converted = new SyncState();   break;
				case "Tag":         converted = new Tag();
									converted.initialize(data.guid,data.name);
									break;
				case "NoteCollectionCounts":
									converted = new NoteCollectionCounts(data.notebookCountsSize,data.tagCountsSize);
									converted.setNotebookCounts(data.notebookCounts);
									converted.setTagCounts(data.tagCounts);
									break;
			}
			for (prop in data) {
				if (data.hasOwnProperty(prop) && typeof(data[prop]) != "function") {
					//console.log("prop: "+prop+" data: "+data[prop]);
					converted[prop] = data[prop];
				}
			}

			if (jc == "NoteList") {
				NoteStore.convertToObject(converted.notes);
			}

			if (jc == "Note") {
				if (converted.getStatus() == Note.STATUS_UNKNOWN) {
				 converted.setStatus(Note.STATUS_OPEN);
				}
			}

		}
		return converted;
	}catch(e) {
		console.log("Error : "+e);
		return data;
	}
};
