import "../widget-multiple-choices/widget-multiple-choices.js";
import "../widget-video-player/widget-video-player.js";
import "../widget-click-and-play/widget-click-and-play.js";

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
