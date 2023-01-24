let startBtn = document.getElementById('start'); //Start button
let timerCounterEl = document.getElementById('time'); //timer display
let highScoreEl = document.querySelector(".scores"); //score div
let questionContainer = document.getElementById("questions"); //Question div
let question = document.getElementById("question-title"); //Questions
let optionsContainer = document.getElementById("choices"); //Options div

let questionBank = [
  {
      question: 'What does CSS mean?',
      options: ['Cascadded Style Sheet', 'Cascended Style Sheet', '21', '17', ],
      correctAnswer: 0,
      optionOne: 'Cascadded Style Sheet',
      optionTwo: 'Cascended Style Sheet',
      optionThree: '21',
      optionFour: '17',
      answer: 'optionOne',
  },
  {
      question:"What does HTML mean?",
      options: ['Hypertext Markup Language', 'Hyperlink Markup Language', 'Shanghai', 'None of the above'],
      correctAnswer: 2,
      optionOne: "Hypertext Markup Language",
      optionTwo: "Hyperlink Markup Language",
      optionThree: "Shanghai",
      optionFour: "None of the above",
      answer: 1,
  },
  {
      question: "How do you create a function in JavaScript?",
      options: ['Function MyFunction()', 'Function:myFunction()', 'Function = MyFunction()', 'Function'],
      correctAnswer: 1,
      optionOne: "Function MyFunction()",
      optionTwo: "Function:myFunction()",
      optionThree: "Function = MyFunction()",
      optionFour: "Function",   
      answer: 'optionTwo',
  }
]

let timer;
let timerCount;
let score = 0;
var scoreCounter = 0;
var loseCounter = 0;
var isWin = false;

let shuffleQuestions, currentQuestion;

// The init function is called when the page loads 
function init() {
  getHighScores();
}

//create function to start the quiz
function startQuiz() {
  timerCount = 10;
  //random questions
  shuffleQuestions = questionBank.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  startTimer();
  renderQuiz();
  // nextQuiz();
}

//To display the quiz
function renderQuiz(){
  questionContainer.classList.remove('hide');
  question.textContent = questionBank[0].question;
  const list = document.createElement('ul');
  for (let i = 0; i < questionBank[0].options.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = questionBank[0].options[i];
    list.appendChild(btn);
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      if (btn === answer){
        prompt('Correct');
      }
      else { prompt('Incorrect'); }
    });
  }
  optionsContainer.appendChild(list);
  startBtn.disabled = true; // prevent the start button from responding while round is still on.
}

// These functions are used by init
function getHighScores() {
  // Get stored value from client storage, if it exists
  var lastHighScores = localStorage.getItem("highScore");  
  // If stored value doesn't exist, set counter to 0
  if (lastHighScores === null) {
    scoreCounter = 0;
  } else {
    // If a value is retrieved from client storage set the scoreCounter to that value
    scoreCounter = lastHighScores;
  }
  //Render win count to page
  win.textContent = scoreCounter;
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerCounterEl.textContent = timerCount;
    if(timerCount === 0){
      clearInterval(timer);
      return timerCount = 0;
    }
  }, 1000);
}

startBtn.addEventListener('click', startQuiz);


// Calls init() so that it fires when page opened
init();

