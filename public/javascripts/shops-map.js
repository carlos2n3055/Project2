let mapInstance

function initApp() {
    drawMap()
    getShopsFromAPI()
}


function drawMap() {

    mapInstance = new google.maps.Map(
        document.querySelector('#shopsMap'),
        { center: { lat: 39.863390, lng: -4.027755 }, zoom: 13, styles: mapStyles.celeste }
    )
}


function getShopsFromAPI() {

    axios
        .get('/api/shops')
        .then(response => drawMarkers(response.data))
        .catch(err => next(new Error(err)))
}


function drawMarkers(shops) {

    shops.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
        let imgMarker

        switch (elm.nationality) {     // Para cambiar el Marker según el valor de la propiedad "nationality"

            case "Italian":
                imgMarker = "/images/markers/coffeeMarker.png"
                break
            
            case "Mexican":
                imgMarker = "/images/markers/bookMarker.png"
                break
            
            case "Colombian":
                imgMarker = "/images/markers/bookMarker.png"
                break
            
            case "Chinese":
                imgMarker = "/images/markers/bookMarker.png"
                break
            
            default:
                imgMarker = "/images/markers/defaultMarker.png"
        }
   
        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.name,
            icon: imgMarker
        })
    })

    mapInstance.setCenter({ lat: shops[1].location.coordinates[0], lng: shops[1].location.coordinates[1] })
}