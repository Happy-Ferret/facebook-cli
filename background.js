function onFacebookLogin() {
	console.log("On FB login");
	console.log(localStorage.accessToken);
	if (true) {//!localStorage.accessToken) {
		console.log("!localStorage.accessToken");
		chrome.tabs.query({url: 'https://www.facebook.com/connect/login_success.html*'}, getToken);
		chrome.tabs.query({url: "*://www.facebook.com/*"}, sendToken);
	}
}

function getToken(tabs) {
	console.log("getToken: " + tabs.length);
	for (var i = 0; i < tabs.length; i++) {
		var params = tabs[i].url.split('#')[1];
		localStorage.accessToken = params.split('&')[0].split('=')[1];
		chrome.tabs.onUpdated.removeListener(onFacebookLogin);
	}
}

function sendToken(tabs) {
	console.log("sendToken: " + tabs.length);
	for (var i = 0; i < tabs.length; i++) {
		console.log(tabs[i].url);
		chrome.tabs.sendMessage(tabs[i].id, {token: localStorage.accessToken});
	}
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);
