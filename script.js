//variables
var questionIndex = 0;
var correct = 0;
var incorrect = 0;
var count = 90;
var timer;
var users = [];
var scores = [];

var frontPageEl = document.querySelector("#front-page");
var highScoresBtn = document.querySelector("#view-scores");
var startBtn = document.querySelector("#start-button");

var timerEl = document.querySelector("#timer");
var questionContainerEl = document.querySelector(".question-container");
var questionTitle = document.querySelector(".question-title");
var optionsContainer = document.querySelector(".options-container");

var allDoneEl = document.querySelector("#done");
var correctEl = document.querySelector(".correct");
var incorrectEl = document.querySelector(".incorrect");
var yourScoreEl = document.querySelector(".your-score");
var userInitials = document.querySelector("#initials");
var submitScoreBtn = document.querySelector("#submit-button");

var highScoreEl = document.querySelector("#highscores");
var highScoresList = document.querySelector("#score-list");
var tryAgainBtn = document.querySelector("#try-again");
var clearScoresList = document.querySelector("#clear");

var hasHiddenClass = highScoreEl.classList.contains("hidden");

//functions
function increaseIndex() {
  return questionIndex++;
}

function checkAnswer(userChoice) {
  if (userChoice === questions[questionIndex].answer) {
    correct++;
  } else {
    count -= 15;
    incorrect++;
  }
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].title;

  optionsContainer.textContent = "";
  for (var i = 0; i < questions[questionIndex].choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice-button");
    choiceBtn.textContent = questions[questionIndex].choices[i];
    optionsContainer.append(choiceBtn);

    choiceBtn.addEventListener("click", addButtonChoiceListener);
  }
}

function addButtonChoiceListener(event) {
  var userChoice = event.target.innerText;
  checkAnswer(userChoice);
  increaseIndex();

  if (questionIndex >= questions.length) {
    endGame();
    return;
  }
  nextQuestion();
}

function endGame() {
  clearInterval(timer);

  questionContainerEl.classList.add("hidden");

  correctEl.textContent = correct;
  incorrectEl.textContent = incorrect;
  yourScoreEl.textContent = correct * 15;

  allDoneEl.classList.remove("hidden");
  timerEl.classList.add("hidden");
}

//events
startBtn.addEventListener("click", function(event) {
  document.querySelector("#timer").innerText = count;

  timer = setInterval(function() {
    count--;
    document.querySelector("#timer").innerText = count;
    
    if (count <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
  
  frontPageEl.classList.add("hidden");
  nextQuestion();

  if (questionContainerEl.classList.contains("hidden") || timerEl.classList.contains("hidden")) {
    questionContainerEl.classList.remove("hidden");
    timerEl.classList.remove("hidden");
  }
});

highScoresBtn.addEventListener("click", function(event) {
  if (hasHiddenClass) {
    highScoreEl.classList.remove("hidden");
    frontPageEl.classList.add("hidden");
  } else {
    highScoreEl.classList.add("hidden");
    frontPageEl.classList.remove("hidden");
  }
});

submitScoreBtn.addEventListener("click", function(event) {
  if (userInitials.value) {
    users.push(userInitials.value);
    localStorage.setItem("users:", users);
    localStorage.getItem("users:");

    scores.push(yourScoreEl.textContent);
    scores.sort(function(a, b){return b-a});

    localStorage.setItem("highscores", [scores]);
    localStorage.getItem("highscores:");

    var storageString = JSON.stringify(localStorage);
    var storageParse = JSON.parse(storageString);

    console.log(storageParse);
  } else {
    console.log("nope")
  }

  if (hasHiddenClass) {
    highScoreEl.classList.remove("hidden");
    allDoneEl.classList.add("hidden");
  } else {
    highScoreEl.classList.add("hidden");
    allDoneEl.classList.remove("hidden");
  }
});

tryAgainBtn.addEventListener("click", function(event) {
  questionIndex = 0;
  count = 90;
  correct = 0;
  incorrect = 0;

  if (hasHiddenClass) {
    highScoreEl.classList.add("hidden");
    frontPageEl.classList.remove("hidden");
  } else {
    highScoreEl.classList.remove("hidden");
    frontPageEl.classList.add("hidden");
  }
});

clearScoresList.addEventListener("click", function(event) {
  users = [];
  scores = [];
  localStorage.clear();
});
//TODO: Next steps:
/* 
1. We need to create a click handler for the submit on add initials (only should fire if the input value length is greater than 0)
2. Click Handler should gather together the score and initials. Read from local storage, determine if in fact the current score belongs in the
high scores. Add it in the appropriate place and save to local storage
3. View High scores when trigger, should read from local storage and check for high scores and if they exist should display that data.
7. High scores need to be organized highest to lowest
8. High scores need to go from local storage onto an ordered list
9. Clear High scores needs to clear (and possibly also the element)
*/