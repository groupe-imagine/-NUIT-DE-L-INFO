window.onload = function () {
    const audio = document.getElementById("beach");
    audio.loop = true;
    audio.play();
};

function showDetail(parallel) {
    const details = {
        heart: "Le cœur de l'océan correspond aux courants marins. Ils régulent la température mondiale, comme le cœur pompe le sang.",
        lungs: "Les poumons de l'océan sont les organismes photosynthétiques, qui produisent une grande partie de l’oxygène de la planète.",
        skin: "La peau de l’océan est sa surface. Sa température et salinité influencent le climat mondial."
    };

    const detailText = document.getElementById("detail-text");
    detailText.textContent = details[parallel] || "Aucun détail disponible.";
}

let currentQuestionIndex = 0;
let score = 0;
const questions = [
    {
        question: "Quel est le rôle des courants marins ?",
        answers: ["Régulation de la température mondiale", "Transport de sel uniquement", "Production d’oxygène"],
        correct: 0,
        redirectUrl: "https://www.lumni.fr/video/comment-se-creent-les-courants-marins"
    },
    {
        question: "Quel est le rôle des poumons de l'océan ?",
        answers: ["Transport du CO2", "Production d’oxygène", "Dissolution de l'eau salée"],
        correct: 1,
        redirectUrl: "https://blutopia.org/ocean-oxygene-climat/"
    },
    {
        question: "Quel est le rôle de la peau de l'océan ?",
        answers: ["Réduction de la température", "Dissolution des déchets", "Contrôle de la salinité de l'eau"],
        correct: 2,
        redirectUrl: "https://www.mission-1ocean.com/en/la-peau-de-locean/"
    }
];

let countdown;
let timeLeft = 10;

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById("question-text").textContent = question.question;

        const buttons = document.querySelectorAll("#quiz button");
        buttons.forEach((button, index) => {
            button.textContent = question.answers[index];
            button.onclick = () => checkAnswer(index);
        });

        document.getElementById("quiz-feedback").textContent = "";
        document.getElementById("time").textContent = "10";

        startTimer();
    } else {
        document.getElementById("question-container").style.display = "none";
        document.getElementById("score").textContent = `Votre score est ${score} sur ${questions.length}`;

        setTimeout(() => {
            retryQuiz();
        }, 10000);
    }
}

function startTimer() {
    if (countdown) {
        clearInterval(countdown);
    }

    timeLeft = 10;

    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            showTimeoutMessage();
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 2000);
        }
    }, 1000);
}

function showTimeoutMessage() {
    const timeoutMessage = document.getElementById("quiz-feedback");
    timeoutMessage.textContent = "Timeout";
    timeoutMessage.style.color = "red";
}

function checkAnswer(selected) {
    clearInterval(countdown);

    const question = questions[currentQuestionIndex];

    if (selected === question.correct) {
        score++;
        document.getElementById("quiz-feedback").textContent = "Bonne réponse !";
        document.getElementById("quiz-feedback").style.color = "green";

        window.open(question.redirectUrl, "_blank");
    } else {
        document.getElementById("quiz-feedback").textContent = "Mauvaise réponse ! Essayez encore.";
        document.getElementById("quiz-feedback").style.color = "red";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 2000);
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    
    document.getElementById("question-container").style.display = "block";
    document.getElementById("score").textContent = "";

    showQuestion();
}

showQuestion();
