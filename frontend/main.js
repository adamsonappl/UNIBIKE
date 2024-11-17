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
