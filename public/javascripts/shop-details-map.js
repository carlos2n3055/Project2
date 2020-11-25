let mapInstance

// Para obtener el Id de la tienda
const shopIdtoMap = document.querySelector('#shopIDtoMap')
const shopId = shopIdtoMap.innerHTML

function initApp() {
    drawMap()
    getShopsFromAPI()
}


function drawMap() {

    mapInstance = new google.maps.Map(
        document.querySelector('#shopMap'),
        { center: { lat: 39.863390, lng: -4.027755 }, zoom: 13, styles: mapStyles.celeste }
    )
}


function getShopsFromAPI() {

    let shopFind

    axios
        .get('/api/shops')
        .then(response => {
            
            let shopsArray = response.data
            shopsArray.forEach(elm => {
                if (elm._id === shopId) {
                    shopFind = elm
                }
            })
            drawMarkers(shopFind)

        })
        .catch(err => console.log(err))
}


function drawMarkers(shopFind) {

        let position = { lat: shopFind.location.coordinates[0], lng: shopFind.location.coordinates[1] }
        let imgMarker

        switch (shopFind.nationality) {     // Para cambiar el Marker según el valor de la propiedad "nationality"

            case "Italian":
                imgMarker = "/images/markers/italian-marker.png"
                break
            
            case "Mexican":
                imgMarker = "/images/markers/mexican-marker.png"
                break
            
            case "Colombian":
                imgMarker = "/images/markers/colombian-marker.png"
                break
            
            case "Chinese":
                imgMarker = "/images/markers/chinese-marker.png"
                break
            
            default:
                imgMarker = "/images/markers/defaultMarker.png"
        }
   
        new google.maps.Marker({
            map: mapInstance,
            position,
            title: shopFind.name,
            icon: imgMarker
        })

    mapInstance.setCenter({ lat: shopFind.location.coordinates[0], lng: shopFind.location.coordinates[1] })
}