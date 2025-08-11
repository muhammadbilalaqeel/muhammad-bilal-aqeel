const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const PORT = process.env.PORT;
const taskRoutes = require('./routes/taskRoutes.js')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',taskRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});