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
import { StructuredOutputParser } from "langchain/output_parsers";


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


//from json schema
const parser = new StructuredOutputParser(schema);

const model = new ChatGroq({
  temperature: 0,
  model: "llama3-70b-8192",
  //para ver los tokens de respuesta
  verbose: true
});

const pastMessages = [
  new HumanMessage("My name's Jonas"),
  new AIMessage("Nice to meet you, Jonas!"),
];

//crear prompt que se usa en el primer mensaje sólo, pero como se le manda toda la memoria en verdad se manda en todos los mensajes
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "act like a angry chatbot, be rude, brief and provide no information. But show that you remember the user's name."
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

const memory = new BufferMemory({
//iniciar la memoria con unos mensajes ya puestos
  chatHistory: new ChatMessageHistory(pastMessages),
    returnMessages: true, memoryKey: "history"
});

const chain = new ConversationChain({ 
    llm: model,
    memory: memory,
    prompt: chatPrompt,
    parser
 });


const res2 = await chain.call({ input: "what's my name?",
  formatInstructions: parser.getFormatInstructions() });
console.log({ res2 });

const res3 = await chain.call({ input: "what's the weather today?" });
console.log({ res3 });

const res4 = await chain.call({ input: "what's my name?" });
console.log({ res4 });

