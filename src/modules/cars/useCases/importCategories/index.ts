import ImportCategoriesController from "./ImportCategoriesController";
import ImportCategoriesUseCase from "./ImportCategoriesUseCase";

const importCategoriesUseCase = new ImportCategoriesUseCase()
const importCategoriesController = new ImportCategoriesController(importCategoriesUseCase)

export default importCategoriesController