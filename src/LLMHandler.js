import {config} from "dotenv";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";
import { ChatGroq } from "@langchain/groq";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";

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

const pastMessages = [
  new HumanMessage("4 0 0 0\n4 0 0 0\n4 0 0 0\n16 4 4 4 Incorrect:{up, right}(bottom left corner loses high value), down(miss oportunity combine pivot row) Correct: left(high value in corner and combine in pivot row)"),
  new AIMessage(`{"move": "Left"}`),
];

//crear prompt que se usa en el primer mensaje sólo, pero como se le manda toda la memoria en verdad se manda en todos los mensajes
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
     `Game goal is get 2048 tile combining in 4 directions in 4x4 board, each turn spawn new 2 or 4 tile 
      Each tile one integer, when moved they combine if same number or/and move, tiles moved recursively until board bound, tile in move direction move first
      Strategy: keep highest tile in a corner, trap high tiles in selected pivot direction while combine low tiles in other direction
      Best move in example format?
      Examples
      Human: 4 0 0 0\n4 0 0 0\n4 0 0 0\n16 4 4 4 Incorrect:[up, right](bottom left corner loses high value), down(miss oportunity combine pivot row) Correct: left(high value remains corner and combine in pivot row) 
      AI: ["move": "Left"]     `
    ),
    HumanMessagePromptTemplate.fromTemplate("Board:{input}"),
  ]);



const chain = new ConversationChain({ 
    llm: model,
    prompt: chatPrompt
 });


const res = await chain.invoke({ input: tablero });
const move = JSON.parse(res.response);
console.log(move);
const res2 = await chain.invoke({ input: tablero });
const move2 = JSON.parse(res2.response);
console.log(move2);
const res3 = await chain.invoke({ input: tablero });
const move3 = JSON.parse(res3.response);
console.log(move3);
