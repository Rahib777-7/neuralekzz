let type = document.body.classList[0];

function handleFlash(games) {
	const container = document.querySelector(".container-games");
	for (game of games) {
		let section = document.createElement("section");
		let icon = document.createElement("img");
		let title = document.createElement("div");
		let dropdown = document.createElement("div");
		dropdown.classList.add("dropdown");
		let droplink = document.createElement("a");
		droplink.href = `?game=${game[0]}`;
		droplink.innerHTML = "Play";
		dropdown.appendChild(droplink);
		title.classList.add("title");
		title.innerHTML = game[1];
		icon.src = "../images/neuralekzz.png";
		section.appendChild(icon);
		section.appendChild(title);
		section.appendChild(dropdown);
		container.appendChild(section);
	}
}

function handleHTML(games) {
	console.log("lol?");
}

switch (type) {
	case "flash":
		if (!new URLSearchParams(window.location.search).has("game")) {
			fetch(`${userCDN}/games.json`)
				.then((data) => data.json())
				.then((flashgames) => handleFlash(flashgames.flash));
		}
		break;
	case "html":
		if (!new URLSearchParams(window.location.search).has("game")) {
			fetch(`${userCDN}/games.json`)
				.then((data) => data.json())
				.then((htmlgames) => handleHTML(htmlgames.other.html));
		}
}
