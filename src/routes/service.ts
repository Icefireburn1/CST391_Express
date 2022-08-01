
// service.ts file

import { Router } from 'express';
import { GameDAO } from '../database/GameDAO';
import { Game } from '../models/Game';

export const ServiceRoute = Router();

const dao = new GameDAO();

// GET all games
ServiceRoute.get('/games', (req, res) => {
    dao.getAllGames((result:any) => {
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(204).send({"ERROR": "No games found!"})
        }
        
    });
});

// GET single game by ID
ServiceRoute.get('/games/:gameID', (req, res) => {
    dao.getGame((result:Game) => {
        if (result != undefined) {
            res.send(result);
        }
        else {
            res.status(204).send({"ERROR": "No game found!"})
        }
        
    }, Number(req.params.gameID));
});

// PUT update a single game
ServiceRoute.put('/games/:gameID', (req, res) => {
    dao.updateGame((result:number) => {
        if (result > 0) {
            res.status(201).send({"Result:": result.toString() + " row(s) were affected"});
        }
        else {
            res.status(500).send({"ERROR": "Nothing got updated!"});
        }
    }, req.body, Number(req.params.gameID));
});

// DELETE a single game
ServiceRoute.delete('/games/:gameID', (req, res) => {
    dao.deleteGame((result:number) => {
        if (result > 0) {
            res.status(202).send({"Result:": result.toString() + " row(s) were deleted"});
        }
        else {
            res.status(500).send({"ERROR": "Nothing got deleted!"});
        }
    }, Number(req.params.gameID));
});

// POST a game
ServiceRoute.post('/games', (req, res) => {
    dao.createGame((result:number) => {
        if (result > 0) {
            res.status(201).send({"Result:": req.body.title + " was created"});
        }
        else {
            res.status(500).send({"ERROR": "Nothing got created!"});
        }
    }, req.body);
});