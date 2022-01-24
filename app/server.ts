/* app/server.ts */
require('dotenv').config()
// Import everything from express and assign it to the express variable
import express = require('express');
import exphbs = require('express-handlebars');
// Import WelcomeController from controllers entry point
import { IndexController } from './controllers';
import * as path from 'path';
import "reflect-metadata";
// Create a new express application instance

const app: express.Application = express();
// The port the express app will listen on
const port: number = 3000;
app.set('views', path.join(__dirname, "../app/views"));
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: 'hbs',
    helpers: path.join(__dirname,"../app/views/helpers"),
    layoutsDir: path.join(__dirname, "../app/views/layouts"),
    partialsDir: path.join(__dirname, "../app/views/partials")
}));
app.set('view engine', '.hbs')
app.use(express.static(path.join(path.join(__dirname, "../app/public"))))
// Mount the WelcomeController at the /welcome route
app.use('/index', IndexController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});