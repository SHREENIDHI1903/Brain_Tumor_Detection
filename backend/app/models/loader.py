# app/models/loader.py
import tensorflow as tf
from functools import lru_cache
from app.config import settings

@lru_cache(maxsize=1)
def get_model():
    # Load once, reuse across requests
    model = tf.keras.models.load_model(settings.model_path)
    return model
