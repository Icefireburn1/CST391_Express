"use strict";
// service.ts file
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
var express_1 = require("express");
var GameDAO_1 = require("../database/GameDAO");
exports.ServiceRoute = (0, express_1.Router)();
var dao = new GameDAO_1.GameDAO();
// GET all games
exports.ServiceRoute.get('/games', function (req, res) {
    dao.getAllGames(function (result) {
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(204).send({ "ERROR": "No games found!" });
        }
    });
});
// GET single game by ID
exports.ServiceRoute.get('/games/:gameID', function (req, res) {
    dao.getGame(function (result) {
        if (result != undefined) {
            res.send(result);
        }
        else {
            res.status(204).send({ "ERROR": "No game found!" });
        }
    }, Number(req.params.gameID));
});
// PUT update a single game
exports.ServiceRoute.put('/games/:gameID', function (req, res) {
    dao.updateGame(function (result) {
        if (result > 0) {
            res.status(201).send({ "Result:": result.toString() + " row(s) were affected" });
        }
        else {
            res.status(500).send({ "ERROR": "Nothing got updated!" });
        }
    }, req.body, Number(req.params.gameID));
});
// DELETE a single game
exports.ServiceRoute.delete('/games/:gameID', function (req, res) {
    dao.deleteGame(function (result) {
        if (result > 0) {
            res.status(202).send({ "Result:": result.toString() + " row(s) were deleted" });
        }
        else {
            res.status(500).send({ "ERROR": "Nothing got deleted!" });
        }
    }, Number(req.params.gameID));
});
// POST a game
exports.ServiceRoute.post('/games', function (req, res) {
    dao.createGame(function (result) {
        if (result > 0) {
            res.status(201).send({ "Result:": req.body.title + " was created" });
        }
        else {
            res.status(500).send({ "ERROR": "Nothing got created!" });
        }
    }, req.body);
});
