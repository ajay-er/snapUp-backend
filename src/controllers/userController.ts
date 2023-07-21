import asyncErrorHandler from "../utils/asyncErrorHandler";
import { Request, Response } from 'express';

export const profile = asyncErrorHandler(async (req:Request,res:Response) => {
    
    
    res.status(200).json({
        status: 'success',
    })
})