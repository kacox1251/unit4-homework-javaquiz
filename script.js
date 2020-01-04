var questionIndex = 0;
var questionTitle = document.querySelector(".question-title");

var startBtn = document.querySelector("#start-button");
var highScoresBtn = document.querySelector("#view-scores");
var correct = 0;
var incorrect = 0;
highScoresBtn.addEventListener("click", function(event) {
  var highScoreEl = document.querySelector("#highscores");
  var frontPageEl = document.querySelector("#front-page");
  var hasHiddenClass = highScoreEl.classList.contains("hidden");
  if (hasHiddenClass) {
    highScoreEl.classList.remove("hidden");
    frontPageEl.classList.add("hidden");
  } else {
    highScoreEl.classList.add("hidden");
    frontPageEl.classList.remove("hidden");
  }
});
var count = 91;
var timer;
startBtn.addEventListener("click", function(event) {
  var questionContainerEl = document.querySelector(".question-container");
  if (questionContainerEl.classList.contains("hidden")) {
    questionContainerEl.classList.remove("hidden");
  }
  timer = setInterval(function() {
    count--;
    document.querySelector("#timer").innerText = count;

    if (count === 0) {
      clearInterval(timer);
    }
  }, 1000);
  var frontPageEl = document.querySelector("#front-page");
  frontPageEl.classList.add("hidden");
  nextQuestion();
});

function increaseIndex() {
  return questionIndex++;
}

function endGame() {
  questionIndex = 0;
  count = 91;
  clearInterval(timer);
  var questionContainerEl = document.querySelector(".question-container");
  var yourScoreEl = document.querySelector(".your-score");
  var correctEl = document.querySelector(".correct");
  var incorrectEl = document.querySelector(".incorrect");
  var allDoneEl = document.querySelector("#done");
  questionContainerEl.classList.add("hidden");
  correctEl.textContent = correct;
  incorrectEl.textContent = incorrect;
  yourScoreEl.textContent = correct * 15;
  allDoneEl.classList.remove("hidden");
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

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].title;

  var optionsContainer = document.querySelector(".options-container");
  optionsContainer.textContent = "";
  for (var i = 0; i < questions[questionIndex].choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice-button");
    choiceBtn.textContent = questions[questionIndex].choices[i];
    optionsContainer.append(choiceBtn);

    choiceBtn.addEventListener("click", addButtonChoiceListener);
  }
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

//start button changes the screen to the first question, starts the timer, and starts score keeping

//check back to picture carousel to get a hint of what to do when changing questions
//after question is answered, use an on click to change to the next question
//the right choice turns green
//each wrong answer deducts x amount of time, the choice turns red

//after time runs out, or player completes questions, change to screen that says "All done!"
//completing questions sets timer to zero
//have it read the players high score
//have an input for players initials
//after submitting initials, add the scores and initials to local storage
//changes to screen that displays all the high scores from local storage
//include a button that takes you back to the start of the quiz
//include a button that clears all info from local storage
//the timer disappears and the "view high scores" button disappears
