📘 Manual Simplifier
A simple web tool that converts confusing product manuals into clear, beginner-friendly setup guides using AI.
Built as a portfolio project to demonstrate real-world AI integration, PDF processing, and backend engineering.

Live demo: 🌐 https://manualsimplifier.lovable.app/

🚀 What Is It?
Manuels are often complicated, full of technical jargon, and hard to follow — especially when you just want to set something up.
Manual Simplifier solves this by automatically generating clean, step-by-step instructions from a PDF manual, making setup easy for anyone.

This project shows how to:
✔ extract text from manuals
✔ process and clean the content
✔ use large language models (LLMs) to generate structured guides
✔ build a full backend + frontend stack

🔍 Why This Project Matters
⚡ Helps people quickly understand how to set up devices
⚡ Shows real engineering of an AI pipeline
⚡ Great talking point in interviews — demonstrates backend + AI + tooling integration

🧠 How It Works
User uploads a PDF manual through the web interface

The backend extracts and cleans the text

Text is divided into logical chunks

Each chunk is fed to an AI (LLM) via prompt

AI outputs structured steps

The backend builds a unified JSON guide

Frontend displays the setup guide cleanly

📦 Features
✨ Upload PDF manuals
✨ Clean extracted text from PDFs
✨ Generate beginner-friendly setup instructions
✨ Error warnings and common pitfalls highlighted
✨ Exportable guide output

🧑‍💻 Tech Stack
Layer	Tech
Frontend	HTML, CSS, JavaScript
Backend	Python, FastAPI
PDF Processing	pdfplumber or PyMuPDF
AI Model	OpenAI / LLM API
Hosting	Lovable.ai / Render / Netlify

🗂️ Folder Structure
graphql
Copy code
backend/
├── main.py             # FastAPI app entry
├── api/
│   └── routes.py       # Upload and generate endpoint
├── services/
│   ├── pdf_reader.py   # Extract text from PDFs
│   ├── cleaner.py      # Clean extracted text
│   ├── chunker.py      # Chunk cleaned text
│   ├── llm.py          # AI calls and prompt handling
│   └── guide_builder.py # Build unified setup guide
├── prompts/
│   └── setup_prompt.txt # Prompt used for LLM
├── utils/
│   └── file_utils.py
├── requirements.txt
└── README.md
📋 API Endpoints
POST /generate
Uploads a PDF, processes it, and returns a structured guide:

Request

Content-Type: multipart/form-data

Field: file (PDF)

Response

json
Copy code
{
  "title": "Product Setup Guide",
  "estimated_time": "15–20 minutes",
  "steps": [
    {"step": 1, "instruction": "..."},
    {"step": 2, "instruction": "..."}
  ],
  "warnings": [],
  "common_mistakes": [],
  "final_checklist": []
}
🧠 Example Output
markdown
Copy code
Title: Easy Router Setup Guide
Estimated time: 10 mins

1. Unbox the router...
2. Connect the power cable...
3. Open your web browser...
4. Enter default credentials...
(Replace above with your own example from live testing.)

⚙️ Setup & Installation
Clone the repo

bash
Copy code
git clone https://github.com/YOUR_USERNAME/manual-simplifier
Create a virtual environment

bash
Copy code
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate       # Windows
Install dependencies

bash
Copy code
pip install -r requirements.txt
Run the FastAPI backend

bash
Copy code
uvicorn backend.main:app --reload
Visit the frontend or test with API clients (Postman, curl)

🛠️ How It’s Built (Engineered)
This project is not just calling AI — it includes:

📌 PDF text extraction and cleaning
📌 Logical chunking to respect LLM limits
📌 Reusable LLM prompting design
📌 Structured output generation
📌 FastAPI backend with clear API contract

🏁 What to Improve Later
✨ Add OCR support (for scanned PDFs)
✨ Show in-browser guide export (PDF / Notion)
✨ Support multiple languages
✨ Add user authentication and saved history
✨ Turn into a SaaS product

📣 Credits
Built by Kartik Garg — BTech (2nd Year)
A fun portfolio project demonstrating real AI + backend skills.

📄 License
MIT License © 2026
