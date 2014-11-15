enyo.kind({
	name: "PetzEvernoteEnyo",
	kind: enyo.VFlexBox,
components:[
{kind: "ApplicationEvents", onLoad:"onload", onUnload:"unload",
      onApplicationRelaunch: "onload",
      onWindowParamsChange: "windowParamsChangeHandler"},
{name: "pane", kind: "Pane", flex: 1, style:"background-color:#448820",//transitionKind: "enyo.transitions.LeftRightFlyin", 
	components: [
		{
            name: "connectView",
            kind: "VFlexBox",
            components: [{
                kind: "PageHeader",style:"background-color:#448820",
                pack: "center",
                components: [{
                    content: $L("Connect with Evernote"),style:"color:white",
                    flex: 1,
                    className: "common-headercentered"
                }]
            }, {
                kind: "VFlexBox",style:"background-color:#eee",
                flex: 1,
                className: "common-anchor",
                components: [{
                    kind: "Scroller",
                    flex: 1,
                    components: [{
                        kind: "HFlexBox",
                        components: [{
                            kind: "Spacer"
                        }, {
                            kind: "VFlexBox",
                            className: "preferences-content",//style:"color:black",
                            components: [{
                                kind: "RowGroup", style:"background-color:white",
                                caption: $L("Connect to Evernote"),
                                components: [{
                                    content:"Evernote is changing the way third-party applications connect to Evernote, with this new approach, E Notes no longer needs to store the user password. <br/>By clicking the Access button below, you will be directed to an Evernote website where you need to enter your credentials and Authorize <b>E Notes</b> to access your notes.",
                                    allowHtml:true,
									className: "preferences-smalltext"
                                }, 
								{layoutKind: "HFlexLayout", components: [
									{
										content: "",
										flex: 1,
									},
									{
										kind: "Button",flex: 1,
										content: $L("Access Existing Account"),
										className: "enyo-button-affirmative",
										onclick: "startConnect"
									},
									{kind: "Button", flex: 1,caption: $L("Create An Account"), 
										className: "enyo-button-affirmative", onclick: "signupClicked"},		    	
									{
										content: "",
										flex: 1,
									},	
								]},
								
								]
                            }]
                        }, {
                            kind: "Spacer"
                        }, ]
                    }, ]
                }, {
                    name: "mainViewScrim",
                    kind: "Scrim",
                    className: "common-partialscrim"
                }, ]
            }, ]
        }, {
            name: "browserView",
            kind: "VFlexBox",
            lazy: true,
            components: [{
                kind: "PageHeader",style:"background-color:#448820",
                pack: "center",
                components: [{
                    kind: "Button",
                    content: $L("Cancel"),
                    onclick: "cancelConnect",
                    className: "common-headerbutton"
                }, {
                    content: $L("Please login to connect with Evernote"),style:"color:white",
                    flex: 1,
                    className: "common-headercentered"
                }, ]
            }, {
                kind: "VFlexBox",
                flex: 1,
                className: "common-anchor",
                components: [{
                    name: "browser",
                    kind: "WebView",
                    flex: 1,
                    onPageTitleChanged: "browserPageTitleChanged",
                    onLoadStarted: "browserLoadStarted",
					enableJavascript: true,
					acceptCookies: true,
                    onLoadComplete: "browserLoadComplete"
                }, {
                    name: "browserViewScrim",
                    kind: "Scrim",
                    className: "common-partialscrim"
                }, ]
            }, ]
        }, 
		{kind: "Popup", name: "loginscreen", modal: true,autoClose: false, dismissWithClick: false, layoutKind: "VFlexLayout",
				style:"background-color:#88cc70",width: "350px", height: "283px", components:[
			{layoutKind: "HFlexLayout", components: [
	    		{kind: "Spacer"},
				{name: "evernotecaption", flex:3,content: "EVERNOTE LOGIN",align:"center", pack:"center",
					style:"font-family:'Bodoni MT';font-weight:bold;color:#66aa44;" },
				{kind: "Spacer"},
			]},
			{kind: "RowGroup", components: [
				{kind: "Input", hint: "Enter username...", name:"username",autoCapitalize: "lowercase",spellcheck:false, style:"font-family:verdana;font-size:14px;font-weight:normal",onkeypress: "inputChange"},
			]},
			{kind: "RowGroup", components: [
				{kind: "PasswordInput", hint: "Enter password...", style:"font-family:verdana;font-size:14px;font-weight:normal",name:"password", onkeypress: "inputChange"},
			]},
			{layoutKind: "HFlexLayout", components: [
	    		{kind:"ActivityButton",name:"loginBtn", disabled:false,active:false,caption:$L("Login"), flex: 1, 
					onclick: "loginClicked", autocorrect:false,
					style:"font-family:verdana;font-size:14px;font-weight:normal;color:white;background-color:#448820"},				
				{kind: "Button", caption: $L("Create An Account"), flex: 1, style:"font-family:verdana;font-size:14px;font-weight:normal;color:white;background-color:#448820", onclick: "signupClicked"},		    	
			]},
			{ name: "message", content: "",style:"margin:1px;font-size:14px;font-weight:normal;" }
		]},
		{name: "NotebookScreen", kind:"com.petzapps.EvernoteContent"},
		{name: "LoginSpinner", layoutKind: "VFlexLayout",flex:1, align:"center", pack:"center", components: [
			{ name: "logo", content: "E Notes",style:"font-size:30px;font-family:'Bodoni MT';font-weight:bold;color:#88cc70;", },
			{ kind:"SpinnerLarge", showing:true,},
			{ name: "loadmsg", content: "Loading Data...",style:"margin:1px;font-size:15px;font-weight:normal;color:white" }
		]},
		{
			name: "spinnerContainer",
			kind: "HFlexBox",
			pack: "center",
			align: "center",
			showing: false,
			className: "enyo-fit",
			components: [{
				name: "spinner",
				kind: "SpinnerLarge"
			}, ]
		},
		
]},
{ name: "OAuth1", kind: "OAuth" },
{ name: "webService1", kind: "WebService",
	onSuccess: "webService1AccessSuccess",
	onFailure: "webService1Failure",
	components: [
		{
			method: "GET",
			handleAs: "json",
			contentType: "application/x-www-form-urlencoded"
		}
	]
},
{ name: "webService2", kind: "WebService",
	onSuccess: "webService2AccessSuccess",
	onFailure: "webService2Failure",
	components: [
		{
			method: "GET",
			handleAs: "json",
			contentType: "application/x-www-form-urlencoded"
		}
	]
},
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
],
inputChange: function(source, event) {
	if (event.keyCode == 13) {
        this.loginClicked();
    }
},
create: function() {
	this.inherited(arguments);
},
ready: function() {
	enyo.application.EvernoteComponentInstance = this.$;
	enyo.application.EvernoteInstance = this;
	
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
},
onload: function() {
	//this.$.NotebookScreen.getDBInstance().query('SELECT * FROM user_login',
	//							{onSuccess: this.loadUserLoginData.bind(this)});
	this.$.NotebookScreen.getDBInstance().query('SELECT * FROM user_oauth',
								{onSuccess: this.loadUserOAuthData.bind(this)});
					
},
loadUserOAuthData: function(results) {
	//console.log("loadUserOAuthData results.length: "+results.length);
	
	if(results.length > 0) {
		this.$.pane.selectViewByName("LoginSpinner");
		for(var i = 0; i < results.length; i++) {					
			if(results[i].oauth_key == "oauth_token") {
				this.oauth_token = results[i].oauth_value;
				enyo.application.authToken = this.oauth_token;
			} else if(results[i].oauth_key == "edam_webApiUrlPrefix") {
				enyo.application.edam_webApiUrlPrefix = results[i].oauth_value;
			} else if(results[i].oauth_key == "edam_expires") {
				enyo.application.edam_expires = results[i].oauth_value;
			} else if(results[i].oauth_key == "edam_shardId") {
				enyo.application.shardId = results[i].oauth_value;
			}
		}
		var self = this;
		try {
			var currentTime = (new Date()).getTime();
			if((enyo.application.edam_expires - 3600000) < currentTime) {
				this.$.NotebookScreen.showAlertMessage("Authorization Expired, Please Re-login");
				this.$.NotebookScreen.logoutClicked();
				return;
			}
			
			var remoteServicesUrl = this.getRemoteSharedURL();
			this.shardedRemoteServices = new JSONRpcClient(this.loadNoteData.bind(this),
					this.showLoginErrorMessage.bind(this, "Could not connect to remote URL"),
					remoteServicesUrl);
		}
		catch (e)
		{
			console.log("Error getting remote services"+e);
		}
		/*this.remoteServicesUrl = this.getRemoteJsonURL();
		var username = results[0].username;
		var enc = new Encryptor();
		var password = enc.decrypt(results[0].password,Evernote.application.enc_salt);
		//var base64 = new Base64();
		//var password = base64.decode(results[0].password);
		enyo.application.username = username;
		enyo.application.password = password;
		
		var success = function() {
			self.refreshAuthToken(username, password);
		};
		var failure = function(transport) {
			//console.log("FAILURE: "+JSON.stringify(transport));
			self.$.NotebookScreen.showErrorDialog("Failed to connect to Evernote");
		};
		try {
			this.remoteServices = new JSONRpcClient(success, failure, this.remoteServicesUrl);
		}
		catch (e)
		{
			this.$.NotebookScreen.showErrorDialog("Failed to connect to Evernote");
		}		*/
		
	} else {
		this.showConnectMainView();
	}
	//console.log("enyo.application.storedAuthToken: "+enyo.application.storedAuthToken);
},
startConnect: function () {
	this.userAuthorizationURL = Evernote.application.userAuthorizationURL;
	var requestTokenURL = Evernote.application.userTokenURL;
	var accessTokenURL = Evernote.application.userTokenURL;
	this.oauth_consumer_key = Evernote.application.consumerKey;
	this.consumer_key_secret = Evernote.application.consumerSecret;
	var oauth_signature_method = "PLAINTEXT";
	var	oauth_callback =  'http://www.google.com/?gws_rd=ncr'
	//var	oauth_callback =  'oob'
	this.requestTokenMethod='GET';
	
	this.access = {};
	this.access = {consumerKey: this.oauth_consumer_key, consumerSecret: this.consumer_key_secret, 
					requestTokenURL: requestTokenURL,
					userAuthorizationURL: this.requestTokenURL, accessTokenURL: accessTokenURL};

	this.accessor = {consumerSecret: this.access.consumerSecret, tokenSecret: ""};
	
	this.par = {};
	this.par = {
		oauth_callback: oauth_callback,
		oauth_signature: "",
		oauth_nonce: "",
		//oauth_signature_method: "HMAC-SHA1",
		oauth_signature_method: "PLAINTEXT",
		oauth_consumer_key: this.access.consumerKey,
		oauth_timestamp: "",
		format:"mobile"
	};

	this.message = {action: this.access.requestTokenURL, method: "POST", parameters: [] };
	this.message.parameters = this.par;

	this.message = this.$.OAuth1.setTimestampAndNonce(this.message);
	this.message = this.$.OAuth1.sign(this.message, this.accessor);
	this.message.action = this.$.OAuth1.addToURL(this.message.action, this.message.parameters);
	
	this.$.webService1.setUrl(this.message.action);
	this.$.webService1.setMethod(this.message.method);
	this.$.webService1.setHeaders({Authorization: "OAuth"});
	
	this.$.webService1.call();
	//console.log("action: "+this.message.action);
	this.oauth_signature = this.message.action.match(/oauth_signature=([^&]+)/)[1];
	//console.log("oauth_signature: "+this.oauth_signature);
},
webService1AccessSuccess: function(inSender, inResponse, inRequest)
{
   //this.showErrorDialog(""+inResponse);
  var token = this.$.OAuth1.decodeForm(inResponse);
  console.log("token: "+token);
  var oauth_token = token[0][1];
  var oauth_token_secret = token[1][1];
  //var targetUrl = token[13][1];
  for (var i = 0; i < token.length; i++) {
	  for (var j = 0; j < token[i].length; j++) {
		console.log("element: "+token[i][j]);
	  }
	  console.log("######");
  }
  //console.log("oauth_token: "+oauth_token);
  //console.log("oauth_token_secret: "+oauth_token_secret);
  //console.log("targetUrl: "+targetUrl);
  this.accessor = { oauthToken: oauth_token, consumerSecret: this.access.consumerSecret, tokenSecret: oauth_token_secret};

  //console.log(enyo.json.stringify(this.accessor));
  //enyo.setCookie("AuthTokens", enyo.json.stringify(this.accessor));
  enyo.setCookie("AuthTokens", "");
  this.$.pane.selectViewByName("browserView");
  if (window.PalmSystem)
		this.$.browser.clearCache();
		
  this.$.browser.setUrl(this.userAuthorizationURL+"?oauth_token="+oauth_token+"&format=mobile");
  
  this.$.browser.render();
  //if (!window.PalmSystem) {
	//	this.$.browser.setStyle("width: 100%; height: 600px;");
  //}
},
webService1Failure: function(inSender, inResponse, inRequest)
{
	console.log(inResponse);
	console.log(inRequest);
	console.log(inRequest.xhr.status);
	this.$.NotebookScreen.showAlertMessage("Error Accessing Evernote");
	this.showConnectMainView();
},
webService2AccessSuccess: function(inSender, inResponse, inRequest)
{
	this.$.spinnerContainer.hide();
	this.$.NotebookScreen.showAlertMessage("Successfully Authorized E Notes");
	//console.log(""+inResponse);
	var token = this.$.OAuth1.decodeForm(inResponse);
	this.oauth_token = token[0][1];
	enyo.application.authToken = this.oauth_token;
	//var edam_userId = token[3][1];
	enyo.application.shardId = token[2][1];
	enyo.application.edam_expires = token[4][1];
	var edam_noteStoreUrl = token[5][1];
	this.edam_webApiUrlPrefix = token[6][1];
	console.log("oauth_token: "+this.oauth_token);
	console.log("Notestore URL: "+edam_noteStoreUrl);
	console.log("URL Prefix: "+this.edam_webApiUrlPrefix);
	console.log("current time: "+(new Date()).getTime());
	console.log("edam_expires: "+enyo.application.edam_expires);
	console.log("shardId: "+enyo.application.shardId);
  
	/*this.pars = {
		oauth_token: this.oauth_token
	};
	
	this.message3 = {action: "https://sandbox.evernote.com/edam/user", method: "POST", parameters: [] };
	this.message3.parameters = this.pars;

	this.message3 = this.$.OAuth1.setTimestampAndNonce(this.message3);
	//this.message3 = this.$.OAuth1.sign(this.message3, this.accessor);
	this.message3.action = this.$.OAuth1.addToURL(this.message3.action, this.message3.parameters);
	
	this.$.webService3.setUrl(this.message3.action);
	this.$.webService3.setMethod(this.message3.method);
	
	this.$.webService3.call();*/
	
	//var userUrl = "https://sandbox.evernote.com/edam/user"+"/json";
	
	//Add new records
	var adddb = [];
	adddb[0] = this.$.NotebookScreen.getDBInstance().getInsert("user_oauth",
					{"oauth_key": "oauth_token","oauth_value": this.oauth_token});	
	adddb[1] = this.$.NotebookScreen.getDBInstance().getInsert("user_oauth",
					{"oauth_key": "edam_noteStoreUrl","oauth_value": edam_noteStoreUrl});
	adddb[2] = this.$.NotebookScreen.getDBInstance().getInsert("user_oauth",
					{"oauth_key": "edam_webApiUrlPrefix","oauth_value": this.edam_webApiUrlPrefix});
	adddb[3] = this.$.NotebookScreen.getDBInstance().getInsert("user_oauth",
					{"oauth_key": "edam_expires","oauth_value": enyo.application.edam_expires});
	adddb[4] = this.$.NotebookScreen.getDBInstance().getInsert("user_oauth",
					{"oauth_key": "edam_shardId","oauth_value": enyo.application.shardId});
	
	this.$.NotebookScreen.getDBInstance().queries(adddb, {onSuccess: this.storeAuthTokenResponse.bind(this)});
	
	try {
		var remoteServicesUrl = this.edam_webApiUrlPrefix+"/json";
		this.shardedRemoteServices = new JSONRpcClient(this.loadNoteData.bind(this),
		this.showLoginErrorMessage.bind(this, "Could not connect to remote URL"),
		remoteServicesUrl);
	}
	catch (e)
	{
		console.log("Error getting remote services"+e);
		this.$.NotebookScreen.showAlertMessage("Failed to Authorize E Notes");
		this.showConnectMainView();
	}
  
  //var targetUrl = token[13][1];
  /*for (var i = 0; i < token.length; i++) {
	  for (var j = 0; j < token[i].length; j++) {
		console.log("element 2: "+token[i][j]);
	  }
	  console.log("######");
  }*/
},
webService3AccessSuccess: function(inSender, inResponse, inRequest)
{
	//console.log("Service 3: "+inResponse);
},
webService3Failure: function(inSender, inResponse, inRequest)
{
	//console.log("webService3Failure inResponse: "+inResponse);
},
storeAuthTokenResponse : function() {
	//console.log("######## Auth Token Data Inserted");
},
webService2Failure: function(inSender, inResponse, inRequest)
{
	//console.log("webService2Failure inResponse: "+inResponse);
	this.$.NotebookScreen.showAlertMessage("Failed to Authorize E Notes");
	this.showConnectMainView();
},
cancelConnect: function () {
	this.showConnectMainView();
},
showConnectMainView: function () {
	this.hideSpinner();
	this._responseReceived = false;
	this.$.pane.selectViewByName("connectView");
},
browserPageTitleChanged: function (_1, _2, _3, _4, _a) {
	console.log("title changed, START ##########################");
	console.log("title changed, 1:" + _1);
	console.log("title changed, 2:" + _2);
	console.log("title changed, 3:" + _3);
	console.log("title changed, END ##########################");
	
	if (!this._responseReceived && _3 && _3.match(/oauth_verifier=([^&]+)/)) {
		this.$.pane.selectViewByName("LoginSpinner");
		this._responseReceived = true;
		var oauth_verifier = _3.match(/oauth_verifier=([^&]+)/)[1];
		//console.log("@@@@@@@@@@@@@@@@@ oauth_verifier: "+oauth_verifier);
		var oauth_token = _3.match(/oauth_token=([^&]+)/)[1];
		//console.log("oauth_token: "+oauth_token);
		this.$.spinnerContainer.show();
		this.tokenpar = {
			oauth_token: oauth_token,
			oauth_signature_method: "PLAINTEXT",
			oauth_consumer_key: this.access.consumerKey,
			oauth_timestamp: "",
			oauth_verifier:oauth_verifier,
			oauth_signature: this.oauth_signature
		};
		
		this.message2 = {action: this.access.requestTokenURL, method: "POST", parameters: [] };
		this.message2.parameters = this.tokenpar;

		this.message2 = this.$.OAuth1.setTimestampAndNonce(this.message2);
		this.message2 = this.$.OAuth1.sign(this.message2, this.accessor);
		this.message2.action = this.$.OAuth1.addToURL(this.message2.action, this.message2.parameters);
		
		this.$.webService2.setUrl(this.message2.action);
		this.$.webService2.setMethod(this.message2.method);
		
		this.$.webService2.call();
		//console.log("this.message.action 2: "+this.message2.action);
	}
},
browserLoadStarted: function () {
	//this.showSpinner();
	this.$.spinnerContainer.show();
	this.$.spinner.show();
},
browserLoadComplete: function () {
	this.hideSpinner();
},
showSpinner: function () {
	this.$.mainViewScrim.show();
	if (this.$.browserViewScrim) {
		this.$.browserViewScrim.show();
	}
	this.$.spinnerContainer.show();
	this.$.spinner.show();
},
hideSpinner: function () {
	this.$.mainViewScrim.hide();
	if (this.$.browserViewScrim) {
		this.$.browserViewScrim.hide();
	}
	this.$.spinnerContainer.hide();
	this.$.spinner.hide();
},
loadUserLoginData: function(results) {
	//console.log("results.length: "+results.length);
	//this.$.loginscreen.openAtCenter();
	
	if(results.length > 0) {
		this.$.pane.selectViewByName("LoginSpinner");
		var self = this;
		this.remoteServicesUrl = this.getRemoteJsonURL();
		var username = results[0].username;
		var enc = new Encryptor();
		var password = enc.decrypt(results[0].password,Evernote.application.enc_salt);
		//var base64 = new Base64();
		//var password = base64.decode(results[0].password);
		enyo.application.username = username;
		enyo.application.password = password;
		
		var success = function() {
			self.refreshAuthToken(username, password);
		};
		var failure = function(transport) {
			//console.log("FAILURE: "+JSON.stringify(transport));
			self.$.NotebookScreen.showErrorDialog("Failed to connect to Evernote");
		};
		try {
			this.remoteServices = new JSONRpcClient(success, failure, this.remoteServicesUrl);
		}
		catch (e)
		{
			this.$.NotebookScreen.showErrorDialog("Failed to connect to Evernote");
		}		
		
	} else {
		this.$.loginscreen.openAtCenter();
	}
	//console.log("enyo.application.storedAuthToken: "+enyo.application.storedAuthToken);
},
refreshAuthToken: function(username, password){
	enyo.application.UserStore = new UserStore(this.remoteServices);
	var self = this;
	var onSuccess = function(result, transport) {
		//console.log("refreshAuthToken Success: "+JSON.stringify(result));
		self.refreshAuthTokenSuccess(username, password, result, transport);
	};
	var onFailure = function(transport) {
		//console.log("refreshAuthToken failure: "+JSON.stringify(transport));
		//Show Login Dialog
		self.$.loginscreen.openAtCenter();
		//Set message
		self.showLoginErrorMessage("Password is invalid or changed for user, "+enyo.application.username);
	};
	
	enyo.application.UserStore.authenticate(onSuccess, onFailure, username, password);
},
refreshAuthTokenSuccess: function(username, password, authResult, transport){
	this.currentAuth = authResult;
	enyo.application.UserStore.authToken = authResult.authenticationToken;
	enyo.application.UserStore.expiration = authResult.expiration;
	
	var data = {
		token: this.currentAuth.authenticationToken,
		username: username,
		password: password
	};

	var self = this;
	var onSuccess = function(user, transport) {
		if (user)
			self.processUserRetrievalSuccess(data, user, transport);
		else
		{
			//Show Error Dialog
			self.$.NotebookScreen.showErrorDialog("Failed to get user information");
		}
	};
	var onFailure = function(transport) {
		//Failed to retreive user
		self.$.NotebookScreen.showErrorDialog("Failed to retreive user");
	};
	enyo.application.UserStore.getUser(onSuccess, onFailure);
},
refreshRemoteInstances: function(username, password){
	var self = this;
	var success = function() {
		self.refreshUserStore(username, password);
	};
	var failure = function(transport) {
		self.$.NotebookScreen.showErrorDialog("Failed to connect to Evernote");
	};
	try {
		this.remoteServices = new JSONRpcClient(success, failure, this.remoteServicesUrl);
	}
	catch (e)
	{
		//console.error("error: "+e);
		this.$.NotebookScreen.showErrorDialog("Failed to connect to Evernote");
	}
},
refreshUserStore: function(username, password){
	enyo.application.UserStore = new UserStore(this.remoteServices);
	var self = this;
	var onSuccess = function(result, transport) {
		self.refreshUserStoreSuccess(username, password, result, transport);
	};
	var onFailure = function(transport) {
		//Show Login Dialog
		self.$.loginscreen.openAtCenter();
		//Set message
		self.showLoginErrorMessage("User / Password is invalid or changed");
	};
	
	enyo.application.UserStore.authenticate(onSuccess, onFailure, username, password);
},
refreshUserStoreSuccess: function(username, password, authResult, transport){
	this.currentAuth = authResult;
	enyo.application.UserStore.authToken = authResult.authenticationToken;
	enyo.application.UserStore.expiration = authResult.expiration;
	var onFailure = function(transport) {
		self.$.NotebookScreen.showErrorDialog("Failed to get Shared URL from Evernote");
	};	
	try {
		this.shardedRemoteServices = new JSONRpcClient(this.refreshNoteStore.bind(this),onFailure,
										this.getRemoteSharedURL());
	}
	catch (e)
	{
		this.$.NotebookScreen.showErrorDialog("Failed to get Shared URL from Evernote");
		//console.log("Error getting remote services"+e);
	}
},
refreshNoteStore: function(){
	try{
		enyo.application.NoteStore = new NoteStore(this.shardedRemoteServices, this.currentAuth.authenticationToken, null);
	} catch(e) {
		//console.log("ERROR: "+e);
		this.$.NotebookScreen.showErrorDialog("Failed to get Notestore from Evernote");
	}
},
signupClicked: function() {
	var targetUrl = Evernote.application.secureHost+"/mobile/Registration.action?code=palm";
	this.$.launchBrowserCall.call({"id": "com.palm.app.browser", "params":{"target": targetUrl}});
},
loginClicked: function() {
	this.$.message.setContent("Validating...");
	this.$.message.setStyle("font-family:verdana;font-weight:normal;margin:1px;font-size:14px;color:green");
	//this.disableLoginButton();
	//this.sleep();
	var username = this.$.username.getValue();
	var password = this.$.password.getValue();
	enyo.application.username = username;
	enyo.application.password = password;
	
	if(username.length == 0 || password.length == 0 ) {
		this.$.message.setContent("User Name and Password cannot be blank");
		this.$.message.setStyle("font-family:verdana;font-weight:normal;margin:1px;font-size:14px;color:red");
		return;
	}
	this.remoteServicesUrl = this.getRemoteJsonURL();
	var self = this;
	
	var success = function() {
		//console.log("[Evernote] - start - got the remoteService");
		self.beginLoginProcess(username,password);
	};
	var failure = function(transport) {
		//console.log("FAILURE: "+JSON.stringify(transport));
		self.$.message.setContent("Failed to connect to Evernote");
		self.$.message.setStyle("font-family:verdana;font-weight:normal;margin:1px;font-size:14px;color:red");
	};
	
	try {
		this.remoteServices = new JSONRpcClient(success, failure, this.remoteServicesUrl);
	}
	catch (e)
	{
		//console.log("Error getting unsharded remote services"+e);
		this.$.message.setContent("Failed to connect to Evernote");
		this.$.message.setStyle("font-family:verdana;font-weight:normal;margin:1px;font-size:14px;color:red");
	}
},
beginLoginProcess: function(username, password){
	enyo.application.UserStore = new UserStore(this.remoteServices);
	var self = this;
	var onSuccess = function(authResult, transport) {
		self.processAuthenticationSuccess(username, password, authResult, transport);
	};
	var onFailure = this.processAuthenticationFailure.bind(this);

	enyo.application.UserStore.authenticate(onSuccess, onFailure, username, password);
},
processAuthenticationSuccess: function(username, password, authResult, transport){
	//console.log("processAuthenticationSuccess: Token: "+authResult.authenticationToken+" Expiration Time: "+new Date(authResult.expiration));
	this.currentAuth = authResult;
	enyo.application.UserStore.authToken = authResult.authenticationToken;
	enyo.application.UserStore.expiration = authResult.expiration;
	
	var data = {
		token: this.currentAuth.authenticationToken,
		username: username,
		password: password
	};

	var self = this;
	var onSuccess = function(user, transport) {
		//Store Auth Token to DB
		self.$.NotebookScreen.storeLoginInfo(username, password);
		if (user)
			self.processUserRetrievalSuccess(data, user, transport);
		else
		{
			self.showLoginErrorMessage("Failed to get user information");
		}
	};

	enyo.application.UserStore.getUser(onSuccess, this.showLoginErrorMessage.bind(this, "Failed to retreive user"));
},
showLoginErrorMessage: function(msg) {
	this.$.message.setContent(msg);
	this.$.message.setStyle("font-family:verdana;font-weight:normal;margin:1px;font-size:14px;color:red");
},
processUserRetrievalSuccess: function(data, user, transport){
	//console.log("processUserRetrievalSuccess");
	//enyo.application.currentUser = user;
	//console.log("user.attributes.incomingEmailAddress: "+user.attributes.incomingEmailAddress);
	try {
		var remoteServicesUrl = this.getRemoteSharedURL();
		this.shardedRemoteServices = new JSONRpcClient(this.loadNoteData.bind(this),
				this.showLoginErrorMessage.bind(this, "Could not connect to remote URL"),
				remoteServicesUrl);
	}
	catch (e)
	{
		console.log("Error getting remote services"+e);
	}
},
loadNoteData: function(){
	//console.log("loadNoteData");
	this.resetFields();
	
	try{
		//enyo.application.NoteStore = new NoteStore(this.shardedRemoteServices, this.currentAuth.authenticationToken, null);
		enyo.application.NoteStore = new NoteStore(this.shardedRemoteServices, this.oauth_token, null);
		//this.$.loginscreen.close();
		this.$.pane.selectViewByName("NotebookScreen");		
		//Refresh Notes
		this.$.NotebookScreen.refreshNotesData();
	} catch(e) {
		//console.log("ERROR: "+e);
	}
},
listNotebooksSuccess: function(response) {
	//console.log("listNotebooksSuccess: "+response.list.length);
	this.$.NotebookScreen.listNotebooksResponse(response);
	this.$.NotebookScreen.showNotebookScrim(false);
},
listTagsSuccess: function(response) {
	//console.log("listTagsSuccess: "+response.list.length);
	this.$.NotebookScreen.listTagsResponse(response);
	this.$.NotebookScreen.showTagScrim(false);
},
findNotesSuccess: function(noteList, transport) {
		//console.log("findNotesSuccess: "+noteList.totalNotes);
		this.$.NotebookScreen.findNotesResponse(noteList);
		this.$.NotebookScreen.showNoteScrim(false);
		this.$.NotebookScreen.setDefaultNoteCount();
},
getRemoteJsonURL: function() {
	return (Evernote.application.secureHost + "/json");
},
getRemoteSharedURL: function() {
	return (Evernote.application.secureHost + "/shard/" + enyo.application.shardId + "/json");
},
resetFields: function() {
	if(this.$.message) {
		this.$.message.setContent("");
		this.$.username.setValue("");
		this.$.password.setValue("");
	}	
},
processAuthenticationFailure: function(transport){
	//console.log("processAuthenticationFailure");
	var response, error;
	if (transport && transport.responseJSON) {
		response = transport.responseJSON;
		//console.log("processAuthenticationFailure: response = "+ response);
		error = response.error.code;
	}
	else if (transport && typeof(transport) == "string") {
		response = { error: { message: transport } };
		//console.log("processAuthenticationFailure: response = "+ transport);
		error = transport;
	}

	//console.log("Authentication failure: " + ( error || "unknown" ) );
	this.showLoginErrorMessage("User / Password is not valid");
}

});