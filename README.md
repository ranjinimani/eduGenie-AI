EduGenie – Google Gemini Powered Learning Assistant

Presented by: Ranjini S and Team
Department: 2 BCA – Shift 2
Project Type: Academic Project

---

📌 Abstract

EduGenie is an AI-powered learning assistant that uses Google Gemini to support students with personalized explanations, summaries, question answering, study guidance, and learning content generation.

The application provides a simple interface where students can ask academic questions and receive contextual, easy-to-understand responses.

---

🎯 Objectives

- Provide AI-based academic assistance.
- Explain concepts in simple and understandable language.
- Generate summaries and study notes.
- Support question answering and revision.
- Generate examples and practice questions.
- Create a simple, student-friendly learning interface.
- Demonstrate the integration of a generative AI API into an educational application.

---

❗ Problem Statement

Students may face difficulties while understanding complex academic concepts. Finding simple explanations from multiple sources can also take time.

EduGenie addresses these challenges by providing quick, AI-powered academic assistance through a conversational learning interface.

---

🔄 Existing System

- Static educational websites and notes.
- Search engines require students to filter information.
- Conventional chatbots may have limited context.
- Personalization is often limited.

---

💡 Proposed System

EduGenie combines a student-friendly web interface with Google Gemini to generate contextual learning assistance.

Students can enter questions or learning requests and receive AI-generated explanations, summaries, examples, and study assistance.

---

✨ Key Features

- Ask questions using natural language.
- Get simplified explanations.
- Generate summaries and study notes.
- Generate practice questions.
- Receive study guidance.
- Get examples for better understanding.
- Use the assistant for revision and practice.
- Simple and responsive interface.

---

🏗️ System Architecture

Student
   ↓
Web Interface
   ↓
Backend
   ↓
Google Gemini API
   ↓
AI Response
   ↓
Student

---

🧩 Main Modules

1. User Interface Module
2. Question & Answer Module
3. Content Summarization Module
4. Study Notes Generator
5. Practice Question Generator
6. Gemini API Integration Module
7. Response Display Module

---

🛠️ Technologies Used

Technology| Purpose
HTML| Frontend structure
CSS| User interface styling
JavaScript| Frontend interaction
Python Flask| Backend/API integration
Google Gemini API| Generative AI
JSON| Data format
VS Code| Development
Web Browser| Application platform

---

📁 Project Structure

edugenie/
│
├── app.py
├── requirements.txt
├── .env
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js

---

⚙️ How EduGenie Works

1. Student opens EduGenie.
2. Student enters a question or learning request.
3. Application validates the input.
4. Backend creates a suitable prompt.
5. Google Gemini processes the request.
6. AI response is returned.
7. EduGenie displays the result in a readable format.

---

🤖 Google Gemini Integration

Google Gemini acts as the generative AI engine of EduGenie.

The student's question is sent from the frontend to the Flask backend. The backend sends a suitable prompt to the Gemini model and returns the generated response to the user.

The project uses the Gemini API through the Python backend, and the API key is stored in an environment file rather than exposed in client-side code.

---

💻 Coding

1. Backend – "app.py"

import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = Flask(__name__)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not q
