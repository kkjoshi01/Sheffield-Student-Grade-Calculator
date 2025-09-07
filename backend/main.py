# backend/main.py
from fastapi import FastAPI, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from db import Transaction, init_db, get_session
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(title="Finance API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173"], # Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return RedirectResponse(url="/docs")  # optional

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/transactions", response_model=Transaction)
def create_transaction(transaction: Transaction, session=next(get_session())):
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction

@app.get("/transactions")
def list_transactions(session: Session = Depends(get_session)):
    return session.exec(select(Transaction)).all()

