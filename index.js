const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./src/routes")
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require("path");

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Pool Nest APIs', // Specify the API title
            version: '1.0.0', // Specify the API version
        },
        servers: [{ url: "http://localhost:3001" }]
    },
    apis: ['./src/routes/*.js'], // Specify the file(s) that contain your API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);


app.use(cors());
app.options("*", cors());
app.use(cors({ origin: true }));
app.use(helmet());
app.use(express.json());

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});



// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes)
app.use("/assets", express.static(path.join(__dirname, path.join("src/uploads"))));

app.use((req, res, next) => {
    res.status(404).send("NOT FOUND")
});

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log("server running on ", port)
});

