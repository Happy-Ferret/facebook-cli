var input = "";
var token = "";

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		token = request.token;
		console.log(token);
	});

$(document).ready(function() {

	console.log("Document ready");
	$(document).on("keyup", "textarea", function(e) {
		if (e.keyCode == 13 && e.shiftKey) {
			this.value = "";
         e.preventDefault();
			parse(this, input, this.className);
			input = "";
		} else{
			input = this.value;
		}
	});
});

function isChatBox(className) {
	return true;
}

function parse(elem, command, className) {
	console.log(command);
	console.log(className);

	var i = command.indexOf(' ');
	var split = [command.slice(0, i), command.slice(i+1)];
	command = split[0];
	var arg1 = split[1];

	if (isChatBox(className)) {
		switch (command) {
		case "min":
			minimize(elem);
			return;
		case "exit":
			exit(elem);
			return;
		case "n":
			nextChat();
			return;
		case "p":
			prevChat();
			return;
		case "cd about":
			changeDirectory("about");
			return;
		case "cd photos":
			changeDirectory("photos");
			return;
		case "cd friends":
			changeDirectory("friends");
			return;
		case "cd following":
			changeDirectory("likes");
			return;
		case "cd ~":
			changeDirectory("~");
			return;
		case "cd news":
			changeDirectory("news");
			return;
		case "whoami":
			whoami(elem);
			return;
	   }
	}

	switch (command) {
	case "post":
		post(arg1);
		break;
	case "openchat":
		openChat(arg1);
		break;
	case "openprofile":
		openProfile(arg1);
		break;
	case "profile":
		openProfile();
		break;
	case "search":
		search(arg1);
		break;
	default:
		// TODO Display error to user
		console.log("Command not recognized");
	}
}

// Minimizes the chat dialogue box
function minimize(elem) {
	var closest = $(elem).closest('.fbNub');
	closest.removeClass('opened focusedTab');
}

// Closes the chat dialogue box
function exit(elem) {
	$('.close.button')[0].click();
}

function changeDirectory(directory) {
	if (directory == "news") {
		window.location.href = "https://www.facebook.com/";
		return;
	}
	var ext = "";
	if (directory != "~") {
		ext = "/"+directory;
	}
	var url = $("#pageNav > #navTimeline > a").attr("href");

	var split_url = url.split('/');
	var user_id = split_url[3];
	var redirect_url = "https://www.facebook.com/" + user_id + ext;
	window.location.href = redirect_url;
}

function whoami(elem) {
	var url = $("#pageNav > #navTimeline > a").attr("href");
	var split_url = url.split('/');
	var user_id = split_url[3];
	var match = $(".conversation");
	console.log(match);
	var $add = '<div class="mhs mbs pts fbChatConvItem _50dw clearfix small _50kd"><div class="_50ke"><div class="_50x5"></div></div><div class="messages"><div class="metaInfoContainer fss fcg"><span class="hidden_elem"><a href="#" rel="dialog" role="button"><span class="fcg">Report</span></a> · </span><span class="timestamp"></span></div><div class="_kso fsm direction_ltr _55r0" data-jsid="message" style="max-width: 188px;"><span data-measureme="1"><span id = "whoyouare"></span></span></div></div></div>'
	match.append($add);
	$("#whoyouare").append(user_id);
	$("#whoyouare").attr("id", "old");
	//$('.fbNubFlyoutBody scrollable').scrollTop($('.fbNubFlyoutBody scrollable')[0].scrollHeight);
}

function post(status) {
	var url = "https://graph.facebook.com/me/feed?message=" + status;
	console.log(url);
	$.ajax(
	{
		type: 'POST',		
		url: url,
		data: {access_token: token},
		success: function (data) { console.log("success:"); console.log(data); },
		error: function (data) { console.log("error"); }
	});
}

function nextChat() {
}

function prevChat() {
}

function openChat(userName) {
}

function openProfile() {
}

function openProfile(userName) {
}

function search(query) {
}
