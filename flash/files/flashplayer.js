let game;
function setTitle(gamedata, gametype) {
	const flashgames = gamedata.flash;
	gametitle = flashgames.find((gamer) => gamer.id === gametype).name;
	let title = document.querySelector("title");
	title.innerHTML = `Neuralekzz | ${gametitle}`;
}
if (new URLSearchParams(window.location.search).has("game")) {
	/* const header = document.querySelector(".header");
	header.remove(); */
	const container = document.querySelector(".container");
	urlparams = new URLSearchParams(window.location.search);
	game = urlparams.get("game");
	window.RufflePlayer = window.RufflePlayer || {};
	window.addEventListener("load", (event) => {
		const ruffle = window.RufflePlayer.newest();
		const player = ruffle.createPlayer();
		window.RufflePlayer.config = window.RufflePlayer.config || {};
		window.RufflePlayer.config.letterbox = "on";
		window.RufflePlayer.config.autoplay = "auto";
		window.RufflePlayer.config.publicPath = "files";
		player.style.width = "75%";
		player.style.height = "75%";
		container.appendChild(player);
		fetch(`${userCDN}/flash/${game}.swf`).then(player.load(`${userCDN}/flash/${game}.swf`));
	});
	document.body.style.overflowY = "hidden";
	if (!localStorage.getItem("title") || !localStorage.getItem("favicon")) {
		fetch(`${userCDN}/games.json`)
			.then((data) => data.json())
			.then((gamed) => setTitle(gamed, game));
	}
	style = document.querySelector('link[href="../css/gameslist.css"]');
	style.href = "../css/player.css";
}
