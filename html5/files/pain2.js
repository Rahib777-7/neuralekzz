const userCDN = localStorage.getItem("cdn");

let htmlDoc;
let scripts;
let params = new URLSearchParams(window.location.search);

function error(text) {
	errorText = document.createElement("p");
	errorText.innerHTML = `Error: ${text}`;
	errorText.style = "color: red;font-size:20px;";
	document.body.appendChild(errorText);
}

async function createGame(html) {
	scripts = [];
	let parser = new DOMParser();
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

if (params.has("game")) {
	fetch(`${userCDN}/html/${params.get("game")}/index.html`)
		.then((text) => text.text())
		.then((html) => createGame(html));
} else {
	error("No game found in URL parameters!");
}
