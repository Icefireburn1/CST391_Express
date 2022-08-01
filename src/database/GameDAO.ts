import { Game } from '../models/Game';

import * as mysql from "mysql";
import * as util from "util";
import 'dotenv/config'

export class GameDAO
{
    private pool: mysql.Pool;

    constructor()
    {
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
    public getAllGames(callback: any) {
        let games:Game[] = [];

        try {
            this.pool.getConnection(async function(err:any, connection:any) {
                connection.release();

                if (err) throw err;

                connection.query = util.promisify(connection.query);
                let result1 = await connection.query('SELECT * FROM games');
                for (let x =0; x < result1.length; ++x)
                {
                    games.push(new Game(result1[x].id, result1[x].cost, result1[x].genre, result1[x].title));
                }
    
                callback(games);
            });
        } catch (error) {
            console.log(error);
        }
    }

    // GET
    // Route - ../service/games/{gameID}
    // Description - gets a game
    public getGame(callback: any, id: number) {
        let games:Game[] = [];

        try {
            this.pool.getConnection(async function(err:any, connection:any) {
                connection.release();

                if (err) throw err;

                connection.query = util.promisify(connection.query);
                let result1 = await connection.query('SELECT * FROM games WHERE ID=?', id);
                for (let x =0; x < result1.length; ++x)
                {
                    games.push(new Game(result1[x].id, result1[x].cost, result1[x].genre, result1[x].title));
                }
    
                callback(games);
            });
        } catch (error) {
            console.log(error);
        }
    }

    // PUT
    // Route - ../service/games/{gameID}
    // Description - updates a game
    public updateGame(callback:any, game: Game, id: number)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            connection.query = util.promisify(connection.query);

            var sql = "UPDATE `games` SET TITLE=?,GENRE=?,COST=? WHERE ID=?";

            var data = [game.title, game.genre, Number(game.cost), id];

            let result1 = await connection.query(sql, data);

            console.log('Rows affected:', result1.affectedRows);

            callback(result1.affectedRows);
        });
    }

    // POST
    // Route - ../service/games
    // Description - creates a game
    public createGame(callback:any, game:Game)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("INSERT INTO `games`(`TITLE`, `GENRE`, `COST`) VALUES (?,?,?)", [game.title, game.genre, game.cost]);

            if (result1 == undefined) 
            {
                callback(-1);
            }
            else 
            {
                callback(1);
            }
            
        });
    }

    // DELETE
    // Route - ../service/games/{gameID}
    // Description - deletes a game
    public deleteGame(callback: any, id:number)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            connection.query = util.promisify(connection.query);

            var sql = "DELETE FROM games WHERE ID=?";

            var data = [Number(id)];

            let result1 = await connection.query(sql, data);

            console.log('Rows affected:', result1.affectedRows);

            callback(result1.affectedRows);
        });
    }
}