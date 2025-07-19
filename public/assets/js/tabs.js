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
  page.id = tabId + "-f";
  page.style.display = "none";
  pageDisplay.appendChild(page);

  activateTab(tabId);

  console.log(activeTabs);
  newTab.addEventListener("click", () => activateTab(tabId));
  page.addEventListener("load", () => {
    //im very laazy so its jjust gonna stay like this
    console.log("wghat the flip");
    newTab.innerHTML = `<span>${page.contentDocument.title}</span>`;
  });
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
    page.style.display = page.id == tabId + "-f" ? "inline" : "none";
  });
}
function closeTab(tabId) {
  console.log(activeTabs);
  if (activeTabs.length <= 1) return;
  const currentTab = activeTabs.findIndex((tab) => tab.id === tabId);
  if (currentTab == null) return;
  activeTabs.splice(currentTab);
  document.getElementById(tabId).remove();
  //retarded way t do this but idc
  document.getElementById(tabId + "-f").remove();
}
addTab();
addTabButton.addEventListener("click", addTab);
