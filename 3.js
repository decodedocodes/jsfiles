// Create a black overlay div
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'black';
overlay.style.zIndex = '9997'; // Set a high z-index to overlay everything
overlay.style.display = 'block'; // Show the overlay by default

// Create a text element
const text = document.createElement('div');
text.textContent = "Press 'P' to toggle";
text.style.position = 'absolute';
text.style.top = '50%';
text.style.left = '50%';
text.style.transform = 'translate(-50%, -50%)';
text.style.color = 'white';
text.style.fontSize = '24px';

// Add the text to the overlay
overlay.appendChild(text);

// Add the overlay to the body
document.body.appendChild(overlay);

// Toggle the overlay on and off when the 'P' key is pressed
document.addEventListener('keydown', function(event) {
  if (event.code === 'KeyP') {
    if (overlay.style.display === 'none') {
      overlay.style.display = 'block'; // Show the overlay
    } else {
      overlay.style.display = 'none'; // Hide the overlay
    }
  }
});
