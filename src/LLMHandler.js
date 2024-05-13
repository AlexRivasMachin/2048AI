import {config} from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "@langchain/core/prompts";

config();

function stringifyTablero(tablero) {
  return tablero.map(fila => fila.join(' ')).join('\n');
}

const schemaMovimiento = {
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
const schemaTablero = {
  "type": "object",
  "properties": {
    "tablero": {
      "type": "array",
      "items": {
        "type": "array",
        "minItems": 4,
        "maxItems": 4,
        "items": {
          "type": "integer"
        }
      },
      "minItems": 4,
      "maxItems": 4
    }
  },
  "required": ["tablero"]
};

const tableroObject = [
  [2, 0, 2, 0],
  [0, 4, 0, 0],
  [0, 0, 2, 0],
  [0, 0, 0, 2]
];
const tablero = stringifyTablero(tableroObject);

const model = new ChatGroq({
  temperature: 0,
  model: "llama3-70b-8192",
  //para ver los tokens de respuesta
  verbose: true
});

const chatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
   `Game goal is get 2048 tile combining in 4 directions in 4x4 board, each turn spawn new 2 or 4 tile 
    Each tile one integer, when moved they combine if same number or/and move, tiles moved recursively until board bound, tile in move direction move first
    Strategy: keep highest tile in a corner, trap high tiles in selected pivot direction while combine low tiles in other direction
    Examples
    Human: 4 0 0 0\n4 0 0 0\n4 0 0 0\n16 4 4 4 Incorrect:[up, right](bottom left corner loses high value), down(miss oportunity combine pivot row) Correct: left(high value remains corner and combine in pivot row) 
    answer: {{'move': 'Left'}}
    Human: 2 2 0 2\n0 0 0 0\n0 0 0 0\n32 16 2 0 Incorrect:up(high value row lose pivot), right(corner high value lose pivot), left(combine low values but miss oportunity to fill pivot row) Correct: down(fill pivot row) 
    answer: {{'move': 'Down'}}
    Answer best move in example format for given board, only the move`
  ],
  [
    "human", "{input}"
  ]
]);
//crear prompt que se usa en el primer mensaje sólo, pero como se le manda toda la memoria en verdad se manda en todos los mensajes

const chain = new LLMChain({ 
    llm: model,
    prompt: chatPrompt
 });


const res = await chain.invoke({ input: tablero });
const move = JSON.parse(res.text.replace(/'/g, '"'));
console.log(move);
const res2 = await chain.invoke({ input: tablero });
const move2 = JSON.parse(res2.text.replace(/'/g, '"'));
console.log(move2);
