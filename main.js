const questionCount = questions.length;
const userAnswers = [];
let questionNumber = 0;

const quizWrap = document.querySelector(".quiz_wrap");
//const textQuestion = document.querySelector(".text_ques");
//const optQues = document.querySelector(".opt_ques");
const btnStart = document.querySelector(".btn_start");
const btnNext = document.querySelector(".btn_next");
const textError = document.querySelector(".text_error");

const errorList = [
    "Select something",
    "Crazy I know"
];

function optListHtml(optionListIndex, optValue, classification, questionIndex){

    let optCurrentId =`${optionListIndex}${classification}${questionIndex}`;
    return `<div class="radio_wrap">
                <input type="radio" name="response" id="${optCurrentId}" value="${questionIndex}">
                <label for="${optCurrentId}">${optValue}</label>
            </div>`;
}

btnNext.onclick = () =>{
    if(questionNumber>0 && questionNumber<questionCount){
        checkIfSubmissionOk();
    }
    
    if(questionNumber>questionCount){
        console.log(userAnswers);
    }
}

btnStart.onclick = () =>{

    if(questionNumber==0){
        questionNumber++;
        console.log(questionNumber);
        questionsDisplayHandler(questionNumber);
    }
}

function checkIfSubmissionOk(){
    const optionBtns = document.querySelectorAll('input[name="response"]');
    let selectedOption;

    for (const optionBtn of optionBtns) {
        if (optionBtn.checked) {
            selectedOption = optionBtn.value;
            break;
        }
    }

    if(selectedOption){
        clearAlert();
        questionNumber++;
        console.log(questionNumber);
        userAnswers[questionNumber] = selectedOption;
        console.log(userAnswers);
        questionsDisplayHandler(questionNumber);
    }else{
        createAlert(0); 
    }
}

function createAlert(errIndex){
    textError.innerHTML = errorList[errIndex];
}

function clearAlert(){
    textError.innerHTML = "";
}

function displayOpeningTab(){
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let textQuestionContent = `<span> Press Next To get Started. </span>`

    textQuestion.innerHTML = textQuestionContent;
}

function displayCurrentQuestion(indexQuestion){
    let realIndex = indexQuestion-1;
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let textQuestionContent = `<span> Question Number ${realIndex+1}</span>`
    let classQuestion = questions[realIndex].classification;
    let optionQuestionList = questions[realIndex].options;
    
    textQuestion.innerHTML = textQuestionContent;
    let optListHtmlText = "";
    for(let i =0; i<optionQuestionList.length; i++){
        optListHtmlText+=optListHtml(i, optionQuestionList[i], classQuestion, realIndex);
    }
    optQues.innerHTML = optListHtmlText;


}

function questionsDisplayHandler(indexQuestion){
    indexQuestion==0 ? displayOpeningTab(): displayCurrentQuestion(indexQuestion);
}


function loadAppView(){
    questionsDisplayHandler(questionNumber);
}

document.addEventListener('DOMContentLoaded', loadAppView());