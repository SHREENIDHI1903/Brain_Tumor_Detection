# app/utils/preprocess.py
import numpy as np
import tensorflow as tf
from app.config import settings

def preprocess_array(img_array: np.ndarray) -> np.ndarray:
    # img_array expected shape (H, W, 3), dtype float32
    img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array