"use strict";
// service.ts file
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = require("express");
const GameDAO_1 = require("../database/GameDAO");
exports.ServiceRoute = (0, express_1.Router)();
const dao = new GameDAO_1.GameDAO("localhost", 3306, "root", "root");
exports.ServiceRoute.get('/', (req, res) => {
    res.send("IT WORKS");
});
exports.ServiceRoute.get('/games', (req, res) => {
    dao.getAllGames((result) => {
        res.send(result.title);
    });
});
