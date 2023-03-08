const ACCESS_KEY = '6nSf817o_i0BmrpDw6mPEd_DIsbzj4QcbNLcqHSbhws';
let count = 5;
let unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`;

const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader-container');

// Initialize variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Increase image count after initial load
function increaseLoadedImages() {
  count = 30;
  unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`;
}

// Sets the variables once all images has loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    increaseLoadedImages();
    loader.hidden = true;
    ready = true;
    imagesLoaded = 0;
  }
}

// setAttributes function to avoid repetition on setting attributes.
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Creates a new <a> element with nested <img> to display images and allow users to be redirected to unsplash website
function displayImages(arr) {
  totalImages = arr.length;

  arr.forEach(image => {
    // create <a> element 
    const item = document.createElement('a')
    setAttributes(item, {
      href: image.links.html,
      target: '_blank'
    })

    // create <img> element
    const img = document.createElement('img');
    setAttributes(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description
    })
    
    // nest child <img> inside parent <a>
    item.appendChild(img); 
    
    // nest <a> to #image-container
    imageContainer.appendChild(item);

    // listens to every load of an image and calls imageLoaded()
    img.addEventListener('load', imageLoaded);
  })
}

// Fetches images from Unspash API
async function getImages() {
  try {
    const response = await fetch(unsplashUrl);
    const imagesArray = await response.json();
    displayImages(imagesArray);
  } catch (err) {
    console.error(err);
  }
}

// Infinite scroll functionality
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getImages();
  }
})

// On load of script
getImages();