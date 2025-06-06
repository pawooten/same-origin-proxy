import express from 'express';
import fs from 'fs';
import https from 'https';
import { createProxyMiddleware } from 'http-proxy-middleware';

const httpsOptions = {
    key: fs.readFileSync("C:\\certificates\\localhost.key"),
    cert: fs.readFileSync("C:\\certificates\\localhost.crt"),
};

const port = 3001;
const app = express();

const middlewareOptions = {
    router: (req: any) => {
        console.log(`Request URL: ${req.url}`);
        return 'https://github.com/pawooten';
    },
    logger: console,
    changeOrigin: true,
};

const proxy = createProxyMiddleware(middlewareOptions);
app.use(proxy);

const server = https.createServer(httpsOptions, app);
server.listen(port, () => {
    console.log(`HTTPS Server listening on port ${port}`);
});