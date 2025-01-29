import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/dalle.routes.js';

dotenv.config();

const app = express();
// app.use(cors());
const corsOptions = {
    origin: ['https://aicustomshirtbuilder.vercel.app', 'https://aicustomshirtbuilder-3r7dnubw1-hamza-ahmed-sheikhs-projects.vercel.app'], 
    methods: ['GET', 'POST', 'OPTIONS'], // Ensure OPTIONS is allowed for preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true, // Allow cookies if needed
};

// Apply CORS before other middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests globally

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/api/v1/dalle', router)

app.get('/' , (req, res) => {
    res.status(200).json({message: "Hello from dalle"})
})

app.listen(8080, () => {
    console.log("server started at port 8080")
})