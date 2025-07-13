import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import wisp from "wisp-server-node";
import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
app.use(express.static(join(fileURLToPath(import.meta.url), "../public/")));
app.use("/vu/", express.static(uvPath));
app.use("/mux/", express.static(baremuxPath));
app.use("/yxope/", express.static(epoxyPath));

const server = createServer();

server.on("request", (req, res) => {
	app(req, res);
});
server.on("upgrade", (req, socket, head) => {
	if (req.url.endsWith("/wisp/")) {
		wisp.routeRequest(req, socket, head);
	} else {
		socket.end();
	}
});

server.listen(80, () => {
	console.log("running on port 80");
	console.log("http://localhost")
});
