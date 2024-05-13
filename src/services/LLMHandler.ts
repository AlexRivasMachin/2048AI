import {config} from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "@langchain/core/prompts";

config({path:"../../.env"});
/*
Ejemplo de movimiento:
{
  "movement": "Left"
}
const schemaMovimiento = {
  $defs: {
      Movement: {
          type: "string",
          enum: ["Up", "Down", "Left", "Right"],
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
*/

/*
Ejemplo de tablero:
const tableroObject = [
  [2, 0, 2, 0],
  [0, 4, 0, 0],
  [0, 0, 2, 0],
  [0, 0, 0, 2]
];
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
*/


export class LLMHandler {
  private model: any;
  private chain: any;
  private chatPrompt: any;

  constructor() {
    this.model = this.createGroqModel();   
    this.chatPrompt = this.createPrompt();
    this.chain = this.createChain();
    }  

  createGroqModel() {
    return new ChatGroq({
      temperature: 0,
      model: "llama3-70b-8192",
      //para ver los tokens de respuesta
      verbose: true
    });
  }

  createChain() {
    return new LLMChain({ 
      llm: this.model,
      prompt: this.chatPrompt
    });
  }

  createPrompt(){
    return ChatPromptTemplate.fromMessages([
      [
        "system",
       `Game goal is get 2048 tile combining in 4 directions in 4x4 board, each turn spawn new 2 or 4 tile 
        Each tile one integer, when moved they combine if same number or/and move, tiles moved recursively until board bound, tile in move direction move first
        Strategy: keep highest tile in a corner, trap high tiles in selected pivot direction while combine low tiles in other direction
        Examples
        Human: 4 0 0 0\n4 0 0 0\n4 0 0 0\n16 4 4 4 Incorrect:[up, right](bottom left corner loses high value), down(miss oportunity combine pivot row) Correct: left(high value remains corner and combine in pivot row) 
        answer: {{'move': 'Left'}}
        Human: 2 2 0 2\n0 0 0 0\n0 0 0 0\n32 16 2 4 Incorrect:up(high value row lose pivot), down(miss opportunity combine tiles) Correct: [left, right](combine low cells while mantain pivot) 
        answer: {{'move': 'Left'}}
        Answer best move in example format for given board, only the move`
      ],
      [
        "human", "Given board: {input}"
      ]
    ]);
  }

  async getBestMove(tablero: number[][]) {
    const res = await this.chain.invoke({ input: this.stringifyTablero(tablero) });
    const move = JSON.parse(res.text.replace(/'/g, '"'));
    return move;
  }

  stringifyTablero(tablero: number[][]) {
    return tablero.map(fila => fila.join(' ')).join('\n');
  }
}