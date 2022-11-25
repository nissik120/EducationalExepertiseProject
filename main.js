let questionCount = 5;
let questionNumber = 0;

const quizWrap = document.querySelector(".quiz_wrap");
const textQuestion = document.querySelector(".text_ques");
const optQues = document.querySelector(".opt_ques");
const btnNext = document.querySelector(".btn_next");

btnNext.onclick = (questionNumber, questionCount) =>{
    console.log("Next");
    questionNumber<questionCount?? questionNumber++;
}

function displayOpeningTab(index){
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let textQuestionContent = `<span> Press Next To get Started. </span>`

    textQuestion.innerHTML = textQuestionContent;
}

function displayCurrentQuestion(index){
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let textQuestionContent = `<span> Question Number ${index}</span>`

    textQuestion.innerHTML = textQuestionContent;

}

function questionsDisplayHandler(index){
    index==0 ? displayOpeningTab(index): displayCurrentQuestion(index);
}


function loadAppView(){
    questionsDisplayHandler(questionNumber);
}

document.addEventListener('DOMContentLoaded', loadAppView());