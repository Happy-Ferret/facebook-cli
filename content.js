var input = "";

$(document).ready(function() {
	console.log("Document ready");
	$('textarea').keyup(function(e) {
		if (e.keyCode == 13) {
			if (isCommand(input)) {
				parse(input.slice(1), this.className);
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

function parse(command, className) {
	console.log(command);
	console.log(className);
	command = command.toLowerCase();

	if (isChatBox(className)) {
		switch (command) {
		case "min":
			minimize();
			return;
		case "exit":
			exit();
			return;
		case "n":
			nextChat();
			return;
		case "p":
			prevChat();
			return;
		case "cd":
			changeDirectory();
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
function minimize() {
	$('.fbNub').removeClass('opened focusedTab');
}

// Closes the chat dialogue box
function exit() {
	$('.close.button')[0].click();
}



function changeDirectory() {
	var url = document.URL;
	var split_url = url.split('/');
	var user_id = split_url[3];
	var redirect_url = "https://www.facebook.com/" + user_id + "/about";
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
