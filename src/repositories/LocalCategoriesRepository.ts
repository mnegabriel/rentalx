import Category from "../models/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository"


class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[]

    constructor() {
        this.categories = []
    }

    list(): Category[] {
        return this.categories
    }

    create({ name, description }: ICreateCategoryDTO) {
        const category = new Category()

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })

        this.categories.push(category)
    }

    findByName(name: string): Category {
        const selectedCategory = this.categories.find(category => category.name === name)

        return selectedCategory
    }
}

export default CategoriesRepository