from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI

# Create a prompt template that takes in a context and a question.
prompt = ChatPromptTemplate.from_template(
    """Answer the question based only on the context provided.

Context: {context}

Question: {question}"""
)

# Create a cache to store prompts and outputs.
cache = {}

# Create a chain that uses the cache to store prompts and outputs.
chain = (
    RunnablePassthrough.assign(context=(lambda x: x["question"]) | retriever)
    | prompt
    | ChatOpenAI(model="gpt-4-1106-preview")
    | StrOutputParser()
)

# Invoke the chain with a question.
output = chain.invoke({"question": "how many units did bretch of the wild sell in 2020"})

# Check if the prompt is in the cache.
if prompt in cache:
    # If the prompt is in the cache, retrieve the output from the cache.
    print("Tokens spent: 0")
else:
    # If the prompt is not in the cache, send the prompt to the LLM and store the output in the cache.
    print("Tokens spent: ", chain.llm_tokens_spent)
    cache[prompt] = output

# Return the output.
return output