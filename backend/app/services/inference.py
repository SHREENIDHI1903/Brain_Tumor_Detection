# app/services/inference.py
import numpy as np
from app.models.loader import get_model
from app.utils.preprocess import preprocess_array
from app.config import settings

def predict_image(img_array: np.ndarray) -> dict:
    model = get_model()
    batch = preprocess_array(img_array)
    # model output assumed shape (batch, 1) sigmoid for binary classification
    prob = float(model.predict(batch, verbose=0)[0][0])
    label = "Tumor" if prob >= settings.threshold else "No Tumor"
    return {
        "label": label,
        "probability": prob,
        "threshold": settings.threshold,
    }
