import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) { }

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByNmae(name)

        if (specificationAlreadyExists) throw new Error("Specification with this name already exists!")

        this.specificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }