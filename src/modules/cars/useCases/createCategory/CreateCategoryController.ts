import { container } from "tsyringe"

import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        try {
            await createCategoryUseCase.execute({ name, description })
        }
        catch (err) { return res.status(409).json({ error: err.message }) }


        return res.status(201).send()
    }
}

export { CreateCategoryController }