Array.prototype.deepEqual = function (target) {
	if (this.length !== target.length) {
		return false;
	}
	for (let i = 0; i < this.length; i++) {
		if (this[i] !== target[i]) {
			return false;
		}
	}
	return true;
};

window.customElements.define(
	"app-router",
	class extends HTMLElement {
		routerMap = new Map();
		previousPath = null;

		constructor() {
			super();
		}

		addRoute(pathKeyword, customElementTagName) {
			this.routerMap.set(pathKeyword, customElementTagName);
		}

		connectedCallback() {
			const observer = new window.MutationObserver(function (mutations) {
				for (let a of document.querySelectorAll("a:not([data-suppressed])")) {
					a.setAttribute("data-suppressed", "");
					a.addEventListener("click", function (e) {
						e.preventDefault();
						window.history.pushState(true, null, this.href);
						window.dispatchEvent(new Event("popstate"));
					});
				}
			});
			observer.observe(document, {
				attributes: false,
				childList: true,
				characterData: false,
				subtree: true
			});
			for (const route of this.querySelectorAll("app-route")) {
				this.routerMap.set(route.getAttribute("path"), route.getAttribute("element"));
				route.remove();
			}
			console.log(this.routerMap);
			window.addEventListener("popstate", (e) => {
				this.navigate();
			});
			// Deal with popstate event
			this.navigate();
		}

		navigate() {
			// If the new path is the same as the previous one then no page reloading is needed
			// Most likely a hashchange
			if (this.previousPath === window.location.pathname) {
				return true;
			}
			let tagName = null;
			let keys = this.routerMap.keys();
			for (let k of keys) {
				if (window.location.pathname.includes(k)) {
					tagName = this.routerMap.get(k);
				}
				// if (k.split("/").deepEqual(window.location.pathname.replace("index.html", "").split("/"))) {
				// 	tagName = this.routerMap.get(k);
				// }
			}
			if (tagName) {
				window.scroll(0, 0);
				this.previousPath = window.location.pathname;
				const page = this.querySelector(":scope > :not(app-route)");
				if (page) {
					page.remove();
				}
				this.appendChild(new (window.customElements.get(tagName))());
			}
		}

		go(path) {
			window.history.pushState(true, null, path);
			window.dispatchEvent(new Event("popstate"));
		}
	}
);

window.customElements.define(
	"app-route",
	class extends HTMLElement {
		constructor() {
			super();
		}
	}
);
