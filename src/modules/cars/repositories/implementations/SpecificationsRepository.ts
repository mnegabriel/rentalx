
import Specification from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[]

    private static INSTANCE: SpecificationsRepository

    private constructor() {
        this.specifications = []
    }

    public static getInstance() {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository()
        }
        return SpecificationsRepository.INSTANCE
    }

    list(): Specification[] {
        return this.specifications
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification()

        Object.assign(specification, { name, description, created_at: new Date() })

        this.specifications.push(specification)
    }

    findByNmae(name: string): Specification {
        const selevtedSpecification = this.specifications.find(specification => specification.name === name)

        return selevtedSpecification
    }
}

export default SpecificationsRepository