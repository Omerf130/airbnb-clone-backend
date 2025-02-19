import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { reviewRoutes } from './api/review/review.routes.js'
import { stayRoutes } from './api/stay/stay.routes.js'
import { setupSocketAPI } from './services/socket.service.js'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
import { logger } from './services/logger.service.js'
import { orderRoutes } from './api/order/order.routes.js'

const app = express()
dotenv.config();
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

const corsOptions = {
    origin: [   'http://127.0.0.1:3000',
                'http://localhost:3000',
                'http://127.0.0.1:3031',
                'http://localhost:3031',
                'http://127.0.0.1:5173',
                'http://localhost:5173',
                'http://localhost:5174/air-bnb-full-stuck-project',
                'http://127.0.0.1:5174/air-bnb-full-stuck-project',
                'http://localhost:5174',
                'http://127.0.0.1:5174',
            ],
    credentials: true
}
app.use(cors(corsOptions))

app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/stay', stayRoutes)
app.use('/api/order', orderRoutes)

setupSocketAPI(server)

// Make every unhandled server-side-route match index.html
// so when requesting http://localhost:3030/unhandled-route... 
// it will still serve the index.html file
// and allow vue/react-router to take it from there

// app.get('/**', (req, res) => {
//     res.sendFile(path.resolve('public/index.html'))
// })

const port = process.env.PORT || 3031 //orig = 3030


server.listen(port, () => {
    logger.info('Server is running on port: ' + port)




})




//TODO: david
// 1. check async asyncLocalStorage - als.service
// 2. dont return nothing from the server once logout
