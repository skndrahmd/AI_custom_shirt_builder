import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/dalle.routes.js';

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/api/v1/dalle', router)


// Configure CORS options
const corsOptions = {
    origin: ['https://aicustomshirtbuilder.vercel.app', 'http://localhost:8080/api/v1/dalle'], // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow cookies to be sent
  };
  
  // Apply CORS middleware
app.use(cors(corsOptions));

app.get('/' , (req, res) => {
    res.status(200).json({message: "Hello from dalle"})
})

app.listen(8080, () => {
    console.log("server started at port 8080")
})