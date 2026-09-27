from pathlib import Path
from typing import Any, Dict

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from explanation_module import explain_concept
from learning_path import get_learning_recommendations
from qna import answer_question
from quiz_module import generate_quiz
from summary_module import summarize_text


BASE_DIR = Path(__file__).resolve().parent


app = FastAPI(
    title="EduGenie API",
    description=(
        "Google Gemini powered educational "
        "learning assistant."
    ),
    version="1.0.0",
)


# Static files.
app.mount(
    "/static",
    StaticFiles(
        directory=BASE_DIR / "static"
    ),
    name="static",
)


# HTML templates.
templates = Jinja2Templates(
    directory=BASE_DIR / "templates"
)


@app.get(
    "/",
    response_class=HTMLResponse,
)
async def home(request: Request):
    """
    Render the EduGenie web interface.
    """

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request
        },
    )


@app.get("/health")
async def health() -> Dict[str, str]:
    """
    Health-check endpoint.
    """

    return {
        "status": "ok",
        "service": "EduGenie",
    }


@app.post("/qa")
async def qa(
    payload: Dict[str, Any]
):
    """
    Question-answering endpoint.
    """

    question = str(
        payload.get(
            "question",
            "",
        )
    ).strip()

    return await answer_question(
        question
    )


@app.post("/explain")
async def explain(
    payload: Dict[str, Any]
):
    """
    Concept explanation endpoint.
    """

    topic = str(
        payload.get(
            "topic",
            "",
        )
    ).strip()

    return await explain_concept(
        topic
    )


@app.post("/quiz")
async def quiz(
    payload: Dict[str, Any]
):
    """
    Quiz generation endpoint.
    """

    text = str(
        payload.get(
            "text",
            "",
        )
    ).strip()

    return await generate_quiz(
        text
    )


@app.post("/summarize")
async def summarize(
    payload: Dict[str, Any]
):
    """
    Text summarization endpoint.
    """

    text = str(
        payload.get(
            "text",
            "",
        )
    ).strip()

    return await summarize_text(
        text
    )


@app.post(
    "/learn/recommendations"
)
async def learning_recommendations(
    payload: Dict[str, Any]
):
    """
    Personalized learning-path endpoint.
    """

    topic = str(
        payload.get(
            "topic",
            "",
        )
    ).strip()

    level = str(
        payload.get(
            "level",
            "beginner",
        )
    ).strip()

    return await get_learning_recommendations(
        topic,
        level,
    )