import { inject, injectable } from "tsyringe"

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByNmae(name)

        if (specificationAlreadyExists) throw new Error("Specification with this name already exists!")

        this.specificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }