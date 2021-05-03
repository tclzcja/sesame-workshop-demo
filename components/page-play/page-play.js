import "../widget-multiple-choices/widget-multiple-choices.js";
import "../widget-video-player/widget-video-player.js";
import "../widget-click-and-play/widget-click-and-play.js";
import "../widget-hotzone/widget-hotzone.js";
import "../widget-html5-game/widget-html5-game.js";

import ImportTemplateContentElement from "../import-template-content-element/import-template-content-element.js";

window.customElements.define(
	"page-play",
	class extends ImportTemplateContentElement {
		constructor() {
			super();
		}

		connectedCallback() {
			super.connectedCallback();
			this.querySelector("nav.next").addEventListener("click", (e) => this.next());
			this.querySelector("nav.prev").addEventListener("click", (e) => this.prev());
		}

		next() {
			const currentSection = this.querySelector(":scope > main > section.on");
			if (currentSection.nextElementSibling) {
				currentSection.classList.remove("on");
				currentSection.nextElementSibling.classList.add("on");
			}
		}

		prev() {
			const currentSection = this.querySelector(":scope > main > section.on");
			if (currentSection.previousElementSibling) {
				currentSection.classList.remove("on");
				currentSection.previousElementSibling.classList.add("on");
			}
		}
	}
);
