const userCDN = localStorage.getItem("cdn");

let htmlDoc;
let scripts = [];
let params = new URLSearchParams(window.location.search);

function error(text) {
	errorText = document.createElement("p");
	errorText.innerHTML = `Error: ${text}`;
	errorText.style = "color: red;font-size:20px;";
	document.body.appendChild(errorText);
}

async function createGame(html) {
	let parser = new DOMParser();
	htmlDoc = parser.parseFromString(html, "text/html");
	for (let elem of htmlDoc.querySelectorAll("script[type^=text], script:not([type])")) {
		if (elem.hasAttribute("src")) {
			if (new RegExp("^(http|https|data)://.").test(elem.attributes.src.value)) {
				let script = await fetch(elem.attributes.src.value);
				let script2 = await script.text();
				elem.remove();
				scripts.push(script2);
			} else {
				let script = await fetch(`${userCDN}/html/${params.get("game")}/` + elem.attributes.src.value);
				let script2 = await script.text();
				elem.remove();
				scripts.push(script2);
			}
		} else {
			scripts.push(elem.innerHTML);
		}
	}
	document.head.replaceWith(htmlDoc.head);
	document.body.replaceWith(htmlDoc.body);
	for (script of scripts) {
		createdScript = document.createElement("script");
		createdScript.text = script;
		document.head.appendChild(createdScript).parentNode.removeChild(createdScript); /* Thanks JQuery! */
	}
}

if (params.has("game")) {
	fetch(`${userCDN}/html/${params.get("game")}/index.html`)
		.then((text) => text.text())
		.then((html) => createGame(html));
} else {
	error("No game found in URL parameters!");
}
