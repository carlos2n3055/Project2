# INTERNATIONAL SHOPS

## Shops: International shops finder (GET/POST)


El Base URL de la API de las tiendas es `http://localhost:3000/api/shops`, con los siguientes endpoints:

  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/shops`  | GET | Muestra todas las tiendas  |
  | `/shops/new` | GET | Muestra el formulario para crear una tienda  |
  | `/shops/new` | POST | Guarda en la BBDD una tienda  |
  | `/shops/:id` | GET | Muestra los detalles de una tienda  |
  | `/shops/delete?id=xxx` | GET | Elimina de la BBDD una tienda  |
  | `/shops/edit?id=xxx` | GET | Muestra el formulario para editar una tienda  |
  | `/shops/edit?id=xxx` | POST | Edita en la BBDD la tienda |
  
  
  
## Users: Users profile (GET/POST)


 Utiliza los siguientes endpoints:

  | Path        | Method           | Description  |
  | ------------- | ------------- | ------------- |
  | `/user-zone/signup` | GET | Muestra el formulario para crear un usuario  |
  | `/user-zone/signup` | POST | Guarda en la BBDD un usuario  |
  | `/user-zone/login` | GET | Muestra el formulario para el Login del usuario  |
  | `/user-zone/login` | POST | Login del usuario a su perfil  |
  | `/user-zone/logout` | GET | Cierra la sesión del usuario  |
  | `/user-zone/profile` | GET | Muestra al usuario su perfil  |
  | `/user-zone/edit?user_id=xxx` | GET | Muestra el formulario para editar el perfil del usuario  |
  | `/user-zone/edit?user_id=xxx` | POST | Edita en la BBDD el perfil del usuario |
  | `/user-zone/delete` | GET | Muestra al ADMIN todos los perfiles de usuario |
  | `/user-zone/delete?user_id=xxx` | POST | Borra de la BBDD un usuario |
  
  
