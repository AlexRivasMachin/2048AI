import {config} from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {FewShotChatMessagePromptTemplate} from "langchain/prompts";

config({path:"../../.env"});

/*Ejemplo de movimiento:
{
  "movement": "Left"
}*/
/*const schemaMovimiento = {
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
    "input": "64 4 4 4\n4 0 0 0\n0 0 0 0\n4 0 0 0",
    "output": `{{"move": "Up"}}`,
    "explanation": `Up move combines '4' values in left corner while mantain '64' high value in top left corner. Down move combines '4' values but lose high value in top left corner. Priority is to mantain high value in corner`,
    "result": "64 4 4 4\n8 0 0 0\n0 0 0 0\n0 0 0 0"
  },
  {
    "input": "2 2 0 2\n0 0 0 0\n0 0 0 0\n32 16 2 4",
    "output": `{{"move": "Left"}}`,
    "explanation": `Left move combines '2' values top row while mantain '32' high value in bottom left corner`,
    "result": "4 2 0 0\n0 0 0 0\n0 0 0 0\n32 16 2 4"
  },
  {
    "input": "8 0 0 2\n0 0 0 0\n0 0 0 2\n8 4 128 128",
    "output": `{{"move": "Right"}}`,
    "explanation": `There are two '128' high values. Right move mantains them in right corner and combines them. Better to combine them in corner with right move than combine them in central position with left move`,
    "result": "0 0 0 8\n0 0 0 0\n0 0 0 2\n0 8 4 256"
  },
  {
    "input": "16 4 2 128\n4 0 0 0\n2 0 8 0\n0 0 0 0",
    "output": `{{"move": "Right"}}`,
    "explanation": `Right move does not combine any values, but mantain '128' high value in right top corner. Priority is to mantain high value in corner`,
    "result": "16 4 2 128\n0 0 0 4\n0 0 2 8\n0 0 0 0"
  },
  {
    "input": "0 4 4 0\n2 0 2 0\n0 0 0 0\n0 2 0 0",
    "output": `{{"move": "Right"}}`,
    "explanation": `There is not a clear high value to mantain in a corner, thus, right or left move combines '4' values in first row and '2' values in second row`,
    "result": "0 0 0 8\n0 0 0 4\n0 0 0 0\n0 0 0 2"
  },
  {
    "input": "0 4 0 0\n0 4 2 0\n0 0 2 0\n0 0 0 0",
    "output": `{{"move": "Down"}}`,
    "explanation": `There is not a clear high value to mantain in a corner, thus, down or up moves combines '4' values in second column and '2' values in third row`,
    "result": "0 0 0 8\n0 0 0 4\n0 0 0 0\n0 0 0 2"
  }

]

const examplePrompt = ChatPromptTemplate.fromTemplate(`<example><input>{input}</input><move>{output}</move><explanation>{explanation}</explanation><result>{result}</result></example>`);

const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  prefix: `<query><instructions>Best move for input board? Output must ONLY contain move in JSON provided format, not any explanation or greeting</instructions><context>Game goal is get 2048 cell in 4x4 board.  Each turn spawn new 2 or 4 cell. Each cell one integer, when move, they combine if collided cell's value equal . Cells moved recursively until board bound or collide cell with different number, Left/Right move columns and Up/Down move rows in given direction. Example board represent 4 rows, top to bottom. In "16 4 2 128\n2 2 2 0\n2 0 4 0\n4 2 2 0" board if right moved "16 4 2 128\n0 0 2 4\n0 0 2 4\n0 0 0 8" resulted<strategy>keep highest cell in a corner, trap high cells in selected row pivot direction while combine low cells in other direction</strategy></context><moves><move>{{"move": "Up"}}</move><move>{{"move": "Down"}}</move><move>{{"move": "Left"}}</move><move>{{"move": "Right"}}</move></moves>`,
  suffix: "<input>{input}</input></query>",
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
      model: "llama3-8b-8192",
      //para ver los tokens de respuesta
      verbose: true
    });
  }

  async getBestMove(tablero: number[][]) {
    const formattedPrompt = await fewShotPrompt.format({
      input: this.stringifyTablero(tablero)
    });

    const res = await this.model.invoke(formattedPrompt);
    return JSON.parse(res.text);

  }

  stringifyTablero(tablero: number[][]) {
    return tablero.map(fila => fila.join(' ')).join('\n');
  }
}