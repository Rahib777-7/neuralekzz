function handleLinks(links) {
	const gamecontainer = document.querySelector(".container2");
	for (site in links) {
		const gamesection = document.createElement("section");
		const gametitle = document.createElement("div");
		gametitle.classList.add("title");
		gametitle.innerHTML = site;
		gamesection.appendChild(gametitle);
		for (link of links[site]) {
			let gamelink = document.createElement("a");
			gamelink.href = link;
			gamelink.innerHTML = link;
			gamesection.appendChild(gamelink);
		}
		gamecontainer.appendChild(gamesection);
	}
}
fetch(`${userCDN}/links.json`)
	.then((data) => data.json())
	.then((links) => handleLinks(links.links));
