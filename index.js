import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 4009

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { messages } = req.body;
    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a very well educated british gentlemen."},
            ...messages // {role: "user", content: `${message}`},
        ],
        temperature: 0.7
    })
    res.json({
        completion: completion.data.choices[0].message
    })
    console.log(messages)
});

app.listen(port, () => {
    console.log(`Your app is listening at http://localhost:${port}`)
})
