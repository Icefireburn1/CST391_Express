"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
var port = process.env.port || 8080;
app_1.default.listen(port, function () {
    return console.log("server active on http://localhost:".concat(port));
});
