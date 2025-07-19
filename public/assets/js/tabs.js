const tabContainer = document.querySelector(".tabContainer");
const pageDisplay = document.querySelector(".pageDisplay");
const addTabButton = document.getElementById("addTab");
let activeTabs = [];

function addTab() {
  const tabId = `tab-${activeTabs.length}`;
  activeTabs.push({ page: "home.html", id: tabId });

  const newTab = document.createElement("div");
  newTab.classList.add("tab");
  newTab.id = tabId;
  const title = document.createElement("span");
  title.innerText = "New Tab";
  newTab.appendChild(title);
  tabContainer.insertBefore(newTab, addTabButton);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close");
  closeButton.addEventListener("click", () => closeTab(tabId));
  closeButton.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>`;
  newTab.appendChild(closeButton);

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
    newTab.querySelector("span").innerText = page.contentDocument.title;
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
  console.log("aeahefh");
  if (activeTabs.length <= 1) return;
  const currentTab = activeTabs.findIndex((tab) => tab.id === tabId);
  if (currentTab == null) return;
  activeTabs.splice(currentTab, 1);
  document.getElementById(tabId).remove();
  //retarded way t do this but idc
  document.getElementById(tabId + "-f").remove();
}
addTab();
addTabButton.addEventListener("click", addTab);
