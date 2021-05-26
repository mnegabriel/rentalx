import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}


export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            throw new AppError('Token missing', 401)
        }

        const [, token] = authHeader.split(' ')

        const decoded = verify(token, "1718616591071a595e39773de2659218") as IPayload

        const { sub: user_id } = decoded

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exist', 404)
        }

        req['user'] = user

        next()
    } catch (err) {

        throw new AppError('Invalid token', 401)
    }
}
