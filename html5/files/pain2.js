let Game = document.createElement("div");
const userCDN = localStorage.getItem("cdn");

let htmlDoc;
let scripts;
async function createGame(html) {
	scripts = [];
	let parser = new DOMParser();
	let params = new URLSearchParams(window.location.search);
	htmlDoc = parser.parseFromString(html, "text/html");
	for (let elem of htmlDoc.querySelectorAll("[src],[href]")) {
		if (elem.tagName.toLowerCase() != "a" && elem.attributes.src.value.search(new RegExp(`^${userCDN}.*`)) === -1) {
			let script = await fetch(`${userCDN}/html/${params.get("game")}/` + elem.attributes.src.value);
			let script2 = await script.text();
			elem.remove();
			scripts.push(script2);
		}
	}
	document.head.replaceWith(htmlDoc.head);
	document.body.replaceWith(htmlDoc.body);
	for (let i of scripts) {
		eval(i);
	}
}

fetch(`${userCDN}/html/test/index.html`)
	.then((text) => text.text())
	.then((html) => createGame(html));
