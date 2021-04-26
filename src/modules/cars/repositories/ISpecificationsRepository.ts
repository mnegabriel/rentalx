import Specification from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    list(): Promise<Specification[]>

    create({ name, description }: ICreateSpecificationDTO): Promise<void>

    findByNmae(name: string): Promise<Specification>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }