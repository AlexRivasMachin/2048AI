import { ConversationChain } from "langchain/chains";
import { ChatGroq } from "@langchain/groq";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

const chat = new ChatGroq({
    temperature: 0,
    model: "llama3-70b-8192",
    verbose: true
  });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. User's name is Bob"
  ),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: false, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat
});

const response = await chain.call({
  input: "What is my name?",
});
console.log(response);
console.log(response.response_metadata);
const response2 = await chain.call({
  input: "Ok, what's the weather today",
});
console.log(response2);
console.log(response2.response_metadata);
const response3 = await chain.call({
  input: "What is my name?",
});
console.log(response3);
console.log(response3.response_metadata);