"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDAO = void 0;
const Game_1 = require("../models/Game");
const mysql = __importStar(require("mysql"));
const util = __importStar(require("util"));
require("dotenv/config");
class GameDAO {
    constructor() {
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
            host = process.env.DB_HOST;
            port = Number(process.env.DB_PORT);
            username = process.env.DB_USERNAME;
            password = process.env.DB_PASSWORD;
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
    getAllGames(callback) {
        let games = [];
        try {
            this.pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    connection.release();
                    if (err)
                        throw err;
                    connection.query = util.promisify(connection.query);
                    let result1 = yield connection.query('SELECT * FROM games');
                    for (let x = 0; x < result1.length; ++x) {
                        games.push(new Game_1.Game(result1[x].id, result1[x].cost, result1[x].genre, result1[x].title));
                    }
                    callback(games);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    // GET
    // Route - ../service/games/{gameID}
    // Description - gets a game
    getGame(callback, id) {
        let games = [];
        try {
            this.pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    connection.release();
                    if (err)
                        throw err;
                    connection.query = util.promisify(connection.query);
                    let result1 = yield connection.query('SELECT * FROM games WHERE ID=?', id);
                    for (let x = 0; x < result1.length; ++x) {
                        games.push(new Game_1.Game(result1[x].id, result1[x].cost, result1[x].genre, result1[x].title));
                    }
                    callback(games);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    // PUT
    // Route - ../service/games/{gameID}
    // Description - updates a game
    updateGame(callback, game, id) {
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                connection.release();
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                var sql = "UPDATE `games` SET TITLE=?,GENRE=?,COST=? WHERE ID=?";
                var data = [game.title, game.genre, Number(game.cost), id];
                let result1 = yield connection.query(sql, data);
                console.log('Rows affected:', result1.affectedRows);
                callback(result1.affectedRows);
            });
        });
    }
    // POST
    // Route - ../service/games
    // Description - creates a game
    createGame(callback, game) {
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                connection.release();
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result1 = yield connection.query("INSERT INTO `games`(`TITLE`, `GENRE`, `COST`) VALUES (?,?,?)", [game.title, game.genre, game.cost]);
                if (result1 == undefined) {
                    callback(-1);
                }
                else {
                    callback(1);
                }
            });
        });
    }
    // DELETE
    // Route - ../service/games/{gameID}
    // Description - deletes a game
    deleteGame(callback, id) {
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                connection.release();
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                var sql = "DELETE FROM games WHERE ID=?";
                var data = [Number(id)];
                let result1 = yield connection.query(sql, data);
                console.log('Rows affected:', result1.affectedRows);
                callback(result1.affectedRows);
            });
        });
    }
}
exports.GameDAO = GameDAO;
//# sourceMappingURL=GameDAO.js.map