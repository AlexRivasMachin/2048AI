import {config} from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {FewShotChatMessagePromptTemplate} from "langchain/prompts";

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

/*
Human: 4 0 0 0\n4 0 0 0\n4 0 0 0\n16 4 4 4 Incorrect:[up, right](bottom left corner loses high value), down(miss oportunity combine pivot row) Correct: left(high value remains corner and combine in pivot row) 
answer: {{'move': 'Left'}}
Human: 2 2 0 2\n0 0 0 0\n0 0 0 0\n32 16 2 4 Incorrect:up(high value row lose pivot), down(miss opportunity combine tiles) Correct: [left, right](combine low cells while mantain pivot) 
answer: {{'move': 'Left'}}
Answer best move in example format for given board, only the move`*/

const examples = [
  {
    "input": "4 0 0 0\n4 0 0 0\n4 0 0 0\n16 4 4 4 Incorrect:[up, right](bottom left corner loses high value), down(miss oportunity combine pivot row) Correct: left(high value remains corner and combine in pivot row)",
    "output": "{{'move': 'Down'}}"
  },
  {
    "input": "2 2 0 2\n0 0 0 0\n0 0 0 0\n32 16 2 4 Incorrect:up(high value row lose pivot), down(miss opportunity combine tiles) Correct: [left, right](combine low cells while mantain pivot)",
    "output": "{{'move': 'Left'}}"
  },
  {
    "input": "8 0 0 0\n0 0 0 0\n0 2 0 2\n8 4 128 128 Incorrect: Up(high value miss pivot), Left(lose high value corner), Correct: Right(combine high value in pivot and corner), Down(combine low tiles and keep opportunity to combine high value)",
    "output": "{{'move': 'Right'}}"
  },
  {
    "input": "16 4 2 128\n2 2 0 0\n8 0 8 0\n0 0 0 0",
    "output": "{{'move': 'Right'}}"
  },
  {
    "input": "64 32 16 2\n4 0 0 0\n4 0 0 0\n2 0 0 0",
    "output": "{{'move': 'Up'}}"
  },
]

const examplePrompt = ChatPromptTemplate.fromTemplate(`Human: {input} {output}`);

const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  prefix: "Best move for given board? Answer example JSON format only. Game goal is get 2048 tile combining in 4 directions in 4x4 board, each turn spawn new 2 or 4 tile. Each tile one integer, when move, they combine if same number collide, tiles moved recursively until board bound or collide tile with different number, Left/Right move columns and Up/Down move rows in given direction. Strategy: keep highest tile in a corner, trap high tiles in selected row pivot direction while combine low tiles in other direction. Example board represent 4 rows, top to bottom",
  suffix: "Given board: {input}",
  examplePrompt,
  examples,
  inputVariables: ["input"]
});

export class LLMHandler {
  private model: any;

  constructor() {
    this.model = this.createGroqModel();   
    }  

  createGroqModel() {
    return new ChatGroq({
      temperature: 0,
      model: "llama3-70b-8192",
      //para ver los tokens de respuesta
      verbose: true
    });
  }

  async getBestMove(tablero: number[][]) {
    const formattedPrompt = await fewShotPrompt.format({
      input: this.stringifyTablero(tablero)
    });

    const res = await this.model.invoke(formattedPrompt);
    const move = JSON.parse(res.text.replace(/'/g, '"'));
    return move;
  }

  stringifyTablero(tablero: number[][]) {
    return tablero.map(fila => fila.join(' ')).join('\n');
  }
}