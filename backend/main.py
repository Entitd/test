from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Настройки для продакшена (Amvera)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ваш-домен.amvera.io"],  # Укажите ваш домен
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API endpoints
@app.get("/api/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

# Монтирование статики React (будет настроено в Docker)
# app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")