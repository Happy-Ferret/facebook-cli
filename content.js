var token = "";

var KEY_CODE_UP = 38;
var KEY_CODE_DOWN = 40;
var KEY_CODE_ENTER = 13;

var HISTORY_SIZE = 15;

// Listen for FB API auth token
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		token = request.token;
		console.log(token);
	});

$(document).ready(function() {
	console.log("Document ready");

	var index = 0;
	var commandsInHistory = 0;
	var history = new Array();
	history[0] = "";

	// Hijack all textareas
	$(document).on("keyup", "textarea", function(e) {
		if (e.keyCode == KEY_CODE_ENTER && e.shiftKey) {
			var input = this.value.trim();

			// Execute the command
			parse(this, input, this.className);

			/*
			 * Add the command to the beginning of the history, and add a new
			 * blank command to the history.
			 */
			history[0] = input;
			history.unshift("");

			/*
			 * If we have reached the max history size, pop the last command
			 * from the history. Otherwise, increase the commandsInHistory count
			 * by one.
			 */
			if (history.length > HISTORY_SIZE) {
				history.pop();
			} else {
				commandsInHistory++;
			}

			// Set the history to the first command
			index = 0;

			// Remove the command from the input box
			this.value = "";
		} else if (e.keyCode == KEY_CODE_UP) {
			if ((index < commandsInHistory) && (index < HISTORY_SIZE - 1)) {
				index++;
			}
			// Set the value of the input box to the current history entry
			this.value = history[index];
		} else if (e.keyCode == KEY_CODE_DOWN) {
			if (index > 0) {
				index--;
			}
			// Set the value of the input box to the current history entry
			this.value = history[index];
		} else {
			/*
			 * The user is typing, so set the first history entry to the
			 * command they're typing.
			 */
			index = 0;
			history[0] = this.value.trim();
		}
	});
});

/**
 * Parses a command
 * @param  {Element} elem      The DOM element the command was typed into
 * @param  {String}  command   The full command that was typed
 * @param  {String}  className The classname of the DOM object
 */
function parse(elem, command, className) {
	var firstSpace = command.indexOf(" ");
	if (firstSpace != -1) {
		var commandName = command.substr(0, firstSpace);
		var args = command.substr(firstSpace + 1);
	} else {
		var commandName = command;
		var args = "";
	}
	console.log(commandName);
	console.log(args);

	executeCommand(elem, commandName, args, className);
}

/**
 * Executes a command
 * @param  {Element} elem 		 The DOM element that took in the input
 * @param  {String}  commandName The command name
 * @param  {String}  args        The full command that was typed without the
 *                               command name
 * @param  {String}  className   The classname of the DOM object
 * @return {Object}              The command object
 */
function executeCommand(elem, commandName, args, className) {
	if (isChatBox(className)) {
        switch (commandName) {
        case "min":
            minimizeChat(elem, args);
            return;
        case "exit":
           	exitChat(elem, args);
            return;
        case "ssh":
			ssh(elem, args);
            return;
        case "whoami":
            whoAmI(elem, args);
            return;
       }
    }

    switch (commandName) {
	case "post":
		post(elem, args);
		break;
	case "chat":
		chat(elem, args);
        break;
	case "cd":
        cd(elem, args);
        break;
	case "grep":
		grep(elem, args);
		break;
	default:
		// TODO Alert if no chat window
		console.log("Command not found");
		printToTerminal("Command not found");
	}
}

/**
 * Tells whether a command was typed in a chat box by looking at the className
 * @param  {String}  className The classname of the DOM object
 * @return {Boolean}           True if the DOM object is a chat box
 */
function isChatBox(className) {
	return true;
}

/**
 * Prints a message to the chat window
 * @param  {String} message The message to print
 */
function printToTerminal(message) {
	console.log(message);
	var match = $(".conversation");
	var $add = '<div class="mhs mbs pts fbChatConvItem _50dw clearfix small _50kd"><div class="_50ke"><div class="_50x5"></div></div><div class="messages"><div class="metaInfoContainer fss fcg"><span class="hidden_elem"><a href="#" rel="dialog" role="button"><span class="fcg">Report</span></a> · </span><span class="timestamp"></span></div><div class="_kso fsm direction_ltr _55r0" data-jsid="message" style="max-width: 188px;"><span data-measureme="1"><span id = "customMessage"></span></span></div></div></div>'
	match.append($add);
	$("#customMessage").append(message)
	$("#customMessage").attr("id", "oldMessage");
	$('.fbNubFlyoutBody.scrollable').scrollTop(100000);
}

/************************* Commands *************************/

function minimizeChat(elem, args) {
	var closest = $(elem).closest('.fbNub');
	closest.removeClass('opened focusedTab');
}

function exitChat(elem, args) {
	$('.close.button')[0].click();
}

function ssh(elem, args) {
	// TODO
}

function cd(elem, args) {
	var directory = args.split(" ")[0];

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

function whoAmI(elem, args) {
	var url = $("#pageNav > #navTimeline > a").attr("href");
	var split_url = url.split('/');
	var user_id = split_url[3];
	var match = $(".conversation");
	var $add = '<div class="mhs mbs pts fbChatConvItem _50dw clearfix small _50kd"><div class="_50ke"><div class="_50x5"></div></div><div class="messages"><div class="metaInfoContainer fss fcg"><span class="hidden_elem"><a href="#" rel="dialog" role="button"><span class="fcg">Report</span></a> · </span><span class="timestamp"></span></div><div class="_kso fsm direction_ltr _55r0" data-jsid="message" style="max-width: 188px;"><span data-measureme="1"><span id = "whoyouare"></span></span></div></div></div>'
	match.append($add);
	$("#whoyouare").append(user_id);
	$("#whoyouare").attr("id", "old");
	$('.fbNubFlyoutBody.scrollable').scrollTop(100000);
}

function post(elem, args) {
	status = args;

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

function chat(elem, args) {
	args = args.split(" ");
	firstname = args[0];
	lastname = args[1];

	var username = firstname + " " + lastname;
	var elem = $(".-cx-PRIVATE-fbChatOrderedList__name:contains('"+username+"')");
	if (elem.length == 0) {
	  console.log("This user is offline");
	  printToTerminal("This user is offline");
	}
	else {
	  elem.parent().parent().parent().parent().click();
	}
}

function grep(elem, args) {
	// TODO
}
