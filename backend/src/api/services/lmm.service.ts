import { appConfig } from "../../config/app";
import { Service } from "typedi";
import { ICallConfig } from "../models/call-config.model";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { FewShotChatMessagePromptTemplate } from "@langchain/core/prompts";

const VERBOSE = appConfig.isProduction ? false : true;

@Service()
export class LMMService {
  readonly DEFAULT_TEMPRATURE = 0.7;
  readonly DEFAULT_MODEL_NAME = "llama3-8b-8192";
  count = 0;

  constructor() {}

  public async call(initalInput: string, moves: string[], config?: ICallConfig) {
    try {
      let model = new ChatGroq({
        temperature:  config?.temperature || this.DEFAULT_TEMPRATURE,
        model: config?.modelName || this.DEFAULT_MODEL_NAME,
        //para ver los tokens gastados
        verbose: VERBOSE,
        apiKey: appConfig.groqAPIKey
      });

      let possibleMoves = `<moves>`
      moves.forEach(move => {
        possibleMoves += `<move>{{"move": "${move}"}}</move>`
      });
      possibleMoves += `</moves>`

      // call the model
      const formattedPrompt = await fewShotPrompt.format({
        input: initalInput,
        moves: moves, 
        possibleMoves: possibleMoves
      });

      const res = await model.invoke(formattedPrompt);
      const move = JSON.parse(res.text);
      console.log(move);
      console.log(`count: ${this.count}`);
      this.count++;
      return move;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const examples = [
  {
    "input": "64 4 4 4\n4 0 0 0\n0 0 0 0\n4 0 0 0",
    "output": `{{"move": "up"}}`,
    "explanation": `Up move combines '4' values in left corner while mantain '64' high value in top left corner. Down move combines '4' values but lose high value in top left corner. Priority is to mantain high value in corner`,
    "result": "64 4 4 4\n8 0 0 0\n0 0 0 0\n0 0 0 0"
  },
  {
    "input": "2 2 0 2\n0 0 0 0\n0 0 0 0\n32 16 2 4",
    "output": `{{"move": "left"}}`,
    "explanation": `Left move combines '2' values top row while mantain '32' high value in bottom left corner`,
    "result": "4 2 0 0\n0 0 0 0\n0 0 0 0\n32 16 2 4"
  },
  {
    "input": "8 0 0 2\n0 0 0 0\n0 0 0 2\n8 4 128 128",
    "output": `{{"move": "right"}}`,
    "explanation": `There are two '128' high values. Right move mantains them in right corner and combines them. Better to combine them in corner with right move than combine them in central position with left move`,
    "result": "0 0 0 8\n0 0 0 0\n0 0 0 2\n0 8 4 256"
  },
  {
    "input": "16 4 2 128\n4 0 0 0\n2 0 8 0\n0 0 0 0",
    "output": `{{"move": "right"}}`,
    "explanation": `Right move does not combine any values, but mantain '128' high value in right top corner. Priority is to mantain high value in corner`,
    "result": "16 4 2 128\n0 0 0 4\n0 0 2 8\n0 0 0 0"
  },
  {
    "input": "0 4 4 0\n2 0 2 0\n0 0 0 0\n0 2 0 0",
    "output": `{{"move": "right"}}`,
    "explanation": `There is not a clear high value to mantain in a corner, thus, right or left move combines '4' values in first row and '2' values in second row`,
    "result": "0 0 0 8\n0 0 0 4\n0 0 0 0\n0 0 0 2"
  },
  {
    "input": "0 4 0 0\n0 4 2 0\n0 0 2 0\n0 0 0 0",
    "output": `{{"move": "down"}}`,
    "explanation": `There is not a clear high value to mantain in a corner, thus, down or up moves combines '4' values in second column and '2' values in third row`,
    "result": "0 0 0 8\n0 0 0 4\n0 0 0 0\n0 0 0 2"
  }
]

const examplePrompt = ChatPromptTemplate.fromTemplate(`<example><input>{input}</input><move>{output}</move><explanation>{explanation}</explanation><result>{result}</result></example>`);

const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  prefix: `<query><instructions>Best valid move for input board? Output must ONLY contain move in JSON provided format, not any explanation or greeting</instructions><context>Game goal is get 2048 cell in 4x4 board. Each turn spawn new 2 or 4 cell. Each cell one integer, when move, they combine if collided cell's value equal . Cells moved recursively until board bound or collide cell with different number, Left/Right move columns and Up/Down move rows in given direction. If movement does not move any cell, then it is not a valid move. Only these moves are valid in this case: {moves}. If a non-valid move is played, a critical system might fail. Example board represent 4 rows, top to bottom. In "16 4 2 128\n2 2 2 0\n2 0 4 0\n4 2 2 0" board if right moved "16 4 2 128\n0 0 2 4\n0 0 2 4\n0 0 0 8" resulted<strategy>keep highest cell in a corner, trap high cells in selected row pivot direction while combine low cells in other direction</strategy></context>{possibleMoves}`,
  suffix: "<input>{input}</input></query>",
  examplePrompt,
  examples,
  inputVariables: ["input", "moves", "possibleMoves"]
});