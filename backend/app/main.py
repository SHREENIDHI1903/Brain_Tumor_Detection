# app/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.inference import predict_image
from app.utils.image_io import load_image_from_bytes, is_brain_mri
from app.models.loader import get_model

app = FastAPI(title="Brain Tumor Inference API", version="1.0.0")

# CORS (adjust origins for your frontend domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def warmup():
    # Load model once at start
    _ = get_model()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # ✅ Validate content type
    if file.content_type is None or "image" not in file.content_type:
        return {"error": "Unsupported file type. Please upload an image."}

    bytes_ = await file.read()
    img_array = load_image_from_bytes(bytes_)

    # ✅ Fallback check: is this a brain MRI?
    # You can implement a lightweight classifier or heuristic here
    if not is_brain_mri(img_array):
        return {"error": "Not a brain MRI image"}

    # ✅ Run tumor detection
    result = predict_image(img_array)
    return {
        "filename": file.filename,
        **result
    }