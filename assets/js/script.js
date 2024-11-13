let startBtn = document.getElementById("start-button");
let intro = document.getElementById("intro");
let restart = document.getElementById("restart-button");
let questionSpan = document.getElementById("question");
let buttons = document.querySelectorAll(".btn");
let results = document.getElementById("results");
let finalResult = document.getElementById("final-result");
let totalCorrect = 0;
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
                        btn.innerText = choice.option;}
                    if (choice.correct){
                        btn.dataset.correct = choice.correct;
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
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    currentQuestion += 1;
    if (currentQuestion < 3) {
        getNextQuestion();
    } else {
        calculateResults();
    }
}


// this function counts how many points a user has, it then calculates the points to give the results 
function calculateResults() {
    let result = "";
    if (totalCorrects <= 3 ) {
        result = `Average! your level of knowledge is calculated according to your correct answers.`;
    } else if (totalCorrects > 3 && totalCorrects <= 6) {
        result = "Moderate! your knowledge level is moderate and it is calculated according to your number of correct answers";
    } else if (totalCorrects > 8 && totalCorrects <= 10) {
        result = "Higher!  according to your given answers your level of Knowledge is higher.";
    }

    // add hide and remove hides for when certain buttons are clicked
    finalResult.classList.remove("hide");
    game.classList.add("hide");
    finalResult.innerText = `congratulations ${result}`;
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
    totalCorrects = 0;
    finalResult.classList.add("hide");
}
const questions = [{
    question: "How many days does it take for the Earth to orbit the Sun?",
    choices: [{
            option: "360",
            correct: false
        },
        {
            option: "365",
            correct: true
        },
        {
            option: "350",
            correct: false
        },
        {
            option: "356",
            correct: false
        }
    ]
},
{
    question: "What country has the most islands in the world?",
    choices: [{
            option: "England",
            correct: false
        },
        {
            option: "Sweden",
            correct: true
        },
        {
            option: "Australia",
            correct: false
        },
        {
            option: "Germany",
            correct: false
        }
    ]
},
{
    question: "When was Netflix founded?",
    choices: [{
            option: "2007",
            correct: false
        },
        {
            option: "1997",
            correct: true
        },
        {
            option: "2014",
            correct: false
        },
        {
            option: "1994",
            correct: false
        }
    ]
},
{
    question: "What country has the most islands in the world?",
    choices: [{
            option: "England",
            correct: false
        },
        {
            option: "Sweden",
            correct: true
        },
        {
            option: "Australia",
            correct: false
        },
        {
            option: "Germany",
            correct: false
        }
    ]
}]