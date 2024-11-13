


//global variant for the game
let question = document.getElementById("question");
const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);
var selectedValue = null;
let correctAnswerScore = 0;
let incorrectAnswerScore = 0;
let shuffledQuestions, currentQuestionIndexNumber;

/**
 * This function will start the game, by pressing ''Start'' button you will be redirected 
 * to where the game takes place.
 */
function startGame() {
    startButton.classList.add("hide");
    intro.classList.add("hide");
    document.getElementById("question").classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndexNumber = 0;
    document.getElementById("answer-buttons").classList.remove("hide"); 
    setNextQuestion();
    displayQuestion();
}

/**
 * This function will display a new question after user press
 * Submit and next button.
 */
function displayNextQuestion() {
    document.getElementById("next-btn").classList.add("hide");
    document.getElementById("submit-btn").classList.remove("hide");
    resetBackgroundColor();
    displayQuestion();
}

/**
 * This function will call from data base a different random question
 */
function setNextQuestion() {
    displayNextQuestion(shuffledQuestions[currentQuestionIndexNumber]);
}

/**
 * This tracker will keep the number of question answered, 
 * when the answer == 10 will show personal message
 */
function questionTracker() {
    currentQuestionIndexNumber += 1;
    let nextQuestBtn = document.getElementById("next-btn");
    if (currentQuestionIndexNumber == 10) {
        nextQuestBtn.innerHTML = "Show Results";
    }
}


/**
 * This function will display the questions from questionnaire to
 * each button a, b, c, d
 */
function displayQuestion() {
    let theQ = document.getElementById("question");
    theQ.innerHTML = shuffledQuestions[currentQuestionIndexNumber].question;
    let questionNumber = document.getElementById("question-number");
    questionNumber.innerHTML = currentQuestionIndexNumber + 1;
    let a = document.getElementsByClassName("btn")[0];
    a.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[0].answer;
    let b = document.getElementsByClassName("btn")[1];
    b.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[1].answer;
    let c = document.getElementsByClassName("btn")[2];
    c.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[2].answer;
    let d = document.getElementsByClassName("btn")[3];
    d.innerHTML = shuffledQuestions[currentQuestionIndexNumber].answers[3].answer;

    const buttons = document.getElementsByClassName("btn")
    for (const button of buttons) {
        button.disabled = false;
    }
}

/**
 * When answer is selected this in innerHTML.
 */
function answerSelected() {
    selectedValue = this.innerHTML;
}

/**
 * When answer clicked, this will change his propriety from initial
 * color to teal color.
 * 
 */
function answerHighlighted() {
    resetBackgroundColor()
    this.style.backgroundColor = "teal";
}

/**
 * Once a button is pressed and the user moves to next question,
 * all the answer buttons will be reset to the initial color.
 * 
 */
function resetBackgroundColor() {
    let buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "#006487";
    }
}

//event listeners to the selected answer on clicks
let buttons = document.getElementsByClassName("btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", answerHighlighted);
    buttons[i].addEventListener("click", answerSelected);
}

/**
 * checkAnswer will check the answer if the answer is correct
 * the user will receive 1 correct answer if not, 1 incorrect answer.
 */
function checkAnswer() {
    let buttons = document.getElementsByClassName("btn");
    for (const button of buttons) {
        button.disabled = true;
    }
    if (selectedValue === shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === selectedValue) {
                buttons[i].style.backgroundColor = "green";
            }
        }
    } else if (selectedValue !== shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === selectedValue) {
                buttons[i].style.backgroundColor = "Red";
            } else if (buttons[i].textContent === shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
                buttons[i].style.backgroundColor = "green";
            }
        }
    }
    selectedValue = null;
}

/**
 * This function will count the score every time when a question
 * has been answer. Incorrect / correct.
 */
function countScore() {
    if (selectedValue === shuffledQuestions[currentQuestionIndexNumber].correctAnswer) {
        correctAnswerScore += 1;
    } else {
        incorrectAnswerScore += 1;
    }
}
//global variant for the game
//create variable of the submitAnswers and nextQuestions button
let submitAnsBtn = document.getElementById("submit-btn");
let nextQuestBtn = document.getElementById("next-btn");

/**
 * Once 'Submit' button is pressed, the next button will be present
 * directing you on to the next question.
 */
function nextQuestionsButtonDisplay() {
    document.getElementById("next-btn").classList.remove("hide");
    document.getElementById("submit-btn").classList.add("hide");
}

/**
 * This function will submit the answer 
 * by pressing 'submit' button.
 * 
 */
function submitAnswer() {
    if (selectedValue == null) {
        return alert("Please select an answer");
    } else if (selectedValue != null) {
        countScore();
        checkAnswer();
        nextQuestionsButtonDisplay();
        questionTracker();
    }
}

submitAnsBtn.addEventListener("click", submitAnswer);

/**
 * This function will return the results
 * when the test its finish.
 *
 */
function returnResults() {
    let totalScore = correctAnswerScore + incorrectAnswerScore;
    if (totalScore === 10) {
        document.getElementById("question").classList.add("hide");
        document.getElementById("answer-buttons").classList.add("hide");
        document.getElementById("next-btn").classList.add("hide");
        document.getElementById("submit-btn").classList.add("hide");
        document.getElementById("result-box").classList.remove("hide");
    }
    //variable of userScore
    let userScore = document.getElementById("user-score");
    userScore.innerHTML = correctAnswerScore;
    let personalMessage = document.getElementById("personal-message");
    if (correctAnswerScore == 0) {
        personalMessage.innerHTML = "Opps...Looks like you have to start learning... Try again!";
    } else if (correctAnswerScore <= 4) {
        personalMessage.innerHTML = "Try next time! do some more learning.";
    } else if (correctAnswerScore <= 7) {
        personalMessage.innerHTML = "Good Job! your level of knowledge is high";
    } else if (correctAnswerScore == 10) {
        personalMessage.innerHTML = "congratulation! you got highest level of knowledge";
    }
}

//display Next Question
nextQuestBtn.addEventListener("click", displayNextQuestion);

nextQuestBtn.addEventListener("click", returnResults);

/**
 * This function will reset the game values
 * all the values will become now 0.
 */
function resetGameValues() {
    currentQuestionIndexNumber = 1;
    correctAnswerScore = 0;
    incorrectAnswerScore = 0;
    document.getElementById("submit-btn").classList.remove("hide");
    document.getElementById("result-box").classList.add("hide");
    document.getElementById("next-btn").innerHTML = "Next Question";
}

//global variant for the game
//start a new game
let startNewGameBtn = document.getElementById("start-new-game-btn");
startNewGameBtn.addEventListener("click", resetGameValues);
startNewGameBtn.addEventListener("click", startGame);

const questions = [
    {
        question: "How many days does it take for the Earth to orbit the Sun?",
        answers: [
            {
                answer: "360",
                
            },
            {
                answer: "365",
                
            },
            {
                answer: "350",
                
            },
            {
                answer: "356",
                
            }
        ],
        correctAnswer: "365",
    },
    {
        question: "What country has the most islands in the world?",
        answers: [{
            answer: "England",
                
            },
            {
                answer: "Sweden",
                
            },
            {
                answer: "Australia",
                
            },
            {
                answer: "Germany",
                
            }
        ],
        correctAnswer: "Sweden",
    },
    {
        question: "When was Netflix founded?",
        answers: [{
             answer: "2007",
                
            },
            {
                answer: "1997",
                
            },
            {
                answer: "2014",
                
            },
            {
                answer: "1994",
                
            }
        ],
    
        correctAnswer: "1997",
    },
    {
        question: "Name Disney’s first film?",
        answers: [{
            answer: "Lion King",
                
            },
            {
                answer: "Snow White",
              
            },
            {
                answer: "Magnificient",
               
            },
            {
                answer: "Cinderella",
                
            }
        ],
        correctAnswer: "Snow White",
    },
    {
        question: "On a QWERTY keyboard, what letter is P directly next to?",
        answers: [{
            answer: "F",
                
            },
            {
                answer: "G",
                
            },
            {
                answer: "O",
                
            },
            {
                answer: "K",
               
            }
        ],
        correctAnswer: "O",
    },
    {
        question: "Which is the largest city in China?",
        answers: [{
            answer: "Beijing",
                
            },
            {
                answer: "Guangzhou",
                
            },
            {
                answer: "Shanghai",
                
            },
            {
                answer: "Shenzhen",
                
            }
        ],
        correctAnswer: "Shanghai",
    },
    {
        question: "How many elements are there in the periodic table?",
       answers: [{
        answer: "110",
                
            },
            {
                answer: "108",
                
            },
            {
                answer: "161",
                
            },
            {
                answer: "118",
                
            }
        ],
        correctAnswer: "118",
    },
    {
        question: "The father of medicine is considered to be:",
        answers: [{
                answer: "Pericles",
                
            },
            {
                answer: "Einstien",
                
            },
            {
                answer: "Hippocrates",
                
            },
            {
                answer: "Plato",
                
            }
        ],
        correctAnswer: "Hippocrates",
    },
    {
        question: "You can tell how old a tree is by counting its.",
        answers: [{
            answer: "Leaves",
                
            },
            {
                answer: "Roots",
            
            },
            {
                answer: "Trunk Rings",
               
            },
            {
                answer: "Branches",
               
            }
        ],
        correctAnswer: "Trunk Rings",
    },
    {
        question: "What color bow tie does Donald Duck wear?",
        answers: [{
            answer: "Red",
               
            },
            {
                answer: "Yellow",
                
            },
            {
                answer: "Green",
                
            },
            {
                answer: "Blue",
                
            }
        ],
        correctAnswer: "Red",
    },
    {
        question: "How long is an eon?",
        answers: [{
            answer: "A billion years",
                
            },
            {
                answer: "A million years",
                
            },
            {
                answer: "A thousand years",
                
            },
            {
                answer: "A trillion years",
                
            }
        ],
        correctAnswer: "A billion years",
    }]