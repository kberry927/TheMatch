function handleCredentialResponse(response) {
	const data = JSON.parse(atob(response.credential.split(".")[1]));

	// Save login data to localStorage so it persists across refreshes
	localStorage.setItem("googleUser", JSON.stringify(data));

	showUserInfo(data);
}

function showUserInfo(user) {
	document.getElementById("auth-container").style.display = "none";
	document.getElementById("content").style.display = "block";
	document.getElementById("user-info").innerHTML = `Hello, ${user.name}`;
}

function signOut() {
	localStorage.removeItem("googleUser"); // Clear saved login
	document.getElementById("auth-container").style.display = "block";
	document.getElementById("content").style.display = "none";
}

// Check if user is already logged in when page loads
window.onload = function () {
	const savedUser = localStorage.getItem("googleUser");
	if (savedUser) {
		showUserInfo(JSON.parse(savedUser));
	}
};
