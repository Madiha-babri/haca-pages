let startBtn = document.getElementById("start-button");
let intro = document.getElementById("intro");
let restart = document.getElementById("restart-button");
let questionSpan = document.getElementById("question");
let buttons = document.querySelectorAll(".btn");
let results = document.getElementById("results");
let finalResult = document.getElementById("final-result");
let totalPoints = 0;
let currentQuestion = 0;
let shuffleQuestions;
let shuffledChoices;
let game = document.getElementById("game");


startBtn.addEventListener("click", startGame);

// function to start the game
function startGame() {
    game.classList.remove("hide");
    startBtn.classList.add("hide");
    intro.classList.add("hide");
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    getNextQuestion();
}

// function to go to the next question after one is answered
function getNextQuestion() {
    shuffleQuestions.forEach((question, questionIndex) => {
        if (questionIndex == currentQuestion) {
            shuffledChoices = question.choices.sort(() => Math.random() - 0.5);
            questionSpan.innerText = question.question;
            shuffledChoices.forEach((choice, choiceIndex) => {
                buttons.forEach((btn, buttonIndex) => {
                    if (choiceIndex == buttonIndex) {
                        btn.innerText = choice.option;
                        btn.dataset.points = choice.points;
                    }
                });
            });
        }
    });
}

// buttons for each question
buttons.forEach(btn => {
    btn.addEventListener("click", userSelectedButton);
});

// function for when the user selects a button to add points
function userSelectedButton(e) {
    totalPoints += parseInt(e.target.dataset.points);
    currentQuestion += 1;
    if (currentQuestion < 12) {
        getNextQuestion();
    } else {
        calculateResults();
    }
}

// this function counts how many points a user has, it then calculates the points to give the results 
function calculateResults() {
    let result = "";
    if (totalPoints <= 4) {
        result = `Thor! Because like Thor, you have a very charming personality! You know how to work a room, with your bold, energetic presence!`;
    } else if (totalPoints > 4 && totalPoints <= 8) {
        result = "Captain America! Sweet, kind and thoughtful are the words to describe your personailty as well as Cap A! Always working to serve others, because helping others is your main focus.";
    } else if (totalPoints > 8 && totalPoints <= 12) {
        result = "Nick Fury! Along with your witty personality, sharp workmanship and even better sense of humor is your ability to take the lead. You are a decisive, capable. principled person.";
    } else if (totalPoints > 12 && totalPoints <= 18) {
        result = "Ironman! You love being the center of attention? Whilst being an extrovert, and the center of every room you have a brain that works like no other. You are hugely intelligent, and caring. ";
    } else if (totalPoints > 18 && totalPoints <= 24) {
        result = "Black Widow! You are very practical. Although you love to be free, you are drawn to understand how things work. Things never slide by you.";
    } else if (totalPoints > 24 && totalPoints <= 29) {
        result = "Hulk! As an extremely emotional indiviual with a slight temper problem, you relate most you the Hulk! Do you have trouble remembering important dates? Well so does he!";
    } else if (totalPoints > 29 && totalPoints <= 36) {
        result = "Hawkeye! A very strong introvert. You think very logically, extremely observant of what goes on around you in the real world.";
    }

    // add hide and remove hides for when certain buttons are clicked
    finalResult.classList.remove("hide");
    game.classList.add("hide");
    finalResult.innerText = `Your personality is most similar to ${result}`;
    results.classList.remove("hide");
    restart.classList.remove("hide");
}

restart.addEventListener("click", resetGame);

// function to reset the game
function resetGame() {
    restart.classList.add("hide");
    startBtn.classList.remove("hide");
    intro.classList.remove("hide");
    currentQuestion = 0;
    totalPoints = 0;
    finalResult.classList.add("hide");
}
