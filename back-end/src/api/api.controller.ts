import express from "express";
import {CalculatorService} from "../service/calculator.service";
import {APIParams, APIRetValue} from "../types";

export class ApiController {
    static getRouter = () => {
        const router = express.Router();
        router.post('/', async (req, res) => {
            console.log('---- POST /api', req.body)
            const params: APIParams = req.body
            try {
                const value = await CalculatorService.process(params)
                const result: APIRetValue = {value}
                console.log('result=', result)
                res.json(result)
            } catch (err) {
                res.status(400).json({message: err});
            }
        })

        return router
    }
}


