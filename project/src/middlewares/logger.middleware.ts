import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

// middleware funcional 
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
}

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {
//         console.log("Request...");
//         next();
//     }
// }
