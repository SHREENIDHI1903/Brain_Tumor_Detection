# app/config.py
from pydantic import BaseModel

class Settings(BaseModel):
    model_path: str = "fine_tuned_model.keras"
    img_size: tuple[int, int] = (224, 224)
    threshold: float = 0.5

settings = Settings()
