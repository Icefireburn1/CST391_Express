"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(__id, __cost, __genre, __title) {
        this._id = -1;
        this._cost = 0.0;
        this._genre = "";
        this._title = "";
        this._id = __id;
        this._cost = __cost;
        this._genre = __genre;
        this._title = __title;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get genre() {
        return this._genre;
    }
    set genre(value) {
        this._genre = value;
    }
    get cost() {
        return this._cost;
    }
    set cost(value) {
        this._cost = value;
    }
}
exports.Game = Game;
