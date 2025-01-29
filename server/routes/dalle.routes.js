import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router()

// CORS Options
const corsOptions = {
    origin: ['https://aicustomshirtbuilder.vercel.app', "https://aicustomshirtbuilder-3r7dnubw1-hamza-ahmed-sheikhs-projects.vercel.app"], 
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Ensure preflight handling for API routes
router.use(cors(corsOptions));
router.options('*', cors(corsOptions)); 

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