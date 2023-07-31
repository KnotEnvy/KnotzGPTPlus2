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

let systemPrompt = "You are a very well educated british gentlemen.";

app.post("/save-context", (req, res) => {
    const { systemPrompt: newSystemPrompt } = req.body;
    
    // Update system prompt
    systemPrompt = newSystemPrompt;
    
    res.json({
        message: "System prompt updated successfully"
    });
});

app.post("/", async (req, res) => {
    const { messages, temperature, tokenCount } = req.body;
    
     // Log values received by server
     console.log(`Received temperature: ${temperature}, tokenCount: ${tokenCount}`);
     
     const completion = await openai.createChatCompletion({
         model: "gpt-3.5-turbo",
         messages: [
             {role: "system", content: systemPrompt},
             ...messages
         ],
         temperature,
         max_tokens: tokenCount
     })
     res.json({
         completion: completion.data.choices[0].message
     })
     console.log(messages)
});


app.listen(port, () => {
    console.log(`Your app is listening at http://localhost:${port}`)
})
