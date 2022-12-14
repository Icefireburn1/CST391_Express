"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
// Starts application
const port = process.env.port || 8080;
app_1.default.listen(port, function () {
    return console.log(`server active on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map