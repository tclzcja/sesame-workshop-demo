import ImportTemplateContentElement from "../import-template-content-element/import-template-content-element.js";

window.customElements.define(
	"widget-click-and-play",
	class extends ImportTemplateContentElement {
		constructor() {
			super();
		}

		connectedCallback() {
			super.connectedCallback();
			this.querySelector(":scope > main").addEventListener("click", () => {
				this.querySelector("audio").play();
				this.querySelector("main").classList.add("shaking");
			});
			this.querySelector(":scope > main").addEventListener("animationend", function () {
				this.classList.remove("shaking");
			});
		}
	}
);
