let questions = []; // Placeholder for the fetched questions
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const leaderboardSection = document.getElementById("leaderboard-section");
const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const leaderboard = document.getElementById("leaderboard");

// Event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", loadNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// Fetch questions from JSON file
async function fetchQuestions() {
    try {
        const response = await fetch("questions.json");
        if (!response.ok) {
            throw new Error("Failed to load questions");
        }
        questions = await response.json();
    } catch (error) {
        console.error(error);
        alert("Error loading quiz questions. Please try again later.");
    }
}

// Start the quiz
function startQuiz() {
    if (questions.length === 0) {
        alert("No questions loaded. Please try again.");
        return;
    }

    score = 0;
    currentQuestionIndex = 0;
    startSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    loadQuestion();
}

// Load the current question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextBtn.classList.add("hidden");
}

// Check the selected answer
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainer.getElementsByTagName("button");

    Array.from(buttons).forEach((button, index) => {
        button.disabled = true;
        if (index === currentQuestion.correctAnswer) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
    });

    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    }

    nextBtn.classList.remove("hidden");
}

// Load the next question or show the leaderboard
function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showLeaderboard();
    }
}

// Show the leaderboard
function showLeaderboard() {
    quizSection.classList.add("hidden");
    leaderboardSection.classList.remove("hidden");

    leaderboard.innerHTML = `
        <li>Your Score: ${score}/${questions.length}</li>
    `;
}

// Restart the quiz
function restartQuiz() {
    leaderboardSection.classList.add("hidden");
    startSection.classList.remove("hidden");
}

// Initialize quiz
fetchQuestions();
