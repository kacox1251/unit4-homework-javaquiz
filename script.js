var questionIndex = 0;
var correct = 0;
var incorrect = 0;
var count = 90;
var timer;

var questionTitle = document.querySelector(".question-title");
var startBtn = document.querySelector("#start-button");
var highScoresBtn = document.querySelector("#view-scores");
var submitScoreBtn = document.querySelector("#submit-button");
var optionsContainer = document.querySelector(".options-container");
var highScoreEl = document.querySelector("#highscores");
var frontPageEl = document.querySelector("#front-page");
var questionContainerEl = document.querySelector(".question-container");
var yourScoreEl = document.querySelector(".your-score");
var correctEl = document.querySelector(".correct");
var incorrectEl = document.querySelector(".incorrect");
var allDoneEl = document.querySelector("#done");
var timerEl = document.querySelector("#timer");
var tryAgainBtn = document.querySelector("#try-again");


var hasHiddenClass = highScoreEl.classList.contains("hidden");

function increaseIndex() {
  return questionIndex++;
}

function checkAnswer(userChoice) {
  if (userChoice === questions[questionIndex].answer) {
    console.log("correct");
    correct++;
  } else {
    console.log("incorrect");
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
  console.log(event);
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

startBtn.addEventListener("click", function(event) {
  timer = setInterval(function() {
    document.querySelector("#timer").innerText = count;
    count--;

    if (count <= 0) {
      clearInterval(timer);
      endGame();
    }
    console.log(count);
  }, 1000);

  frontPageEl.classList.add("hidden");
  highScoresBtn.classList.add("hidden");
  nextQuestion();

  if (questionContainerEl.classList.contains("hidden")) {
    questionContainerEl.classList.remove("hidden");
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


});

//TODO: Next steps:
/* 
1. We need to create a click handler for the submit on add initials (only should fire if the input value length is greater than 0)
2.Click Handler should gather together the score and initials. Read from local storage, determine if in fact the current score belongs in the
high scores. Add it in the appropriate place and save to local storage
3. View High scores when trigger, should read from local storage and check for high scores and if they exist should display that data.
4. High scores button should disappear after start button is pressed
5. Reset all scores when go back button is pressed
6. Go back button should do similar functions to the high scores button
7. High scores need to be organized highest to lowest
8. High scores need to go from local storage onto an ordered list

*/