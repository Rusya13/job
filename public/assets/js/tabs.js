const tabContainer = document.querySelector(".tabContainer");
const pageDisplay = document.querySelector(".pageDisplay");
const addTabButton = document.getElementById("addTab");
let activeTabs = [];

function addTab() {
	const tabId = `tab-${activeTabs.length}`;
	activeTabs.push({ page: "home.html", id: tabId });

	const newTab = document.createElement("div");
	newTab.classList.add("tab");
	newTab.innerHTML = "<span>New tab</span>";
	newTab.id = tabId;
	tabContainer.insertBefore(newTab, addTabButton);

	const page = document.createElement("iframe");
	page.src = "home.html";
	page.id = tabId;
	page.style.display = "none";
	pageDisplay.appendChild(page);

	activateTab(tabId);

	console.log(activeTabs);
	newTab.addEventListener("click", () => activateTab(tabId));
}
function activateTab(tabId) {
	const tabs = tabContainer.querySelectorAll(".tab");
	const iframes = pageDisplay.querySelectorAll("iframe");
	tabs.forEach((tab) => {
		if (tab.id === tabId) {
			tab.classList.add("active");
		} else {
			tab.classList.remove("active");
		}
	});
	iframes.forEach((page) => {
		page.style.display = page.id == tabId ? "inline" : "none";
	});
}
addTab();
addTabButton.addEventListener("click", addTab);
