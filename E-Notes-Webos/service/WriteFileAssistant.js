//if (typeof require === "undefined") {
//   require = IMPORTS.require;
//};
var libraries = MojoLoader.require({ name: "foundations", version: "1.0" });

var sys = IMPORTS.require("sys");
var http = IMPORTS.require("http");
var url = IMPORTS.require("url");
var path = IMPORTS.require("path");
var fs = IMPORTS.require("fs");
var events = IMPORTS.require("events");

var WriteFileAssistant = function() {}

WriteFileAssistant.prototype.run = function(future) {
		try {		
			var fileurl = this.controller.args.fileurl;
			var infilename = this.controller.args.filename;
			var guid = this.controller.args.guid;
			var authtoken = this.controller.args.authtoken;
			var caller = this.controller.args.caller;
			var mime = this.controller.args.mime;
			
			//var downloadfile = "https://sandbox.evernote.com/shard/s1/thm/res/8528dddd-1d71-4e4d-9006-377be7517dfb.jpg";
			//var downloadfile = "/media/internal/downloads/icon.png";
			var downloadfile = fileurl;

			var host = url.parse(downloadfile).hostname
			//var filename = url.parse(downloadfile).pathname.split("/").pop()
			var filename = infilename

			var theurl = http.createClient(443, host,true);
			var requestUrl = downloadfile;
			var encoding = 'binary';
			if(mime.indexOf("text/plain") != -1) {
				encoding = 'ascii';
			}
			
			var request = theurl.request('GET', requestUrl, {"host": host,"Cookie": "auth=" + authtoken});
			request.end();

			//var dlprogress = 0;

			//setInterval(function () {
			   //sys.puts("Download progress: " + dlprogress + " bytes");
			//}, 1000);
			request.addListener('response', function (response) {
				var downloadfile = fs.createWriteStream("/media/internal/evernotewebos/"+filename, {'flags': 'w'});
				//sys.puts("File size " + filename + ": " + response.headers['content-length'] + " bytes.");
				//response.setEncoding('binary');
				response.addListener('data', function (chunk) {
					//dlprogress += chunk.length;
					downloadfile.write(chunk,encoding);
				});
				response.addListener("end", function() {
					downloadfile.end();
					future.result = { infilename: infilename, caller: caller, mime: mime}; 
					//sys.puts("Finished downloading " + filename);
				});
			});		
		}catch(e) {
			future.result = {error:e}; 
		}		  
}