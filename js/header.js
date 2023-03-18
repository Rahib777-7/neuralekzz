// Important stuff, used on occasion

String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
};

// Site loading
const cdns = ["https://raw.githack.com/omnitechnicity/neuralekzz-assets/main", "https://rawcdn.githack.com/omnitechnicity/neuralekzz-assets/main", "https://raw.githubusercontent.com/omnitechnicity/neuralekzz-assets/main", "https://cdn.statically.io/gh/omnitechnicity/neuralekzz-assets/main"];

let siteData;

function validateData(data) {
	if (data.themes.includes(data.theme) === false) {
		throw new Error("Theme does not exist!");
	}
	for (games in data.games) {
		if (typeof data.games[games] !== "boolean") {
			throw new Error("Game configuration must be a boolean!");
		}
	}
	return false;
}

function sitePreferences(data) {
	validateData(data);
	const navbar = document.querySelector(".header");
	const navbarLocation = localStorage.getItem("navbarlocation");
	const themeData = document.createElement("link");
	const cloakLink = localStorage.getItem("favicon");
	const cloakTitle = localStorage.getItem("title");
	const favicon = document.querySelector('link[rel="icon"]');
	const documentTitle = document.querySelector("title");
	let theme;
	themeData.rel = "stylesheet";
	if (localStorage.getItem("theme") === null) {
		theme = siteData.theme;
	} else {
		theme = localStorage.getItem("theme");
	}
	if (document.body.classList.contains("index")) {
		themeData.href = `css/themes/${theme}.css`;
	} else {
		themeData.href = `../css/themes/${theme}.css`;
	}
	document.head.appendChild(themeData);
	if (document.body.classList.contains("settings")) {
		settingsLoad();
	}
	switch (navbarLocation) {
		case "top":
			navbar.style.top = "0px";
			break;
		case "bottom":
			navbar.style.top = "calc(100vh - 44px)";
			break;
		case null:
			break;
	}
	if (cloakTitle !== null) {
		documentTitle.innerHTML = cloakTitle;
	}
	if (cloakLink !== null) {
		favicon.href = cloakLink;
	}
}

async function getCDNs() {
	for (cdn of cdns) {
		let cdnRetrieval = await fetch(`${cdn}/fetch`);
		if (cdnRetrieval.ok) {
			console.log(cdn);
			localStorage.setItem("cdn", cdn);
			return;
		}
	}
	alert("No CDN found!");
}

function popupAlert() {
	// TODO: Add a popup warning and just in general a popup function
}

window.onload = function () {
	dataFileLink = document.body.classList.contains("index") ? "neuralekzz.json" : "../neuralekzz.json";
	fetch(dataFileLink)
		.then((response) => response.json())
		.then((data) => {
			siteData = data;
			sitePreferences(data);
		});
};

getCDNs();
const userCDN = localStorage.getItem("cdn");
