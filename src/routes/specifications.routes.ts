import { Router } from 'express'
import SpecificationsRepository from '../modules/cars/repositories/SpecificationsRepository'
import CreateSpecificationService from '../modules/cars/services/CreateSpecificationService'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.get('/', (req, res) => res.json(specificationsRepository.list()))

specificationsRoutes.post('/', (req, res) => {
    const { name, description } = req.body

    const createSpecificationService = new CreateSpecificationService(specificationsRepository)
    try { createSpecificationService.execute({ name, description }) }
    catch (err) { return res.status(409).json({ error: err.message }) }

    return res.status(201).send()
})

export default specificationsRoutes