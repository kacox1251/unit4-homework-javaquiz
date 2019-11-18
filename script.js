var questionIndex = 0;

var questionTitle = document.createElement("h2");
questionTitle.setAttribute("class", "question-title");
questionTitle.textContent = questions[questionIndex].title;

document.querySelector(".question-container").append(questionTitle);

var startBtn = document.querySelector("#start-button");

startBtn.addEventListener("click", function(event) {
    questionIndex++;
    questionTitle.textContent = questions[questionIndex].title;
    
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice-button");
        choiceBtn.textContent = questions[questionIndex].choices[i];
        document.querySelector(".question-container").append(choiceBtn);
    }
});

//     var count = 91;
//     var timer = setInterval(function() {
//         count--;
//         document.querySelector('#timer').innerText=count;
        
//         if(count === 0){
//             clearInterval(timer);
//         }
//     }, 1000);



//start button changes the screen to the first question, starts the timer, and starts score keeping

//check back to picture carousel to get a hint of what to do when changing questions
//after question is answered, use an on click to change to the next question
//score is calculated by time remaining, the right choice turns green
//each wrong answer deducts x amount of time, the choice turns red
//if found and have time maybe add sounds for right and wrong answers

//after time runs out, or player completes questions, change to screen that says "All done!"
//completing questions sets timer to zero
//have it read the players high score
//have an input for players initials
//after submitting initials, add the scores and initials to local storage
//changes to screen that displays all the high scores from local storage
//include a button that takes you back to the start of the quiz
//include a button that clears all info from local storage
//the timer disappears and the "view high scores" button disappears