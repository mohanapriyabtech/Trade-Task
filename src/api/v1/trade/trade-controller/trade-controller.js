import axios from 'axios'
import {Trade} from '../../../../models/trade';
import { json } from 'sequelize';
import { responseHandler } from '../../../../utils/response-handler';
const fs = require('fs');
const readline = require('readline');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getAllTradeDetails = async (req, res, next) => {
    try {

        await Trade.deleteMany();
        const response = await axios.get('https://public.fyers.in/sym_details/NSE_FO.csv');
        const output = response.data.split('None\n');
        const trades = output.map((line) => {
        const array = line.split(',');
        const obj = array.reduce((acc, curr, index) => {
            acc[`key${index + 1}`] = curr;
            return acc;
        }, {});
        return new Trade(obj);
        });
        await Trade.insertMany(trades);
        res.json({ success: true, message: "Data saved successfully" });

    } catch (err) {
        responseHandler.errorResponse(res, 'Exception caught', err);
    }
}


export const getAllTrade = async (req, res, next) => {
    try {

        const stream = fs.createReadStream('https://public.fyers.in/sym_details/NSE_FO.csv');
        const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
        });

        rl.on('line', async (line) => {
        const array = line.split(',');
        const obj = array.reduce((acc, curr, index) => {
            acc[`key${index + 1}`] = curr;
            return acc;
        }, {});
        const trade = new Trade(obj);
        await trade.save();
        });

        rl.on('close', () => {
        console.log('finished');
        });

} catch (err) {
    responseHandler.errorResponse(res, 'Exception caught', err);
}
}


export const pagination = async (req, res, next) => {
    try {

        Trade.paginate({}, { page: req.query.page, limit: req.query.limit }, (err, result) => {
            if (err) {
            console.log(err);
            } else {
            console.log(result);
            res.json({ success: true, data:result,message: "pagination done successfully" });
            }
        });
    } catch (err) {
        responseHandler.errorResponse(res, 'Exception caught', err);
    }
}



export const search = async (req, res, next) => {
    try {
        const word = req.query.search
        const array = await Trade.find().exec()
        // const regex = new RegExp(`\\b${word}\\b`, "i");
        // console.log(regex)

        const regex = `/\b${word}\b/i`; 
        let results = [];

        array.forEach(obj => {
            Object.values(obj).forEach(key => {
                console.log(obj[key])
                if (regex.test(obj[key])) {
                results.push(obj);
                }
            });
        });

       console.log(results);
       
    } catch (err) {
        responseHandler.errorResponse(res, 'Exception caught', err);
    }
}

