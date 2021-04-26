import express from "express"

import "./database"
import "./shared/container"

import routes from "./routes"
import swaggerUi from "swagger-ui-express"

import swaggerFile from "./swagger.json"




const app = express()
const PORT = 3333

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.listen(PORT, () => console.log(`🎉 server running on port ${PORT}`))