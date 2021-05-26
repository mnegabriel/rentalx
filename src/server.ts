import express from "express"
import 'express-async-errors'

import "./database"
import "./shared/container"

import routes from "./routes"
import swaggerUi from "swagger-ui-express"

import swaggerFile from "./swagger.json"
import { errorMiddleware } from "./middlewares/errorMiddleware"


const app = express()
const PORT = 3333

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`🎉 server running on port ${PORT}`))