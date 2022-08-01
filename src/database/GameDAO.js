"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDAO = void 0;
var Game_1 = require("../models/Game");
var mysql = require("mysql");
var util = require("util");
require("dotenv/config");
var GameDAO = /** @class */ (function () {
    function GameDAO() {
        var environment = process.env.NODE_ENV;
        var host;
        var username;
        var password;
        var port;
        if (environment === 'development') {
            // local
            host = 'localhost';
            port = 3306;
            username = "root";
            password = "root";
        }
        else {
            // cloud
            host = process.env.HOST;
            port = Number(process.env.PORT);
            username = process.env.USERNAME;
            password = process.env.PASSWORD;
        }
        this.pool = mysql.createPool({
            host: host,
            user: username,
            password: password,
            port: port,
            database: 'cst_391'
        });
    }
    // GET
    // Route - ../service/games
    // Description - gets all games
    GameDAO.prototype.getAllGames = function (callback) {
        var games = [];
        try {
            this.pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function () {
                    var result1, x;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                connection.release();
                                if (err)
                                    throw err;
                                connection.query = util.promisify(connection.query);
                                return [4 /*yield*/, connection.query('SELECT * FROM games')];
                            case 1:
                                result1 = _a.sent();
                                for (x = 0; x < result1.length; ++x) {
                                    games.push(new Game_1.Game(result1[x].id, result1[x].cost, result1[x].genre, result1[x].title));
                                }
                                callback(games);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    // GET
    // Route - ../service/games/{gameID}
    // Description - gets a game
    GameDAO.prototype.getGame = function (callback, id) {
        var games = [];
        try {
            this.pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function () {
                    var result1, x;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                connection.release();
                                if (err)
                                    throw err;
                                connection.query = util.promisify(connection.query);
                                return [4 /*yield*/, connection.query('SELECT * FROM games WHERE ID=?', id)];
                            case 1:
                                result1 = _a.sent();
                                for (x = 0; x < result1.length; ++x) {
                                    games.push(new Game_1.Game(result1[x].id, result1[x].cost, result1[x].genre, result1[x].title));
                                }
                                callback(games);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    // PUT
    // Route - ../service/games/{gameID}
    // Description - updates a game
    GameDAO.prototype.updateGame = function (callback, game, id) {
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, data, result1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connection.release();
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            sql = "UPDATE `games` SET TITLE=?,GENRE=?,COST=? WHERE ID=?";
                            data = [game.title, game.genre, Number(game.cost), id];
                            return [4 /*yield*/, connection.query(sql, data)];
                        case 1:
                            result1 = _a.sent();
                            console.log('Rows affected:', result1.affectedRows);
                            callback(result1.affectedRows);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    // POST
    // Route - ../service/games
    // Description - creates a game
    GameDAO.prototype.createGame = function (callback, game) {
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connection.release();
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query("INSERT INTO `games`(`TITLE`, `GENRE`, `COST`) VALUES (?,?,?)", [game.title, game.genre, game.cost])];
                        case 1:
                            result1 = _a.sent();
                            if (result1 == undefined) {
                                callback(-1);
                            }
                            else {
                                callback(1);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    // DELETE
    // Route - ../service/games/{gameID}
    // Description - deletes a game
    GameDAO.prototype.deleteGame = function (callback, id) {
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, data, result1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connection.release();
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            sql = "DELETE FROM games WHERE ID=?";
                            data = [Number(id)];
                            return [4 /*yield*/, connection.query(sql, data)];
                        case 1:
                            result1 = _a.sent();
                            console.log('Rows affected:', result1.affectedRows);
                            callback(result1.affectedRows);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    return GameDAO;
}());
exports.GameDAO = GameDAO;
