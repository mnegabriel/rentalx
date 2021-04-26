
import { getRepository, Repository } from "typeorm";
import Specification from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>
    
    private constructor() {
        this.repository = getRepository(Specification)
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find()
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name, description
        })

        await this.repository.save(specification)
    }

    async findByNmae(name: string): Promise<Specification> {
        const selevtedSpecification = await this.repository.findOne({ name })

        return selevtedSpecification
    }
}

export { SpecificationsRepository }