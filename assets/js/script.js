// DOM Elements
const startBtn = document.getElementById('start'); // Start button
const timerCounterEl = document.getElementById('time'); // Timer display
const highScoreEl = document.querySelector(".scores"); // High score div
const questionContainer = document.getElementById("questions"); // Question container
const question = document.getElementById("question-title"); // Question title
const optionsContainer = document.getElementById("choices"); // Options container

// Question Bank
const questionBank = [
  {
    question: 'What does CSS mean?',
    options: ['Cascaded Style Sheet', 'Cascended Style Sheet', '21', '17'],
    correctAnswer: 0
  },
  {
    question: "What does HTML mean?",
    options: ['Hypertext Markup Language', 'Hyperlink Markup Language', 'Shanghai', 'None of the above'],
    correctAnswer: 0
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ['Function MyFunction()', 'Function:myFunction()', 'Function = MyFunction()', 'Function'],
    correctAnswer: 0
  }
];

// State Variables
let timer;
let timerCount;
let score = 0;
let currentQuestion = 0;

// Initialize quiz
function init() {
  getHighScores();
  resetUI();
}

// Reset UI
function resetUI() {
  questionContainer.classList.add('hide');
  optionsContainer.innerHTML = '';
  timerCounterEl.textContent = '0';
  highScoreEl.textContent = '';
  startBtn.disabled = false;
}

// Start Quiz
function startQuiz() {
  if (!questionBank || questionBank.length === 0) {
    alert("No questions available! Please add questions to the quiz.");
    return;
  }
  timerCount = 30;
  score = 0;
  currentQuestion = 0;
  resetUI();
  startBtn.disabled = true; // Disable start button during the quiz
  shuffleQuestions();
  startTimer();
  renderQuiz();
}

// Shuffle questions
function shuffleQuestions() {
  questionBank.sort(() => Math.random() - 0.5);
}

// Render quiz question and options
function renderQuiz() {
  if (currentQuestion >= questionBank.length) {
    endQuiz();
    return;
  }
  const current = questionBank[currentQuestion];
  questionContainer.classList.remove('hide');
  question.textContent = current.question;
  optionsContainer.innerHTML = ''; // Clear previous options

  current.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('option-btn');
    btn.setAttribute('data-index', index);
    btn.setAttribute('tabindex', '0'); // Accessibility for keyboard navigation
    optionsContainer.appendChild(btn);

    // Handle button click
    btn.addEventListener('click', () => checkAnswer(index, btn));
  });
}

// Check answer
function checkAnswer(selectedIndex, button) {
  const current = questionBank[currentQuestion];
  const correctIndex = current.correctAnswer;

  // Highlight correct/incorrect answers
  button.style.backgroundColor = selectedIndex === correctIndex ? 'green' : 'red';
  optionsContainer.querySelectorAll('button').forEach((btn, index) => {
    if (index === correctIndex) btn.style.backgroundColor = 'green';
    btn.disabled = true; // Disable all buttons after selection
  });

  // Update score
  if (selectedIndex === correctIndex) score++;

  // Delay before showing the next question
  setTimeout(() => {
    currentQuestion++;
    renderQuiz();
  }, 1000);
}

// End quiz
function endQuiz() {
  clearInterval(timer); // Stop timer
  alert(`Quiz over! Your final score: ${score}/${questionBank.length}`);
  saveHighScore();
  resetUI();
  startBtn.disabled = false; // Allow restarting the quiz
}

// Save high score
function saveHighScore() {
  const lastHighScores = localStorage.getItem("highScore");
  const highScore = lastHighScores ? Math.max(score, lastHighScores) : score;
  localStorage.setItem("highScore", highScore);
  highScoreEl.textContent = `High Score: ${highScore}`;
}

// Get high scores from local storage
function getHighScores() {
  const lastHighScores = localStorage.getItem("highScore");
  const highScore = lastHighScores || 0;
  highScoreEl.textContent = `High Score: ${highScore}`;
}

// Timer logic
function startTimer() {
  timerCounterEl.textContent = timerCount;
  timer = setInterval(() => {
    timerCount--;
    timerCounterEl.textContent = timerCount;

    if (timerCount <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// Event Listener for Start Button
startBtn.addEventListener('click', startQuiz);

// Initialize the application
init();


