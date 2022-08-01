"use strict";
// index.ts file
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var service_1 = require("./routes/service");
var bodyParser = require("body-parser");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.setRoutes();
    }
    App.prototype.setRoutes = function () {
        this.app.use(bodyParser.json());
        this.app.use('/service', service_1.ServiceRoute);
        this.app.get('/', function (req, res) { return res.send('Welcome to Node.js and TypeScript!'); });
        this.app.get('/file', function (req, res) {
            res.sendFile('index.html', { root: "CST391_Express/src/routes" });
        });
    };
    return App;
}());
exports.default = new App().app;
