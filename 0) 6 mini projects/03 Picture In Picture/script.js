const videoElement = document.getElementById("video");

const button = document.getElementById("button");

// Promt to selec media stream, pass to video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (err) {
        console.log(err);
    }
}

button.addEventListener("click", async () => {
    // Disable button
    button.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
});

// on Load

selectMediaStream();
