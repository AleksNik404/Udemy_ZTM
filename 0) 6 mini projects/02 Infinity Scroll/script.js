const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
let count = 5;
const apiKey = "AHFFhJ_VGnu3HYcJvA-Bv1XuMCj7-yFin2u26IGdYP0";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function imageLoaded() {
  console.log("image Loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos(photosArray) {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    //create <a> to link Unslpash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading;

    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (err) {
    console.log(err);
  }
}

// Емае скролл ивентом...На ограниченный по запросам API.

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
