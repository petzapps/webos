function NoteDecryptor(){
	this.EN_RC2_ENCRYPTION_KEYSIZE = 64;
	
	this.base64 = new Base64();
	this.utf8 = new Utf8();
	this.md5 = new Md5();
	this.rc2 = new RC2();
	this.Crc = new Crc();
}

NoteDecryptor.prototype.decrypt = function (base64str, passphrase) {
	// Password is UTF8-encoded before MD5 is calculated.
	// MD5 is used in raw (not hex-encoded) form.
	this.base64.decode(base64str);
	this.utf8.encode(passphrase);
	this.md5.hash(this.utf8.encode(passphrase));
	
	var str = this.rc2.decrypt(this.base64.decode(base64str), this.md5.hash(this.utf8.encode(passphrase)), this.EN_RC2_ENCRYPTION_KEYSIZE);
	// First 4 chars of the string is the HEX-representation of the upper-byte of the CRC32 of the string.
	// If CRC32 is valid, we return the decoded string, otherwise return null

	var crc = str.slice(0, 4);
	str = str.slice(4);

  
	var realcrc = this.Crc.crc32(str) ^ (-1); // Windows client implementation of CRC32 is broken, hence the " ^ (-1)" fix
	realcrc = realcrc >>> 0; // trick to make value an uint before converting to hex
	realcrc = this.d2h(realcrc).substring(0, 4).toUpperCase(); // convert to hex, take only first 4 uppercase hex digits to compare

	if (realcrc == crc) {

	  // Get rid of zero symbols at the end of the string, if any

	  while ((str.length > 0) && (str.charCodeAt(str.length - 1) == 0))
	    str = str.slice(0, str.length - 1);
    
	  // Return Unicode string    
	  return this.utf8.decode(str); 
	} else {
	  return null;
	}
};

NoteDecryptor.prototype.d2h = function (d) {
	return d.toString(16);
};
