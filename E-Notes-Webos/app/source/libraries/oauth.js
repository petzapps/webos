/*  setup OAuth for future use
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* Here's some JavaScript software for implementing OAuth.

   This isn't as useful as you might hope.  OAuth is based around
   allowing tools and websites to talk to each other.  However,
   JavaScript running in web browsers is hampered by security
   restrictions that prevent code running on one website from
   accessing data stored or served on another.

   Before you start hacking, make sure you understand the limitations
   posed by cross-domain XMLHttpRequest.

   On the bright side, some platforms use JavaScript as their
   language, but enable the programmer to access other web sites.
   Examples include Google Gadgets, and Microsoft Vista Sidebar.
   For those platforms, this library should come in handy.
*/

// The HMAC-SHA1 signature method calls b64_hmac_sha1, defined by
// http://pajhome.org.uk/crypt/md5/sha1.js

/* An OAuth message is represented as an object like this:
   {method: "GET", action: "http://server.com/path", parameters: ...}

   The parameters may be either a map {name: value, name2: value2}
   or an Array of name-value pairs [[name, value], [name2, value2]].
   The latter representation is more powerful: it supports parameters
   in a specific sequence, or several parameters with the same name;
   for example [["a", 1], ["b", 2], ["a", 3]].

   Parameter names and values are NOT percent-encoded in an object.
   They must be encoded before transmission and decoded after reception.
   For example, this message object:
   {method: "GET", action: "http://server/path", parameters: {p: "x y"}}
   ... can be transmitted as an HTTP request that begins:
   GET /path?p=x%20y HTTP/1.0
   (This isn't a valid OAuth request, since it lacks a signature etc.)
   Note that the object "x y" is transmitted as x%20y.  To encode
   parameters, you can call OAuth.addToURL, OAuth.formEncode or
   OAuth.getAuthorization.

   This message object model harmonizes with the browser object model for
   input elements of an form, whose value property isn't percent encoded.
   The browser encodes each value before transmitting it. For example,
   see consumer.setInputs in example/consumer.js.
*/

/* This script needs to know what time it is. By default, it uses the local
   clock (new Date), which is apt to be inaccurate in browsers. To do
   better, you can load this script from a URL whose query string contains
   an oauth_timestamp parameter, whose value is a current Unix timestamp.
   For example, when generating the enclosing document using PHP:

   <script src="oauth.js?oauth_timestamp=<?=time()?>" ...

   Another option is to call OAuth.correctTimestamp with a Unix timestamp.
*/
enyo.kind({
name: "OAuth",
kind: enyo.Service,
percentEncode: function percentEncode(s) {
        if (s === null) {
            return "";
        }
        if (s instanceof Array) {
            var e = "";
            for (var i = 0; i < s.length; ++s) {
                if (e != "") {e += '&';}
                e += this.percentEncode(s[i]);
            }
            return e;
        }
        s = encodeURIComponent(s);
        // Now replace the values which encodeURIComponent doesn't do
        // encodeURIComponent ignores: - _ . ! ~ * ' ( )
        // OAuth dictates the only ones you can ignore are: - _ . ~
        // Source: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
        s = s.replace(/\!/g, "%21");
        s = s.replace(/\*/g, "%2A");
        s = s.replace(/\'/g, "%27");
        s = s.replace(/\(/g, "%28");
        s = s.replace(/\)/g, "%29");
        return s;
    },
decodePercent: function decodePercent(s) {
        if (s !== null) {
            // Handle application/x-www-form-urlencoded, which is defined by
            // http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1
            s = s.replace(/\+/g, " ");
        }
        s=s.replace( /\&amp;/g, '&' );
        s=s.replace( /\&apos;/g, "'" );
        
        return decodeURIComponent(s);
    },
    /** Convert the given parameters to an Array of name-value pairs. */
getParameterList: function getParameterList(parameters) {
        if (parameters === null) {
            return [];
        }
        if (typeof parameters != "object") {
            return this.decodeForm(parameters + "");
        }
        if (parameters instanceof Array) {
            return parameters;
        }
        var list = [];
        for (var p in parameters) {
            list.push([p, parameters[p]]);
        }
        return list;
    },
    /** Convert the given parameters to a map from name to value. */
getParameterMap: function getParameterMap(parameters) {
        if (parameters === null) {
            return {};
        }
        if (typeof parameters != "object") {
            return this.getParameterMap(this.decodeForm(parameters + ""));
        }
        if (parameters instanceof Array) {
            var map = {};
            for (var p = 0; p < parameters.length; ++p) {
                var key = parameters[p][0];
                if (map[key] === undefined) { // first value wins
                    map[key] = parameters[p][1];
                }
            }
            return map;
        }
        return parameters;
    },
getParameter: function getParameter(parameters, name) {
        if (parameters instanceof Array) {
            for (var p = 0; p < parameters.length; ++p) {
                if (parameters[p][0] == name) {
                    return parameters[p][1]; // first value wins
                }
            }
        } else {
            return this.getParameterMap(parameters)[name];
        }
        return null;
    },
formEncode: function formEncode(parameters) {
        var form = "";
        var list = this.getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var value = list[p][1];
            if (value === null) {value = "";}
            if (form != "") {form += '&';}
            form += this.percentEncode(list[p][0]) +'='+ this.percentEncode(value);
        }
        return form;
    },
decodeForm: function decodeForm(form) {
        var list = [];
        var nvps = form.split('&');
        for (var n = 0; n < nvps.length; ++n) {
            var nvp = nvps[n];
            if (nvp == "") {
                continue;
            }
            var equals = nvp.indexOf('=');
            var name;
            var value;
            if (equals < 0) {
                name = this.decodePercent(nvp);
                value = null;
            } else {
                name = this.decodePercent(nvp.substring(0, equals));
                value = this.decodePercent(nvp.substring(equals + 1));
            }
            list.push([name, value]);
        }
        return list;
    },
setParameter: function setParameter(message, name, value) {
        var parameters = message.parameters;
        if (parameters instanceof Array) {
            for (var p = 0; p < parameters.length; ++p) {
                if (parameters[p][0] == name) {
                    if (value === undefined) {
                        parameters.splice(p, 1);
                    } else {
                        parameters[p][1] = value;
                        value = undefined;
                    }
                }
            }
            if (value !== undefined) {
                parameters.push([name, value]);
      
            }
        } else {
            parameters = this.getParameterMap(parameters);
            parameters[name] = value;
            message.parameters = parameters;
       return message;
        }
    },
setParameters: function setParameters(message, parameters) {
        var list = this.getParameterList(parameters);
        for (var i = 0; i < list.length; ++i) {
            this.setParameter(message, list[i][0], list[i][1]);
        }
    },
    /** Fill in parameters to help construct a request message.
        This function doesn't fill in every parameter.
        The accessor object should be like:
        {consumerKey:'foo', consumerSecret:'bar', accessorSecret:'nurn', token:'krelm', tokenSecret:'blah'}
        The accessorSecret property is optional.
     */
completeRequest: function completeRequest(message, accessor) {
        if (message.method === null) {
            message.method = "GET";
        }
        var map = this.getParameterMap(message.parameters);
        if (map.oauth_consumer_key === null) {
            this.setParameter(message, "oauth_consumer_key", accessor.consumerKey || "");
        }
        if (map.oauth_token === null && accessor.token !== null) {
            this.setParameter(message, "oauth_token", accessor.token);
        }
        if (map.oauth_version === null) {
            this.setParameter(message, "oauth_version", "1.0");
        }
        if (map.oauth_timestamp === null) {
            this.setParameter(message, "oauth_timestamp", this.timestamp());
        }
        if (map.oauth_nonce === null) {
            this.setParameter(message, "oauth_nonce", this.nonce(30));
        }
      
        this.$.SignatureMethod.sign(message, accessor);
    },
setTimestampAndNonce: function setTimestampAndNonce(message) {
   this.setParameter(message, "oauth_timestamp", this.timestamp());
        this.setParameter(message, "oauth_nonce", this.nonce(30));
   return message;
    },
addToURL: function addToURL(url, parameters) {
        newURL = url;
        if (parameters !== null) {
            var toAdd = this.formEncode(parameters);
            if (toAdd.length > 0) {
                var q = url.indexOf('?');
                if (q < 0) {newURL += '?';}
                else       {newURL += '&';}
                newURL += toAdd;
            }
        }
        return newURL;
    },
    /** Construct the value of the Authorization header for an HTTP request. */
getAuthorizationHeader: function getAuthorizationHeader(realm, parameters) {
        var header = 'realm="' + this.percentEncode(realm) + '"';
       // var header = "";
   var list = this.getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var parameter = list[p];
            var name = parameter[0];
            if (name.indexOf("oauth_") === 0) {
                header +=  ','+ this.percentEncode(name) + '="' + this.percentEncode(parameter[1]) + '"';
            }
        }
        return header;
    },
getAuthorizationHeaderjson: function getAuthorizationHeaderjson(realm, parameters) {
        var header = 'realm: "' + this.percentEncode(realm) + '"';
        var list = this.getParameterList(parameters);
        for (var p = 0; p < list.length; ++p) {
            var parameter = list[p];
            var name = parameter[0];
            if (name.indexOf("oauth_") === 0) {
                header += ',' + this.percentEncode(name) + ':"' + this.percentEncode(parameter[1]) + '"';
            }
        }
        return header;
    },
    /** Correct the time using a parameter from the URL from which the last script was loaded. */
correctTimestampFromSrc: function correctTimestampFromSrc(parameterName) {
        parameterName = parameterName || "oauth_timestamp";
        var scripts = document.getElementsByTagName('script');
        if (scripts === null || !scripts.length) {return;}
        var src = scripts[scripts.length-1].src;
        if (!src) {return;}
        var q = src.indexOf("?");
        if (q < 0) {return;}
        parameters = this.getParameterMap(this.decodeForm(src.substring(q+1)));
        var t = parameters[parameterName];
        if (t === null) {return;}
        this.correctTimestamp(t);
    },
    /** Generate timestamps starting with the given value. */
correctTimestamp: function correctTimestamp(timestamp) {
        this.timeCorrectionMsec = (timestamp * 1000) - (new Date()).getTime();
    },
    /** The difference between the correct time and my clock. */
timeCorrectionMsec: 0,
timestamp: function timestamp() {
        var t = (new Date()).getTime() + this.timeCorrectionMsec;
        return Math.floor(t / 1000);
    },
nonce: function nonce(length) {
        this.nonceCHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var chars = this.nonceCHARS;
        var result = "";
        for (var i = 0; i < length; ++i) {
            var rnum = Math.floor(Math.random() * chars.length);
            result += chars.substring(rnum, rnum+1);
        }
        return result;
    },
sign: function sign(message, accessor) {
        var name = this.getParameterMap(message.parameters).oauth_signature_method;
        if (name === null || name == "") {
            name = "HMAC-SHA1";
            this.setParameter(message, "oauth_signature_method", name);
        }
        this.newMethod(name, accessor);
   this.signaction(message);
   return message;
    },
    /** Instantiate a SignatureMethod for the given method name. */
newMethod: function newMethod(name, accessor) {
       
         this.initialize(name, accessor);
            return accessor;  // in case you want this
       
     },
    /** A map from sinature method name to constructor. */
    REGISTERED : {},
    /** Subsequently, the given constructor will be used for the named methods.
        The constructor will be called with no parameters.
        The resulting object should usually implement getSignature(baseString).
        You can easily define such a constructor by calling makeSubclass, below.
     */
registerMethodClass: function registerMethodClass(names, classConstructor) {
        for (var n = 0; n < names.length; ++n) {
            this.REGISTERED[names[n]] = classConstructor;
        }
    },
    /** Create a subclass of OAuth.SignatureMethod, with the given getSignature function. */
makeSubclass: function makeSubclass(getSignatureFunction) {
        var superClass = this;
        var subClass = function() {
            superClass.call(this);
        };
        subClass.prototype = new superClass();
        // Delete instance variables from prototype:
        // delete subclass.prototype... There aren't any.
        subClass.prototype.getSignature = getSignatureFunction;
        subClass.prototype.constructor = subClass;
        return subClass;
    },
HMACsign: function HMACsign(baseString) {
           this.b64pad = '=';
            var signature = this.b64_hmac_sha1(this.key, baseString);
            return signature;
        },

getBaseString: function getBaseString(message) {
        var URL = message.action;
        var q = URL.indexOf('?');
        var parameters;
        if (q < 0) {
            parameters = message.parameters;
        } else {
            // Combine the URL query string with the other parameters:
            parameters = this.decodeForm(URL.substring(q + 1));
            var toAdd = this.getParameterList(message.parameters);
            for (var a = 0; a < toAdd.length; ++a) {
                parameters.push(toAdd[a]);
            }
        }
        return this.percentEncode(message.method.toUpperCase()) +'&'+ this.percentEncode(this.normalizeUrl(URL)) +'&'+ 

this.percentEncode(this.normalizeParameters(parameters));
    },
normalizeUrl: function normalizeUrl(url) {
        var uri = this.parseUri(url);
        var scheme = uri.protocol.toLowerCase();
        var authority = uri.authority.toLowerCase();
        var dropPort = (scheme == "http" && uri.port == 80) || (scheme == "https" && uri.port == 443);
        if (dropPort) {
            // find the last : in the authority
            var index = authority.lastIndexOf(":");
            if (index >= 0) {
                authority = authority.substring(0, index);
            }
        }
        var path = uri.path;
        if (!path) {
            path = "/"; // conforms to RFC 2616 section 3.2.2
        }
        // we know that there is no query and no fragment here.
        return scheme + "://" + authority + path;
    },
parseUri: function parseUri (str) {
        /* This function was adapted from parseUri 1.2.1
           http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
         */
        var o = {key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
                 parser: {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/ }};
        var m = o.parser.strict.exec(str);
        var uri = {};
        var i = 14;
        while (i--) {uri[o.key[i]] = m[i] || "";}
        return uri;
    },
normalizeParameters: function normalizeParameters(parameters) {
        if (parameters === null) {
            return "";
        }
        var list = this.getParameterList(parameters);
        var sortable = [];
        for (var p = 0; p < list.length; ++p) {
            var nvp = list[p];
            if (nvp[0] != "oauth_signature") {
                sortable.push([ this.percentEncode(nvp[0])+ " " + this.percentEncode(nvp[1]), nvp]);  // because it comes before any character that can appear in a percentEncoded string.
                              
            }
        }
        sortable.sort(function(a,b) {
                          if (a[0] < b[0]) {return  -1;}
                          if (a[0] > b[0]) {return 1;}
                          return 0;
                      });
        var sorted = [];
        for (var s = 0; s < sortable.length; ++s) {
            sorted.push(sortable[s][1]);
        }
        return this.formEncode(sorted);
    },
signaction: function signaction(message) {
        var baseString = this.getBaseString(message);
    var name = this.getParameterMap(message.parameters).oauth_signature_method;
   if (name == "HMAC-SHA1") {
        var signature = this.HMACsign(baseString);
        this.setParameter(message, "oauth_signature", signature);
        return signature; // just in case someone's interested
   }
   else {
   this.setParameter(message, "oauth_signature", this.key);
   return signature;
   }
    },
    /** Set the key string for signing. */
initialize: function initialize(name, accessor) {
        var consumerSecret;
        if (accessor.accessorSecret !== null && name.length > 9 && name.substring(name.length-9) == "-Accessor")
        {
            consumerSecret = accessor.accessorSecret;
        } else {
            consumerSecret = accessor.consumerSecret;
        }
        this.key = this.percentEncode(consumerSecret) +"&"+ this.percentEncode(accessor.tokenSecret);
    },
/*   set up SHA-1 for use later
* A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
* in FIPS 180-1
* Version 2.2 Copyright Paul Johnston 2000 - 2009.
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet

* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for details.
*/

/*
* Configurable variables. You may need to tweak these to be compatible with
* the server-side, but the defaults work in most cases.
*/
//var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
//var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */






/*
* Calculate the HMAC-SHA1 of a key and some data (raw strings)
*/


/*
* Convert a raw string to a hex string
*/
rstr2hex: function rstr2hex(input)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F) +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
},

/*
* Convert a raw string to a base-64 string
*/
rstr2b64: function rstr2b64(input)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) {output += this.b64pad;}
      else {output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);}
    }
  }
  return output;
},

/*
* Convert a raw string to an arbitrary string encoding
*/
rstr2any: function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var remainders = Array();
  var i, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */
  while(dividend.length > 0)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        {quotient[quotient.length] = q;}
    }
    remainders[remainders.length] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    {output += encoding.charAt(remainders[i]);}

  /* Append leading zero equivalents */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  for(i = output.length; i < full_length; i++)
    {output = encoding[0] + output;}

  return output;
},

/*
* Encode a string as utf-8.
* For efficiency, this assumes the input is valid utf-16.
*/
str2rstr_utf8: function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      {output += String.fromCharCode(x);}
    else if(x <= 0x7FF)
      {output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));}
    else if(x <= 0xFFFF)
      {output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));}
    else if(x <= 0x1FFFFF)
      {output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));}
  }
  return output;
},

/*
* Encode a string as utf-16
*/
str2rstr_utf16le: function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    {output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);}
  return output;
},

str2rstr_utf16be: function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    {output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);}
  return output;
},

/*
* Convert a raw string to an array of big-endian words
* Characters >255 have their high-byte silently ignored.
*/
rstr2binb: function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    {output[i] = 0;}
  for(var m = 0; m < input.length * 8; m += 8)
    {output[m>>5] |= (input.charCodeAt(m / 8) & 0xFF) << (24 - m % 32);}
  return output;
},

/*
* Bitwise rotate a 32-bit number to the left.
*/
bit_rol: function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
},


/*
* Convert an array of big-endian words to a string
*/
binb2rstr: function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    {output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);}
  return output;
},
/*
* Determine the appropriate additive constant for the current iteration
*/
sha1_kt: function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
},
/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
safe_add: function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
},

/*
* Perform the appropriate triplet combination function for the current
* iteration
*/
sha1_ft: function sha1_ft(t, b, c, d)
{
  if(t < 20) {return (b & c) | ((~b) & d);}
  if(t < 40) {return b ^ c ^ d;}
  if(t < 60) {return (b & c) | (b & d) | (c & d);}
  return b ^ c ^ d;
},

/*
* Calculate the SHA-1 of an array of big-endian words, and a bit length
*/
binb_sha1: function binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) {w[j] = x[i + j];}
      else {w[j] = this.bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);}
      var t = this.safe_add(this.safe_add(this.bit_rol(a, 5), this.sha1_ft(j, b, c, d)),
                       this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));
      e = d;
      d = c;
      c = this.bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = this.safe_add(a, olda);
    b = this.safe_add(b, oldb);
    c = this.safe_add(c, oldc);
    d = this.safe_add(d, oldd);
    e = this.safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

},
rstr_hmac_sha1: function rstr_hmac_sha1(key, data)
{
  var bkey = this.rstr2binb(key);
  if(bkey.length > 16) {bkey = this.binb_sha1(bkey, key.length * 8);}

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = this.binb_sha1(ipad.concat(this.rstr2binb(data)), 512 + data.length * 8);
  return this.binb2rstr(this.binb_sha1(opad.concat(hash), 512 + 160));
},



/*
* These are the functions you'll usually want to call
* They take string arguments and return either hex or base-64 encoded strings
*/
hex_sha1: function hex_sha1(s)    { return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(s))); },
b64_sha1: function b64_sha1(s)    { return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(s))); },
any_sha1: function any_sha1(s, e) { return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(s)), e); },
hex_hmac_sha1: function hex_hmac_sha1(k, d)
  { return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); },
b64_hmac_sha1: function b64_hmac_sha1(k, d)
  { return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); },
any_hmac_sha1:function any_hmac_sha1(k, d, e)
  { return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); },
  
    /*
* Perform a simple self-test to see if the VM is working
*/
sha1_vm_test:function sha1_vm_test()
{
  return this.hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

});