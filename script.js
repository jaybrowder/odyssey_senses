const quizData = [
    {
        question: "What does Odyssey use to feel vibrations in the water?",
        answers: {
            a: "His tail",
            b: "His whiskers",
            c: "His webbed feet",
            d: "His sunglasses"
        },
        correctAnswer: "b",
        feedback: {
            correct: "That's right! Odyssey uses his whiskers, also called vibrissae, to feel vibrations in the water.",
            incorrect: "Not quite. Odyssey uses his whiskers, also called vibrissae, to feel vibrations in the water."
        }
    },
    {
        question: "How does a snake use its forked tongue?",
        answers: {
            a: "To catch prey",
            b: "To climb trees",
            c: "To smell the air and locate prey",
            d: "To make hissing sounds"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Excellent! Snakes use their forked tongues to smell the air and locate prey.",
            incorrect: "Actually, snakes use their forked tongues to smell the air and locate prey."
        }
    },
    {
        question: "What helps the white-tailed deer stay safe from predators?",
        answers: {
            a: "Its white tail",
            b: "Its large eyes",
            c: "Its strong legs",
            d: "Its large ears"
        },
        correctAnswer: "d",
        feedback: {
            correct: "Great job! The deer's large ears help it hear predators coming from far away.",
            incorrect: "Not quite. The deer's large ears help it hear predators coming from far away."
        }
    },
    {
        question: "What special ability do salamanders have?",
        answers: {
            a: "They can fly",
            b: "They can breathe both in and out of water",
            c: "They can change color",
            d: "They can see in the dark"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Correct! Salamanders can breathe both in and out of water thanks to their moist, permeable skin.",
            incorrect: "Actually, salamanders can breathe both in and out of water thanks to their moist, permeable skin."
        }
    },
    {
        question: "How far away can a black bear smell food?",
        answers: {
            a: "Over a mile away",
            b: "10 feet away",
            c: "100 yards away",
            d: "5 miles away"
        },
        correctAnswer: "a",
        feedback: {
            correct: "You got it! Black bears can smell food from over a mile away with their powerful noses.",
            incorrect: "Actually, black bears can smell food from over a mile away with their powerful noses."
        }
    }
];

function buildQuiz() {
    const output = [];

    quizData.forEach((questionData, questionNumber) => {
        const answers = [];

        for (letter in questionData.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${questionData.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question-container">
                <div class="question">
                    <h2>Question ${questionNumber + 1}</h2>
                    <p>${questionData.question}</p>
                </div>
                <div class="answers">${answers.join('')}</div>
                <div class="feedback" id="feedback${questionNumber}"></div>
            </div>`
        );
    });

    quizElement.innerHTML = output.join('');

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });
}

function handleAnswerSelection(e) {
    const selectedAnswer = e.target;
    const questionNumber = parseInt(selectedAnswer.name.replace('question', ''));
    const isCorrect = selectedAnswer.value === quizData[questionNumber].correctAnswer;

    const feedbackElement = document.getElementById(`feedback${questionNumber}`);
    feedbackElement.textContent = isCorrect ? quizData[questionNumber].feedback.correct : quizData[questionNumber].feedback.incorrect;
    feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    document.querySelectorAll(`input[name="question${questionNumber}"]`).forEach(radio => {
        radio.disabled = true;
    });

    updateResults();
}

function updateResults() {
    let numCorrect = 0;
    quizData.forEach((_, questionNumber) => {
        const selectedAnswer = document.querySelector(`input[name="question${questionNumber}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === quizData[questionNumber].correctAnswer) {
            numCorrect++;
        }
    });

    resultsElement.textContent = `You've answered ${numCorrect} out of ${quizData.length} questions correctly!`;
}

const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');

buildQuiz();
