import { container } from "tsyringe"

import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description } = req.body

            const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

            await createSpecificationUseCase.execute({ name, description })

            return res.status(201).send()
        }
        catch (err) { return res.status(409).json({ error: err.message }) }
    }
}

export { CreateSpecificationController }