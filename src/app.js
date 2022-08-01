"use strict";
// index.ts file
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const service_1 = require("./routes/service");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.setRoutes();
    }
    setRoutes() {
        this.app.use(bodyParser.json());
        this.app.use('/service', service_1.ServiceRoute);
        this.app.get('/', (req, res) => res.send('Welcome to Node.js and TypeScript!'));
        this.app.get('/file', (req, res) => {
            res.sendFile('index.html', { root: "CST391_Express/src/routes" });
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map