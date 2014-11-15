enyo.kind({
	name: "enyo.PetzApps.TouchSurf",
	kind: enyo.VFlexBox,
	flex: 1,
	components: [
		{kind: "ApplicationEvents", onWindowRotated: "windowRotated", onWindowParamsChange: "windowParamsChangeHandler"},
		{name: "slidingPane", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [
			{name: "left", width: "200px", components: [
				{kind: "VFlexBox",
					className: "enyo-bg", flex: 1, components: [
						{name: "header", pack:"start", kind: "Header",height: "65px;", className:"enyo-header-dark",style:"color:white;margin:1px;",
							components: [
								{content: $L("Categories"),style:"font-size: 0.85em;"},
								{content: "", flex: 0.2},
								{kind: "Button", caption: $L("Edit"),style:"margin:1px;font-size: 0.8em;",className: "enyo-button-blue", onclick: "editCatClicked", flex: 1},
								{kind: "Button", caption: $L("Add"),style:"margin:1px;font-size: 0.8em;",className: "enyo-button-blue", onclick: "addCatBtnClicked", flex: 1}
							]},
						{kind: "Scroller", flex: 1, components: [
							//{name: "categorylist", kind: "VirtualList", onclick: "categorySelected", height: "600px;",  
							{name: "categorylist", kind: "ReorderableVirtualList", reorderable:true, onReorder: "reorderCategory", onclick: "categorySelected", height: "600px;",  
									onSetupRow: "setupRow",
							components: [
								{name:"listItem", kind: "SwipeableItem", onConfirm: "deleteCategoryItem", layoutKind: "HFlexLayout", components: [
									  {kind: enyo.HFlexBox,flex:1,
										components: [
										  {name: "catVal", flex : 2,style:"font-size: 0.9em;margin:5px;"},
										  {name: "categoryimage",src: "images/fav32.png",kind:"Image",width:"32px",height:"32px",
											flex : 1,pack:"center"}
									  ]}
								  ]}
							]}
						]},
						{kind: "Toolbar", components: [
							{kind: "GrabButton"}
						]}
				]}
			]},
			{name: "middle", width: "200px", fixedWidth: true, /*peekWidth: 68,*/ components: [
				{kind: "VFlexBox",
					className: "enyo-bg", flex: 1, components: [
						{name: "siteheader", pack:"start", kind: "Header",height: "65px;",className:"enyo-header-dark",style:"color:white;margin:1px;",
							components: [
								{content: $L("Sites"), flex: 1,style:"font-size: 0.9em;"},
								{content: "", flex: 4},
								{kind: "Button", caption: $L("Edit"),style:"margin:1px;font-size: 0.8em;",className: "enyo-button-blue", onclick: "editSiteClicked", flex: 1},
								{kind: "Button", caption: $L("Add"),style:"margin:1px;font-size: 0.8em;",className: "enyo-button-blue", onclick: "addBtnClicked", flex: 1}
							]},
						{kind: "Scroller", flex: 1, components: [
							//{name: "sitelist", kind: "VirtualList", onclick: "siteSelected", height: "600px;",  
							{name: "sitelist", kind: "ReorderableVirtualList", reorderable:true, onReorder: "reorderList", onclick: "siteSelected", height: "600px;", 
								onSetupRow: "setupSiteRow",
								components: [
									{name:"siteItem", kind: "SwipeableItem", layoutKind: "HFlexLayout",
										onConfirm: "deleteItem", components: [
										{kind: enyo.HFlexBox,flex:1,
										components: [
										  {name: "siteVal", flex : 2,style:"font-size: 0.9em;margin:5px;"},
										  {name: "siteimage",kind:"Image",width:"32px",height:"32px",
											flex : 1,pack:"center"}
										]}
									  ]}
								]}
						]},
						{kind: "Toolbar", components: [
							{kind: "GrabButton"},
							{caption: "",flex:1.0},
							{kind: "ToolButtonGroup", pack:"center", components: [
								{icon: "images/heart_add.png", onclick: "addToFavoritesClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
								{icon: "images/fullscreen_32.png", onclick: "fullScreenClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
								{icon: "images/www.png", onclick: "toggleAddressClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							]}
						]}
				]}
			]},
			{name: "right", flex: 1, dismissible: false, onHide: "rightHide", onShow: "rightShow", onResize: "slidingResize", components: [
				{kind: "VFlexBox",
					className: "enyo-bg", flex: 1, components: [
					//{kind: enyo.Spinner, name: "webViewSpinner",align: "right"},
					{name: "mainheader", pack:"start", kind: "Header",height: "65px;",style:"margin:1px;",className:"enyo-header-dark",
					components: [
						{kind: "ToolInput", spellcheck: false, autocorrect: false, autoCapitalize: "lowercase", autoWordComplete: false, name:"addressUrl", flex: 1,height: "38px;",selectAllOnFocus: true, hint: "Enter URL",style:"color:black;",onkeypress: "inputChange"},
						//{content: "", flex: 1},
						{kind: "ToolButtonGroup", pack:"center", components: [
							{icon: "images/refresh.png", onclick: "goToPageClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
						]},
					]},
					{kind: "Scroller", flex: 1, components: [
						{name: "webView", kind: "WebView", flex: 1, minFontSize: 2,height: "98.5%",
							//style:"padding: 4px;border-color:#2554C7;border-style:solid; border-width:5px;",
							style:"padding: 9px;",
							onUrlRedirected: "openLink",
							onMousehold: "webviewMousehold",
							onSingleTap: "webviewSingleTap",
							onPageTitleChanged: "pageTitleChanged",
							className: "webview-body",
							enableJavascript: true,
							blockPopups: false,
							acceptCookies: true,
							autoFit: false,
							fitRender: true,
							onError: "webviewError",
							onDisconnected: "webviewDisconnected",
							onAlertDialog: "alertDialogHandler",
							onConfirmDialog: "confirmDialogHandler",
							onPromptDialog: "promptDialogHandler",
							onSSLConfirmDialog: "SSLConfirmDialogHandler",
							onLoadComplete: "onComplete", onLoadStopped: "onStopped", 
							onLoadStarted: "onStarted",
							onNewPage: "openNewCardWithIdentifier",
						},	
					]},
					{kind: "Toolbar",  components: [
						{kind: "GrabButton"},
						{caption: "",flex:0.25},
						{kind: enyo.Spinner, name: "webViewSpinner",align: "right"},
						{caption: "",flex:1.5},
						{kind: "ToolButtonGroup", pack:"center", components: [
							{icon: "images/menu-icon-back.png", onclick: "backClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							{icon: "images/refresh.png", onclick: "refreshClicked" , className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							{icon: "images/menu-icon-forward.png", onclick: "forwardClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"}
						]},
						{caption: "",flex:0.8},
						{kind: "ToolButtonGroup", pack:"center", components: [
							{icon: "images/bookmark.png", onclick: "addToBookmarksClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							{icon: "images/email.png", onclick: "sendEmailClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							{icon: "images/browser.png", onclick: "openInBrowserClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
						]},
					]}
				]}
			]}
		]},
		{kind: "Menu", className: "example-submenu", components: [
			{caption: "Toggle Full Screen", icon: "images/fullscreen_32.png", onclick: "fullScreenClicked",style:"margin:1px;"},
			{caption: "Open In Browser", icon: "images/browser.png", onclick: "openInBrowserClicked",style:"margin:1px;"},
			{caption: "Add to Favorites", icon: "images/heart_add.png", onclick: "addToFavoritesClicked",style:"margin:1px;"}
		]},
		{kind: "AppMenu", components: [
				{caption: "About", onclick: "openAbout"},
				{caption: "Preferences", onclick: "openPreferences"},
				{caption: "Help", components: [
						{caption: "Leave Review", onclick: "openCatalog"},
						{caption: "Save / Restore Options", onclick: "openRestoreDialog"},
						{caption: "Email Developer", onclick: "emailDeveloper"},
				]},
		]},
		{name: "aboutPopup", kind: "Popup", scrim: true, components: [
				{content: "Touch Surf - "+enyo.fetchAppInfo().version, style: "text-align: center; font-size: larger;"},
				{content: "<hr />", allowHtml: true},
				{name: "aboutPopupText", content: "TouchSurf is an app for Surfing the web with a Touch on a webOS tablet.", style: "text-align: center; font-size: smaller;"},
				{content: "<hr />", allowHtml: true},
				{kind: "Button", caption: "OK", onclick:"closeAboutPopup"}
		]},
		{name: "restorePopup", kind: "Popup", scrim: true, width: "600px", components: [
				{content: "Touch Surf does not have the capability to import data now. However, there is a manual method of copying/restoring the application database, which is explained in detail below",allowHtml: true, style: "font-size: smaller;"},
				{content: "<hr />", allowHtml: true},
				{name: "restorePopupText", content: "<a href='http://petzapps.blogspot.com/2011/11/savingrestoring-touch-surf-database.html'>Save / Restore Database</a>", allowHtml: true,style: "text-align: center;"},
				{content: "<hr />", allowHtml: true},
				{kind: "Button", caption: "OK", onclick:"closeRestorePopup"}
		]},
		{
			 name: "launchBrowserCall",
			 kind: "PalmService",
			 service: "palm://com.palm.applicationManager/",
			 method: "launch",
			 onSuccess: "launchFinished",
			 onFailure: "launchFail",
			 onResponse: "gotResponse",
			 subscribe: true
		},
		{kind: "ModalDialog", name: "errorDialog", caption: "Error", components:[
			{name:"errorMessage", content: "", className: "enyo-text-error warning-icon"},
			{kind: "Button", caption: $L("OK"), onclick: "closeErrorPopup", style: "margin-top:10px"},
		]},
		{kind: "ModalDialog", name: "errorExample", caption: "Error", components:[
			{name:"errorContent", content: $L("No Site Selected"), className: "enyo-text-error warning-icon"},
			{kind: "Button", caption: $L("OK"), onclick: "closePopup", style: "margin-top:10px"},
		]},
		{kind: "ModalDialog", name: "favErrorExample", caption: "Error", components:[
			{name:"errorContent", content: $L("Favorites Category cannot be deleted"), className: "enyo-text-error warning-icon"},
			{kind: "Button", caption: $L("OK"), onclick: "closePopup", style: "margin-top:10px"},
		]},
		{kind: "ModalDialog", name: "infoExample", caption: "Info", components:[
			{name:"infoContent", content: $L("Site added to Favorites"), style:"font-size:0.7em;margin:1px;padding-left:1em;color:green"},
			{kind: "Button", caption: $L("OK"), onclick: "closePopup", style: "margin-top:10px"},
		]},
		{kind: "ModalDialog", name: "addDialog", caption: "Add Site",width: "450px", components:[
			{kind: "Group", components: [
					{kind: "RowItem", className: "enyo-first", layoutKind: "HFlexLayout", components: [
						{content: $L("Category"), flex: 1.4,style:"margin:15px;"},
						//drop-down
						{kind: "Button", width: "150px;",flex: 2, components: [
							{kind: "ListSelector", name: "categoryListSelector",items: []}
						]}
					]},
					{kind: "RowItem", layoutKind: "HFlexLayout",components: [
						{content: $L("Name"), flex: 2.1,style:"margin:15px;"},
						{name: "dsite_name", hint: $L("Enter Site Name..."), autocorrect:false,
								width: "175px;", kind: "Input",style:"margin:4px;", flex: 0.7},
						{name: "dsite_icon", kind: "Button", width: "35px;", flex:0.5,components: [
								{kind: "ListSelector", name: "siteIconListSelector",items: []}
							]}
					]},
					{kind: "RowItem", layoutKind: "HFlexLayout", components: [
						{content: $L("Site URL"), flex: 1.4,style:"margin:15px;"},
						{name: "dsite_url", width: "175px;", 
							hint: $L("Enter Site URL (ex. http://...)"),inputType:"url",autocorrect:false,autoCapitalize:"lowercase",
							kind: "Input",style:"margin:4px;", flex: 2}
					]}
			]},
			{layoutKind: "HFlexLayout", components: [  
	    		{kind: "Button", caption: $L("Cancel"), flex: 1, onclick: "closeDialog"},
		    	{kind: "Button", className: "enyo-button-affirmative", flex: 1, caption: $L("Add"), onclick: "addSiteBtnClicked"},
			]},
			{ name: "message", content: "",style:"margin:1px;font-size: 0.8em;" }
		]},
		{kind: "ModalDialog", name: "editSiteDialog", caption: "Edit Site",width: "450px", components:[
			{kind: "Group", components: [
					{kind: "RowItem", className: "enyo-first", layoutKind: "HFlexLayout", components: [
						{content: $L("Category"), flex: 1.4,style:"margin:15px;"},
						//drop-down
						{kind: "Button", width: "150px;",flex: 2, components: [
							{kind: "ListSelector", name: "editCategoryListSelector",items: []}
						]}
					]},
					{kind: "RowItem", layoutKind: "HFlexLayout",components: [
						{content: $L("Name"), flex: 2.1,style:"margin:15px;"},
						{name: "deditsite_name", hint: $L("Enter Site Name..."), autocorrect:false,
								width: "175px;", kind: "Input",style:"margin:4px;", flex: 0.7},
						{name: "deditsite_icon", kind: "Button", width: "35px;", flex:0.5,components: [
								{kind: "ListSelector", name: "editSiteIconListSelector",items: []}
							]}
					]},
					{kind: "RowItem", layoutKind: "HFlexLayout", components: [
						{content: $L("Site URL"), flex: 1.4,style:"margin:15px;"},
						{name: "deditsite_url", width: "175px;", 
							hint: $L("Enter Site URL (ex. http://...)"),inputType:"url",autocorrect:false,autoCapitalize:"lowercase",
							kind: "Input",style:"margin:4px;", flex: 2}
					]}
			]},
			{layoutKind: "HFlexLayout", components: [  
	    		{kind: "Button", caption: $L("Cancel"), flex: 1, onclick: "closeEditDialog"},
		    	{kind: "Button", className: "enyo-button-affirmative", flex: 1, caption: $L("Save"), onclick: "editSiteBtnClicked"},
			]},
			{ name: "editsitemessage", content: "",style:"margin:1px;font-size: 0.8em;" }
		]},
		{kind: "ModalDialog", name: "addCatDialog", caption: "Add Category",width: "400px", components:[
			{kind: "Group", components: [
					{kind: "RowItem", layoutKind: "HFlexLayout",components: [
						{content: $L("Category"), flex: 2.5,style:"margin:15px;"},
						{name: "dcat_name", hint: $L("Enter Name..."), autocorrect:false,
								width: "140px;", kind: "Input",style:"margin:4px;", flex: 1.2},
						{name: "dcat_icon", kind: "Button", width: "35px;", flex:0.6,components: [
								{kind: "ListSelector", name: "catIconListSelector",items: []}
							]}
					]}
			]},
			{layoutKind: "HFlexLayout", components: [  
	    		{kind: "Button", caption: $L("Cancel"), flex: 1, onclick: "closeCatDialog"},
		    	{kind: "Button", className: "enyo-button-affirmative", flex: 1, caption: $L("Add"), onclick: "addCategoryClicked"},
			]},
			{ name: "catmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
		]},
		{kind: "ModalDialog", name: "editCatDialog", caption: "Edit Category",width: "400px", components:[
			{kind: "Group", components: [
					{kind: "RowItem", layoutKind: "HFlexLayout",components: [
						{content: $L("Category"), flex: 2.5,style:"margin:15px;"},
						{name: "deditcat_name", hint: $L("Enter Name..."), autocorrect:false,
								width: "140px;", kind: "Input",style:"margin:4px;", flex: 1.2},
						{name: "deditcat_icon", kind: "Button", width: "35px;", flex:0.6,components: [
								{kind: "ListSelector", name: "editCatIconListSelector",items: []}
							]}
					]}
			]},
			{layoutKind: "HFlexLayout", components: [  
	    		{kind: "Button", caption: $L("Cancel"), flex: 1, onclick: "closeEditCatDialog"},
		    	{kind: "Button", className: "enyo-button-affirmative", flex: 1, caption: $L("Save"), onclick: "editCategoryClicked"},
			]},
			{ name: "editcatmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
		]},
	  {
			name: "db",
			kind: "onecrayon.Database",
			database: 'ext:TouchSurf1DB',
			//database: 'ext:TouchSurf65DB',
			version: "",
			debug: false
	  },
	  {name: "appMgrOpen", method:"open", kind:"enyo.PalmService", service: enyo.palmServices.application},
	  {name: "webviewContextMenu", kind: "PopupSelect", onSelect: "webviewContextMenuSelect"},
	  {
			name: "openEmailCall",
			kind: "PalmService",
			service: "palm://com.palm.applicationManager/",
			method: "open",
			onSuccess: "openEmailSuccess",
			onFailure: "openEmailFailure",
			onResponse: "gotResponse",
			subscribe: true
	  },
	  {name: "preferencesPopup", kind: "Popup", scrim: true, onBeforeOpen: "beforePreferencesOpen", components: [
				{name: "preferencesHeader", style: "text-align: center;"},
				{content: "<hr/>", allowHtml: true},
				/*{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "sortingPane", kind: "ListSelector", label: "Default Full Screen", onChange: "sortingPaneSelect", flex: 1, items: [
								{caption: "Yes", value: 1,},
								{caption: "No", value: 2,},
						]},
				]},*/
				{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{content: "Full Screen", flex: 1},
						{name: "fullScreen", kind: "ToggleButton", onChange: "fullScreenToggle"},
				]},
				{kind: "Button", caption: "Save", onclick:"saveNewPreferences"}
		]},
	],
	toggleAddressClicked: function() {
		if(this.addressShown != null && this.addressShown == false) {
			this.$.mainheader.show();
			this.addressShown = true;
		} else {
			this.$.mainheader.hide();
			this.addressShown = false;
		}
	},
	inputChange: function(inSender, inEvent) {
		if (inEvent.keyCode == 13) {
			this.goToPageClicked();
		}
	},
	goToPageClicked: function() {
		//Check if url value is blank
		var url = this.$.addressUrl.getValue();
		if(url.length == 0) {
			this.showErrorDialog("Please Enter URL");
			return;
		}
		//console.log("TouchSurf: goToPageClicked Invoked...."+url);
		this.$.webView.setUrl(url);
		//Removes focus from address bar
		document.activeElement.blur();
	},
	showErrorDialog: function(message) {
		this.$.errorDialog.openAtCenter();
		this.$.errorMessage.setContent(message);		
	},
	closeErrorPopup: function() {
		this.$.errorDialog.close();
	},
	windowParamsChangeHandler: function() {
		var orient = enyo.getWindowOrientation();
		this.setListHeights(orient);
	},
	windowRotated: function(inSender, inEvent) {
		var orient = enyo.getWindowOrientation();
		this.setListHeights(orient);
	},
	setListHeights: function(orient) {
		if(orient == "up"
			|| orient == "down") {
			this.$.slidingPane.selectView(this.$.left);
		} else {
			this.$.slidingPane.selectView(this.$.middle);
		}
	},
	saveNewPreferences: function() {
		//Get the user preferred values
		//console.log("Full Screen ? "+this.$.fullScreen.getState());
		//Set Variables
		this.isFullScreen = this.$.fullScreen.getState();
		this.DBfullScreenValue = this.isFullScreen;
		//Save to DB
		var dummydata;
		var updatedb = this.$.db.getUpdate("preferences",{"pref_value": this.isFullScreen},{"pref_type":"full_screen"});
		this.$.db.query(updatedb, dummydata);
		//Close Popup
		this.$.preferencesPopup.close();
		enyo.windows.addBannerMessage($L("Preferences Saved"),"{}");
	},
	openPreferences: function() {
		try{
			this.$.preferencesPopup.openAtCenter();
			this.$.fullScreen.setState(this.DBfullScreenValue);
		} catch(e) {
			console.log("Error"+e);
		}
	},
	openLink: function(inSender, url) {
		//console.log("### Opening URL"+ url);
		// Launch default app for handling this url
		this.$.appMgrOpen.call({target:url, subscribe: false});
	},
	openEmailSuccess : function(inSender, inResponse) {
		//enyo.log("Open email success, results=" + enyo.json.stringify(inResponse));
	},
	openEmailFailure : function(inSender, inResponse) {
		//enyo.log("Open email failure, results=" + enyo.json.stringify(inResponse));
	},
	pageTitleChanged: function(inSender, inTitle, inUrl, inBack, inForward) {
		//console.log("#########pageTitleChanged: "+inUrl+" # "+inTitle+" # "+inBack+" # "+inForward);
		this.currentURL = enyo.string.escapeHtml(inUrl);		
		this.title = inTitle || $L("Untitled");
		this.$.addressUrl.setValue(this.currentURL);
		/*if (!this.$.dialog.isOpen) {
			this.$.actionbar.setUrl(this.url);
			this.$.actionbar.setTitle(this.title);
		}
		this.gotHistoryState(inBack, inForward);*/
		//this.doPageTitleChanged(this.title, this.currentURL);
	},
	webviewSingleTap: function(inSender, inPosition, inEvent, inTapInfo) {
		//Not getting invoked.
		//console.log("@@@@@@@@ Single Tap...");
		/*if(inTapInfo.isLink) {
			console.log("URL : "+inTapInfo.linkUrl);
		}*/
	},
	openNewCardWithIdentifier: function(inSender, inIdentifier) {
		this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{webviewId: inIdentifier}});
	},
	webviewMousehold: function(inSender, event, tapInfo) {
		//console.log("@@@@@@@@ MOUSE HOLD @@@@@@@@@@@ "+this.$.webView.url);
		
		if (tapInfo.isLink || tapInfo.isImage) {
			var tapPosition = {left: event.pageX, top: event.pageY};
		
			this.webviewTapInfo = tapInfo;
			this.webviewTapInfo.tapPosition = tapPosition;
		
			var items = [];
			
			if (tapInfo.isLink) {
				items.push({caption: $L("Open In New Card"), value: "webviewOpenLink"});
				items.push({caption: $L("Copy URL"), value: "webviewCopyUrl"});
			}
			
			if (tapInfo.isImage) {
				items.push({caption: $L("Copy To Photos"), value: "webviewCopyImage"});
			}
			
			this.$.webviewContextMenu.setItems(items);
			this.$.webviewContextMenu.openAtControl(this.$.webView, {left: event.pageX, top: event.pageY});
			return true;
		}
	},
	webviewOpenLink: function(tapInfo) {
		if (tapInfo.linkUrl) {
			this.$.appMgrOpen.call({target: tapInfo.linkUrl});
		}
	},
	webviewCopyUrl: function(tapInfo) {
		enyo.dom.setClipboard(tapInfo.linkUrl);
		enyo.windows.addBannerMessage($L("Link copied to Clipboard"),"{}");
	},
	webviewCopyImage: function(tapInfo) {
		this.callBody("saveImageAtPoint", [tapInfo.tapPosition.left, tapInfo.tapPosition.top, "/media/internal/downloads",
			enyo.hitch(this, "webviewCopyDone")]);
	},
	callBody: function(inMethod, inArgs) {
		if (window.PalmSystem) {
			var v = this.$.webView;
			if (v[inMethod]) {
				v[inMethod].apply(v, inArgs);
			} else {
				v.callBrowserAdapter(inMethod, inArgs);
			}
		}
	},
	webviewCopyDone: function() {
		enyo.windows.addBannerMessage($L("Image copied to Photos"),"{}");
	},
	webviewContextMenuSelect: function(inSender, selected) {
		var action = selected.getValue();
		var tapInfo = this.webviewTapInfo;
		this.webviewTapInfo = null;
		
		if (this[action]) {
			this[action](tapInfo);
		}
	},
	webviewError: function(sender, errorCode, errorMsg) {
		//console.error("WebView error "+errorCode+": "+errorMsg);		
		/*if(errorCode === 404 || errorCode === 1000) {
			window.clearTimeout(this.disconnectRetryTimeoutID);
			this.retryBodyLoad(errorMsg);
		}*/
	},
	webviewDisconnected: function(sender, requested) {
		if(requested) {
			return;
		}
		// Because of the automatic crash recovery in the webview widget, and because our email body temp files are 
		// deleted as soon as they are read, we may get a 404 "file not found" error whether or not we retry here.
		// If we retry both here and in webviewError() in response to 404, then we end up retrying twice for a crash.
		// So, we set a 2s timeout for this retry, and clear the timeout in the case where we receive the 404 error.
		//console.error("Unexpected WebView disconnect.  WebView should retry automatically, and we'll handle a 404-file-not-found error");		
		//this.disconnectRetryTimeoutID = window.setTimeout(this.retryBodyLoad.bind(this, "Unexpected webview disconnect"), 8000); // 5-sec timeout in webview before it reconnects. Sorry.
		
	},
	alertDialogHandler: function () {
        this.$.webView.cancelDialog();
    },    
    confirmDialogHandler: function () {
        this.$.webView.cancelDialog();
    },
    promptDialogHandler: function () {
        this.$.webView.cancelDialog();
    },
    SSLConfirmDialogHandler: function () {
        this.$.webView.cancelDialog();
    },
		
	reorderList:function(inSender,toIndex,fromIndex)
	{
		//console.log("reorder site: fromIndex: "+fromIndex+" toIndex: "+toIndex);
		if(toIndex != fromIndex && toIndex > -1 && toIndex < this.sitedata.length)
		{
			var fromRowID = this.sitedata[fromIndex].reorder_siteRowID;
			var fromReorderId = this.sitedata[fromIndex].reorder_id;
			var toRowID = this.sitedata[toIndex].reorder_siteRowID;
			var toReorderId = this.sitedata[toIndex].reorder_id;
			
			var temp 			=	this.sitedata.splice(fromIndex,1);
			var bottom 			=	this.sitedata.slice(toIndex);
			this.sitedata.length 	=	toIndex;
			this.sitedata.push.apply(this.sitedata,temp);
			this.sitedata.push.apply(this.sitedata,bottom)
			
			//Update sites reorder table
			var dummydata;
			var updatedb = this.$.db.getUpdate("sites_reorder",{"reorder_id": toReorderId},{"reorder_siteRowID":fromRowID});
			this.$.db.query(updatedb, dummydata);
			var updatedb = this.$.db.getUpdate("sites_reorder",{"reorder_id": fromReorderId},{"reorder_siteRowID":toRowID});
			this.$.db.query(updatedb, dummydata);
			//Update selectedRow variable
			if(this.selectedSiteRow == fromIndex) {
				this.selectedSiteRow = toIndex;
			} else if(this.selectedSiteRow == toIndex) {
				this.selectedSiteRow = fromIndex;
			}
			// Refresh Virtual List
			this.addSitesReorderResponse();
		}
	},
	reorderCategory:function(inSender,toIndex,fromIndex)
	{
		//console.log("reorder category: fromIndex: "+fromIndex+" toIndex: "+toIndex);
		if(toIndex != fromIndex && toIndex > -1 && toIndex < this.data.length)
		{
			//console.log("From: "+this.data[fromIndex].catRowID+" : "+this.data[fromIndex].reorder_id);
			//console.log("To: "+this.data[toIndex].catRowID+" : "+this.data[toIndex].reorder_id);
			var fromRowID = this.data[fromIndex].catRowID;
			var fromReorderId = this.data[fromIndex].reorder_id;
			var toRowID = this.data[toIndex].catRowID;
			var toReorderId = this.data[toIndex].reorder_id;
			
			var temp 			=	this.data.splice(fromIndex,1);
			var bottom 			=	this.data.slice(toIndex);
			this.data.length 	=	toIndex;
			this.data.push.apply(this.data,temp);
			this.data.push.apply(this.data,bottom)
			
			//Update category reorder table
			var dummydata;
			var updatedb = this.$.db.getUpdate("categories_reorder",{"reorder_id": toReorderId},{"catRowID":fromRowID});
			this.$.db.query(updatedb, dummydata);
			var updatedb = this.$.db.getUpdate("categories_reorder",{"reorder_id": fromReorderId},{"catRowID":toRowID});
			this.$.db.query(updatedb, dummydata);
			//Update selectedRow variable
			if(this.selectedRow == fromIndex) {
				this.selectedRow = toIndex;
			} else if(this.selectedRow == toIndex) {
				this.selectedRow = fromIndex;
			}
			// Reload data from DB
			this.loadDataResponse();
		}
	},
	openAbout: function() {
		this.$.aboutPopup.openAtCenter();
	},
	openRestoreDialog: function() {
		this.$.restorePopup.openAtCenter();
	},
	closeRestorePopup: function() {
		this.$.restorePopup.close();
	},
	closeAboutPopup: function() {
		this.$.aboutPopup.close();
	},
	openDonate: function() {
		this.$.donatePopup.openAtCenter();
	},
	openCatalog: function() {
		var appInfo = enyo.fetchAppInfo();
		window.open("http://developer.palm.com/appredirect/?packageid="+appInfo.id);
	},
	emailDeveloper: function() {
		var appInfo = enyo.fetchAppInfo();
		window.open("mailto:petzapps.help@gmail.com?subject=TouchSurf Help - v"+appInfo.version);
	},
	closeEditCatDialog: function() {
		this.$.deditcat_name.setValue("");
		this.$.editcatmessage.setContent("");
		this.$.editCatDialog.close();
	},
	closeCatDialog: function() {
		this.$.dcat_name.setValue("");
		this.$.catmessage.setContent("");
		this.$.addCatDialog.close();
	},
	backClicked: function(inSender, inResponse) {
		this.$.webView.goBack();
	},
	forwardClicked: function(inSender, inResponse) {
		//console.log("Forward Clicked");
		this.$.webView.goForward();
	},
	refreshClicked: function(inSender, inResponse) {
		//console.log("refresh Clicked");
		this.$.webView.reloadPage();
	},
	launchFinished: function(inSender, inResponse) {
		//console.log("Launch browser success, results=" + enyo.json.stringify(inResponse));
	},
	launchFail: function(inSender, inResponse) {
		//console.log("Launch browser failure, results=" + enyo.json.stringify(inResponse));
	},
	fullScreenClicked: function() {
		if(this.isFullScreen) {
			this.isFullScreen = false;
		} else {
			this.isFullScreen = true;
		}
		enyo.setFullScreen(this.isFullScreen);
	},
	/*facebookClicked: function() {
		//Check if site is selected, if not, return
		if(this.selectedSiteRow == null ||
			this.selectedSiteRow == -1) {
			this.$.errorExample.openAtCenter();
			return;
		}
		var record = this.sitedata[this.selectedSiteRow];
		var targetUrl = record.site_url;
		if(!this.handlePageTitleChanged) {
			targetUrl = this.handlePageTitleChanged;
		}
		this.$.launchBrowserCall.call({"id": "com.palm.app.enyo-facebook", "params":{type: "status",statusText: targetUrl}});
	},*/
	openInBrowserClicked: function() {
		//Check if site is selected, if not, return
		if(this.selectedSiteRow == null ||
			this.selectedSiteRow == -1) {
			if(! this.currentURL) {
				this.$.errorExample.openAtCenter();
				return;
			}
		}
		var record = this.sitedata[this.selectedSiteRow];
		var targetUrl = '';
		var siteName = '';
		if(record) {
			targetUrl = record.site_url;
			siteName = siteName;
		}		
		if(this.currentURL) {
			targetUrl = this.currentURL;
			siteName = this.title;
		}
		this.$.launchBrowserCall.call({"id": "com.palm.app.browser",title: siteName, "params":{"target": targetUrl}});
	},
	addToBookmarksClicked: function() {
      //Check if currentURL is available, if not then show error
	  if(! this.currentURL) {
			this.$.errorExample.openAtCenter();
			return;
	  }
	  //Get the Categories from DB
	  try {
			this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
								+' order by reorder_id',
							{onSuccess: this.addToBookmarksResponse.bind(this)});							
	  }
	  catch (e)
	  {
			console.error("Error"+e);
	  }
	  //If URL available, then show Add Site page with URL value populated
	  
    },
	sendEmailClicked: function() {
      //Check if currentURL is available, if not then show error
	  if(! this.currentURL) {
			this.$.errorExample.openAtCenter();
			return;
	  }
	  //Send Email
	  //console.log("Subject: "+this.title+" URL: "+this.currentURL);
	  
	  var emailText = "I would like to share this article:<br><br><a href='"+this.currentURL+"'>"+this.currentURL+"</a>";
	  emailText += "<br><br><br><font size='2' color='grey'>Sent via: <a href='http://developer.palm.com/appredirect/?packageid=com.petzapps.touchsurf'>Touch Surf for TouchPad</a></font>";
	  var params =  {
			"summary":this.title,
			"text":emailText
	   };
	   this.$.openEmailCall.call({"id": "com.palm.app.email", "params":params});
    },
	addToBookmarksResponse : function(results)
    {
		var dummydata;
		var items = [];
		var iconItems = [];
		//NOTE: Have to display before setting items, else setItems will fail.
		this.$.addDialog.openAtCenter();
		for (var j=0; j < results.length; j++)
		{
			items.push({"caption": results[j].category_name, "value": results[j].rowID});
		}
		this.$.categoryListSelector.setItems( items );
		this.$.categoryListSelector.setValue(results[0].rowID);
		//
		iconItems.push({"icon": "images/browser.png", "value": "images/browser.png"});
		iconItems.push({"icon": "images/www_page.png", "value": "images/www_page.png"});
		iconItems.push({"icon": "images/fav32.png", "value": "images/fav32.png"});
		iconItems.push({"icon": "images/email_32.png", "value": "images/email_32.png"});
		iconItems.push({"icon": "images/googletalk_32.png", "value": "images/googletalk_32.png"});
		iconItems.push({"icon": "images/group.png", "value": "images/group.png"});
		iconItems.push({"icon": "images/google.png", "value": "images/google.png"});
		iconItems.push({"icon": "images/yahoo_32.png", "value": "images/yahoo_32.png"});
		iconItems.push({"icon": "images/msn.png", "value": "images/msn.png"});
		iconItems.push({"icon": "images/rss_icon_32.png", "value": "images/rss_icon_32.png"});
		iconItems.push({"icon": "images/newspaper.png", "value": "images/newspaper.png"});
		iconItems.push({"icon": "images/picture.png", "value": "images/picture.png"});
		iconItems.push({"icon": "images/car.png", "value": "images/car.png"});
		iconItems.push({"icon": "images/card_bank.png", "value": "images/card_bank.png"});
		iconItems.push({"icon": "images/sun_rain.png", "value": "images/sun_rain.png"});
		iconItems.push({"icon": "images/sport.png", "value": "images/sport.png"});		
		
		this.$.siteIconListSelector.setItems( iconItems );
		this.$.siteIconListSelector.setValue(iconItems[0].icon);
		
		//Set Current Page URL
		this.$.dsite_url.setValue(this.currentURL);
		//Set Site Name
		//this.$.dsite_name.setValue(this.title);
		var startIndex = this.currentURL.indexOf('\.');
		var siteNamePart = this.currentURL.substring(startIndex+1);
		var endIndex = siteNamePart.indexOf('\.');
		//TODO: If startIndex and endIndex is -1, return
		var siteName = "";
		if(endIndex != -1) {
			siteName = siteNamePart.substring(0, endIndex);
		}		
		this.$.dsite_name.setValue(siteName);
    },
	addToFavoritesClicked: function() {
      var dummydata;
	  //Check if site is selected, if not, return
	  if(this.selectedSiteRow == null ||
			this.selectedSiteRow == -1) {
			this.$.errorExample.openAtCenter();
			return;
	  }
	  var record = this.sitedata[this.selectedSiteRow];
	  //Add to DB
	  var adddb = this.$.db.getInsert("sites",{"category_id": enyo.application.categoriesdata[0].rowID,
						"site_name":record.site_name,"site_url": record.site_url,"site_image": record.site_image});
	  this.$.db.query(adddb, {onSuccess: this.favSiteInsertResponse.bind(this)});
	  
	  //Show Info message
	  this.$.infoExample.openAtCenter();
    },
	favSiteInsertResponse: function() {
	  try{
			//Get the sites from DB
			var selectdb = this.$.db.getSelect("sites",null,{"category_id":enyo.application.categoriesdata[0].rowID});
			this.$.db.query(selectdb, {onSuccess: this.getSitesResponse.bind(this)});
		} catch(e) {
			console.log("Error"+e);
		}
    },
	closePopup: function(inSender, inEvent) {
		inSender.parent.parent.parent.close();
	},
	editCatClicked: function() {
		  var record = this.data[this.selectedRow];
		  if(record) {
				if(record.rowID == 1) {
					this.showErrorDialog("Favorites cannot be Edited");
					return
				}
				var iconItems = [];
				this.$.editCatDialog.openAtCenter();    
				iconItems.push({"icon": "images/browser.png", "value": "images/browser.png"});
				iconItems.push({"icon": "images/www_page.png", "value": "images/www_page.png"});
				iconItems.push({"icon": "images/fav32.png", "value": "images/fav32.png"});
				iconItems.push({"icon": "images/email_32.png", "value": "images/email_32.png"});
				iconItems.push({"icon": "images/googletalk_32.png", "value": "images/googletalk_32.png"});
				iconItems.push({"icon": "images/group.png", "value": "images/group.png"});
				iconItems.push({"icon": "images/google.png", "value": "images/google.png"});
				iconItems.push({"icon": "images/yahoo_32.png", "value": "images/yahoo_32.png"});
				iconItems.push({"icon": "images/msn.png", "value": "images/msn.png"});
				iconItems.push({"icon": "images/rss_icon_32.png", "value": "images/rss_icon_32.png"});
				iconItems.push({"icon": "images/newspaper.png", "value": "images/newspaper.png"});
				iconItems.push({"icon": "images/picture.png", "value": "images/picture.png"});
				iconItems.push({"icon": "images/car.png", "value": "images/car.png"});
				iconItems.push({"icon": "images/card_bank.png", "value": "images/card_bank.png"});
				iconItems.push({"icon": "images/sun_rain.png", "value": "images/sun_rain.png"});
				iconItems.push({"icon": "images/sport.png", "value": "images/sport.png"});		
				
				this.$.editCatIconListSelector.setItems( iconItems );
				var isIconSet = false;
				for(var item in iconItems) {
					if((""+iconItems[item].icon) === record.category_image) {
						this.$.editCatIconListSelector.setValue(iconItems[item].icon);
						isIconSet = true;
						break;
					}
				}
				if(!isIconSet) {
					iconItems.push({"icon": record.category_image, "value": record.category_image});
					this.$.editCatIconListSelector.setValue(record.category_image);
				}
				this.$.deditcat_name.setValue(record.category_name);
		  } else {
			this.showErrorDialog("Select a Category to Edit");
			return
		  }
	
		
    },
	addCatBtnClicked: function() {
		var iconItems = [];
		this.$.addCatDialog.openAtCenter();    
		iconItems.push({"icon": "images/browser.png", "value": "images/browser.png"});
		iconItems.push({"icon": "images/www_page.png", "value": "images/www_page.png"});
		iconItems.push({"icon": "images/fav32.png", "value": "images/fav32.png"});
		iconItems.push({"icon": "images/email_32.png", "value": "images/email_32.png"});
		iconItems.push({"icon": "images/googletalk_32.png", "value": "images/googletalk_32.png"});
		iconItems.push({"icon": "images/group.png", "value": "images/group.png"});
		iconItems.push({"icon": "images/google.png", "value": "images/google.png"});
		iconItems.push({"icon": "images/yahoo_32.png", "value": "images/yahoo_32.png"});
		iconItems.push({"icon": "images/msn.png", "value": "images/msn.png"});
		iconItems.push({"icon": "images/rss_icon_32.png", "value": "images/rss_icon_32.png"});
		iconItems.push({"icon": "images/newspaper.png", "value": "images/newspaper.png"});
		iconItems.push({"icon": "images/picture.png", "value": "images/picture.png"});
		iconItems.push({"icon": "images/car.png", "value": "images/car.png"});
		iconItems.push({"icon": "images/card_bank.png", "value": "images/card_bank.png"});
		iconItems.push({"icon": "images/sun_rain.png", "value": "images/sun_rain.png"});
		iconItems.push({"icon": "images/sport.png", "value": "images/sport.png"});		
		
		this.$.catIconListSelector.setItems( iconItems );
		this.$.catIconListSelector.setValue(iconItems[0].icon);
    },
	editSiteClicked: function() {
	  var record = this.sitedata[this.selectedSiteRow];
	  if(record) {
		  //Get the Categories from DB
		  try {
				this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
									+' order by reorder_id',
								{onSuccess: this.editSiteClickedResponse.bind(this)});							
		  }
		  catch (e)
		  {
				console.error("Error"+e);
		  }
	  } else {
		this.showErrorDialog("Select a Site to Edit");
		return
	  }
	  
    },
	editSiteClickedResponse : function(results)
   {
		var dummydata;
		var items = [];
		var iconItems = [];
		//NOTE: Have to display before setting items, else setItems will fail.
		this.$.editSiteDialog.openAtCenter();
		for (var j=0; j < results.length; j++)
		{
			items.push({"caption": results[j].category_name, "value": results[j].rowID});
		}
		var record = this.sitedata[this.selectedSiteRow];
		
		this.$.editCategoryListSelector.setItems( items );
		this.$.editCategoryListSelector.setValue(record.category_id);
		//
		iconItems.push({"icon": "images/browser.png", "value": "images/browser.png"});
		iconItems.push({"icon": "images/www_page.png", "value": "images/www_page.png"});
		iconItems.push({"icon": "images/fav32.png", "value": "images/fav32.png"});
		iconItems.push({"icon": "images/email_32.png", "value": "images/email_32.png"});
		iconItems.push({"icon": "images/googletalk_32.png", "value": "images/googletalk_32.png"});
		iconItems.push({"icon": "images/group.png", "value": "images/group.png"});
		iconItems.push({"icon": "images/google.png", "value": "images/google.png"});
		iconItems.push({"icon": "images/yahoo_32.png", "value": "images/yahoo_32.png"});
		iconItems.push({"icon": "images/msn.png", "value": "images/msn.png"});
		iconItems.push({"icon": "images/rss_icon_32.png", "value": "images/rss_icon_32.png"});
		iconItems.push({"icon": "images/newspaper.png", "value": "images/newspaper.png"});
		iconItems.push({"icon": "images/picture.png", "value": "images/picture.png"});
		iconItems.push({"icon": "images/car.png", "value": "images/car.png"});
		iconItems.push({"icon": "images/card_bank.png", "value": "images/card_bank.png"});
		iconItems.push({"icon": "images/sun_rain.png", "value": "images/sun_rain.png"});
		iconItems.push({"icon": "images/sport.png", "value": "images/sport.png"});		
		
		this.$.editSiteIconListSelector.setItems( iconItems );
		var isIconSet = false;
		for(var item in iconItems) {
			//console.log("Equals ? "+((""+iconItems[item].icon) === record.site_image));
			if((""+iconItems[item].icon) === record.site_image) {
				this.$.editSiteIconListSelector.setValue(iconItems[item].icon);
				isIconSet = true;
				break;
			}
		}
		if(!isIconSet) {
			iconItems.push({"icon": record.site_image, "value": record.site_image});
			this.$.editSiteIconListSelector.setValue(record.site_image);
		}
		this.$.deditsite_name.setValue(record.site_name);
		this.$.deditsite_url.setValue(record.site_url);
   },
	addBtnClicked: function() {
	  //Get the Categories from DB
	  try {
			this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
								+' order by reorder_id',
							{onSuccess: this.addSiteBtnClickedResponse.bind(this)});							
	  }
	  catch (e)
	  {
			console.error("Error"+e);
	  }
    },
   addSiteBtnClickedResponse : function(results)
   {
		var dummydata;
		var items = [];
		var iconItems = [];
		//NOTE: Have to display before setting items, else setItems will fail.
		this.$.addDialog.openAtCenter();
		for (var j=0; j < results.length; j++)
		{
			items.push({"caption": results[j].category_name, "value": results[j].rowID});
		}
		this.$.categoryListSelector.setItems( items );
		this.$.categoryListSelector.setValue(results[0].rowID);
		//
		iconItems.push({"icon": "images/browser.png", "value": "images/browser.png"});
		iconItems.push({"icon": "images/www_page.png", "value": "images/www_page.png"});
		iconItems.push({"icon": "images/fav32.png", "value": "images/fav32.png"});
		iconItems.push({"icon": "images/email_32.png", "value": "images/email_32.png"});
		iconItems.push({"icon": "images/googletalk_32.png", "value": "images/googletalk_32.png"});
		iconItems.push({"icon": "images/group.png", "value": "images/group.png"});
		iconItems.push({"icon": "images/google.png", "value": "images/google.png"});
		iconItems.push({"icon": "images/yahoo_32.png", "value": "images/yahoo_32.png"});
		iconItems.push({"icon": "images/msn.png", "value": "images/msn.png"});
		iconItems.push({"icon": "images/rss_icon_32.png", "value": "images/rss_icon_32.png"});
		iconItems.push({"icon": "images/newspaper.png", "value": "images/newspaper.png"});
		iconItems.push({"icon": "images/picture.png", "value": "images/picture.png"});
		iconItems.push({"icon": "images/car.png", "value": "images/car.png"});
		iconItems.push({"icon": "images/card_bank.png", "value": "images/card_bank.png"});
		iconItems.push({"icon": "images/sun_rain.png", "value": "images/sun_rain.png"});
		iconItems.push({"icon": "images/sport.png", "value": "images/sport.png"});		
		
		this.$.siteIconListSelector.setItems( iconItems );
		this.$.siteIconListSelector.setValue(iconItems[0].icon);
		
   },
	deleteItem: function(inSender, inIndex) {
		// remove data
		var record = this.sitedata[inIndex];
		this.deleteSiteIndex = inIndex;
		var dummydata;
		if (record) {
			//Delete item from DB
			var deletedb = this.$.db.getDelete("sites",{"siteRowID":record.siteRowID});
			this.$.db.query(deletedb, dummydata);
			//Delete from reorder sites table
			var deletereorderdb = this.$.db.getDelete("sites_reorder",{"reorder_siteRowID":record.siteRowID});
			this.$.db.query(deletereorderdb, {onSuccess: this.deleteSiteItemResponse.bind(this)});
		}
		this.sitedata.splice(inIndex, 1);
	},
	deleteSiteItemResponse: function() {
		if(this.selectedSiteRow == this.deleteSiteIndex) {
			this.selectedSiteRow = -1;
		} else if(this.selectedSiteRow > this.deleteSiteIndex) {
			this.selectedSiteRow -= 1;
		}
		//this.addSitesReorderResponse();
		this.$.sitelist.refresh();
	},
	deleteCategoryItem: function(inSender, inIndex) {
		var record = this.data[inIndex];
		var dummydata;
		this.deleteCatIndex = inIndex;
		if (record) {
			//Check if its a Favorites category, if yes, then return error
			if(record.rowID == 1) {
				this.$.favErrorExample.openAtCenter();
				return;
			}
			//Delete sites from DB
			var deletesitedb = this.$.db.getDelete("sites",{"category_id":record.rowID});
			this.$.db.query(deletesitedb, dummydata);
			//Delete from reorder sites table
			var deletereorderdb = this.$.db.getDelete("sites_reorder",{"reorder_category_id":record.rowID});
			this.$.db.query(deletereorderdb, dummydata);
			//Delete Category from DB
			var deleteCatdb = this.$.db.getDelete("categories",{"rowID":record.rowID});
			this.$.db.query(deleteCatdb, dummydata);
			//Delete from Category Reorder from DB
			var deleteCatReorderdb = this.$.db.getDelete("categories_reorder",{"catRowID":record.rowID});
			this.$.db.query(deleteCatReorderdb, {onSuccess: this.deleteCategoryItemResponse.bind(this)});
		}
		this.data.splice(inIndex, 1);
	},
   deleteCategoryItemResponse: function() {
		if(this.selectedRow == this.deleteCatIndex) {
			this.selectedRow = -1;
			this.selectedSiteRow = -1;
			this.sitedata = [];
			this.$.sitelist.refresh();
		} else if(this.selectedRow > this.deleteCatIndex) {
			this.selectedRow -= 1;
		}
		//this.addSitesReorderResponse();
		this.$.categorylist.refresh();
	},
	alphanumeric: function(alphane)
	{
		var numaric = alphane;
		for(var j=0; j<numaric.length; j++)
		{
		  var alphaa = numaric.charAt(j);
		  var hh = alphaa.charCodeAt(0);
		  if((hh > 47 && hh<58) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh == 32)
		  {}else{
			return false;
		  }
		}
		return true;
	},
	editCategoryClicked: function(inSender, inEvent) {
	  this.$.editcatmessage.setContent("");
	  var dummydata;
	  var catNameText = this.$.deditcat_name.getValue();
	  var catIconText = this.$.editCatIconListSelector.getValue();
	  if(catNameText.length == 0) {
		this.$.editcatmessage.setContent("Category Name cannot be blank");
		this.$.editcatmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		return;
	  }
	  
	  if(!this.alphanumeric(catNameText)) {
		this.$.editcatmessage.setContent("Invalid Category Name, only Alpha-Numeric allowed");
		this.$.editcatmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		return;
	  }
	  //
	  //If Valid, update the category in DB, refresh category list
	  var record = this.data[this.selectedRow];
		//Update Sites table with name, url and image
	  //this.categoryId = categoryText;
	  var updatedb = this.$.db.getUpdate("categories",{"category_name":catNameText,"category_image": catIconText},
											{"rowID":record.rowID});
	  this.$.db.query(updatedb, {onSuccess: this.catUpdateResponse.bind(this)});
   },
   catUpdateResponse: function() {
		this.closeEditCatDialog();
		this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
							+' order by reorder_id', {onSuccess: this.queryResponse.bind(this)});
		enyo.windows.addBannerMessage($L("Category Updated"),"{}");
    },
	addCategoryClicked: function(inSender, inEvent) {
	  this.$.catmessage.setContent("");
	  var dummydata;
	  var catNameText = this.$.dcat_name.getValue();
	  var catIconText = this.$.catIconListSelector.getValue();
	  if(catNameText.length == 0) {
		this.$.catmessage.setContent("Category Name cannot be blank");
		this.$.catmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		return;
	  }
	  
	  if(!this.alphanumeric(catNameText)) {
		this.$.catmessage.setContent("Invalid Category Name, only Alpha-Numeric allowed");
		this.$.catmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		return;
	  }
	  //
	  //If Valid, insert the data to DB, refresh category list, set info message
	  //
	  //Add to DB
	  //var catImage = "images/www_page.png";
	  var adddb = this.$.db.getInsert("categories",{"category_name": catNameText,"category_image": catIconText});
	  this.$.db.query(adddb, {onSuccess: this.catInsertResponse.bind(this)});
		
	  this.$.catmessage.setContent("Category Added");
	  this.$.catmessage.setStyle("margin:1px;font-size: 0.8em;color:green");
  },
  catInsertResponse: function() {
	  try{
		try{
			//Get the sites from DB
			this.$.db.query("select * from categories", {onSuccess: this.getCatResponse.bind(this)});			
		} catch(e) {
			console.log("Error"+e);
		}
	  } catch(e) {
		console.log("Error"+e);
	  }
	},
   getCatResponse : function(results)
   {
	  var dummydata;
	  var catRowIdArr = [];
	  for (var i = 0; i < results.length; i++) {
		catRowIdArr[i] = results[i].rowID;
	  }
	  
	  this.reorderMaxCatRowId = Math.max.apply(null, catRowIdArr);
	  //Get the sites reorders from DB  
	  this.$.db.query("select * from categories_reorder", {onSuccess: this.addCategoriesReorder.bind(this)});
   },
   addCategoriesReorder : function(results)
   {
	  var dummydata;
	  var reorderIdArr = [];
	  if(results.length > 0) {
	      for (var i = 0; i < results.length; i++) {
				reorderIdArr[i] = results[i].reorder_id;
		  }
		  var maxReorderId = Math.max.apply(null, reorderIdArr);
		  try {
			var adddb = this.$.db.getInsert("categories_reorder",{"catRowID": this.reorderMaxCatRowId,
									"reorder_id":(maxReorderId+1)});
			this.$.db.query(adddb, {onSuccess: this.addCategoriesReorderResponse.bind(this)});
		  }
		  catch (e)
		  {
			 this.error("Error"+e);
		  }
	  } else {
		//Add First Cat. Reorder Record
		try {
			var adddb = this.$.db.getInsert("categories_reorder",{"catRowID": this.reorderMaxCatRowId,
									"reorder_id": 0});
			this.$.db.query(adddb, {onSuccess: this.addCategoriesReorderResponse.bind(this)});
		  }
		  catch (e)
		  {
			 this.error("Error"+e);
		  }
	  }
      
   },
   addCategoriesReorderResponse : function()
   {
		//We need to refresh the list
		this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
							+' order by reorder_id',
								{onSuccess: this.loadInitData.bind(this)});
   },
   editSiteBtnClicked: function(inSender, inEvent) {
	  this.$.editsitemessage.setContent("");
	  var dummydata;
	  var categoryText = this.$.editCategoryListSelector.getValue();
	  var siteNameText = this.$.deditsite_name.getValue();
	  var siteIconText = this.$.editSiteIconListSelector.getValue();
	  var siteUrlText = this.$.deditsite_url.getValue();
	  //If invalid input, set the error message
	  if(siteNameText.length == 0 || siteUrlText.length == 0 ) {
		this.$.editsitemessage.setContent("Site Name and URL cannot be blank");
		this.$.editsitemessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		return;
	  }
	  if(siteUrlText.indexOf("http") == -1
			&& siteUrlText.indexOf("file:") == -1) {
		siteUrlText = "http://"+siteUrlText;
	  }
	  //console.log("siteUrlText : "+siteUrlText);
		try {
			var req = new XMLHttpRequest();
			req.open("GET", siteUrlText,false);
			req.send(null);
			if(req.responseText.length == 0) {
				this.$.editsitemessage.setContent("Cannot connect to the Site URL");
				this.$.editsitemessage.setStyle("margin:1px;font-size: 0.8em;color:red");
				return;
			}
		} catch (e) {
			// the connection couldn't be established
			//console.log("error: "+e);
			this.$.editsitemessage.setContent("Cannot connect to the Site URL");
			this.$.editsitemessage.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		}
	  //
	  //If Valid, update site data in DB, refresh sitelist, set info message
	  //
	  var record = this.sitedata[this.selectedSiteRow];
	  if(record.category_id == categoryText) {
		//Update Sites table with name, url and image
		this.categoryId = categoryText;
		var updatedb = this.$.db.getUpdate("sites",{"site_name":siteNameText,"site_url": siteUrlText,"site_image": siteIconText},
											{"siteRowID":record.siteRowID});
		this.$.db.query(updatedb, {onSuccess: this.siteUpdateResponse.bind(this)});
		
	  } else {
		  //Add New Site entry
		  this.reorderCategoryId = categoryText;
		  var adddb = this.$.db.getInsert("sites",{"category_id": categoryText,
							"site_name":siteNameText,"site_url": siteUrlText,"site_image": siteIconText});
		  this.$.db.query(adddb, {onSuccess: this.siteInsertResponse.bind(this)});
		  //Delete old enty
		  this.deleteSiteIndex = this.selectedSiteRow;
		  if (record) {
			//Delete item from DB
			var deletedb = this.$.db.getDelete("sites",{"siteRowID":record.siteRowID});
			this.$.db.query(deletedb, dummydata);
			//Delete from reorder sites table
			var deletereorderdb = this.$.db.getDelete("sites_reorder",{"reorder_siteRowID":record.siteRowID});
			this.$.db.query(deletereorderdb, {onSuccess: this.deleteSiteItemResponse.bind(this)});
		  }
		  this.sitedata.splice(this.selectedSiteRow, 1);
		  this.closeEditDialog();
		  enyo.windows.addBannerMessage($L("Site Updated"),"{}");
	  }
	  
  },
  siteUpdateResponse: function() {
		this.closeEditDialog();
		var selectdb = this.$.db.getSelect("sites",null,{"category_id":this.categoryId});
		this.$.db.query(selectdb, {onSuccess: this.categorySelectResponse.bind(this)});
		enyo.windows.addBannerMessage($L("Site Updated"),"{}");
  },
  addSiteBtnClicked: function(inSender, inEvent) {
	  this.$.message.setContent("");
	  var dummydata;
	  var categoryText = this.$.categoryListSelector.getValue();
	  var siteNameText = this.$.dsite_name.getValue();
	  var siteIconText = this.$.siteIconListSelector.getValue();
	  var siteUrlText = this.$.dsite_url.getValue();
	  //console.log(categoryText+" : "+siteNameText+" : "+siteUrlText);
	  //If invalid input, set the error message
	  if(siteNameText.length == 0 || siteUrlText.length == 0 ) {
		this.$.message.setContent("Site Name and URL cannot be blank");
		this.$.message.setStyle("margin:1px;font-size: 0.8em;color:red");
		return;
	  }
	  if(siteUrlText.indexOf("http") == -1
			&& siteUrlText.indexOf("file:") == -1) {
		siteUrlText = "http://"+siteUrlText;
	  }
	  //console.log("siteUrlText : "+siteUrlText);
		try {
			var req = new XMLHttpRequest();
			req.open("GET", siteUrlText,false);
			req.send(null);
			if(req.responseText.length == 0) {
				this.$.message.setContent("Cannot connect to the Site URL");
				this.$.message.setStyle("margin:1px;font-size: 0.8em;color:red");
				return;
			}
		} catch (e) {
			// the connection couldn't be established
			//console.log("error: "+e);
			this.$.message.setContent("Cannot connect to the Site URL");
			this.$.message.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		}
	  //
	  //If Valid, insert the data to DB, refresh sitelist, set info message
	  //
	  //Add to DB
	  this.reorderCategoryId = categoryText;
	  var adddb = this.$.db.getInsert("sites",{"category_id": categoryText,
						"site_name":siteNameText,"site_url": siteUrlText,"site_image": siteIconText});
	  this.$.db.query(adddb, {onSuccess: this.siteInsertResponse.bind(this)});
		
	  this.$.message.setContent("Site Added");
	  this.$.message.setStyle("margin:1px;font-size: 0.8em;color:green");
  },
	siteInsertResponse: function() {
	  try{
		try{
			//Get the sites from DB
			var selectdb = this.$.db.getSelect("sites",null,{"category_id":this.reorderCategoryId});
			this.$.db.query(selectdb, {onSuccess: this.getSitesResponse.bind(this)});			
		} catch(e) {
			console.log("Error"+e);
		}
	  } catch(e) {
		console.log("Error"+e);
	  }
	},
   getSitesResponse : function(results)
   {
	  var dummydata;
	  var siteRowIdArr = [];
	  //console.log("getSitesResponse results: "+results.length);
	  for (var i = 0; i < results.length; i++) {
		//console.log("results[i].siteRowID: "+results[i].siteRowID);
		siteRowIdArr[i] = results[i].siteRowID;
	  }
	  
	  this.reorderMaxSiteRowId = Math.max.apply(null, siteRowIdArr);
	  this.reorderCategoryId = results[0].category_id;
	  //console.log("reorderMaxSiteRowId: "+this.reorderMaxSiteRowId);
	  //Get the sites reorders from DB
  
	  var selectdb = this.$.db.getSelect("sites_reorder",null,{"reorder_category_id":this.reorderCategoryId});
	  this.$.db.query(selectdb, {onSuccess: this.addSitesReorder.bind(this)});
   },
   addSitesReorder : function(results)
   {
	  var dummydata;
	  var reorderIdArr = [];
	  if(results.length > 0) {
	      for (var i = 0; i < results.length; i++) {
				reorderIdArr[i] = results[i].reorder_id;
		  }
		  var maxReorderId = Math.max.apply(null, reorderIdArr);
		  //console.log("maxReorderId: "+maxReorderId);
		  try {
			var adddb = this.$.db.getInsert("sites_reorder",{"reorder_siteRowID": this.reorderMaxSiteRowId,
									"reorder_category_id": results[0].reorder_category_id,
									"reorder_id":(maxReorderId+1)});
			this.$.db.query(adddb, {onSuccess: this.addSitesReorderResponse.bind(this)});
		  }
		  catch (e)
		  {
			 this.error("Error"+e);
		  }
	  } else {
		//Add Site Reorder Record
		//console.log("Adding first reorder site entry for category "+this.reorderCategoryId+" site: "+this.reorderMaxSiteRowId);
		try {
			var adddb = this.$.db.getInsert("sites_reorder",{"reorder_siteRowID": this.reorderMaxSiteRowId,
									"reorder_category_id": this.reorderCategoryId,
									"reorder_id": 0});
			this.$.db.query(adddb, {onSuccess: this.addSitesReorderResponse.bind(this)});
		  }
		  catch (e)
		  {
			 this.error("Error"+e);
		  }
	  }
      
   },
   addSitesReorderResponse : function()
   {
		//We need to refresh the list
		//console.log("addSitesReorderResponse: "+this.selectedRow);
		var record = this.data[this.selectedRow];
		
		if(record) {
			//Fetch data from DB
			try{
				//console.log("addSitesReorderResponse: record.rowID "+record.rowID);
				//Get the sites from DB
				var queryStr = "SELECT * FROM sites,sites_reorder where siteRowID = reorder_siteRowID"
								+" and category_id = reorder_category_id";
				queryStr += " and category_id = "+record.rowID;				
				queryStr += " order by reorder_id";
				this.$.db.query(queryStr,{onSuccess: this.categorySelectResponse.bind(this)});
			} catch(e) {
				console.log("Error"+e);
			}
		}
   },
	closeDialog: function() {
		//Set blank for all input fields.
		//this.$.categoryListSelector.setValue("1");
		this.$.dsite_name.setValue("");
		this.$.dsite_url.setValue("");
		this.$.message.setContent("");
		this.$.addDialog.close();
	},
	closeEditDialog: function() {
		//Set blank for all input fields.
		//this.$.categoryListSelector.setValue("1");
		this.$.deditsite_name.setValue("");
		this.$.deditsite_url.setValue("");
		this.$.editsitemessage.setContent("");
		this.$.editSiteDialog.close();
	},
	create: function() {
	  this.sitedata = [];
	  this.selectedSiteRow = -1;
      this.inherited(arguments);
	  this.currentURL;
	  //this.isFullScreen = true;
	  //enyo.setFullScreen(this.isFullScreen);
	  if (window.PalmSystem)
		this.$.webView.clearCache();
		
	  //This is not creating table first time
	  //this.$.db.setSchemaFromURL("schemas/touchnet-schema.json", null);
	  
    },
   ready : function()
   {
	  try {
		var hacks_deviceInfo = enyo.fetchDeviceInfo();
		var hacks_isPhone = window.PalmSystem && hacks_deviceInfo.platformVersionMajor <= 2;
		if (typeof(window.zoomFactor) === "undefined") {
		   window.zoomFactor = 1;
		}
		if (hacks_isPhone) {
		   enyo.WebView.prototype.layoutKind = "HFlexLayout";
		   enyo.WebView.prototype.chrome[0] = {
			  kind: "Scroller",
			  flex: 1,
			  components: [enyo.WebView.prototype.chrome[0]]
		   };
		   enyo.WebView.prototype.style = "min-height: 10000px;";
		   var hacks_orig_BasicWebView__connect = enyo.BasicWebView.prototype._connect;
		   enyo.BasicWebView.prototype._connect = function() {
			  hacks_orig_BasicWebView__connect.apply(this, arguments);
			  this.serverConnected();
		   };
		   // allows us to put BasicWebView inside a Scroller, so that scrolling works
		   delete enyo.BasicWebView.prototype.dragstartHandler;
		   delete enyo.BasicWebView.prototype.flickHandler;
		   // forward click-events
		   enyo.BasicWebView.prototype.clickHandler = function(sender, event) {
			  // TODO what is the third parameter for?
			  this.node.clickAt(event.offsetX * window.zoomFactor, event.offsetY * window.zoomFactor, 0);
		   };
		   // apparently only called for Sym events
		   enyo.BasicWebView.prototype.keypressHandler = function(sender, event) {
			  this.node.insertStringAtCursor(String.fromCharCode(event.charCode));
		   };
		}
	  
		//Create DB tables, if not exists
		this.createTables();
		this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
							+' order by reorder_id',
								{onSuccess: this.loadInitData.bind(this)});
		this.$.db.query('SELECT * FROM preferences',
								{onSuccess: this.loadPrefInitData.bind(this)});
      }
      catch (e)
      {
		 this.error("Error"+e);
      }		
   },
   loadPrefInitData: function(results) {
		var dummydata;
		var adddb = [];
		var addsitedb = [];
		//Hide Address bar
		this.$.mainheader.hide();
		this.addressShown = false;
		if(results.length == 0) {
			//console.log("Load pref init data");
			this.isFullScreen = true;
			this.DBfullScreenValue = this.isFullScreen;
			try {
				adddb[0] = this.$.db.getInsert("preferences",
							{"pref_type": "full_screen",
							 "pref_value": this.isFullScreen});	
				this.$.db.queries(adddb, {onSuccess: this.loadPrefInitDataResponse.bind(this)});
			}
			catch (e)
			{
				console.error("Error"+e);
			}
		} else {
			//console.log("Load pref DB data: "+(results[0].pref_value === 'true'));
			this.DBfullScreenValue = (results[0].pref_value === 'true');
			this.isFullScreen = this.DBfullScreenValue;
		}
		enyo.setFullScreen(this.isFullScreen);
   },
   loadPrefInitDataResponse : function() {
		//console.log("######## Preferences Data Inserted");
   },
   loadInitData: function(results) {
		var dummydata;
		var adddb = [];
		var addsitedb = [];
		//Check if table has any data
		//console.log("reorder count query: "+results.length);
		//Check if categories table has data
		if(results.length == 0) {
			try {
				this.$.db.query('SELECT * FROM categories order by rowID',
								{onSuccess: this.initData.bind(this)});							
			}
			catch (e)
			{
				console.error("Error"+e);
			}
		} else {
			this.queryResponse(results);
			this.favCategorySelected();
		}
	},
	favCategorySelected: function() {
		var record = this.data[0]; 
		//var dummydata;
		this.selectedRow = 0;
		if (record) {
			var position = this.$.categorylist.$.scroller.$.scroll.y;
			this.$.categorylist.refresh();
			this.$.categorylist.$.scroller.$.scroll.setScrollPosition(position);
			this.selectedSiteRow = -1;
			try{
				//Need to reorder sites based on table
				var queryStr = "SELECT * FROM sites,sites_reorder where siteRowID = reorder_siteRowID"
								+" and category_id = reorder_category_id";
				queryStr += " and category_id = "+enyo.application.categoriesdata[0].rowID;				
				queryStr += " order by reorder_id";
				this.$.db.query(queryStr,{onSuccess: this.categorySelectResponse.bind(this)});	
				
			} catch(e) {
				console.log("Error"+e);
			}
			return;
		}
		this.$.categorylist.refresh();
	},
   initData : function(results)
   {
	  var reorderId = 0;
	  var dummydata;
	  var addsitedb = [];
      var adddb = [];
	  try {
		//Categories data exist, check if reorder table has data.
		if(results.length > 0) {
			//console.log("Categories data exist, check if reorder table has data");
			this.tempCatData = results;
			this.$.db.query('SELECT * FROM categories_reorder',
								{onSuccess: this.updateCatReorderData.bind(this)});
			//this.queryResponse(results);
		} 
		//If count is 0, this is the first time application is being used, so load default data
		else if(results.length == 0) {
			//console.log("Loading Init Data");
			//Load Categories Data
			for (var i = 0; i < enyo.application.categoriesdata.length; i++) {
				adddb[i] = this.$.db.getInsert("categories",
							{"category_name": enyo.application.categoriesdata[i].category_name,
							 "category_image": enyo.application.categoriesdata[i].category_image});					
			}
			this.$.db.queries(adddb, {onSuccess: this.loadCatDataResponse.bind(this)});
			
			//Load Sites Data
			for (var i = 0; i < enyo.application.sitesdata.length; i++) {
				addsitedb[i] = this.$.db.getInsert("sites",
							{"category_id": enyo.application.sitesdata[i].category_id,
								"site_name": enyo.application.sitesdata[i].site_name,
								"site_url":enyo.application.sitesdata[i].site_url,
								"site_image":enyo.application.sitesdata[i].site_image});					
			}
			this.$.db.queries(addsitedb, {onSuccess: this.loadSitesDataResponse.bind(this)});						
		}		
      }
      catch (e)
      {
		 this.error("Error"+e);
      }
   },
   updateCatReorderData : function(results)
   {
	  var reorderId = 0;
	  var adddb = [];
      //console.log("updateCatReorderData length: "+results.length);
	  if(results.length == 0) {
		  try {
			var record = "";
			for (var i = 0; i < this.tempCatData.length; i++) {
				record = this.tempCatData[i];
				//For each category, create a reorder entry.
				adddb[i] = this.$.db.getInsert("categories_reorder",
							{"catRowID": this.tempCatData[i].rowID,
							 "reorder_id": reorderId});
				reorderId += 1;				
			}
			this.$.db.queries(adddb, {onSuccess: this.addCatReorderDataResponse.bind(this)});
			//Add Sites Reorder Data
			this.loadSitesDataResponse();
			this.tempCatData = null;
		  }
		  catch (e)
		  {
			 this.error("Error"+e);
		  }
	  } else {
		//console.log("Category reorder data exists, load GUI");
		this.addCatReorderDataResponse();
	  }
   },
   loadCatDataResponse : function()
   {
      //console.log("Category data inserted");
	  this.$.db.query('SELECT * FROM categories order by rowID',
								{onSuccess: this.loadCatReorderData.bind(this)});
   },
   loadSitesDataResponse : function()
   {
      //console.log("Sites data inserted / or called from updateCatReorderData");
	  this.$.db.query('SELECT * FROM categories order by rowID',
								{onSuccess: this.loadSitesReorderData.bind(this)});
   },
   loadCatReorderData : function(results)
   {
	  var reorderId = 0;
	  var dummydata;
	  var adddb = [];
	  //console.log("loadCatReorderData "+results.length);
      try {
		//For each category, create a reorder entry.
		for (var i = 0; i < results.length; i++) {
			adddb[i] = this.$.db.getInsert("categories_reorder",
						{"catRowID": results[i].rowID,
						 "reorder_id": reorderId});
			reorderId += 1;
		}
		this.$.db.queries(adddb, {onSuccess: this.addCatReorderDataResponse.bind(this)});
		//console.log("Init: Categories Reorder Data added");
		//this.queryResponse(results);
      }
      catch (e)
      {
		 this.error("Error"+e);
      }
   },
   addCatReorderDataResponse : function()
   {
      //console.log("addCatReorderDataResponse");
	  //Load Categories data for GUI
		this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
					+' order by reorder_id',
						{onSuccess: this.loadInitGUIData.bind(this)});	
   },
   loadInitGUIData: function(results) {
		var dummydata;
		var adddb = [];
		var addsitedb = [];
		var addsitereorderdb = [];
		//Check if table has any data
		//console.log("loadInitGUIData: count query: "+results.length);
		this.queryResponse(results);		
   },
   loadSitesReorderData : function(results)
   {
	  //console.log("loadSitesReorderData length: "+results.length);
	  try {
		var record = "";
		for (var i = 0; i < results.length; i++) {
			record = results[i];
			//Get the sites data for each category
			var selectdb = this.$.db.getSelect("sites",null,{"category_id":record.rowID});
			this.$.db.query(selectdb, {onSuccess: this.sitesResponse.bind(this)});
		}			
	  }
	  catch (e)
	  {
		 this.error("Error"+e);
	  }
  
   },
   sitesResponse : function(results)
   {
	  var reorderId = 0;
	  var dummydata;
	  var addsitedb = [];
      
	  try {
		//For each site, create a reorder entry.
		//console.log("reorder data added of length: "+results.length);		
		for (var i = 0; i < results.length; i++) {
			addsitedb[i] = this.$.db.getInsert("sites_reorder",
						{"reorder_siteRowID": results[i].siteRowID,
							"reorder_category_id": results[i].category_id,
							"reorder_id":reorderId});
			reorderId += 1;
		}
		this.$.db.queries(addsitedb, dummydata);
      }
      catch (e)
      {
		 this.error("Error"+e);
      }
   },
   loadDataResponse : function()
   {
      try {
		//Need to reorder categories
		this.$.db.query('SELECT * FROM categories,categories_reorder where rowID = catRowID'
							+' order by reorder_id',
								{onSuccess: this.queryResponse.bind(this)});	
      }
      catch (e)
      {
		 this.error("Error"+e);
      }
   },
   createTables: function() {
	try {
		var categories_column	=	[]; // Declare Array
		var sites_column	=	[];
		var reorder_sites_column	=	[];
		var reorder_categories_column	=	[];
		var preferences_column	=	[];
		
		categories_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
		categories_column.push({"column": "category_name", "type" : "TEXT", "constraints": ["NOT NULL"]});
		categories_column.push({"column": "category_image", "type" : "TEXT"});

		var categories_sql = this.$.db.getCreateTable("categories",categories_column,"true");
		this.$.db.query(categories_sql);
		
		sites_column.push({"column": "siteRowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
		sites_column.push({"column": "category_id", "type" : "INTEGER", "constraints": ["NOT NULL"]});
		sites_column.push({"column": "site_name", "type" : "TEXT", "constraints": ["NOT NULL"]});
		sites_column.push({"column": "site_url", "type" : "TEXT", "constraints": ["NOT NULL"]});
		sites_column.push({"column": "site_image", "type" : "TEXT"});

		var sites_sql = this.$.db.getCreateTable("sites",sites_column,"true");
		this.$.db.query(sites_sql);
		//Create reorder sites and categories table
		reorder_sites_column.push({"column": "reorder_siteRowID", "type":"INTEGER", "constraints": ["NOT NULL"]});
		reorder_sites_column.push({"column": "reorder_category_id", "type" : "INTEGER", "constraints": ["NOT NULL"]});
		reorder_sites_column.push({"column": "reorder_id", "type" : "INTEGER", "constraints": ["NOT NULL"]});

		var reorder_sites_sql = this.$.db.getCreateTable("sites_reorder",reorder_sites_column,"true");
		this.$.db.query(reorder_sites_sql);
		
		reorder_categories_column.push({"column": "catRowID", "type":"INTEGER", "constraints": ["PRIMARY KEY"]});
		reorder_categories_column.push({"column": "reorder_id", "type" : "INTEGER", "constraints": ["NOT NULL"]});

		var reorder_cat_sql = this.$.db.getCreateTable("categories_reorder",reorder_categories_column,"true");
		this.$.db.query(reorder_cat_sql);
		
		preferences_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
		preferences_column.push({"column": "pref_type", "type" : "TEXT", "constraints": ["NOT NULL"]});
		preferences_column.push({"column": "pref_value", "type" : "TEXT", "constraints": ["NOT NULL"]});
		
		var preferences_sql = this.$.db.getCreateTable("preferences",preferences_column,"true");
		this.$.db.query(preferences_sql);
	  }
      catch (e)
      {
		 console.error("Error"+e);
      }
   },
   queryResponse: function(results) {
	   var list = [];
	   //console.log("queryResponse data length: "+results.length);
	   for (var i = 0; i < results.length; i++) {
		  list[i] = results[i];
		}
		this.data = list; //set list to data
		this.$.categorylist.punt();
   },
   setupRow: function(inSender, inIndex) {
	 //console.log("setupRow called: "+inIndex);
	 if(this.data) {
	 	  var record = this.data[inIndex]; //set data arry values to record
		  if (record) {
			  //console.log("setupRow rowID: "+record.rowID+" reorder id: "+record.reorder_id);
			  this.$.catVal.setContent(record.category_name);
			  this.$.categoryimage.setSrc(record.category_image);
			  if( inIndex % 2 == 0)
					this.$.listItem.applyStyle("background-color", "#eee");
			  else
					this.$.listItem.applyStyle("background-color", "white");
			  var isRowSelected = (inIndex == this.selectedRow);
			  if (isRowSelected) {
				this.$.listItem.applyStyle("background-color", "#A0CFEC");
				this.$.listItem.applyStyle("font-weight", "bold");
			  } else {
				this.$.listItem.applyStyle("font-weight", null);
			  }
			  return true;
		  } /*else {
			this.sitedata = [];
			this.selectedSiteRow = -1;
			this.$.sitelist.refresh();
		  }*/
	  }
	},
	categorySelected: function(inSender, inEvent) {
		var record = this.data[inEvent.rowIndex]; 
		//var dummydata;
		this.selectedRow = inEvent.rowIndex;
		if (record) {
			//console.log("categorySelected called: "+record.category_name);
			var position = this.$.categorylist.$.scroller.$.scroll.y;
			this.$.categorylist.refresh();
			//this.scrollToIndex(inEvent.rowIndex);
			this.$.categorylist.$.scroller.$.scroll.setScrollPosition(position);
			this.selectedSiteRow = -1;
			this.$.webView.setUrl("");
			try{
				//Need to reorder sites based on table
				var queryStr = "SELECT * FROM sites,sites_reorder where siteRowID = reorder_siteRowID"
								+" and category_id = reorder_category_id";
				queryStr += " and category_id = "+record.rowID;				
				queryStr += " order by reorder_id";
				this.$.db.query(queryStr,{onSuccess: this.categorySelectResponse.bind(this)});	
				
			} catch(e) {
				console.log("Error"+e);
			}
			return;
		}
		this.$.categorylist.refresh();
	},
	categorySelectResponse: function(results) {
	    var list = [];
	    //console.log("site data length: "+results.length);
	    for (var i = 0; i < results.length; i++) {
		  list[i] = results[i];
		}
		this.sitedata = list;
		this.$.sitelist.punt();
		
    },
	setupSiteRow: function(inSender, inIndex) {
	 var record = "";
	 //console.log("setupSiteRow: "+inIndex);
	  if(this.sitedata != null) {
		record = this.sitedata[inIndex];
	  }
      if (record) {
		  //console.log("siteRow: "+record.siteRowID+" : "+record.reorder_id);
		  this.$.siteVal.setContent(record.site_name);
		  this.$.siteimage.setSrc(record.site_image);
		  if( inIndex % 2 == 0)
				this.$.siteItem.applyStyle("background-color", "#eee");
		  else
				this.$.siteItem.applyStyle("background-color", "white");
		  var isRowSelected = (inIndex == this.selectedSiteRow);
		  //console.log("isRowSelected: "+isRowSelected);
		  if (isRowSelected) {
			this.$.siteItem.applyStyle("background-color", "#A0CFEC");
			this.$.siteItem.applyStyle("font-weight", "bold");
		  } else {
			this.$.siteItem.applyStyle("font-weight", null);
		  }		  
		  return true;
      }
	},
	siteSelected: function(inSender, inEvent) {
		var record = this.sitedata[inEvent.rowIndex]; 
		this.selectedSiteRow = inEvent.rowIndex;
		//console.log("siteSelected: "+this.selectedSiteRow);
		this.$.webView.setUrl('');
		if (record) {
			var siteposition = this.$.sitelist.$.scroller.$.scroll.y;
			//console.log("siteSelected called: "+record.site_name);
			this.$.sitelist.refresh();
			this.$.sitelist.$.scroller.$.scroll.setScrollPosition(siteposition);
			try{
				this.setSiteRowCalled = true;
				this.$.webView.setUrl(record.site_url);
				this.$.addressUrl.setValue(record.site_url);
				this.$.slidingPane.selectView(this.$.middle);
			}catch(e) {
				console.log("ERROR!!! "+e);
			}
			return;
		}
		this.$.sitelist.refresh();
	},
	onError: function(inSender, inEvent) {
		//console.log("Web View ERROR!!! "+inEvent);
	},
	onComplete: function(inSender, inEvent) {
		this.$.webViewSpinner.hide();
	},
	onStopped: function(inSender, inEvent) {
		this.$.webViewSpinner.hide();
	},
	onStarted: function(inSender, inEvent) {
		this.$.webViewSpinner.show();
	},
	next: function() {
		this.$.slidingPane.next();
	},
	peekItemClick: function(inSender) {
		this.$.slidingPane.selectView(this.$.middle);
	},
	showRight: function() {
		this.$.right.setShowing(true);
	},
	hideRight: function() {
		this.$.right.setShowing(false);
	},
	slidingSelected: function(inSender, inSliding, inLastSliding) {
		//console.log("slidingSelected"+inSliding.id, (inLastSliding || 0).id);
	},
	slidingResize: function(inSender) {
		//console.log("slidingResize");
		//if (!!window.PalmSystem)
         //this.$.feedWebViewPane.$.currentFeedItemWebView.resize();
		 //this.$.webView.resize();
	},
	rightHide: function() {
		//this.$.info.setContent("hide right");
	},
	rightShow: function() {
		//this.$.info.setContent("show right");
	},
	backHandler: function(inSender, e) {
		this.$.slidingPane.back(e);
	}
});