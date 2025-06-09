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
        if (req.url && req.url.startsWith('/PatientWindowDev')) {
            return 'http://hyl-cpql6j3';
        }
        return 'https://localhost:4000';
    },
    secure: false, // disable certificate verification since self-signed certificates are used
    logger: console,
    changeOrigin: true,
};

const proxy = createProxyMiddleware(middlewareOptions);
app.use(proxy);

const server = https.createServer(httpsOptions, app);
server.listen(port, () => {
    console.log(`HTTPS Server listening on port ${port}`);
});