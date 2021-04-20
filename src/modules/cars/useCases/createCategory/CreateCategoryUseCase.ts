import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    execute({ name, description }: IRequest) {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name)

        if (categoryAlreadyExists) {
            throw new Error("Category with this name already exists!")
        }

        this.categoriesRepository.create({ name, description })
    }
}

export default CreateCategoryUseCase