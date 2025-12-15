# AI Translator App (React + FastAPI + LangChain + Groq)

This project is a simple AI-powered translation web application.

It uses:
- **React** for the frontend
- **FastAPI** for the backend
- **LangChain + LangServe** to expose an LLM chain as an API
- **Groq** as the LLM provider (LLaMA 3.1)
- **Prompt engineering** to ensure clean and reliable translations

---

## Features

- Translate text into multiple languages (French, English, Spanish)
- Clean and simple user interface
- Fast inference using Groq
- Strict prompt to avoid explanations and return only translations
- Full frontend ↔ backend communication

---

## Project Structure

```text
LCEL/
│
├── serve.py              # FastAPI backend with LangServe
├── .env                  # Environment variables (API keys)
├── frontend/             # React frontend
│   ├── package.json
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│
└── venvg/                 # Python virtual environment (not tracked)
