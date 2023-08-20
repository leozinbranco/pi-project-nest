import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";


@Injectable()
export class RequestMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (Object.keys(req.body).length === 0) throw new BadRequestException('Erro: Você não pode enviar uma requisição sem corpo!'); 
        next();
    }
}