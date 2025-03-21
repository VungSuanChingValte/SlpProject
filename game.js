
const question = document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById("questioncounter");
const scoreText=document.getElementById("score");
const loader=document.getElementById("loader");
const game=document.getElementById("game");


let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questioncounter=0;
let availableQuestion=[];
let questions=[
    {
    question:"What is the longest beach in the world?",
    choice1:"Praia do Cassino",
    choice2:"Marina Beach",
    choice3:"Ninety Mile Beach",
    choice4:"Ibeno Beach",
    answer:1
},
{
    question:"What is the largest ocean on Earth? ",
    choice1:"Atlantic Ocean",
    choice2:"Indian Ocean",
    choice3:"Pacific Ocean",
    choice4:"Artic Ocean",
    answer:3
},
{
    question:"Which is the hottest planet in our Solar System?",
    choice1:"Mars",
    choice2:"Venus",
    choice3:"Mercury",
    choice4:"Earth",
    answer:2
},
{
    question:"How many hours are there in a week? ",
    choice1:"165",
    choice2:"166",
    choice3:"168",
    choice4:"169",
    answer:3
},
{
    question:"Which is the smallest country in the World?",
    choice1:"Vatican City",
    choice2:"Monaco",
    choice3:"Nauru",
    choice4:"San Marino",
    answer:1
},
{
    question:"What is the 30% of 50?",
    choice1:"15",
    choice2:"20",
    choice3:"10",
    choice4:"17",
    answer:1
},
{
    question:"What is a radius? ",
    choice1:"Radius is a line passing through a circle",
    choice2:"Radius is half a diameter",
    choice3:"Radius is 2 Diameter",
    choice4:"Radius is a Circle",
    answer:2
},
{
    question:"What is the next sequence number - 2,4,7,9,__",
    choice1:"13",
    choice2:"14",
    choice3:"12",
    choice4:"11",
    answer:3
},
{
    question:"How many centimeters are there in 10 meter?",
    choice1:"1000",
    choice2:"100",
    choice3:"10000",
    choice4:"100000",
    answer:1
},
{
    question:"What should be multiplyed with 3 to get 144",
    choice1:"21",
    choice2:"40",
    choice3:"48",
    choice4:"44",
    answer:3
},
{
    question:"Who was the first President of India? ",
    choice1:"Jawaharlal Nehru",
    choice2:"Dr.Rajendra Prasad",
    choice3:"Narendra Modi",
    choice4:"M.K Gandhi",
    answer:2
},
{
    question:"What is the crescent sand in the desert called?",
    choice1:"Moon",
    choice2:"Dunes",
    choice3:"Barchans",
    choice4:"Ergs",
    answer:3
},
{
    question:"Choose the odd one out.",
    choice1:"Ellora Caves",
    choice2:"Hampi with Chariot",
    choice3:"Mysore Palace",
    choice4:"Konark Sun Temple",
    answer:3
},
{
    question:"Which country gifted the Statue Of Liberty to the USA?",
    choice1:"UK",
    choice2:"France",
    choice3:"Brazil",
    choice4:"China",
    answer:2
},
{
    question:"Which country has the most pyramids?",
    choice1:"Egypt",
    choice2:"Mexico",
    choice3:"Sudan",
    choice4:"Peru",
    answer:3
},
{
    question:"Who invented electricity? ",
    choice1:"Thomas Alva Edison",
    choice2:"Charles Babbage",
    choice3:"Benjamin Franklin",
    choice4:"Benjamin Buttons",
    answer:3
},
{
    question:"Capital Of USA",
    choice1:"New York",
    choice2:"Washington DC",
    choice3:"California",
    choice4:"San Fransico",
    answer:2
},
{
    question:"Which serial killer is well known for his identity not being known?",
    choice1:"Jack the Ripper",
    choice2:"Zodiac Killer",
    choice3:"Golden State Killer",
    choice4:"Laughing Jake",
    answer:1
},
 {
    question: "What is the main ingredient for most Chinese Food?",
    choice1: "MSG",
    choice2: "Garlic",
    choice3: "Soy sause",
    choice4: "All of the Above",
    answer:4
},
{
    question:"Which disease killed most of the population?",
    choice1:"Black Death(Bubonic Plague)",
    choice2:"1918 Flu(Influenza)",
    choice3:"Small Pox",
    choice4:"Tuberculosis",
    answer:4
}
];

//constance
const CORRECT_BONUS=2;
const maxQ=20;
startGame=()=>{
    questioncounter=0;
    score=0;
    availableQuestion=[...questions];
    console.log(availableQuestion);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestion.length === 0 || questioncounter >= maxQ) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
    questioncounter++;
    questionCounterText.innerText = `${questioncounter}/${maxQ}`;

    const quesIndex = Math.floor(Math.random() * availableQuestion.length); // Random question selection
    currentQuestion = availableQuestion.splice(quesIndex, 1)[0];

    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const num = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + num];
    });

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const correctChoice = choices.find(choice => choice.dataset["number"] == currentQuestion.answer);

        if (selectedAnswer == currentQuestion.answer) {
            selectedChoice.parentElement.classList.add("correct");
            incrementScore(CORRECT_BONUS);
        } else {
            selectedChoice.parentElement.classList.add("incorrect");
            if (correctChoice) correctChoice.parentElement.classList.add("correct");
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove("incorrect", "correct");
            if (correctChoice) correctChoice.parentElement.classList.remove("correct");
            getNewQuestion();
        }, 1000);
    });
});

incrementScore=number=>{
    score+=number;
    scoreText.innerText=score;
};


startGame();