var win = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
    layout: 'vertical',
    navBarHidden: true
});

// Create a TextField.
var aTextField = Ti.UI.createTextField({
	height : "50dp",
	top : "10%",
	width : "240dp",
	hintText : 'What do you want to share?',
	softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Listen for return events.
aTextField.addEventListener('return', function(e) {
	aTextField.blur();
});

// Add to the parent view.
win.add(aTextField);

var btn = Ti.UI.createButton({
	top: "20dp",
	title:'Share it!'
});

btn.addEventListener('click', function(){
	if (aTextField.value === "") {
		alert("You need to fill in some text before sharing it!");
		return;
	}
	
	var Blob = win.toImage().media;
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,'image_1.png');
	file.write(Blob);
	
	require('/ShareViaAndroid')(aTextField.value, "image", file);
	
});
win.add(btn);
win.open();
