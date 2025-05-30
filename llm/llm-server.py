import os
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from huggingface_hub import login
from functools import lru_cache
from typing import Dict

# =========================
# Initialisierung
# =========================
app = FastAPI()

# CORS aktivieren (für Frontend-Zugriff)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # z.B. ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional: Login bei Hugging Face (wenn Token gesetzt ist)
hf_token = os.getenv("HF_TOKEN")
if hf_token:
    login(token=hf_token)
else:
    print("Kein Hugging Face Token gesetzt – Modell wird ggf. limitiert geladen.")


# =========================
# Eingabe-Schema für POST
# =========================
class PromptRequest(BaseModel):
    prompt: str
    max_new_tokens: int = 100
    temperature: float = 0.8
    top_p: float = 0.95
    do_sample: bool = True


# =========================
# Lazy Load: Text-Pipeline
# =========================
@lru_cache()
def get_pipeline():
    print("Lade Textgenerierungs-Pipeline...")
    return pipeline(
        "text-generation",
        model="microsoft/phi-2",
        device=0 if torch.cuda.is_available() else -1
    )


# =========================
# API-Endpunkte
# =========================
@app.post("/generate", response_model=Dict[str, str])
async def generate_text(req: PromptRequest):
    pipe = get_pipeline()
    output = pipe(
        req.prompt,
        max_new_tokens=req.max_new_tokens,
        temperature=req.temperature,
        top_p=req.top_p,
        do_sample=req.do_sample
    )
    return {"result": output[0]["generated_text"]}


@app.get("/")
def root():
    return {"message": "LLM API is running!"}


@app.get("/health")
def health():
    return {"status": "ok"}
