import express from 'express';
import fs from 'fs';
import https from 'https';
import { createProxyMiddleware } from 'http-proxy-middleware';
import configuredOptions from '../options.json';
import { defaultOptions } from './defaultOptions';

const options = { ...defaultOptions, ...configuredOptions };
const httpsOptions = { "key": fs.readFileSync(configuredOptions.https.key), "cert": fs.readFileSync(configuredOptions.https.cert) };

const app = express();
const middlewareOptions = {
    router: (req: any) => {
        console.log(`Request URL: ${req.url}`);
        if (req.url && req.url.startsWith(options.target.match)) {
            return options.target.url;
        }
        return options.emrUrl;
    },
    secure: options.secure,
    logger: console,
    changeOrigin: options.changeOrigin
};

app.use(createProxyMiddleware(middlewareOptions));
const server = https.createServer(httpsOptions, app);
server.listen(options.port, () => {
    console.log(`Same Origin HTTPS Proxy listening on port ${options.port}`);
});