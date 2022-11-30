const questionCount = questions.length;
const userAnswers = [];
let questionNumber = 0;

let startFlag = 0;
let quizFlag = 0;
let resultFlag = 0;

const quizWrap = document.querySelector(".quiz_wrap");
const btnStart = document.querySelector(".btn_start");
const btnNext = document.querySelector(".btn_next");
const btnResult = document.querySelector(".btn_result");
const textError = document.querySelector(".text_error");

const errorList = [
    "Please select one option first!!!",
    "System failure"
];

const learnTypeList = [
    "Visual",
    "Auditory",
    "Kinesthetic",
];

function optListHtml(optionListIndex, optValue, classification, questionIndex){

    let optCurrentId =`${optionListIndex}${classification}${questionIndex}`;
    return `<div class="radio_wrap">
                <input type="radio" name="response" id="${optCurrentId}" value="${optionListIndex}">
                <label for="${optCurrentId}">${optValue}</label>
            </div>`;
}

function computeResult(answerArray){
    const mode = {};
    let max = 0, count = 0;

    for (let arrayIndex = 0; arrayIndex < answerArray.length; arrayIndex++) {
        const item = answerArray[arrayIndex];

        if(mode[item]){
            mode[item]++;
        }else{
            mode[item] = 1;
        }
        
        if(count < mode[item]){
            max = item;
            count = mode[item];
        }
    }

    return max;

}

btnNext.onclick = () =>{

    if(questionNumber<questionCount-1){
        startFlag=1;
        quizFlag=1;
        resultFlag=0;
    }else{
        startFlag=1;
        quizFlag=0;
        resultFlag=1;
    }

    if(checkIfSubmissionOk()){
        clearAlert();
        userAnswers[questionNumber] = checkIfSubmissionOk();
        questionNumber++;
        loadAppView();
    }else{
        createAlert(0); 
    }
}

btnStart.onclick = () =>{
    startFlag=1;
    quizFlag=1;
    resultFlag=0;
    loadAppView();
}

btnResult.onclick = () =>{
    questionNumber=0;
    startFlag=0;
    quizFlag=0;
    resultFlag=0;
    console.log(userAnswers);
    console.log(computeResult(userAnswers));
    window.localStorage.removeItem("username");
    window.location = "index.html"
    //loadAppView();
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

    return selectedOption
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

    const currHeader = document.getElementById('dash_header');

    let storedName = localStorage.getItem('username')??"";
    currHeader.innerHTML = `<h1>Hi ${storedName}</h1>`;

    let textQuestionContent = `<span> Press Next To get Started. </span>`

    textQuestion.innerHTML = textQuestionContent;
}

function displayCurrentQuestion(indexQuestion){
    let realIndex = indexQuestion;
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let textQuestionContent = `<span> Question Number ${realIndex+1}</span><p>${questions[realIndex].question}</p>`
    let classQuestion = questions[realIndex].classification;
    let optionQuestionList = questions[realIndex].options;
    let optListHtmlText = "";
    for(let i =0; i<optionQuestionList.length; i++){
        optListHtmlText+=optListHtml(i, optionQuestionList[i], classQuestion, realIndex);
    }

    textQuestion.innerHTML = textQuestionContent;
    optQues.innerHTML = optListHtmlText;
}

function displayClosingTab(){
    const textQuestion = document.querySelector(".text_ques");
    const optQues = document.querySelector(".opt_ques");

    let storedName = localStorage.getItem('username')??"";

    let userTypeId = computeResult(userAnswers);

    let textQuestionContent = `<h1>Hi ${storedName}</h1>
    <span> Based on our your answers, you are</span>
    <h2>${learnTypeList[userTypeId]}</h2>`

    textQuestion.innerHTML = textQuestionContent;
    optQues.innerHTML = "";
}

function loadAppView(){

    if(startFlag==0){
        btnStart.style.display = "block";
        btnNext.style.display = "none";
        btnResult.style.display = "none";
        displayOpeningTab();
    }

    if(quizFlag==1){
        btnStart.style.display = "none";
        btnNext.style.display = "block";
        btnResult.style.display = "none";
        displayCurrentQuestion(questionNumber);
    }

    if(resultFlag==1){
        btnStart.style.display = "none";
        btnNext.style.display = "none";
        btnResult.style.display = "block";
        displayClosingTab();
    }
    
}

document.addEventListener('DOMContentLoaded', loadAppView());