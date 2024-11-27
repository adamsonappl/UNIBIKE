// Function to open the modal
function openModal(loginModal) {
  document.getElementById("loginModal").style.display = "none";

}
function Login() {
  // Simulate a successful Google login
  alert("Logged in successfully!");
  // Redirect or close modal
  closeModal("index.html");
  // window.location.href = "your-website-homepage.html"; // Replace with the actual URL of your website
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
function openModal() {
  document.getElementById("loginModal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("loginModal");
  if (event.target === modal) {
      closeModal();
  }
}

// Function to handle QR code scanning
let html5QrcodeScanner;
let scannedId = ''; // Variable to store the scanned ID

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('qr-reader-results').innerText = `Scanned Code: ${decodedText}`;
  scannedId = decodedText; // Store the scanned code
  console.log('Scanned ID:', scannedId); // Debugging: Check if ID is captured
}

function onScanFailure(error) {
  console.warn(`Code scan error = ${error}`);
}

// Function to handle form submission
document.addEventListener('DOMContentLoaded', function() {
  const bookNowButtons = document.querySelectorAll('.book-now-button');
  const scanButton = document.getElementById('scanButton');
  const doneButton = document.getElementById('doneButton');

  if (bookNowButtons) {
      bookNowButtons.forEach(button => {
          button.addEventListener('click', () => {
              const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
              bookingModal.show();
          });
      });
  }

  if (scanButton) {
    scanButton.addEventListener('click', function() {
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        bookingModal.hide();
        const scanModal = new bootstrap.Modal(document.getElementById('scanModal'));
        scanModal.show();

        if (!html5QrcodeScanner) {
            html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader", { fps: 10, qrbox: 250 });
            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        }
    });
}

if (doneButton) {
  doneButton.addEventListener('click', function() {
      const date = document.getElementById('date').value;
      const duration = document.getElementById('duration').value;
      const pointA = document.getElementById('pointA').value;
      const pointB = document.getElementById('pointB').value;

      if (!date || !duration || !pointA || !pointB || !scannedId) {
          alert('Please fill in all fields and scan your ID.');
          return;
      }

      const bookingID = 'BK' + new Date().getTime();
      const booking = { bookingID, date, duration, pointA, pointB, scannedId };
      let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(booking);

      localStorage.setItem('bookings', JSON.stringify(bookings));
      console.log('Booking stored:', booking); // Debugging: Check stored booking
      alert('Booking successful! Your Booking ID is ' + bookingID);

      const scanModal = bootstrap.Modal.getInstance(document.getElementById('scanModal'));
      scanModal.hide();

      // Reset scannedId after storing
      scannedId = '';
  });
}

  if (window.location.pathname.includes('/frontend/transaction-history.html' )) {
      updateTransactionHistory();
  }
});

// Function to update transaction history
function updateTransactionHistory() {
  const transactionHistory = document.getElementById('transactionHistory');
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

  transactionHistory.innerHTML = ''; // Clear existing entries

  bookings.forEach(function(booking) {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${booking.bookingID}</td><td>${booking.date}</td><td>${booking.duration}</td><td>${booking.pointA}</td><td>${booking.pointB}</td><td>${booking.scannedId || ''}</td>`;
      transactionHistory.appendChild(row);
  });
}

// // Function to open the modal
// function openModal(modalId) {
//   const modal = document.getElementById(modalId);
//   if (modal) {
//     modal.style.display = 'flex';
//     if (modalId === 'bookingModalOverlay') {
//       setBookingDate();
//     }
//   }
// }

// // Function to close the modal
// function closeModal(modalId) {
//   const modal = document.getElementById(modalId);
//   if (modal) {
//     modal.style.display = 'none';
//   }
// }

// // Set the booking date to today's date
// function setBookingDate() {
//   const dateInput = document.getElementById('bookingDateInput');
//   const today = new Date();
//   const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
//   if (dateInput) {
//     dateInput.value = formattedDate;
//   }
// }

// // Validate booking form fields
// function validateBookingForm() {
//   const bookingDate = document.getElementById('bookingDateInput').value.trim();
//   const duration = document.getElementById('durationInput').value.trim();
//   const pointA = document.getElementById('pointAInput').value.trim();
//   const pointB = document.getElementById('pointBInput').value.trim();


//   if (!bookingDate || !duration || !pointA || !pointB) {
//     alert("Please fill in all fields before proceeding.");
//     return false;
//   }
//   return { bookingDate, duration, pointA, pointB };
// }

// // Handle "Proceed to Scan" button
// const proceedToScanButton = document.getElementById('proceedToScanButton');
// if (proceedToScanButton) {
//     proceedToScanButton.addEventListener('click', () => {
//         const formData = validateBookingForm();
//         if (formData) {
//             localStorage.setItem('pendingBooking', JSON.stringify(formData));
//             closeModal('bookingModalOverlay');
//             openModal('scanModalOverlay');
//         }
//     });
// }

// // Handle "Done" button in scan modal
// const doneButton = document.getElementById('doneButton');
// if (doneButton) {
//     doneButton.addEventListener('click', () => {
//         const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));
//         if (pendingBooking) {
//             // Generate a unique booking ID
//             const bookingID = 'BK' + new Date().getTime();
//             const booking = { bookingID, ...pendingBooking };

//             // Save booking to localStorage
//             let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
//             bookings.push(booking);
//             localStorage.setItem('bookings', JSON.stringify(bookings));

//             // Clear pending booking
//             localStorage.removeItem('pendingBooking');

//             // Update transaction history
//             updateTransactionHistory();

//             alert(`Booking successful! Your Booking ID is ${bookingID}`);
//             closeModal('scanModalOverlay');
//         }
//     });
// }

// // Function to update transaction history
// function updateTransactionHistory() {
//     const transactionHistory = document.getElementById('transactionHistory');
//     const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

//     transactionHistory.innerHTML = ''; // Clear existing entries

//     bookings.forEach(function (booking) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${booking.bookingID}</td>
//             <td>${booking.bookingDate}</td>
//             <td>${booking.duration}</td>
//             <td>${booking.pointA}</td>
//             <td>${booking.pointB}</td>`;
//         transactionHistory.appendChild(row);
//     });
// }

// // Populate transaction history on page load
// document.addEventListener('DOMContentLoaded', function () {
//     updateTransactionHistory();
// });

// // Attach event listeners to "Book Now" button
// const bookNowButtons = document.querySelectorAll('.book-now-button');
// bookNowButtons.forEach(button => {
//   button.addEventListener('click', () => openModal('bookingModal'));
// });

// // Ensure the "Pay Now" button opens the scan modal
// const payNowButton = document.getElementById('payNowButton');
// if (payNowButton) {
//   payNowButton.addEventListener('click', () => {
//     if (validateBookingForm()) {
//       closeModal('bookingModal'); // Close the booking modal
//       openModal('scanModal'); // Open the scan modal
//     }
//   });
// }



// Ensure the "Done" button in scan modal closes it and redirects if needed
// const doneButton = document.getElementById('doneButton');
// if (doneButton) {
//   doneButton.addEventListener('click', () => {
//     closeModal('scanModal');
//     alert("Booking successful! You can now ride the bike.");
//   });
// }

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal-overlay1');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};


// Redirect to bikes page after closing the scan modal
// function redirectToBikes() {
//   closeModal('scanModal');
//   // Optionally redirect
//   // window.location.href = '/frontend/bikes.html'; // Uncomment and adjust path if needed
// }


// // Function to handle form submission
// function handleFormSubmission() {
//   document.getElementById('bookingForm').addEventListener('submit', function(event) {
//       event.preventDefault();

//       const date = document.getElementById('date').value;

//       // Generate a unique booking ID
//       const bookingID = 'BK' + new Date().getTime();

//       const booking = { bookingID, date };
//       let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
//       bookings.push(booking);

//       localStorage.setItem('bookings', JSON.stringify(bookings));
//       alert('Booking successful! Your Booking ID is ' + bookingID);
//       document.getElementById('bookingForm').reset();

//       const modalElement = document.querySelector('#bookingModal');
//       const modal = bootstrap.Modal.getInstance(modalElement);
//       modal.hide();
//   });
// }

// // Function to update transaction history
// function updateTransactionHistory() {
//   const transactionHistory = document.getElementById('transactionHistory');
//   const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

//   transactionHistory.innerHTML = ''; // Clear existing entries

//   bookings.forEach(function(booking) {
//       const row = document.createElement('tr');
//       row.innerHTML = `<td>${booking.bookingID}</td><td>${booking.date}</td>`;
//       transactionHistory.appendChild(row);
//   });
// }

// // Call the function to ensure the form handler is set up
// document.addEventListener('DOMContentLoaded', function() {
//   handleFormSubmission();
//   if (window.location.pathname.includes('transaction-history.html')) {
//       updateTransactionHistory();
//   }
// });

// Function to toggle the chatbot visibility
function toggleChatbot() {
  const chatbotContainer = document.getElementById('chatbotContainer');
  if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
      chatbotContainer.style.display = 'block'; // Show the chatbot
  } else {
      chatbotContainer.style.display = 'none'; // Hide the chatbot
  }
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