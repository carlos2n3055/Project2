# week5_day2

>
> Axios
>


## Main points: Axios

- <a href="https://www.npmjs.com/package/axios">Axios</a> es una librería que permite gestionar llamadas de AJAX (GET, POST, PUT, DELETE)
- Instalación: mediante Node `npm i axios` o a través de CDN:
  ````html
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
- Axios dispone de cuatro métodos para realizar peticiones asíncronas al servidor:
  ````javascript
  axios.get("url")
  axios.post("url", data)
  axios.put("url", data)
  axios.delete("url")
  ````
- Es posible implementar Axios a través de la creación de una app de Axios dotada de un `baseURL` sobre el que aplicar cada verbo con su *endpoint*:
  ````javascript
  const axiosApp = axios.create({
    baseURL: 'https://www.elservidor.com/api'
  })
  
  axiosApp.get('/registros`)      // Realiza petición GET a https://www.elservidor.com/api/registros
  ````
- Todas las peticiones de Axios son resultas mediante promesas que retronan un objeto que almacena la respuesta del servidor bajo su propiedade `data`:
  ````javascript
  axiosApp
    .get("url")
    .then(response => console.log('La respuesta del servidor es ', response.data)
    .catch(err => console.log(err))
  ````

## Main points: formularios asíncronos
El método `.preventDefault()` del objeto `event` permite anular el envío clásico de un formulario para gestionarlo mediante AJAX:
  ````javascript
  formObject.onsubmit = e => e.preventDefault()
  ````

## Aside: aplicación de alimentos (GET/POST/PUT)

Para ejecutar la aplicación de alimentos es necesario iniciar Chrome con este comando sobre el terminal:
  ````raw
  open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome
  ````
Esto permite abrir el HTML funcional en cualquiera de las pestañas de la nueva ventana.

El Base URL de la API de alimentos es `https://reactr-realfooder.herokuapp.com/api`, con los siguientes endpoints:

  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/shops`  | GET | Muestra todas las tiendas  |
  | `/shops/new` | GET | Muestra el formulario para crear una tienda  |
  | `/shops/new` | POST | Guarda en la BBDD una tienda  |
  | `/shops/:id` | GET | Muestra los detalles de una tienda  |
  | `/shops/delete?id=xxx` | GET | Elimina de la BBDD una tienda  |
  | `/shops/edit?id=xxx` | GET | Muestra el formulario para editar una tienda  |
  | `/shops/edit?id=xxx` | POST | Edita en la BBDD la tienda |# prueba
