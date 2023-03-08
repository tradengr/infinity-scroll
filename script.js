const ACCESS_KEY = '6nSf817o_i0BmrpDw6mPEd_DIsbzj4QcbNLcqHSbhws';
const COUNT = 30;
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${COUNT}`;

const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
  imagesLoaded++;
  console.log('image loaded', imagesLoaded); // CHECKING
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    imagesLoaded = 0;
    console.log('ready', ready) // CHECKING
  }
}

// attributes is an object
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayImages(arr) {
  totalImages = arr.length;
  console.log('total image', totalImages); // CHECKING

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

    // listens to load of images
    img.addEventListener('load', imageLoaded);

    // nest child <img> inside parent <a>
    item.appendChild(img); 

    // nest <a> to image-container
    imageContainer.appendChild(item);
  })
}

async function getImages() {
  try {
    const response = await fetch(UNSPLASH_URL);
    const imagesArray = await response.json();
    displayImages(imagesArray);
  } catch (err) {
    console.error(err);
  }
}

// infinite scroll functionality
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getImages();
  }
})

// on load
getImages();