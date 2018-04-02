

// movie trivia questions

var questions = [{
    name: "question1",
    question: "How fast does the Delorean have to go to travel through time?",
    answers: ["100mph", "2000mph", "88mph", "150mph"],
    correctAnwserId: 2,
    background: "assets/images/backToTheFuture.jpg",

}, {
    name: "question2",
    question: "Who forged the One Ring?",
    answers: ["Gandalf the Grey", "Sauron", "Frodo Baggins", "Gollum"],
    correctAnwserId: 1,
    background: "assets/images/lordOfTheRings.jpg",

}, {
    name: "question3",
    question: "Who offers Neo the pills to take him out of The Matrix?",
    answers: ["Trinity", "Oracle", "Morpheus", "Agent Smith"],
    correctAnwserId: 2,
    background: "assets/images/matrix.jpg",

}, {
    name: "question4",
    question: "Who is Luke Skywalkers father?",
    answers: ["Darth Vader", "Yoda", "Chewbacca", "Han Solo"],
    correctAnwserId: 0,
    background: "assets/images/starWars.jpg",
}, {
    name: "question5",
    question: "Who was Peter Parkers love interest?",
    answers: ["Gwen Stacy", "Mary Jane", "Norman Osborn", "Liz Allen"],
    correctAnwserId: 1,
    background: "assets/images/spiderman.jpg",
}, {
    name: "question6",
    question: "Who gave Harry Potter his scare?",
    answers: ["Dumbledore", "His Mom", "Hermione", "Voldermort" ],
    correctAnwserId: 3,
    background: "assets/images/harryPotter.jpg",

}];

var currentQuestionIndex = 0;

var currentQuestion = questions[0];

var numCorrect = 0;

var numWrong = 0;


var intervalId;

var numQuestions = 6;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;


//1000 will run it every 1 second

var stopwatch = {

    time: 60,

    getTime: function () {
        return stopwatch.time;
    },

    reset: function () {

        stopwatch.time = 10;


    },
    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function () {


        stopwatch.time--;
        if (stopwatch.time == 0) {

            var gameOver = $("<div></div>");

            var gameOverTitle = $("<h2>");
            $(gameOverTitle).text("Game Over");
            $(gameOver).append(gameOverTitle)

            var gameOverRight = $("<p>");
            $(gameOverRight).text("Number of Correct Answers: " + numCorrect);
            $(gameOver).append(gameOverRight);

            var gameOverWrong = $("<p>");
            $(gameOverWrong).text("Number of Wrong Answers: " + numWrong);
            $(gameOver).append(gameOverWrong);

            $("#content-area").html(gameOver);

            stopwatch.stop();
        }


        $("#timer").removeClass("is-hidden");
        $("#timer").html("Time Left: " + stopwatch.time);
    },

};



function renderQuestion() {
    if (currentQuestionIndex < numQuestions) {
        stopwatch.start();


        // timer

        $("#clickToStart").attr("class", "is-hidden").html("");


        //create overall question div
        var question = $("<div class = 'question'></div>");
        question.addClass(currentQuestionIndex);
        //create question text paragraph
        var pOne = $("<p>").text("Question: " + questions[currentQuestionIndex].question);
        question.append(pOne);
        //add answer paragraphs to question div
        for (var i = 0; i < 4; i++) {
            var answer = $("<div data_answer_id = " + i + "></div>");
            $(answer).attr("class", "answerClass");
            answer.text(questions[currentQuestionIndex].answers[i]);
            question.append(answer);
        }
        // add timer to timer div


        // add fully created question div to content area
        $("#content-area").html(question);
        $("body").css("background-image", "url(" + questions[currentQuestionIndex].background + ")");
    }

    else {
        var gameOver = $("<div></div>");

        var gameOverTitle = $("<h2>");
        $(gameOverTitle).text("Game Over");
        $(gameOver).append(gameOverTitle)

        var gameOverRight = $("<p>");
        $(gameOverRight).text("Number of Correct Answers: " + numCorrect);
        $(gameOver).append(gameOverRight);

        var gameOverWrong = $("<p>");
        $(gameOverWrong).text("Number of Wrong Answers: " + numWrong);
        $(gameOver).append(gameOverWrong);

        $("#content-area").html(gameOver);

        stopwatch.stop();
    }

}


function answerQuestion() {

    if (currentQuestionIndex < numQuestions) {
        console.log(currentQuestionIndex);
        var correctA = questions[currentQuestionIndex].correctAnwserId;
        var chosenAnswer = $(this).attr("data_answer_id");
        console.log("correct Answer: " + correctA);
        console.log("chosen answer: " + chosenAnswer);

        if (chosenAnswer.toString() === correctA.toString()) {
            console.log("we get here?");
            var rightAnswer = $("<div></div>");
            var pOne = $("<h2>").text("Correct!");
            rightAnswer.append(pOne);
            $("#content-area").html(rightAnswer);
            currentQuestionIndex++;
            numCorrect++;
            renderQuestion();


        }
        else {
            numWrong++;
            currentQuestionIndex++;
            renderQuestion();

        }

    }


    else if (currentQuestionIndex === numQuestions) {

        var gameOver = $("<div></div>");

        var gameOverTitle = $("<h2>");
        $(gameOverTitle).text("Game Over");
        $(gameOver).append(gameOverTitle)

        var gameOverRight = $("<p>");
        $(gameOverRight).text("Number of Correct Answers: " + numCorrect);
        $(gameOver).append(gameOverRight);

        var gameOverWrong = $("<p>");
        $(gameOverWrong).text("Number of Wrong Answers: " + numWrong);
        $(gameOver).append(gameOverWrong);

        $("#content-area").html(gameOver);

        stopwatch.stop();
    }



}


$("#content-area").on("click", ".answerClass", answerQuestion);

$(".clickToStart").on("click", renderQuestion);