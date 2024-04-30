// Antes de ejecutarlo hay que poner export GROQ_API_KEY=laAPIKeydeGroq
import { config } from 'dotenv';
config();

import fs from 'fs';
import  Groq from 'groq-sdk';

const groq = new Groq();
const schema = {
    $defs: {
        Movement: {
            type: "string",
            enum: ["up", "down", "left", "right"],
        }
    },
    properties: {
        movement: {
            $ref: "#/$defs/Movement",
        }
    },
    required: ["movement"],
    type: "object"
};

async function getMovement() {
    let jsonSchema = JSON.stringify(schema, null, 4);
    
    const chat_completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are a 2048 game that outputs movements in JSON.\n'The JSON object must use the schema: ${jsonSchema}`
            },
            {
                role: "user",
                content: `Given the current state of the 2048 game board
2 0 2 0
0 4 0 0
0 0 2 0
0 0 0 2
What would be the best next move`
            }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0,
        stream: false,
        response_format: {
            type: "json_object"
        }
    });
    return JSON.parse(chat_completion.choices[0].message.content);
}

async function main() {
    const movement = await getMovement();
    const movementJson = JSON.stringify(movement, null, 2);

    fs.writeFile('movement.json', movementJson, (err) => {
        if (err) throw err;
        console.log('El movimiento se ha guardado en el archivo movement.json');
    });
}

main();
