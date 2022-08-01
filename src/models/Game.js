"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(__id, __cost, __genre, __title) {
        this._id = -1;
        this._cost = 0.0;
        this._genre = "";
        this._title = "";
        this._id = __id;
        this._cost = __cost;
        this._genre = __genre;
        this._title = __title;
    }
    Object.defineProperty(Game.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "genre", {
        get: function () {
            return this._genre;
        },
        set: function (value) {
            this._genre = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "cost", {
        get: function () {
            return this._cost;
        },
        set: function (value) {
            this._cost = value;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
