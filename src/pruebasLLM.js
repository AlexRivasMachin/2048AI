import { ChatGroq } from "@langchain/groq";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";

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
const tablero = [
  [2, 0, 2, 0],
  [0, 4, 0, 0],
  [0, 0, 2, 0],
  [0, 0, 0, 2]
];

const model = new ChatGroq({
  temperature: 0,
  model: "llama3-70b-8192",
  //para ver los tokens gastados
  verbose: true
});

const prompt = PromptTemplate.fromTemplate(
  `Current board: {tablero} What would be the best next move for the 2048 game?Answer must contain only a JSON with this format: move: "up" | "down" | "left" | "right"`
);

const pastMessages = [
  new HumanMessage("2,0,2,0,0,4,0,0,0,0,2,0,0,0,0,2 Incorrect move"),
  new AIMessage("Left"),
  new HumanMessage("2,0,2,0,0,4,0,0,0,0,2,0,0,0,0,2 Correct move"),
  new AIMessage("Left"),
];
const memory = new BufferMemory({
  chatHistory: new ChatMessageHistory(pastMessages),
});

const chainA = new LLMChain({ 
    llm: model,
    prompt: prompt,
    memory: memory
});

const resA = await chainA.invoke({ 
    tablero: tablero
 });

console.log(resA);
const movimiento = JSON.parse(resA.text);