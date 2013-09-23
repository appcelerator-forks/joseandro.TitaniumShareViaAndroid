/*
@Author: Joseandro Luiz 
*/

function ShareViaAndroid(msg, type, img){
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 2,
	    buttonNames: ['Facebook', 'Outros Apps', 'Cancelar'],
	    message: 'How would you like to share it?',
	    title: 'Share'
	});
	
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
			Ti.API.info('The cancel button was clicked');
	    }
		
		switch(e.index){
			//Facebook
			case 0:
				var fb = require('facebook');
				
				fb.appid = "YOUR APP ID GOES HERE";
				fb.permissions = ['publish_stream']; // Permissions your app needs
				fb.forceDialogAuth = true;
				
				fb.addEventListener('login', function(e) {
				    if (e.success) {
				    	if (type === "text"){
							// Now create the status message after you've confirmed that authorize() succeeded
							fb.requestWithGraphPath('me/feed', {message: msg}, "POST", function(e) {
								if (e.success) {
							        alert("Shared!");
							    } 
							    else {
									alert("Not shared =/");
							    }
							});
				    	}
				    	else{
							// Now post the photo after you've confirmed that authorize() succeeded
							// var f = Ti.Filesystem.getFile('pumpkin.jpg');
							var blob = img.read();
							
							var data = {
							    message: msg,
							    picture: blob
							};
							
							fb.requestWithGraphPath('me/photos', data, 'POST', function(e){
								if (e.success) {
							        alert("Picture shared!");
							    } 
							    else {
									alert("Picture not shared =/");
							    }
							});
				    	}
				    } 
				    else if (e.error) {
				        alert("Try again! Error loggin in facebook : " + e.error);
				        fb.logout();
				    } 
				    else if (e.cancelled) {
				        // alert("Canceled");
				    }
				});
				
				if (!fb.loggedIn) {
					fb.authorize();
				}
				else{
			    	if (type === "text"){
						// Now create the status message after you've confirmed that authorize() succeeded
						fb.requestWithGraphPath('me/feed', {message: msg}, "POST", function(e) {
							if (e.success) {
						        alert("Shared!");
						    } 
						    else {
								alert("Not shared =/");
						    }
						});
			    	}
			    	else{
						// Now post the photo after you've confirmed that authorize() succeeded
						// var f = Ti.Filesystem.getFile('pumpkin.jpg');
						var blob = img.read();
						
						var data = {
						    message: msg,
						    picture: blob
						};
						
						fb.requestWithGraphPath('me/photos', data, 'POST', function(e){
							if (e.success) {
						        alert("Picture shared!");
						    } 
						    else {
								alert("Picture not shared =/");
						    }
						});
			    	}			
				}
			break;
			
			case 1:
				switch(type){
					case "image":
					//To share images:
					var share = Ti.Android.createIntent( { 
					    action: Ti.Android.ACTION_SEND
					});
					share.type = 'image/jpeg';
			
					share.putExtra(Ti.Android.EXTRA_SUBJECT, "Share via Android");
					share.putExtra(Ti.Android.EXTRA_TEXT, msg);
					share.putExtraUri(Ti.Android.EXTRA_STREAM, img.getNativePath());
					
					Ti.Android.currentActivity.startActivity(Ti.Android.createIntentChooser(share, "Send Message"));
					break;
					
					case "text":
						//To share text
						var share = Ti.Android.createIntent( { 
						    action: Ti.Android.ACTION_SEND
						});
						share.type = 'text/plain';
						share.addFlags(Ti.Android.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
						share.putExtra(Ti.Android.EXTRA_SUBJECT, "Share via Android");
						share.putExtra(Ti.Android.EXTRA_TEXT, msg);
						share.setFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
						
						Ti.Android.currentActivity.startActivity(Ti.Android.createIntentChooser(share, "Send Message"));
					break;
					
					default:
						alert("Sharing type not recognized!");		
				}
			break;
			
			default:
				// alert('Cancelado');
		}
	});
	dialog.show();
}
module.exports = ShareViaAndroid;