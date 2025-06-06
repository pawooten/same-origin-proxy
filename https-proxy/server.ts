import fs from "fs";
import httpProxy from "http-proxy";
import https from "https";

const httpsOptions = {
    key: fs.readFileSync("C:\\certificates\\localhost.key"),
    cert: fs.readFileSync("C:\\certificates\\localhost.crt"),
};

const targets = {
    fakeEmr: "https://localhost:4000",
    opw: "http://hyl-cpql6j3",
};

const port = 3001;
const proxyOptions = {
    ssl: httpsOptions,
    target: targets.fakeEmr,
    secure: false,
};
const proxy = httpProxy.createProxyServer(proxyOptions);
const server = https.createServer(httpsOptions, (req, res) => {
    console.log("Request received:", req.url, req.headers);
    proxy.web(req, res, { target: targets.fakeEmr }, (err) => {
        console.error("Proxy error:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Something went wrong while proxying the request.");
    });
});

server.listen(port, () => {
    console.log(`HTTPS Proxy to ${targets.fakeEmr} listening on port ${port}`);
});