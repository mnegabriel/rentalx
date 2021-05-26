import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email or password')
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email or password')
        }

        const token = sign({}, '1718616591071a595e39773de2659218', {
            subject: user.id,
            expiresIn: '1d'
        })

        const tokenResponse: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token
        }

        return tokenResponse
    }
}

export { AuthenticateUserUseCase }