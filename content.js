var input = "";

$(document).ready(function(){
	console.log("Document ready");

	$('textarea').keyup(function(e) {
		if (e.keyCode == 13) {
			if (isCommand(this.value)) {
				parse(input, this.className);
			}
			input = "";
		} else{
			input = this.value;
		}
	});
});

function isCommand(text) {
	return true;
}

function parse(command, className) {
	console.log(command);
	console.log(className);
}

function exit() {
}

function post(status) {
}

function nextChat() {
}

function prevChat() {
}

function openChat() {
}

function openProfile() {
}

function openProfile(userName) {
}

function search() {
}
