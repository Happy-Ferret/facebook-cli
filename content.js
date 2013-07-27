var input = "";

$(document).ready(function() {
	console.log("Document ready");
	$(document).on("keyup", "textarea", function(e) {
		if (e.keyCode == 13) {
			if (isCommand(input)) {
				parse(this, input.slice(1), this.className);
			}
			input = "";
		} else{
			input = this.value;
		}
	});
});

function isCommand(text) {
	return text[0] === '/' && text.length > 1;
}

function isChatBox(className) {
	return true;
}

function parse(elem, command, className) {
	console.log(command);
	console.log(className);
	command = command.toLowerCase();

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
	   }
	}

	var arg1 = command.split(" ", 1)[1];
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
	console.log("got here");
	var ext = "";
	if (directory != "~") {
		ext = "/"+directory;
	}
	var url = document.URL;
	var split_url = url.split('/');
	var user_id = split_url[3];
	var redirect_url = "https://www.facebook.com/" + user_id + ext;
	window.location.href = redirect_url;
}

function post(status) {
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
