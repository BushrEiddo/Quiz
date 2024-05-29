const exams = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Monet"], answer: 1 },
    { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1923"], answer: 0 },
    { question: "What is the largest planet in our Solar System?", options: ["Earth", "Uranus", "Jupiter", "Mars"], answer: 2 }
];

document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById("quizContainer");
    initializeQuiz(quizContainer);
    const fiveMinutes = 5 * 60; // 5 minutes in seconds
    const display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
    document.getElementById('submitQuiz').addEventListener('click', function() {
        calculateResults();
        stopTimer();
    });
});

function initializeQuiz(container) {
    exams.forEach((exam, questionIndex) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = exam.question;
        div.appendChild(p);

        const ul = document.createElement("ul");
        exam.options.forEach((option, optionIndex) => {
            const li = document.createElement("li");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "question" + questionIndex;
            input.id = "question" + questionIndex + "_option" + optionIndex;
            input.value = optionIndex;

            const label = document.createElement("label");
            label.htmlFor = input.id;
            label.textContent = option;

            li.appendChild(input);
            li.appendChild(label);
            ul.appendChild(li);
        });

        div.appendChild(ul);
        container.appendChild(div);
    });
}

let interval; // To store the timer interval ID

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            calculateResults();
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval); // Stop the timer
    document.getElementById('time').textContent = '00:00';
}

function calculateResults() {
    let score = 0;
    exams.forEach((exam, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        if (selectedOption && parseInt(selectedOption.value) === exam.answer) {
            score++;
        }
    });
    const marksElement = document.getElementById("marks");
    marksElement.textContent = "Your result is " + score + " out of " + exams.length;
    document.getElementById("quizContainer").style.display = 'none'; // Optional: Hide quiz after completion
}
