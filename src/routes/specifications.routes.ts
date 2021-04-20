import { Router } from 'express'
import { createSpecificationController } from '../modules/cars/useCases/createSpecification'
import { listSpecificationsController } from '../modules/cars/useCases/listSpecificationsController'

const specificationsRoutes = Router()

specificationsRoutes.get('/', (req, res) => {
    return listSpecificationsController.handle(req, res)
})

specificationsRoutes.post('/', (req, res) => {
    return createSpecificationController.handle(req, res)
})

export default specificationsRoutes