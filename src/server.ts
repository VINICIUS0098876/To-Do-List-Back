import Express = require("express");
import cors = require("cors");
import BodyParser = require("body-parser");
import routes from './routes';

const app = Express();

const start = async function(){
    await app.use(cors());
    await app.use(BodyParser.json());
    await app.use(routes);
    await app.use(BodyParser.json());

    try {
        await app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    } catch (error) {
        console.log("Error starting server:", error);
        process.exit(1);
    }
}

start();