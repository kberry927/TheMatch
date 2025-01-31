function handleCredentialResponse(response) {
	const data = JSON.parse(atob(response.credential.split(".")[1]));

	// Save user info in localStorage so it persists across page refreshes
	localStorage.setItem("googleUser", JSON.stringify(data));

	showUserInfo(data);
}

function showUserInfo(user) {
	document.getElementById("auth-container").style.display = "none";
	document.getElementById("content").style.display = "block";
	document.getElementById("content").innerHTML = `
        <h1>Welcome to It's The Match</h1>
        <p>Hello, ${user.name} (${user.email})</p>
        <img src="${user.picture}" alt="User Image" width="100">
        <br>
        <button id="logout">Logout</button>
    `;

	// Attach logout event
	document.getElementById("logout").addEventListener("click", signOut);
}

function signOut() {
	localStorage.removeItem("googleUser"); // Clear stored login
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
