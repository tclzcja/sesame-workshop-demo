let audioPlaying = false;
let currentMain = null;
HTMLElement.prototype.addEventListenerOnce = function (event, handler) {
    this.addEventListener(event, handler, {
        once: true
    });
};
document.querySelector("body > header").style.backgroundImage = "url(assets/" + window.DATA.start.image + ")";
document.querySelector("body > footer").style.backgroundImage = "url(assets/" + window.DATA.end.image + ")";
document.querySelector("audio#start").src = "assets/" + window.DATA.start.audio;
document.querySelector("audio#end").src = "assets/" + window.DATA.end.audio;
document.querySelector("body > div#mask").addEventListener("click", function () {
    playHeader();
    this.remove();
});
for (const scene of window.DATA.scenes) {
    scene.letter = scene.letter.toLowerCase();
    const main = document.importNode(document.querySelector("body > template").content, true);
    main.querySelector("header > main").innerHTML = scene.letter.toUpperCase();
    main.querySelector("header > audio").src = "letter-" + scene.letter + ".mp3";
    main.querySelector("header").addEventListener("click", headerClick);
    //
    main.querySelector("footer > section:nth-of-type(1) > main > img").src = "assets/" + scene.image1.file;
    main.querySelector("footer > section:nth-of-type(1) > audio").src = "assets/" + scene.image1.audio;
    main.querySelector("footer > section:nth-of-type(1)").setAttribute("data-correct", scene.image1.correct ? 1 : 0);
    main.querySelector("footer > section:nth-of-type(1) > main").style.backgroundColor = "#4AB4F9";
    main.querySelector("footer > section:nth-of-type(1)").addEventListener("click", footerClick);
    main.querySelector("footer > section:nth-of-type(2) > main > img").src = "assets/" + scene.image2.file;
    main.querySelector("footer > section:nth-of-type(2) > audio").src = "assets/" + scene.image2.audio;
    main.querySelector("footer > section:nth-of-type(2)").setAttribute("data-correct", scene.image2.correct ? 1 : 0);
    main.querySelector("footer > section:nth-of-type(2) > main").style.backgroundColor = "#FBFB48";
    main.querySelector("footer > section:nth-of-type(2)").addEventListener("click", footerClick);
    main.querySelector("footer > section:nth-of-type(3) > main > img").src = "assets/" + scene.image3.file;
    main.querySelector("footer > section:nth-of-type(3) > audio").src = "assets/" + scene.image3.audio;
    main.querySelector("footer > section:nth-of-type(3)").setAttribute("data-correct", scene.image3.correct ? 1 : 0);
    main.querySelector("footer > section:nth-of-type(3) > main").style.backgroundColor = "#CF78F5";
    main.querySelector("footer > section:nth-of-type(3)").addEventListener("click", footerClick);
    main.querySelector("footer > section:nth-of-type(4) > main > img").src = "assets/" + scene.image4.file;
    main.querySelector("footer > section:nth-of-type(4) > audio").src = "assets/" + scene.image4.audio;
    main.querySelector("footer > section:nth-of-type(4)").setAttribute("data-correct", scene.image4.correct ? 1 : 0);
    main.querySelector("footer > section:nth-of-type(4) > main").style.backgroundColor = "#15EA3F";
    main.querySelector("footer > section:nth-of-type(4)").addEventListener("click", footerClick);
    //
    document.body.appendChild(main);
    shuffleSections(document.querySelector("body > main:last-of-type > footer"));
}

function playHeader() {
    document.querySelector("body > header").classList.remove("out");
    document.querySelector("audio#start").play();
    document.querySelector("audio#start").addEventListenerOnce("ended", function () {
        document.querySelector("body > header").classList.add("done");
        playMain(true);
    });
}

function playMain(first) {
    currentMain = document.querySelector("body > main.out");
    if (currentMain) {
        currentMain.classList.remove("out");
        if (!first) {
            document.querySelector("audio#start").play();
        }
    } else {
        document.querySelector("body > footer").classList.remove("out");
        document.querySelector("audio#end").play();
        document.querySelector("audio#end").addEventListener("ended", function () {
            document.querySelector("div#copyright").classList.add("on");
        });
    }
}

function shuffleSections(parentNode) {
    for (let i = 0; i < 5; i++) {
        parentNode.append(parentNode.children[Math.floor(Math.random() * 3)]);
    }
}

function headerClick() {
    if (audioPlaying) {
        return;
    }
    audioPlaying = true;
    currentMain.querySelector(":scope > header > aside").classList.add("on");
    currentMain.querySelector(":scope > header > audio").play();
    currentMain.querySelector(":scope > header > audio").addEventListenerOnce("ended", function () {
        tellCorrect();
    });
    tellLine();
}

function footerClick() {
    if (audioPlaying) {
        return;
    }
    audioPlaying = true;
    if (currentMain.querySelector(":scope > footer > section > aside.on")) {
        currentMain.querySelector(":scope > footer > section > aside.on").classList.remove("on");
    }
    this.querySelector("aside").classList.add("on");
    this.querySelector("audio").play();
    this.querySelector("audio").addEventListenerOnce("ended", function () {
        tellCorrect();
    });
    tellLine();
}

function tellLine() {
    if (!currentMain) {
        return;
    }
    if (!currentMain.querySelector(":scope > header > aside.on")) {
        return;
    }
    if (!currentMain.querySelector(":scope > footer > section > aside.on")) {
        return;
    }
    //
    const line = currentMain.querySelector("svg > line");
    //
    const headerAsideRect = currentMain.querySelector(":scope > header > aside").getBoundingClientRect();
    line.setAttribute("x1", headerAsideRect.left + 15);
    line.setAttribute("y1", headerAsideRect.top + 15);
    //
    const footerAsideRect = currentMain.querySelector(":scope > footer > section > aside.on").getBoundingClientRect();
    line.setAttribute("x2", footerAsideRect.left + 15);
    line.setAttribute("y2", footerAsideRect.top + 15);
    //
    line.classList.add("on");
    //
    if (currentMain.querySelector(":scope > footer > section > aside.on").parentNode.getAttribute("data-correct") === "1") {
        currentMain.classList.add("correct");
    }
}

function tellCorrect() {
    if (!currentMain) {
        audioPlaying = false;
        return;
    }
    if (!currentMain.querySelector(":scope > header > aside.on")) {
        audioPlaying = false;
        return;
    }
    if (!currentMain.querySelector(":scope > footer > section > aside.on")) {
        audioPlaying = false;
        return;
    }

    if (currentMain.querySelector(":scope > footer > section > aside.on").parentNode.getAttribute("data-correct") === "1") {
        document.querySelector("audio#good-job").play();
        document.querySelector("audio#good-job").addEventListenerOnce("ended", function () {
            currentMain.classList.add("done");
            currentMain.addEventListener("transitionend", function () {
                audioPlaying = false;
                currentMain.remove();
                playMain();
            });
        });
    } else {
        document.querySelector("audio#try-again").play();
        document.querySelector("audio#try-again").addEventListenerOnce("ended", function () {
            audioPlaying = false;
            currentMain.querySelector(":scope > header > aside.on").classList.remove("on");
            currentMain.querySelector(":scope > footer > section > aside.on").classList.remove("on");
            currentMain.querySelector(":scope > svg > line").classList.remove("on");
        });
    }
}
window.addEventListener("resize", tellLine);