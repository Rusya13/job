const form = document.getElementById("search");
const input = document.getElementById("searchInput");
const scramjet = new ScramjetController({
  prefix: "/job/",
  files: {
    wasm: "/scram/scramjet.wasm.wasm",
    shared: "/scram/scramjet.shared.js",
    worker: "/scram/scramjet.worker.js",
    client: "/scram/scramjet.client.js",
    sync: "/scram/scramjet.sync.js",
  },
});
//cba to make it a seperate files, sue me
function search(input, template) {
  try {
    return new URL(input).toString();
  } catch (err) {}

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {}

  return template.replace("%s", encodeURIComponent(input));
}
navigator.serviceWorker.register("/sw.js");
scramjet.init();

const connection = new BareMux.BareMuxConnection("/mux/worker.js");
let wispUrl =
  (location.protocol === "https:" ? "wss" : "ws") +
  "://" +
  location.host +
  "/wisp/";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    //registerSW()
  } catch (err){
    console.log(err)
  }  
 if ((await connection.getTransport()) !== "/yxope/index.mjs") {
    await connection.setTransport("/yxope/index.mjs", [{ wisp: wispUrl }]);
  }

  const url = search(input.value.trim(), "https://search.brave.com/search?q=")

  location.href = scramjet.encodeUrl(url);
});
