import fs from 'fs'
import csvParse from 'csv-parse'
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository'

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file.path)

            const categories: IImportCategory[] = []

            const parseFile = csvParse()

            stream.pipe(parseFile)

            parseFile
                .on('data', async (line) => {
                    const [name, description] = line
                    categories.push({ name, description })
                })
                .on('end', () => resolve(categories))
                .on('error', (err) => reject(err))

        })

    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file)

        categories.forEach(async category => {
            const { name, description } = category

            const categoryExists = await this.categoriesRepository.findByName(name)

            if (!categoryExists) {
                await this.categoriesRepository.create({ name, description })
            }

        })

    }
}

export default ImportCategoriesUseCase