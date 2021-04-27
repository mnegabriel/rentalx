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
        const { name, username, email, password, driver_license } = data

        await this.usersRepository.create({ name, username, email, password, driver_license })
    }
}

export { CreateUserUseCase }