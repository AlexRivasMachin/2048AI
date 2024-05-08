import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  temperature: 0,
  model: "llama3-70b-8192"
});

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

const modelWithStructuredOutput = model.withStructuredOutput(schema);

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "el mejor movimiento es a la izquierda"],
  ["human", "dime cual es el mejor movimiento"],
]);
const chain = prompt.pipe(modelWithStructuredOutput);
const result = await chain.invoke({});
console.log(result);