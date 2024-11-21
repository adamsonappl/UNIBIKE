// Function to open the modal
function openModal(loginModal) {
  document.getElementById("loginModal").style.display = "none";
}

// Function to close the modal
function closeModal(loginModal) {
  document.getElementById("loginModal").style.display = "flex";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("loginModal");
  if (event.target === modal) {
      closeModal('loginModal');
  }
}

// Google Log in for Guest

function googleLogin() {
  // Simulate a successful Google login
  alert("Logged in with Google successfully!");
  // Redirect or close modal
  closeModal();
  // window.location.href = "your-website-homepage.html"; // Replace with the actual URL of your website
}

// main.js

// Function to open the modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'flex';

  if (modalId === 'bookingModal') {
    setBookingDate();
  }
}

// Function to close the modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Set the booking date to today's date
function setBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  if (dateInput) {
    dateInput.value = formattedDate;
  }
}
// Attach event listeners to "Book Now" button
const bookNowButtons = document.querySelectorAll('.book-now-button');
bookNowButtons.forEach(button => {
  button.addEventListener('click', () => openModal('bookingModal'));
});

// Ensure the "Pay Now" button opens the scan modal
const payNowButton = document.getElementById('payNowButton');
if (payNowButton) {
  payNowButton.addEventListener('click', () => openModal('scanModal'));
}

// Ensure the "Done" button in scan modal closes it and redirects if needed
const doneButton = document.getElementById('doneButton');
if (doneButton) {
  doneButton.addEventListener('click', redirectToBikes);
}

// Redirect to bikes page after closing the scan modal
function redirectToBikes() {
  closeModal('scanModal');
  // Optionally redirect
  // window.location.href = '/frontend/bikes.html'; // Uncomment and adjust path if needed
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal-overlay1');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};


// Function to toggle the chatbot visibility
function toggleChatbot() {
  const chatbotContainer = document.getElementById('chatbotContainer');
  chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'block' : 'none';
}

// Function to toggle the display of the FAQ answer
function toggleAnswer(element) {
  const answer = element.querySelector('.faq-answer');
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}


// Function to handle user-typed questions
function handleUserQuestion() {
  const input = document.getElementById('userInput');
  const userQuestion = input.value.trim();

  if (userQuestion === '') {
      alert('Please type a question.');
      return;
  }

  // Create new question and answer elements
  const chatArea = document.getElementById('chatArea');
  const questionElement = document.createElement('div');
  questionElement.className = 'faq-question user-question';
  questionElement.textContent = userQuestion;

  const answerElement = document.createElement('div');
  answerElement.className = 'faq-answer';
  answerElement.textContent = "I'm just a simple bot and don't know the answer yet!";

  // Add toggle functionality to user-added questions
  questionElement.onclick = () => toggleAnswer(questionElement);

  // Append question and answer to chat area
  chatArea.appendChild(questionElement);
  chatArea.appendChild(answerElement);

  // Clear input
  input.value = '';
}