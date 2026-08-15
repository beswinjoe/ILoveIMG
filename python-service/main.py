import io
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
from PIL import Image

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Filoza Background Remover API",
    description="High-quality AI background removal using rembg.",
    version="1.0.0",
)

# Configure CORS so the Next.js frontend can call it directly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to match your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model session once at startup to save time on each request.
# 'birefnet-general' gives exceptional detail for hair, complex backgrounds, and products.
# If you run out of memory or want it faster, you can use 'u2net' instead.
try:
    logger.info("Loading rembg session with birefnet-general...")
    model_session = new_session("birefnet-general")
    logger.info("Model session loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    # Fallback to default (u2net)
    model_session = new_session("u2net")

MAX_FILE_SIZE = 15 * 1024 * 1024  # 15 MB
SUPPORTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]

@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    if file.content_type not in SUPPORTED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type.")
    
    # Read file content safely into memory
    content = await file.read()
    
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 15MB.")

    try:
        # Load image with Pillow to verify it's valid
        input_image = Image.open(io.BytesIO(content))
        input_image.verify()
        
        # We need to reopen it because verify() moves the file pointer
        input_image = Image.open(io.BytesIO(content))

        # Perform background removal
        output_image = remove(input_image, session=model_session)

        # Save output to a bytes buffer
        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return Response(
            content=img_byte_arr.getvalue(),
            media_type="image/png"
        )
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail="Failed to process image.")

@app.get("/health")
def health_check():
    return {"status": "healthy"}
