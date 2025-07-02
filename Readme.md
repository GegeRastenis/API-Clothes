# 👗 API - CLOTHES

API REST desarrollada para un trabajo práctico final por alumnas del curso de Programación BackEnd del Instituto ADA ITW. Su funcionalidad nos permite gestionar acciones sobre productos de ropa a través de operaciones CRUD (Create, Read, Update, Delete)

## 🛠️ Tecnologías utilizadas

- Node.js / Express
- Bcrypt
- Cors
- Jsonwebtoken
- JSON como formato de intercambio de datos
- Postman para la prueba de rutas antes del despliegue
- Render para el despliegue de la página web y API a un dominio
  

## 📦 Funcionalidad principal

La API permite realizar operaciones sobre un catálogo de productos de ropa, incluyendo:

- Crear un nuevo producto
- Obtener todos los productos
- Obtener productos por ID
- Actualizar un producto existente
- Eliminar un producto
- Registrar usuario
- Inicio de sesión de un usuario
- Ruta protegida para el administrador

## 📁 Estructura del proyecto
```
API-CLOTHES/  
│
├── backend/  
│   └── src/  
│       ├── controllers/  
│       │   ├── clothes-controller.js        # Lógica de productos  
│       │   └── users-controller.js          # Lógica de usuarios  
│       │
│       ├── database/  
│       │   ├── productos.json               # Datos de ejemplo de productos  
│       │   └── users.json                   # Datos de ejemplo de usuarios  
│       │
│       ├── middlewares/  
│       │   ├── auth-middleware.js           # Autenticación de usuarios  
│       │   ├── error-middleware.js          # Manejo de errores  
│       │   └── validate-middleware.js       # Validación de datos  
│       │
│       ├── models/  
│       │   ├── clothes-models.js            # Modelo de ropa  
│       │   └── users-model.js               # Modelo de usuario  
│       │
│       ├── routes/  
│       │   ├── clothes-routes.js            # Rutas de productos  
│       │   └── user-routes.js               # Rutas de usuarios  
│       │
│       ├── .env                             # Variables de entorno (puerto, DB, JWT)  
│       └── index.js                         # Punto de entrada de la API  
│
├── node_modules/                            # Dependencias del proyecto  
│
├── public/  
│   └── image.png                            # Imagen decorativa o de muestra
│   └── index.html                           # Pagina html de la sección principal de la página web
│   └── style.css                           # Contiene todos los estilos para el html
│   └── script.js                           # Contiene la lógica para poder conectar el frontend con el backend y hacer llamadas a la API creada
│
├── package.json                             # Info del proyecto y dependencias  
├── package-lock.json                        # Detalle de versiones exactas  
└── README.md                                # Documentación del proyecto  
```

## 🔗 Endpoints disponibles

| Método | Ruta               | Descripción                         |
|--------|--------------------|-------------------------------------|
| GET    | /api/clothes       | Lista todos los productos           |
| GET    | /api/clothes/:id   | Obtiene un producto por su ID       |
| POST   | /api/clothes       | Crea un nuevo producto              |
| PUT    | /api/clothes/:id   | Actualiza un producto existente     |
| DELETE | /api/clothes/:id   | Elimina un producto                 |
| POST   | /api/users/register| Registra a un usuario nuevo         |
| POST   | /api/users/login   | Inicio de sesión de usuario         |


### 📌 Ejemplo de producto

```json
{
  "id" : 1, 
  "name": "Tshirt",
  "description": "New Shirt",
  "size": "Medium",
  "price": 16,
  "image": ""
}
```
▶️ Cómo correr el proyecto
Clonar el repositorio:
```
git clone https://github.com/GegeRastenis/API-Clothes.git  
cd API-Clothes
```
Instalar dependencias:
```
npm install express bcrypt cookie-parser cors jsonwebtoken
```

Configurar las variables de entorno (archivo .env):

```
npm install dotenv
```

PORT=3000

http://localhost:3000/

Iniciar el servidor:
```
npm start
```
# 🌐 Acceso a la página 
```
https://api-clothes-18gw.onrender.com/
```

➕ Agregar un producto
- Inicie sesión desde: 
https://api-clothes-18gw.onrender.com/login
- Proceda a logearse como administrador:
  admin@gmail.com
  Contraseña: admin
- Dar click en botón de "Agregar Producto"
- Ingresar la información que desea agregar
- En la sección de ingresar imagen del producto, debe de introducir una url de una imagen de internet, que sea de extensión jpg, png, jpeg. Ejemplo: https://s3-us-west-1.amazonaws.com/calzzapato/zoom/09H0Q1-1.jpg
- Finalmente dar click en el botón de "Guardar"

🧪 Testing
Se pueden realizar pruebas con Postman para verificar los endpoints

🤝 Colaboradores

- [Fiorella Rodríguez](https://github.com/fiorellam)  
- [Constanza Riveros Ayala](https://github.com/constanzagra)  
- [Ana Karen Prieto](https://github.com/kprieto)  
- [Giselle Rastenis](https://github.com/GegeRastenis)
