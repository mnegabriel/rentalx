import { Router } from 'express'

import CategoriesRepository from '../modules/cars/repositories/CategoriesRepository'
import CreateCategoryService from '../modules/cars/services/CreateCategoryService'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.get('/', (req, res) => res.json(categoriesRepository.list()))

categoriesRoutes.post('/', (req, res) => {
    const { name, description } = req.body

    const createCategoryService = new CreateCategoryService(categoriesRepository)
    try { createCategoryService.execute({ name, description }) }
    catch (err) { return res.status(409).json({ error: err.message }) }


    return res.status(201).send()
})

export default categoriesRoutes