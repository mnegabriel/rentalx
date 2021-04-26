import { container } from "tsyringe"

import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

        try {
            await createSpecificationUseCase.execute({ name, description })
        }
        catch (err) { return res.status(409).json({ error: err.message }) }

        return res.status(201).send()
    }
}

export { CreateSpecificationController }