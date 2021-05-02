import ImportTemplateContentElement from "../import-template-content-element/import-template-content-element.js";

window.customElements.define(
	"widget-video-player",
	class extends ImportTemplateContentElement {
		constructor() {
			super();
		}

		connectedCallback() {
			super.connectedCallback();
		}
	}
);
