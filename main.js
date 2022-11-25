let questionCount = 0;
let questionNumber = 0;

const quizWrap = document.querySelector(".quiz_wrap");
const textQuestion = document.querySelector(".text_ques");
const optQues = document.querySelector(".opt_ques");
const btnNext = document.querySelector(".btn_next");

btnNext.onclick = () =>{
 console.log("Next");
}

function displayCurrentQuestion(index){
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let textQuestionContent = `<span> Question Number 1</span>`

    textQuestion.innerHTML = textQuestionContent;

}

function questionsHandler(){
    displayCurrentQuestion(1);
}


function loadAppView(){
    
}

document.addEventListener('DOMContentLoaded', loadAppView());