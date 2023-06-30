let imagesLoaded = 0;
let count = 30;
let totalImages = 30
let isReady = false;
const imgContainer = document.querySelector('.img-container');
let acessKey = config.ACCESSKEY;
const url = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${acessKey}&orientation=portrait`;
let photosArr = [];

function imageLoaded(){
    console.log('img loaded');
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        isReady = true;
        loader.hidden = true;
        console.log("ready")
    }
}


//Helper function to set attributes on DOM element
function setAttributes(element, att){
    for(const key in att){
        element.setAttribute(key, att[key]);
    }
}


// Create Elements for Links and photos, Add to the DOM
function renderImages(){
    imagesLoaded = 0;
    totalImages = photosArr.length;
    photosArr.forEach(imgData => {
        let image = document.createElement('img');
        setAttributes(image, {
            src: imgData.urls.small,
            alt: imgData.alt_description,
            title: imgData.alt_description
        });
        image.addEventListener("load",imageLoaded);
        imgContainer.append(image);
    })
}


//get images from Unsplah API
async function getImages(){
    try{
    let res = await fetch(url);
    photosArr = await res.json();
    renderImages();
    }catch(err){
        alert(err);
    }
}

window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && isReady) {
        isReady = false;
        console.log('scrolled')
        getImages();
    }
})

getImages();
