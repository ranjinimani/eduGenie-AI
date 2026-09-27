const task =
    document.querySelector("#task");

const input =
    document.querySelector("#user-input");

const label =
    document.querySelector("#input-label");

const levelWrap =
    document.querySelector("#level-wrap");

const level =
    document.querySelector("#level");

const button =
    document.querySelector("#submit-btn");

const resultCard =
    document.querySelector("#result-card");

const result =
    document.querySelector("#result");

const errorBox =
    document.querySelector("#error");

const copyButton =
    document.querySelector("#copy-btn");

const characterCount =
    document.querySelector("#character-count");


/*
===========================================================
UI TEXT
===========================================================
*/

const ui = {

    qa: [
        "Question",
        "Type your question..."
    ],

    explain: [
        "Concept",
        "e.g. Explain photosynthesis"
    ],

    quiz: [
        "Passage",
        "Paste the passage from which you want three MCQs."
    ],

    summarize: [
        "Text",
        "Paste the educational text you want summarized."
    ],

    learn: [
        "Topic",
        "e.g. SQL, Python, or machine learning"
    ]

};


/*
===========================================================
UPDATE FORM
===========================================================
*/

function updateForm() {

    const selected =
        ui[task.value];

    label.textContent =
        selected[0];

    input.placeholder =
        selected[1];

    levelWrap.classList.toggle(
        "hidden",
        task.value !== "learn"
    );

    input.value = "";

    resultCard.classList.add(
        "hidden"
    );

    errorBox.classList.add(
        "hidden"
    );

    updateCharacterCount();
}


task.addEventListener(
    "change",
    updateForm
);


/*
===========================================================
CHARACTER COUNT
===========================================================
*/

function updateCharacterCount() {

    characterCount.textContent =
        input.value.length;
}


input.addEventListener(
    "input",
    updateCharacterCount
);


/*
===========================================================
ESCAPE HTML
===========================================================
*/

function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}


/*
===========================================================
QUIZ RENDERING
===========================================================
*/

function renderQuiz(data) {

    if (
        !data.questions ||
        !Array.isArray(data.questions)
    ) {
        return `
            <p>
                Quiz data was not returned correctly.
            </p>
        `;
    }


    return data.questions
        .map(
            (question, index) => {

                const options =
                    question.options
                        .map(
                            option => {

                                const isCorrect =
                                    option ===
                                    question.correct_answer;

                                return `
                                    <div
                                        class="
                                            option
                                            ${isCorrect
                                                ? "correct"
                                                : ""}
                                        "
                                    >
                                        ${escapeHtml(option)}
                                    </div>
                                `;
                            }
                        )
                        .join("");


                return `
                    <article
                        class="quiz-question"
                    >

                        <h3>
                            ${index + 1}.
                            ${escapeHtml(
                                question.question
                            )}
                        </h3>

                        ${options}

                        <div
                            class="explanation"
                        >

                            <strong>
                                Correct answer:
                            </strong>

                            ${escapeHtml(
                                question.correct_answer
                            )}

                            <br><br>

                            ${escapeHtml(
                                question.explanation || ""
                            )}

                        </div>

                    </article>
                `;
            }
        )
        .join("");
}


/*
===========================================================
SUBMIT
===========================================================
*/

async function submit() {

    const value =
        input.value.trim();


    if (!value) {

        errorBox.textContent =
            "Please enter some content first.";

        errorBox.classList.remove(
            "hidden"
        );

        return;
    }


    button.disabled = true;

    button.textContent =
        "Thinking...";


    errorBox.classList.add(
        "hidden"
    );


    resultCard.classList.remove(
        "hidden"
    );


    result.textContent =
        "Generating your learning response...";


    const endpoints = {

        qa: [
            "/qa",
            {
                question: value
            }
        ],

        explain: [
            "/explain",
            {
                topic: value
            }
        ],

        quiz: [
            "/quiz",
            {
                text: value
            }
        ],

        summarize: [
            "/summarize",
            {
                text: value
            }
        ],

        learn: [
            "/learn/recommendations",
            {
                topic: value,
                level: level.value
            }
        ]

    };


    const [
        endpoint,
        body
    ] = endpoints[
        task.value
    ];


    try {

        const response =
            await fetch(
                endpoint,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(body)
                }
            );


        let data;

        try {

            data =
                await response.json();

        } catch {

            throw new Error(
                "The server returned an invalid response."
            );
        }


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Request failed."
            );
        }


        if (
            task.value === "quiz"
        ) {

            result.innerHTML =
                renderQuiz(data);

        } else {

            result.textContent =
                data.answer ||
                data.summary ||
                data.plan ||
                "No response returned.";

        }

    } catch (error) {

        resultCard.classList.add(
            "hidden"
        );

        errorBox.textContent =
            error.message ||
            "Something went wrong.";

        errorBox.classList.remove(
            "hidden"
        );

    } finally {

        button.disabled = false;

        button.textContent =
            "Generate";
    }
}


/*
===========================================================
COPY
===========================================================
*/

async function copyResult() {

    const text =
        result.innerText;


    if (!text) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            text
        );

        copyButton.textContent =
            "Copied";

        setTimeout(
            () => {
                copyButton.textContent =
                    "Copy";
            },
            1200
        );

    } catch {

        copyButton.textContent =
            "Copy failed";

        setTimeout(
            () => {
                copyButton.textContent =
                    "Copy";
            },
            1200
        );
    }
}


/*
===========================================================
EVENT LISTENERS
===========================================================
*/

button.addEventListener(
    "click",
    submit
);


copyButton.addEventListener(
    "click",
    copyResult
);


input.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            submit();
        }
    }
);


/*
===========================================================
INITIALIZATION
===========================================================
*/

updateForm();
updateCharacterCount();