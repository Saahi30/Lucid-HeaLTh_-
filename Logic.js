const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Function to access the user's camera
function init() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
        });
}

// Function to decode the QR code
function decodeFrame() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

    if (code) {
        // Redirect to the common URL
        window.location.href = 'https://www.youtube.com/';
    }

    requestAnimationFrame(decodeFrame);
}

// Initialize the camera and start decoding frames
init();
decodeFrame();