// index.ts file

import express = require('express');
import {ServiceRoute} from './routes/service';
import bodyParser = require('body-parser');

class App {
  public app

  constructor () {
    this.app = express()
    this.setRoutes();
  }

  // Setup our routes
  setRoutes(){
    this.app.use(bodyParser.json());
    this.app.use('/service', ServiceRoute);
    this.app.get('/', (req, res) => res.send('Welcome to Node.js and TypeScript!'));
    this.app.get('/file', (req, res) => {
        res.sendFile('index.html', { root : "CST391_Express/src/routes" });
    })
  }
}

export default new App().app