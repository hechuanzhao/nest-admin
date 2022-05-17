import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function logger (req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode 
    const logFormat = `-------------------------------------------------------
            RequestOriginal: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip} 
            StatusCode: ${statusCode}
            Params: ${JSON.stringify(req.params)}
            Query: ${JSON.stringify(req.body)}
            Body: ${JSON.stringify(req.body)}
            ------------------------------------------------------------------`

    next()

    if (statusCode >= 500) {
        Logger.error(logFormat)
    } else if ( statusCode >= 400) {
        Logger.warn(logFormat)
    } else {
        Logger.log(logFormat)
    }
}