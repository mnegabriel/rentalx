import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body

        try {
            await this.createCategoryUseCase.execute({ name, description })
        }
        catch (err) { return res.status(409).json({ error: err.message }) }


        return res.status(201).send()
    }
}

export { CreateCategoryController }