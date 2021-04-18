import Specification from "../models/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    list(): Specification[]
    create({ name, description }: ICreateSpecificationDTO): void
    findByNmae(name: string): Specification
}

export { ISpecificationsRepository, ICreateSpecificationDTO }