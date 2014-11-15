function UserStore(remote) {
    this.remote = remote;
    this.authToken = null;
	this.expiration = null;
}

UserStore.prototype.authenticate = function(onSuccess, onFailure, username, password) {
	try{
		this.remote.UserStore.authenticate(onSuccess, onFailure, encodeURIComponent(username), encodeURIComponent(password),
											Evernote.application.consumerKey, Evernote.application.consumerSecret);
	}catch (e)
	{
		console.log("Error getting authenticated"+e);
	}
		
};

UserStore.prototype.refreshAuthentication = function(onSuccess, onFailure) {
	this.remote.UserStore.refreshAuthentication(onSuccess, onFailure, this.authToken);
};

UserStore.prototype.getUser = function(onSuccess, onFailure) {
    this.remote.UserStore.getUser(onSuccess, onFailure, this.authToken);
};

UserStore.prototype.checkVersion = function(onSuccess, onFailure, clientName, edamVersionMajor, edamVersionMinor) {
    this.remote.UserStore.checkVersion(onSuccess, onFailure, clientName, edamVersionMajor, edamVersionMinor);
};