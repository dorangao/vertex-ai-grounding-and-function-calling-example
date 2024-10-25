// Example: Using Node.js for Google Vertex AI Grounding and Function Calling

// Load required libraries
const {VertexAI} = require('@google-cloud/vertexai');
require('dotenv').config();

const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION;

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION});
const model = 'gemini-1.5-flash-002';

// Instantiate the generative model
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
        maxOutputTokens: 8192,
        temperature: 1,
        topP: 0.95,
    },
    safetySettings: [
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'OFF',
        },
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'OFF',
        },
        {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'OFF',
        },
        {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'OFF',
        }
    ],
    tools: [
        {
            googleSearchRetrieval: {},
        },
    ],
});

const chat = generativeModel.startChat({});

async function sendMessage(message) {
    const streamResult = await chat.sendMessageStream(message);
    process.stdout.write('stream result: ' + JSON.stringify((await streamResult.response).candidates[0].content) + '\n');
}

async function generateContent() {
    await sendMessage([
        { text: 'what the weather in morgan hill' }
    ]);
}

generateContent();
