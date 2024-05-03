import os
from google.cloud import aiplatform
from langchain_community.embeddings import VertexAIEmbeddings
from langchain_google_cloud_sql_pg import PostgresEngine
from langchain_google_cloud_sql_pg import PostgresVectorStore
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from pydantic import Extra
from langchain.callbacks.manager import CallbackManagerForLLMRun
from langchain.llms.base import LLM
from typing import Any, List, Mapping, Optional
import requests


project_id="consci-ai"
region="us-central1"
db_host = "consci-ai:us-central1:consci-ai-postgres" 
db_user = "postgres" 
db_pass = "temppwd"  
db_name = "consci-ai-db" 
instance = "consci-ai-postgres"
embedding_table = "documents_embedding"


def getVectorStore() -> PostgresVectorStore:
  aiplatform.init(project=project_id, location=region)
  embeddings = VertexAIEmbeddings()
  
  pg_engine = PostgresEngine.from_instance(
    project_id=project_id,
    instance=instance,
    region=region,
    database=db_name,
    user=db_user,
    password=db_pass,
  )

  vector_store = PostgresVectorStore.create_sync(
    engine=pg_engine,
    embedding_service=embeddings,
    table_name=embedding_table,
  )
  return vector_store

class CustomLLM(LLM):
    llm_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDg0Tob283-bKxQqop0R30gr2yy4tqaJeE"

    class Config:
        extra = Extra.forbid

    @property
    def _llm_type(self) -> str:
        return "vertexai"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> str:
        if stop is not None:
            raise ValueError("stop kwargs are not permitted.")
        print("#######",type(prompt))
        payload = {
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": prompt
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.9,
    "topK": 1,
    "topP": 1,
    "maxOutputTokens": 2048,
    "stopSequences": []
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}

        headers = {"Content-Type": "application/json"}

        response = requests.post(self.llm_url, json=payload, headers=headers, verify=False)
        response.raise_for_status()
        print(response.json()['candidates'][0]['content']['parts'][0]['text'])
        return response.json()['candidates'][0]['content']['parts'][0]['text']

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        """Get the identifying parameters."""
        return {"llmUrl": self.llm_url}

store = {}
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

vector_store = getVectorStore()
llm = CustomLLM()
retriever = vector_store.as_retriever()

contextualize_q_system_prompt = """Given a chat history and the latest user question \
which might reference context in the chat history, formulate a standalone question \
which can be understood without the chat history. Do NOT answer the question, \
just reformulate it if needed and otherwise return it as is."""

contextualize_q_prompt = ChatPromptTemplate.from_messages(
[
    ("system", contextualize_q_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
]
)

history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)

def create_chain():

    qa_system_prompt = """Based on the retrieved context and the provided project details classify the project in one of the four categories given below:\
      1.High Risk AI system
      2.Transparency Risk AI system
      3.General Purpose AI system
      4.Unacceptable AI system
      
      Based on the classified category refer the context and form a question asking the user about the source of data used to make this project
      Strictly return only the formed question and the classified category in response as an object in a valid json format: \
      The json should only two properties \
      1. category :  classified category \
      2. question :  formed question
       
    
    {context}"""
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", qa_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
    
    conversational_rag_chain = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
    )

    return conversational_rag_chain

def create_questions_chain():    
    qa_system_prompt = """You are a responsible AI auditer. \
      Your task is to generate questions based on the retrieved context,chat history and the risk category from chat history \
      
      Use the following topics to randomly generate questions:
      1. Data used in the project
      2. Machine Learning models used in the project
      3. Steps taken to increase the efficiency of the machine learning model
      4. Impact of the project on the users
      
      Strictly refer the chat history and do not repeat any questions.
      
      Do not return json format  
      Strictly return only the formed question as response
      
    
    {context}"""
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", qa_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
    
    generate_questions = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
    )

    return generate_questions
  
  
def generate_final_response():    
  qa_system_prompt = """Based on the retrieved context and the risk category from chat history come up with a summary of the conversation and give the user the classified risk category of their project\
    
  {context}"""
  qa_prompt = ChatPromptTemplate.from_messages(
      [
          ("system", qa_system_prompt),
          MessagesPlaceholder("chat_history"),
          ("human", "{input}"),
      ]
  )
  question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

  rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
  
  generate_questions = RunnableWithMessageHistory(
  rag_chain,
  get_session_history,
  input_messages_key="input",
  history_messages_key="chat_history",
  output_messages_key="answer",
  )

  return generate_questions

