// Quiz questions stored in an array of objects
const questions = [
    {
        question: "Which year was 'The Rookie' first aired?",
        options: ["2018", "2019", "2020"],
        answer: "2018",
        feedback: "The show first aired in 2018."
    },
    {
        question: "Who plays the main character, John Nolan?",
        options: ["Nathan Fillion", "Eric Winter", "Alyssa Diaz"],
        answer: "Nathan Fillion",
        feedback: "Nathan Fillion stars as John Nolan."
    },
    {
        question: "What is John Nolan's occupation before joining the LAPD?",
        options: ["Lawyer", "Construction Worker", "Graphic Designer"],
        answer: "Construction Worker",
        feedback: "John Nolan was a construction worker before joining the LAPD."
    },
    {
        question: "Which city does 'The Rookie' take place in?",
        options: ["Los Angeles", "New York", "Chicago"],
        answer: "Los Angeles",
        feedback: "The show is set in Los Angeles."
    },
    {
        question: "Which network airs 'The Rookie'?",
        options: ["ABC", "CBS", "NBC"],
        answer: "ABC",
        feedback: "The Rookie airs on ABC."
    },
    {
        question: "Which country was 'The Rookie' filmed in?",
        options: ["Australia", "New Zealand", "Canada"],
        answer: "New Zealand",
        feedback: "The show was filmed in New Zealand."
    },
    {
        question: "What is John Nolan's badge number?",
        options: ["001", "007", "180"],
        answer: "180",
        feedback: "John Nolan's badge number is 180."
    },
];

// Variables to keep track of current question index and score
let currentQuestionIndex = 0;
let score = 0;

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

// Function to display the current question
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = questions[currentQuestionIndex];
    let optionsHtml = '';

    // Loop through options to create radio buttons
    currentQuestion.options.forEach(option => {
        optionsHtml += `<div>
                            <input type="radio" name="option" value="${option}">
                            <label>${option}</label>
                        </div>`;
    });

    // Display the question and its options
    questionContainer.innerHTML = `<h2>${currentQuestion.question}</h2>${optionsHtml}`;
    updateProgressBar();
}

// Function to move to the next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const feedbackDiv = document.getElementById('feedback');

    // Ensure the user has selected an option
    if (!selectedOption) {
        alert('Please select an option!');
        return;
    }

    const selectedAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct and provide feedback
    if (selectedAnswer === currentQuestion.answer) {
        score++;
        selectedOption.parentElement.classList.add('correct');
        feedbackDiv.textContent = "Correct! " + currentQuestion.feedback;
        feedbackDiv.style.color = "green";
    } else {
        selectedOption.parentElement.classList.add('incorrect');
        feedbackDiv.textContent = `Wrong! ${currentQuestion.feedback}`;
        feedbackDiv.style.color = "red";
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const feedbackDiv = document.getElementById('feedback');

    // Ensure the user has selected an option
    if (!selectedOption) {
        alert('Please select an option!');
        return;
    }

    const selectedAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct and provide feedback
    if (selectedAnswer === currentQuestion.answer) {
        score++;
        selectedOption.parentElement.classList.add('correct');
        feedbackDiv.textContent = "Correct! " + currentQuestion.feedback;
        feedbackDiv.style.color = "green";
    } else {
        selectedOption.parentElement.classList.add('incorrect');
        feedbackDiv.textContent = `Wrong! ${currentQuestion.feedback}`;
        feedbackDiv.style.color = "red";
    }

    // Move to the next question or show results if it's the last question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // Clear previous selections and feedback
        document.querySelectorAll('input[name="option"]').forEach(input => input.checked = false);
        feedbackDiv.textContent = '';
        // Update question display
        showQuestion();
    } else {
        showResults(); // Show results if it's the last question
    }
}


// Function to display the final results
function showResults() {
    const scoreDiv = document.getElementById('score');
    const passMark = Math.ceil(questions.length / 2); // Determine the pass mark
    const passed = score >= passMark;

    // Hide the question container and next button, show the reset button
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('reset-button').style.display = 'block';

    // Display the user's score and whether they passed
    scoreDiv.textContent = `You scored ${score} out of ${questions.length}. You ${passed ? 'passed!' : 'did not pass. Try again!'}`;
    scoreDiv.style.fontSize = "24px";
    scoreDiv.style.fontWeight = "bold";
    scoreDiv.style.color = passed ? "green" : "red";
}

// Function to reset the quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('next-button').style.display = 'block';
    document.getElementById('reset-button').style.display = 'none';
    document.getElementById('feedback').textContent = '';
    document.getElementById('score').textContent = '';
    showQuestion(); // Start the quiz again
}

// Function to start the quiz, triggered by the start button
function startQuiz() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('progress-container').style.display = 'block';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('next-button').style.display = 'block';
    showQuestion(); // Display the first question
}

// Ensure the start button is focused when the page loads
window.onload = function() {
    document.getElementById('start-button').focus();
};
