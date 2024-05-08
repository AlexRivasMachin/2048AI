import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";
import { ChatGroq } from "@langchain/groq";
import { ConversationChain } from "langchain/chains";

const model = new ChatGroq({
  temperature: 0,
  model: "llama3-70b-8192"
});

const pastMessages = [
  new HumanMessage("My name's Jonas"),
  new AIMessage("Nice to meet you, Jonas!"),
];

const memory = new BufferMemory({
  chatHistory: new ChatMessageHistory(pastMessages),
});

const chain = new ConversationChain({ llm: model, memory: memory });

const res1 = await chain.call({ input: "Hi! I'm Jim." });
console.log({ res1 });

const res2 = await chain.call({ input: "What's my name?" });
console.log({ res2 });