import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepository } from "../../repositories/implementations/UsersRepository"


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }

    async execute(data: ICreateUserDTO): Promise<void> {
        const { name, email, password, driver_license } = data

        const emailAlreadyExists = await this.usersRepository.findByEmail(email)

        if (emailAlreadyExists) throw new Error('User already exists')

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })
    }
}

export { CreateUserUseCase }