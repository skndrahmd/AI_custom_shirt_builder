import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router()

// CORS Options
const corsOptions = {
    origin: ['https://aicustomshirtbuilder.vercel.app', 'http://localhost:8080/api/v1/dalle'], // Replace with your frontend origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers
};

const config = new Configuration (
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
)
  
router.use(cors(corsOptions));

const openai = new OpenAIApi(config)

router.route('/').get((req, res) => {
    res.status(200).json({message:process.env.OPENAI_API_KEY })
} )

router.route('/').post( async (req, res) => {
    try{
        const { prompt } = req.body;

        const response = await openai.createImage({
            model: "dall-e-2",
            prompt, 
            n:1, 
            size:'1024x1024', 
            response_format: 'b64_json',            
        });

        const image = response.data.data[0].b64_json;

        res.status(200).json({ photo: image })

    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router