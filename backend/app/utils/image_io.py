# app/utils/image_io.py
from PIL import Image
import numpy as np
from app.config import settings

def load_image_from_bytes(file_bytes: bytes) -> np.ndarray:
    img = Image.open(BytesIO(file_bytes)).convert("RGB")
    img = img.resize(settings.img_size)
    arr = np.array(img).astype("float32")
    return arr
def is_brain_mri(img_array):
    """
    Basic heuristic: allow grayscale or RGB images with reasonable dimensions.
    """
    if img_array is None:
        return False

    h, w = img_array.shape[:2]
    if h < 100 or w < 100:
        return False  # too small to be a real MRI

    # Accept grayscale, RGB, or RGBA
    if len(img_array.shape) == 2:
        return True  # grayscale
    if len(img_array.shape) == 3 and img_array.shape[2] in [1, 3, 4]:
        return True

    return False


from io import BytesIO  # keep import at bottom to avoid circulars