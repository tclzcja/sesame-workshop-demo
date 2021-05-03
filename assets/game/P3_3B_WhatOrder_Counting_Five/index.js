let draggingElement = null;
//
document.querySelector("body > img").src = "assets/" + window.DATA.titleImage;
document.querySelector("body > main > section:nth-of-type(1) > header > img").src = "assets/" + window.DATA.scene1.image;
document.querySelector("body > main > section:nth-of-type(2) > header > img").src = "assets/" + window.DATA.scene2.image;
document.querySelector("body > main > section:nth-of-type(3) > header > img").src = "assets/" + window.DATA.scene3.image;
document.querySelector("body > main > section:nth-of-type(4) > header > img").src = "assets/" + window.DATA.scene4.image;
document.querySelector("body > main > section:nth-of-type(1) > footer > audio").src = "assets/" + window.DATA.scene1.audio;
document.querySelector("body > main > section:nth-of-type(2) > footer > audio").src = "assets/" + window.DATA.scene2.audio;
document.querySelector("body > main > section:nth-of-type(3) > footer > audio").src = "assets/" + window.DATA.scene3.audio;
document.querySelector("body > main > section:nth-of-type(4) > footer > audio").src = "assets/" + window.DATA.scene4.audio;
document.querySelector("body > main > section:nth-of-type(1) > footer > div").innerHTML = window.DATA.scene1.text;
document.querySelector("body > main > section:nth-of-type(2) > footer > div").innerHTML = window.DATA.scene2.text;
document.querySelector("body > main > section:nth-of-type(3) > footer > div").innerHTML = window.DATA.scene3.text;
document.querySelector("body > main > section:nth-of-type(4) > footer > div").innerHTML = window.DATA.scene4.text;
//
document.querySelector("body > div.mask").addEventListener("click", function () {
	this.remove();
	document.querySelector("audio#whatstheorder").play();
});
document.querySelector("audio#whatstheorder").addEventListener("ended", function () {
	document.querySelector("body > img").classList.add("left");
	document.querySelector("body > main").classList.remove("right");
});
document.querySelector("audio#tryagain").addEventListener("ended", function () {
	for (let f of document.querySelectorAll("body > main > section > footer")) {
		f.removeAttribute("data-jump");
	}
});
document.querySelector("audio#greatjob").addEventListener("ended", function () {
	document.querySelector("body > main > nav").classList.add("on");
});
document.querySelector("body > main > nav > img#replay").addEventListener("click", function () {
	for (let f of document.querySelectorAll("body > main > section > footer")) {
		f.removeAttribute("data-jump");
	}
	document.querySelector("body > main > nav").classList.remove("on");
});
document.querySelector("body > main > nav > img#read").addEventListener("click", function () {
	document.querySelector('body > main > section > footer[data-index="1"] > audio').play();
	document.querySelector('body > main > section > footer[data-index="1"] > audio').addEventListener("ended", function () {
		document.querySelector('body > main > section > footer[data-index="2"] > audio').play();
		document.querySelector('body > main > section > footer[data-index="2"] > audio').addEventListener("ended", function () {
			document.querySelector('body > main > section > footer[data-index="3"] > audio').play();
			document.querySelector('body > main > section > footer[data-index="3"] > audio').addEventListener("ended", function () {
				document.querySelector('body > main > section > footer[data-index="4"] > audio').play();
			}, {
				once: true
			});
		}, {
			once: true
		});
	}, {
		once: true
	});
});
document.querySelector("body > main > section:nth-of-type(1) > footer").addEventListener("click", zoomFooter);
document.querySelector("body > main > section:nth-of-type(2) > footer").addEventListener("click", zoomFooter);
document.querySelector("body > main > section:nth-of-type(3) > footer").addEventListener("click", zoomFooter);
document.querySelector("body > main > section:nth-of-type(4) > footer").addEventListener("click", zoomFooter);
document.querySelector("body > main > section:nth-of-type(1) > footer").addEventListener("dragstart", dragStart);
document.querySelector("body > main > section:nth-of-type(2) > footer").addEventListener("dragstart", dragStart);
document.querySelector("body > main > section:nth-of-type(3) > footer").addEventListener("dragstart", dragStart);
document.querySelector("body > main > section:nth-of-type(4) > footer").addEventListener("dragstart", dragStart);
document.querySelector("body > main > section:nth-of-type(1) > header > div").addEventListener("dragover", dragOver);
document.querySelector("body > main > section:nth-of-type(2) > header > div").addEventListener("dragover", dragOver);
document.querySelector("body > main > section:nth-of-type(3) > header > div").addEventListener("dragover", dragOver);
document.querySelector("body > main > section:nth-of-type(4) > header > div").addEventListener("dragover", dragOver);
document.querySelector("body > main > section:nth-of-type(1) > header > div").addEventListener("drop", drop);
document.querySelector("body > main > section:nth-of-type(2) > header > div").addEventListener("drop", drop);
document.querySelector("body > main > section:nth-of-type(3) > header > div").addEventListener("drop", drop);
document.querySelector("body > main > section:nth-of-type(4) > header > div").addEventListener("drop", drop);
//
for (let i = 0; i < 10; i++) {
	let e1 = document.querySelector("body > main > section:nth-of-type(" + (Math.floor(Math.random() * 4) + 1) + ") > footer");
	let e2 = document.querySelector("body > main > section:nth-of-type(" + (Math.floor(Math.random() * 4) + 1) + ") > footer");
	let p1 = e1.parentElement;
	let p2 = e2.parentElement;
	p1.appendChild(e2);
	p2.appendChild(e1);
}

function zoomFooter() {
	this.classList.add("zoom");
	this.querySelector("audio").play();
	this.querySelector("audio").addEventListener("ended", () => {
		this.classList.remove("zoom");
	}, {
		once: true
	})
}

function dragStart(e) {
	e.dataTransfer.setData('index', this.getAttribute("data-index"));
	draggingElement = e.target;
}

function dragOver(e) {
	e.preventDefault();
}

function drop(e) {
	e.preventDefault();
	draggingElement.setAttribute("data-jump", this.getAttribute("data-index"));
	judge();
}

function judge() {
	let footers = document.querySelectorAll("body > main > section > footer");
	for (let f of footers) {
		if (!f.getAttribute("data-jump")) {
			return;
		}
	}
	for (let f of footers) {
		if (f.getAttribute("data-index") !== f.getAttribute("data-jump")) {
			document.querySelector("audio#tryagain").play();
			return;
		}
	}
	document.querySelector("audio#greatjob").play();
}