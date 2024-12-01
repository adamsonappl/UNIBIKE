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

//ADMIN BIKES
let bikes = [
  { id: 'TCR56-2', status: 'Available', location: 'CCIS - CMNS', image: '/frontend/assets/bike3.jpg' },
  { id: 'TKV16-7', status: 'Available', location: 'MAIN GATE - MASAWA', image: '/frontend/assets/bike3.jpg' },
  { id: 'IAY13-3', status: 'Unavailable', location: 'Unavailable', image: '/frontend/assets/bike3.jpg' },
  { id: 'JGS05-10', status: 'Available', location: 'CCIS - CED', image: '/frontend/assets/bike3.jpg' }
];

function renderBikes() {
  const bikeList = document.getElementById('bikeList');
  bikeList.innerHTML = ''; // Clear existing bikes
  bikes.forEach(bike => {
      const bikeCard = `
          <div class="col-md-3">
              <div class="card mb-3">
                  <img src="${bike.image}" class="card-img-top" alt="Bike Image">
                  <div class="card-body">
                      <h5 class="card-title">${bike.id}</h5>
                      <p class="card-text">Status: ${bike.status}</p>
                      <p class="card-text">Location: ${bike.location}</p>
                      <button class="btn btn-warning" onclick="editBike('${bike.id}')">Edit</button>
                      <button class="btn btn-danger" onclick="deleteBike('${bike.id}')">Delete</button>
                  </div>
              </div>
          </div>
      `;
      bikeList.innerHTML += bikeCard;
  });
}
function editBike(bikeId) {
  const bike = bikes.find(b => b.id === bikeId);
  if (bike) {
      document.getElementById('bikeId').value = bike.id;
      document.getElementById('bikeStatus').value = bike.status;
      document.getElementById('bikeLocation').value = bike.location;
      document.getElementById('bikeImage').value = ''; // Clear the file input
      document.getElementById('bikeModalLabel').innerText = 'Edit Bike';
      var myModal = new bootstrap.Modal(document.getElementById('bikeModal'));
      myModal.show();
  }
}

function deleteBike(bikeId) {
  if (confirm('Are you sure you want to delete this bike?')) {
      bikes = bikes.filter(b => b.id !== bikeId);
      renderBikes();
      alert('Bike ' + bikeId + ' deleted.');
  }
}
document.getElementById('bikeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const bikeId = document.getElementById('bikeId').value;
  const bikeStatus = document.getElementById('bikeStatus').value;
  const bikeLocation = document.getElementById('bikeLocation').value;
  const bikeImage = document.getElementById('bikeImage').files[0];

  const reader = new FileReader();
  reader.onloadend = function() {
      const bike = {
          id: bikeId,
          status: bikeStatus,
          location: bikeLocation,
          image: reader.result // Use the image data URL
      };

      // Check if editing or adding a new bike
      const existingBikeIndex = bikes.findIndex(b => b.id === bikeId);
      if (existingBikeIndex > -1) {
          bikes[existingBikeIndex] = bike; // Update existing bike
      } else {
          bikes.push(bike); // Add new bike
      }

      renderBikes(); // Re-render the bike list
      var myModal = bootstrap.Modal.getInstance(document.getElementById('bikeModal'));
      myModal.hide();
      document.getElementById('bikeForm').reset(); // Reset the form
      document.getElementById('bikeModalLabel').innerText = 'Add New Bike'; // Reset modal title
  };
  reader.readAsDataURL(bikeImage); // Read the image file
});
        // Initial rendering of default bikes
       
        renderBikes(); // Render initial bikes
