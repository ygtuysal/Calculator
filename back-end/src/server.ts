import express from 'express'
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import {ApiController} from "./api/api.controller";

const bootstrap = async () => {
    const app = express()
    dotenv.config( { debug: true } );
    let PORT: number = 0;
    if (process.env.PORT) {
        PORT = Number.parseInt(process.env.PORT || "", 10);
    }
    const HOST = process.env.HOST || "";

    app.set("port", PORT);

    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    const httpServer = http.createServer(app);

    app.use("/api", ApiController.getRouter());

    httpServer.listen(PORT, HOST, () => {
        console.log(`listening ${HOST}:${PORT}`);
    });

}

void bootstrap()