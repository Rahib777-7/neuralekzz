let Game = document.createElement("div");
const userCDN = localStorage.getItem("cdn");

function replaceSingular(html) {
	let fixedHTML = html;
	fixedHTML = fixedHTML.replace("<head>", '<header class="neuralekzz">');
	fixedHTML = fixedHTML.replace("</head>", "</header>");
	fixedHTML = fixedHTML.replace("<body>", '<main class="neuralekzz">');
	fixedHTML = fixedHTML.replace("</body>", "</main>");
	return fixedHTML;
}

function fixFetches(gameObject) {}

function addGame(game) {
	const body = game.querySelector("main.neuralekzz");
	const head = game.querySelector("header.neuralekzz");

	console.log(body.outerHTML);
	console.log(head.outerHTML);
	console.log(body);
	console.log(head);
	bodyItems = body.children;
	headItems = head.children;
	scripts = game.querySelectorAll("script");

	for (script of scripts) {
		newScript = document.createElement("script");
		newScript.innerHTML = script.innerHTML;
		for (attribute of script.attributes) {
			newScript.setAttribute(attribute.name, attribute.value);
		}
		script.replaceWith(newScript);
	}
	for (item of bodyItems) {
		document.body.appendChild(item);
	}
	for (item of headItems) {
		document.head.appendChild(item);
	}
}

function createGame(html) {
	fixedHTML = replaceSingular(html);
	Game.innerHTML = fixedHTML;
	addGame(Game);
}

fetch(`${userCDN}/html/test/index.html`)
	.then((text) => text.text())
	.then((html) => createGame(html));
