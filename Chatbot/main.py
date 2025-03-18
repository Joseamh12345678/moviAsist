from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(message: Message):
    response = f"🤖 Respuesta del bot: {message.text}"
    return {"response": response}

# Correr con: uvicorn main:app --host 0.0.0.0 --port 8001 --reload
