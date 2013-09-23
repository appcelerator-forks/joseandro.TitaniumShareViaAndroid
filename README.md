TitaniumShareViaAndroid
=======================

Share contents natively in to apps directly from your Titanium app.

This simple module allows you to share contents (text or images) via Facebook or native apps (using intents).

####Usage

To share text:

~~~
new require('/ShareViaAndroid')("Text to be shared", "text");
~~~

Than call it with clip ID and the callback function:

~~~
var Blob = win.toImage().media;
var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,'image_1.png');
file.write(Blob);
	
new require('/ShareViaAndroid')("Text to be shared", "image" , file);
~~~

MIT licensed, have fun ;)