let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
let attempts = 0;

const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const resetBtn = document.getElementById("reset-btn");

submitBtn.addEventListener("click", function() {
    const userGuess = parseInt(guessInput.value);
    attempts++;

    // Check if the guess is correct, too high, or too low
    if (userGuess === randomNumber) {
        feedback.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
        feedback.style.color = "green";
        attemptsDisplay.textContent = attempts;
        submitBtn.disabled = true;  // Disable the guess button after winning
        resetBtn.style.display = "block"; // Show the reset button
    } else if (userGuess < randomNumber) {
        feedback.textContent = "Too low! Try again.";
        feedback.style.color = "red";
    } else if (userGuess > randomNumber) {
        feedback.textContent = "Too high! Try again.";
        feedback.style.color = "red";
    }

    attemptsDisplay.textContent = attempts; // Update attempts count
    guessInput.value = ""; // Clear input field
    guessInput.focus(); // Focus the input field for the next guess
});

// Reset the game
resetBtn.addEventListener("click", function() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    attempts = 0;
    feedback.textContent = "";
    attemptsDisplay.textContent = 0;
    submitBtn.disabled = false; // Enable the submit button again
    resetBtn.style.display = "none"; // Hide the reset button
    guessInput.value = ""; // Clear the input field
    guessInput.focus(); // Focus the input field
});