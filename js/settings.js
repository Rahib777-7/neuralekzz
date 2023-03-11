function settabcloakButton() {
	const inputTitle = document.getElementById("title");
	const inputLink = document.getElementById("sitelink");
	const favicon = document.querySelector('link[rel="icon"]');
	const documentTitle = document.querySelector("title");
	const title = inputTitle.value;
	const link = inputLink.value;
	localStorage.setItem("title", title);
	if (link === "") {
		localStorage.setItem("favicon", "../images/favicon.ico");
		favicon.href = `../images/favicon.ico`;
	} else {
		localStorage.setItem("favicon", `https://www.google.com/s2/favicons?domain=${link}`);
		favicon.href = `https://www.google.com/s2/favicons?domain=${link}`;
	}
	if (title === "") {
		localStorage.setItem("title", undefined);
	} else {
		localStorage.setItem("title", title);
		documentTitle.innerHTML = title;
	}
}

function settheme() {
	const themeSelect = document.querySelector("select#theme");
	localStorage.setItem("theme", themeSelect.value);
	let themeData = document.querySelector('link[href^="../css/themes/"]');
	themeData.href = `../css/themes/${themeSelect.value}.css`;
}

function fileNameToTitle(theme) {
	return theme.replaceAll("_", " ").replaceAll("-", " ").toTitleCase();
}

function handleNavbarLocation(input) {
	let navbar = document.querySelector(".header");
	console.log(input.value);
	localStorage.setItem("navbarlocation", input.value);
	switch (input.value) {
		case "top":
			navbar.style.top = "0px";
			break;
		case "bottom":
			navbar.style.top = "calc(100vh - 44px)";
			break;
	}
}

function settingsLoad() {
	const themeSelect = document.querySelector("select#theme");
	for (theme of siteData.themes) {
		let themeOption = document.createElement("option");
		themeOption.value = theme;
		themeOption.innerHTML = fileNameToTitle(theme);
		if (siteData.theme === theme && theme === localStorage.getItem("theme")) {
			themeOption.selected = true;
		} else if (localStorage.getItem("theme") === theme) {
			themeOption.selected = true;
		}
		themeSelect.appendChild(themeOption);
	}
	const selectedNavbarLocation = document.querySelector(`#${localStorage.getItem("navbarlocation")}navbar`);
	selectedNavbarLocation.checked = true;
	const tCloakTitle = document.getElementById("title");
	const tCloakUrl = document.getElementById("sitelink");
	tCloakTitle.value = localStorage.getItem("title");
	if (localStorage.getItem("favicon")) {
		tCloakUrl.value = localStorage.getItem("favicon").slice(42); // its the meaning of life
	}
}
