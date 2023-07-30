import dotenv from 'dotenv';
dotenv.config();
const openAiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${process.env.OPENAI_API_KEY}'
}

async function createEmbedding(textToEmded) {
    let response = await fetch(`https://api.openai.com/v1/embeddings`, {
        method: 'POST',
        headers: openAiHeaders,
        body: JSON.stringify({
            'model': 'text-embedding-ada-002',
            'input': textToEmded
        }),
    });
    if (response.ok){
        response.json().then(data => {
            console.log(data);
            return data;
        });
    }
}

createEmbedding()