const { VertexAI, FunctionDeclarationSchemaType } = require('@google-cloud/vertexai');
require('dotenv').config();

const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION;

const functionDeclarations = [
    {
        function_declarations: [
            {
                name: 'get_current_weather',
                description: 'get weather in a given location',
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        location: { type: FunctionDeclarationSchemaType.STRING },
                        unit: {
                            type: FunctionDeclarationSchemaType.STRING,
                            enum: ['celsius', 'fahrenheit'],
                        },
                    },
                    required: ['location'],
                },
            },
        ],
    },
];

async function get_current_weather(location, unit = 'celsius') {
    return { weather: 'super nice, 79 Fahrenheit degrees' };
}

async function functionCallingBasic(
    projectId = PROJECT_ID,
    location = LOCATION,
    model = 'gemini-1.5-pro-002'
) {
    const vertexAI = new VertexAI({ project: projectId, location: location });
    const generativeModel = vertexAI.preview.getGenerativeModel({ model: model });

    const request = {
        contents: [{ role: 'user', parts: [{ text: 'What is the weather in Boston?' }] }],
        tools: functionDeclarations,
    };
    const result = await generativeModel.generateContent(request);
    console.log(JSON.stringify(result.response.candidates[0].content));

    const functionResponseParts = [
        {
            functionResponse: {
                name: 'get_current_weather',
                response: { name: 'get_current_weather', content: JSON.stringify({ weather: 'super nice' }) },
            },
        },
    ];

    const request2 = {
        contents: [
            { role: 'user', parts: [{ text: 'What is the weather in Boston?' }] },
            { role: 'model', parts: [{ functionCall: { name: 'get_current_weather', args: { location: 'Boston' } } }] },
            { role: 'user', parts: functionResponseParts },
        ],
        tools: functionDeclarations,
    };

    console.log('functionResponseParts:', JSON.stringify(functionResponseParts));
    console.log('function declarations:', JSON.stringify(functionDeclarations));

    const result2 = await generativeModel.generateContent(request2);
    console.log(JSON.stringify(result2.response.candidates[0].content));
}

functionCallingBasic();