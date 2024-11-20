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

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
  if (modalId === 'bookingModal') {
    setBookingDate();
}
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function setBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  dateInput.value = formattedDate;
  // closeModal('bookingModal'); 
}

function redirectToBikes() {
  closeModal('scanModal'); // Close the modal first
  // setTimeout(() => {
  //     window.location.href = '/frontend/bikes.html'; // Adjust the path as needed
  // }, 300); // Delay to allow modal to close smoothly
}

document.querySelectorAll('.btn-success').forEach(button => {
  button.addEventListener('click', () => openModal('bookingModal'));
});

// document.querySelector('.btn-success2').addEventListener('click', redirectToBikes);