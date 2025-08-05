"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const routes_1 = require("./routes");
const app = Express();
const start = async function () {
    await app.use(cors());
    await app.use(BodyParser.json());
    await app.use(routes_1.default);
    await app.use(BodyParser.json());
    try {
        await app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }
    catch (error) {
        console.log("Error starting server:", error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map