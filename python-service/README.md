# Filoza Background Remover API

This is the high-quality background removal backend for Filoza, using `rembg` with the state-of-the-art MIT-licensed `BiRefNet` model.

## Setup Instructions

1. Ensure you have Python 3.9+ installed.
2. Navigate to this directory:
   ```bash
   cd python-service
   ```
3. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`.

## Deployment

Since Vercel serverless functions cannot handle large ML models, this service needs to be deployed separately (e.g., Render, Railway, AWS ECS, DigitalOcean App Platform). 

Once deployed, set the `NEXT_PUBLIC_BACKGROUND_REMOVER_API_URL` environment variable in the Next.js app to point to your deployed URL.
