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
	exit();
}

// Minimizes the chat dialogue box
function minimize() {
	document.getElementsByClassName('fbNub _50-v _50mz _50m_ _5238 opened')[0].setAttribute("class", "fbNub _50-v _50mz _50m_ _5238");
}

// Closes the chat dialogue box
function exit() {
	document.getElementsByClassName('fbNubGroup clearfix videoCallEnabled')[0].innerHTML = '';
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
