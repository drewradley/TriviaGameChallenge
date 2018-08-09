$( document ).ready(function() {
    //questions use placeholder text. When adding more, be sure to update answers[]. Correct answer is always index 0 but they get randomized when desiplayed.
    var questionA = {
        q: "QuestionA",
        a:[" CorrectA", " WrongA"," WrongA2"],
        timer: 5

    }
    var questionB = {
        q: "QuestionB",
        a:[" CorrectB", " WrongB"," WrongB2"],
        timer: 10

    }
    var questionC = {
        q: "QuestionC",
        a:[" CorrectC", " WrongC"," WrongC2"],
        timer: 15

    }
    var questions = [questionA, questionB, questionC]//these are the questions it randomly picks from.
    var questionsAsked =[];//this holds the index of questions[] so we don't ask the same one twice
    var numberAsked=0;//count how many questions have been asked
    // var gameStarted =false;
    var intervalId;
    var number=90;
    timeConverter (number);
    var answers =["ignore",-1,-1,-1];///this is where we store the answers. Manually set this for all questions.
    var correctA=0;
    var wrongA=0;
    var unA=0;
    var submitted=false;
    var myTimeout;
    // answers[0]="ignore";
    $(".alert-success").hide();
    $("#questions").hide();
    $("#results").hide();
    $(document).on("click", ".start",function() {
        StartGame();
    });
    
    $(document).on("click", "#button",function() {
        answers[numberAsked]=this.value;
        console.log(answers)
    });
    
    $(document).on("click", ".submit",function() {
        if(answers[numberAsked]===-1)
        {
            return;
        }
        AnswerScreen();
        // SubmitIt();

    });
function StartGame()
{
    var xX=Math.floor(Math.random()*questions.length)
    QuestionPicker(xX);
    questionsAsked[numberAsked]=xX;
    numberAsked++;

}
function nextQuestion()
{
    
    if(numberAsked===questions.length)//no more questions
    {
        EndGame();
        return;
    }
    var xX=Math.floor(Math.random()*questions.length)
    if(questionsAsked.indexOf(xX)===-1) //check to make sure it hasn't been asked
    {
        QuestionPicker(xX);
        questionsAsked[numberAsked]=xX;
        numberAsked++;
    }
    else nextQuestion();
}
function QuestionPicker(q)
{
    
    number=questions[q].timer;
    timeConverter(number);
    $(".start").hide();
    Countdown();
    $("#questions").show();
    $("#display").show();
    $(".q").text(questions[q].q);

    //TODO: better way of randomizing answers
    var q1=Math.floor(Math.random()*3);
    var q2;
    var q3;
    if(q1===0){q2=1;q3=2;}
    if(q1===1){q2=0;q3=2;}
    if(q1===2){q2=1;q3=0;}
    $(".answerA").text(questions[q].a[q1]);
    $(".buttonA").attr("value", q1);

    $(".answerB").text(questions[q].a[q2]);
    $(".buttonB").attr("value", q2);

    $(".answerC").text(questions[q].a[q3]);
    $(".buttonC").attr("value", q3);
    //TODO: better way of randomizing answers
}
function EndGame()
{

    if(submitted)return;
    submitted=true;
    for(var i=1;i<answers.length;i++)
        {
            if(answers[i]==0)
            {
                correctA++;
            }
            else if (answers[i]==1||answers[i]==2)
            {
                wrongA++;
            }
            else unA++;
            // if(correctA+wrongA)
        }
    $( "#questions" ).hide();
    $("#results").show();
    $("#CA").append(correctA);
    $("#WA").append(wrongA);
    $("#UA").append(unA);
    $("#display").hide();
        // console.log(correctA+" "+wrongA+" "+unA)
}
function SubmitIt()
{
    if(answers[numberAsked]===-1)
    {
        return;
    }
    clearTimeout(myTimeout);
    clearInterval(intervalId);
    $(".answer input[type='radio']").prop('checked',false);//clear radio buttons

    nextQuestion();
    
}
function TimedOut()
{
    $(".alert-success").hide();
    clearTimeout(myTimeout);
    clearInterval(intervalId);
    $(".answer input[type='radio']").prop('checked',false);//clear radio buttons

    nextQuestion();
    
}
function Countdown()
{
    var timeOutTime=number*1000
    myTimeout=  setTimeout(function(){AnswerScreen() }, timeOutTime);
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000); //used to display time left. TODO: Gotta be a better way to keep track or time left in timeout but my google-fu failed me. Right now, timeout and setinterval get out of sync quite easily.
}
function decrement() {//used to display time left. 
if(number<=0)return;
      number--;
      timeConverter(number);

      if (number <= 0) {
        clearInterval(intervalId);
        
      }
    }
function AnswerScreen()
{
    clearTimeout(myTimeout);
    clearInterval(intervalId);
    if(submitted)return;
    $(".alert-success").show();
    
    $( "#questions" ).hide();
    $("#display").hide();
    var thisAnswer=answers[numberAsked];
    if(thisAnswer==-1)
    $(".alert-success").text("Unanswered");
    if(thisAnswer==0)
    $(".alert-success").text("Correct");
    if(thisAnswer>0)
    $(".alert-success").text("Wrong");
    // console.log(answers[numberAsked]);
    myTimeout=  setTimeout(function(){TimedOut() }, 2000);
}
function timeConverter (t) {

//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }   

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    $("#display").text("Time left: "+minutes+":"+seconds);

    return minutes + ":" + seconds;
  }


});