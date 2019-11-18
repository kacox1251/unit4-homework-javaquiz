var questionIndex = 0;




//start button changes the screen to the first question, starts the timer, and starts score keeping
function startGame() {
    //create a timer to count down until the end
    var count = 91;
    var timer = setInterval(function() {
        count--;
        document.querySelector('#timer').innerText=count;
        
        if(count === 0){
            clearInterval(timer);
        }
    }, 1000);
    
    document.querySelectorAll(".question-container").innerHTML = `
    <h2 class="question-title"></h2>
    <button class="choice"></button>
    <button class="choice"></button>
    <button class="choice"></button>
    <button class="choice"></button>`
}


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