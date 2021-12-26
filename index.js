const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const router = require('./routes/UserRoute.js')


const app = express()


var corsOptions = {
    origin: 'https://localhost:3000'
}

//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routers

app.use('/api/user', router)

//swagger
const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'CRUD API',
            version: '1.0.0',
            description: 'CRUD Api for practice nodejs and express and mysql and swagger',
            contact:{
                name: 'Aritra Jana',
                url:'https://aritra.com',
                email:'aritrajana069@gmail.com'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis:["./routes/*.js"]
}


const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//port
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})