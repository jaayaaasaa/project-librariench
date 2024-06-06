var startDiv = document.querySelector("#start");
var startBtn = document.querySelector("#start-quiz");

var questionsDiv = document.querySelector("#questions");
var questionNumberEl = document.querySelector("#question-number");
var questionTextEl = document.querySelector("#question");

var answerBtnDiv = document.querySelector("#answer-buttons");
var firstBtn = document.querySelector("#first-option");
var secondBtn = document.querySelector("#second-option");
var thirdBtn = document.querySelector("#third-option");
var fourthBtn = document.querySelector("#fourth-option");

var nextBtn = document.querySelector("#next-question");
var nextDiv = document.querySelector("#next-div");

var completeDiv = document.querySelector("#complete");
var completeMsg = document.querySelector("#complete-msg");
var userScoreEl = document.querySelector("#user-score");
var userScoreMsgEl = document.querySelector("#user-score-msg");
var userInputEl = document.querySelector("#highscore-input");
var inputMessageEl = document.querySelector("#input-message");
var clearBtn = document.querySelector("#clear-highscores");
var retakeBtn = document.querySelector("#retake");

var highscoresDiv = document.querySelector("#highscores");
var highscoreList = document.querySelector("#highscore-list");
var submitBtn = document.querySelector("#submit-highscore");
var returnBtn = document.querySelector("#go-to-start");

var questionCounter = 20;
var questionNumber = 1;
var questionBin = [];
var userScore = 0;
var timeLeft = 120;


var countdownEl = document.querySelector("#countdown");

function countdown() {
    var timerVar = setInterval(function() {
        if (timeLeft < 0) {
            clearInterval(timerVar);
            countdownEl.innerHTML = 0;
            completeMsg.textContent = "Oops, Waktu Habiss!"

            userScoreEl.textContent = userScore + " dari " + 20 + " poin";
            if (userScore <= 3) {
                userScoreMsgEl.textContent = "... Payahhhh :(?";
            } else if (userScore > 3 && userScore <= 5) {
                userScoreMsgEl.textContent = "... Belajar lagii :).";
            } else if (userScore > 5 && userScore <= 7) {
                userScoreMsgEl.textContent = "... Kemampuanmu tidak burukk?";
            } else if (userScore > 7 && userScore <= 9) {
                userScoreMsgEl.textContent = "... Kamu bisa lebih baik lagi.";
            } else if (userScore > 9 && userScore <= 11) {
                userScoreMsgEl.textContent = ", not bad, broo haha.";
            } else if (userScore > 11 && userScore <= 13) {
                userScoreMsgEl.textContent = ", Kerja Bagus!";
            } else if (userScore > 13 && userScore <= 15) {
                userScoreMsgEl.textContent = ", Kamu sangat jeli sekalii!";
            } else if (userScore > 15 && userScore <= 17) {
                userScoreMsgEl.textContent = ", wow, impressive!";
            } else if (userScore > 17 && userScore <= 19) {
                userScoreMsgEl.textContent = ", Kamu pasti mendapat jawaban dari sumber lainn?";
            } else {
                userScoreMsgEl.textContent = "... Are you Albert Einsteinn?";
            }

            questionsDiv.setAttribute("class", "hide");
            completeDiv.setAttribute("class", "show");
            
            questionBin = [];
            questionCounter = 20;
            questionNumber = 1;
            timeLeft = 120;
        } else if (completeDiv.className === "show") {
            clearInterval(timerVar);
        } else {
            countdownEl.innerHTML = timeLeft;
        }
        timeLeft--;
    }, 1000);
}

var startIndex = Math.floor(Math.random() * questionArr.length);
var startQuestion = questionArr[startIndex];
questionBin.push(startIndex);

function checkBinStart() {
    for (var i = 0; i < 1; i++) {
        if (questionBin.includes(startIndex)) {
            startIndex = Math.floor(Math.random() * questionArr.length);
            i--;
        } 
    }
}
 
function showQuestions(event) {
    event.preventDefault();

    questionCounter--; 

    startIndex = Math.floor(Math.random() * questionArr.length);
    checkBinStart();
    startQuestion = questionArr[startIndex];
    questionBin.push(startIndex);

    questionNumberEl.textContent = questionNumber;
    questionTextEl.textContent = startQuestion.question;
    firstBtn.textContent = startQuestion.firstOption;
    secondBtn.textContent = startQuestion.secondOption;
    thirdBtn.textContent = startQuestion.thirdOption;
    fourthBtn.textContent = startQuestion.fourthOption;

    startDiv.setAttribute("class", "hide");
    questionsDiv.setAttribute("class", "show");
    highscoreLink.setAttribute("class", "hide");
}

var currentIndex = Math.floor(Math.random() * questionArr.length);
var currentQuestion = questionArr[currentIndex];

function checkBin() {
    for (var i = 0; i < 1; i++) {
        if (questionBin.includes(currentIndex) && questionBin.length < 21) {
            currentIndex = Math.floor(Math.random() * questionArr.length);
            i--;
        } 
    }
}

checkBin();
questionBin.push(currentIndex);

function scoreIncrement(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.matches("button")) {
        if (questionNumber == 1 && event.target.matches(startQuestion.correctAnswer) === true) {
            userScore++;

            event.target.setAttribute("style", "border: 2px solid rgb(116, 222, 116)");
        } else if (questionNumber == 1 && event.target.matches(startQuestion.correctAnswer) === false){
            timeLeft -= 5;

            event.target.setAttribute("style", "border: 2px solid rgb(218, 72, 72)");
            var correctBtn = document.querySelector(startQuestion.correctAnswer);
            correctBtn.setAttribute("style", "border: 2px solid rgb(116, 222, 116)");

            countdownEl.setAttribute("style", "color: rgb(218, 72, 72)"); 
            setTimeout(function() {
                countdownEl.removeAttribute("style");
            }, 1000)
        } else if (event.target.matches(currentQuestion.correctAnswer) === true) {
            userScore++;
    
            event.target.setAttribute("style", "border: 2px solid rgb(116, 222, 116)");
        } else {
            timeLeft -= 5;

            event.target.setAttribute("style", "border: 2px solid rgb(218, 72, 72)");
            var correctBtn = document.querySelector(currentQuestion.correctAnswer);
            correctBtn.setAttribute("style", "border: 2px solid rgb(116, 222, 116)");

            countdownEl.setAttribute("style", "color: rgb(218, 72, 72)"); 
            setTimeout(function() {
                countdownEl.removeAttribute("style");
            }, 1000)
        }
        
        nextDiv.setAttribute("class", "show");

        firstBtn.setAttribute("disabled", "disabled");
        secondBtn.setAttribute("disabled", "disabled");
        thirdBtn.setAttribute("disabled", "disabled");
        fourthBtn.setAttribute("disabled", "disabled");
    } 
}

function changeQuestions(event) { 
    event.preventDefault();
    event.stopPropagation();

    firstBtn.setAttribute("style", "border: none");
    secondBtn.setAttribute("style", "border: none");
    thirdBtn.setAttribute("style", "border: none");
    fourthBtn.setAttribute("style", "border: none");

    nextDiv.setAttribute("class", "hide");

    firstBtn.removeAttribute("disabled");
    secondBtn.removeAttribute("disabled");
    thirdBtn.removeAttribute("disabled");
    fourthBtn.removeAttribute("disabled");
    
    currentIndex = Math.floor(Math.random() * questionArr.length);
    checkBin();
    questionBin.push(currentIndex);
    currentQuestion = questionArr[currentIndex];
    
    if (questionCounter > 0) {
        questionCounter--;
        questionNumber++;

        questionNumberEl.textContent = questionNumber;
        questionTextEl.textContent = currentQuestion.question;
        firstBtn.textContent = currentQuestion.firstOption;            
        secondBtn.textContent = currentQuestion.secondOption;
        thirdBtn.textContent = currentQuestion.thirdOption;
        fourthBtn.textContent = currentQuestion.fourthOption;
                
    } else {
        userScoreEl.textContent = userScore + " dari " + 20 + " poin";
        if (userScore <= 3) {
            userScoreMsgEl.textContent = "... Payahhhh :(";
        } else if (userScore > 3 && userScore <= 5) {
            userScoreMsgEl.textContent = "... Belajar lagii :).";
        } else if (userScore > 5 && userScore <= 7) {
            userScoreMsgEl.textContent = "... Kemampuanmu tidak burukk";
        } else if (userScore > 7 && userScore <= 9) {
            userScoreMsgEl.textContent = "... Kamu bisa lebih baik lagi.";
        } else if (userScore > 9 && userScore <= 11) {
            userScoreMsgEl.textContent = ", not bad, broo haha.";
        } else if (userScore > 11 && userScore <= 13) {
            userScoreMsgEl.textContent = ", Kerja Bagus!";
        } else if (userScore > 13 && userScore <= 15) {
            userScoreMsgEl.textContent = "... Kamu sangat jeli sekalii!!";
        } else if (userScore > 15 && userScore <= 17) {
            userScoreMsgEl.textContent = "... wow, impressive!";
        } else if (userScore > 17 && userScore <= 19) {
            userScoreMsgEl.textContent = "... Kamu pasti mendapat jawaban dari sumber lainn?";
        } else {
            userScoreMsgEl.textContent = "...  Are you Albert Einsteinn?";
        }

        questionsDiv.setAttribute("class", "hide");
        completeDiv.setAttribute("class", "show");

        questionBin = [];
        questionCounter = 20;
        questionNumber = 1;
        timeLeft = 120;

        return;
    }
}

var userScores = [];

initialise();

function renderScores() {
    highscoreList.innerHTML = "";
    var sortedUserScores = userScores.sort(function(a, b) {
        return b.userHighscore - a.userHighscore;
    });

    for (var i = 0; i < userScores.length; i++) {
  
       var li = document.createElement("li");
       li.textContent = sortedUserScores[i].userName + "'s score: " + sortedUserScores[i].userHighscore;
       li.setAttribute("index", i);
  
       highscoreList.appendChild(li);
    }
}

function initialise() {
    var storedScores = JSON.parse(localStorage.getItem("userScores"));
  
    if (storedScores !== null) {
      userScores = storedScores;
    }
  
    renderScores();
}


function storeScores() {
    localStorage.setItem("userScores", JSON.stringify(userScores));
}


startBtn.addEventListener("click", countdown);
startBtn.addEventListener("click", showQuestions);
answerBtnDiv.addEventListener("click", scoreIncrement);
nextBtn.addEventListener("click", changeQuestions);

var highscoreLink = document.querySelector("#view-highscores");
highscoreLink.addEventListener("click", function() {
    startDiv.setAttribute("class", "hide");
    highscoresDiv.setAttribute("class", "show");
    highscoreLink.setAttribute("class", "hide");
})

retakeBtn.addEventListener("click", function() {
    questionArrIndex = 0;
    userScore = 0;
    timeLeft = 120; 
    countdownEl.innerHTML = 120;
    inputMessageEl.textContent = "";

    startDiv.setAttribute("class", "show");
    completeDiv.setAttribute("class", "hide");
    highscoreLink.setAttribute("class", "show");
})

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    var user = {
        userName: userInputEl.value.trim(),
        userHighscore: userScore,
    };
    
    if (user.userName === "") {
        inputMessageEl.textContent = "You can't submit your score without your initials";
        return;
    } 
  
    userScores.push(user);
    userInputEl.value = "";
  
    storeScores();
    renderScores();
    inputMessageEl.textContent = "";

    completeDiv.setAttribute("class", "hide");
    highscoresDiv.setAttribute("class", "show");
});

returnBtn.addEventListener("click", function() {
    questionArrIndex = 0;
    userScore = 0;
    countdownEl.innerHTML = 120;
    inputMessageEl.textContent = "";
    
    highscoresDiv.setAttribute("class", "hide");
    startDiv.setAttribute("class", "show");
    highscoreLink.setAttribute("class", "show");
})


//clearBtn.addEventListener("click", function() {
//    if (userScores.length < 1) {
//        alert("There are no existing scores to clear.");
//    } else {
//        var confirmClear = confirm("Are you sure you want to clear the highscore list?");
//        if (confirmClear) {
//            localStorage.clear();
//            highscoreList.textContent = "";
//            userScores = [];
//        } else {
//            return;
//        }
//    }
//});