import { Router } from 'express'
import SpecificationsRepository from '../modules/cars/repositories/SpecificationsRepository'
import CreateSpecificationUseCase from '../modules/cars/useCases/createSpecification/CreateSpecificationUseCase'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.get('/', (req, res) => res.json(specificationsRepository.list()))

specificationsRoutes.post('/', (req, res) => {
    const { name, description } = req.body

    const CreateSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository)
    try { CreateSpecificationUseCase.execute({ name, description }) }
    catch (err) { return res.status(409).json({ error: err.message }) }

    return res.status(201).send()
})

export default specificationsRoutes