import ImportTemplateContentElement from "../import-template-content-element/import-template-content-element.js";

window.customElements.define(
	"page-play",
	class extends ImportTemplateContentElement {
		constructor() {
			super();
		}

		connectedCallback() {
			super.connectedCallback();
		}
	}
);
