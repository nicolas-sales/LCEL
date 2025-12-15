from fastapi import FastAPI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langserve import add_routes

import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="C:/Users/nico_/Desktop/GenAI/LCEL/.env")

from fastapi.middleware.cors import CORSMiddleware  # Autoriser React à appeler FastAPI


#print("GROQ_API_KEY =", os.getenv("GROQ_API_KEY"))

#load_dotenv

groq_api_key=os.getenv("GROQ_API_KEY")

print(">>> Clé Groq chargée :", groq_api_key)

model=ChatGroq(model="llama-3.1-8b-instant",groq_api_key=groq_api_key)

# Pormpt template

systeme_template = (
    "You are a translation engine. "
    "Your task is to translate text. "
    "Translate the user text into {language}. "
    "Return ONLY the translated text. "
    "No explanations. No definitions. "
    "No quotation marks. "
    "One sentence only."
)

# systeme_template = "Translate the following into {language}:"

prompt_template = ChatPromptTemplate.from_messages(
    [
        ("system",systeme_template),
        ("user","{text}")
    ]
)

parser=StrOutputParser()

# Chain
chain=prompt_template|model|parser

# App definition

app = FastAPI(title="Langchain Server",
              version="1.0",
              description="API server using Langchain runnable interfaces")

# Autoriser React (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 3000 : port de React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Adding chain routes
add_routes(
    app,
    chain,
    path="/chain"
)

# La fonction add_route():

# enregistre des routes FastAPI

# ajoute automatiquement :

 #/chain/invoke

# /chain/batch

# /chain/stream

# /chain/stream_log

# /chain/playground

# initialise le système LangServe

# affiche son nom au démarrage


if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="localhost",port=8000)