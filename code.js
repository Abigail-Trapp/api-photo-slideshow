
navigator.geolocation.getCurrentPosition(function(coordinates){
    console.log(coordinates)
}, function(){
    "error"
})

navigator.geolocation.watchPosition(function(coordinates){
    console.log(coordinates)
}, function(){
    "error"
})


let ApiURL = "https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=95db5d281b03e7bd051253ac7c9c6b91&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.6350342&lon=-104.90107370000001&text=dog"


function constructImageURL(photo) {
    return "https://farm" + photo.farm + 
    ".staticflickr.com/" + photo.server + 
    "/" + photo.id + "_" + photo.secret + ".jpg"
}
fetch(ApiURL)
    .then(response => response.json())
    .then(data => {
        this.loopOverPhotos(data.photos)
    })


let photoDiv = document.getElementById("photo")
function appendImageURL(photo){
    photoDiv.innerHTML = ""
    let imageURL = constructImageURL(photo)
    let img = document.createElement("img")
    img.src = imageURL
    photoDiv.append(img)
}

function loopOverPhotos(photos){
    localStorage.setItem("currentPhoto", 0 )
    localStorage.setItem("gallery", JSON.stringify(photos.photo))
  
    let intervalID = setInterval(this.displayNextPhoto.bind(this), 2000)
    localStorage.setItem("IntervalID", intervalID)
    }

    function displayNextPhoto(){
        let gallery = JSON.parse(localStorage.getItem("gallery"))
        let currentPhoto = Number.parseInt(localStorage.getItem("currentPhoto"))
        
        if (gallery.length > 0 && currentPhoto < gallery.length){
            appendImageURL(gallery[currentPhoto])
            currentPhoto += 1
            localStorage.setItem("currentPhoto", currentPhoto)
        } else {
            let intervalID = Number.parseInt(localStorage.getItem("IntervalID"))
            clearInterval(intervalID)
        }
    }
