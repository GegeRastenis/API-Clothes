# 👗 API - CLOTHES

API REST desarrollada para un trabajo práctico final por alumnas del curso de Programación BackEnd del Instituto ADA ITW. Su funcionalidad nos permite gestionar acciones sobre productos de ropa a través de operaciones CRUD (Create, Read, Update, Delete).

## 🛠️ Tecnologías utilizadas

- Node.js / Express
- JSON como formato de intercambio de datos
- Postman para la prueba de rutas antes del despliegue

## 📦 Funcionalidad principal

La API permite realizar operaciones sobre un catálogo de productos de ropa, incluyendo:

- Crear un nuevo producto
- Obtener todos los productos
- Obtener productos por ID
- Actualizar un producto existente
- Eliminar un producto

## 📁 Estructura del proyecto

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
│
├── package.json                             # Info del proyecto y dependencias
├── package-lock.json                        # Detalle de versiones exactas
└── README.md                                # Documentación del proyecto


## 🔗 Endpoints disponibles

| Método | Ruta               | Descripción                         |
|--------|--------------------|-------------------------------------|
| GET    | /api/clothes       | Lista todos los productos           |
| GET    | /api/clothes/:id   | Obtiene un producto por su ID       |
| POST   | /api/clothes       | Crea un nuevo producto              |
| PUT    | /api/clothes/:id   | Actualiza un producto existente     |
| DELETE | /api/clothes/:id   | Elimina un producto                 |

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
▶️ Cómo correr el proyecto
Clonar el repositorio:

git clone https://github.com/GegeRastenis/API-Clothes.git
cd API-Clothes

Instalar dependencias:!!!!!

npm install
Configurar las variables de entorno (archivo .env):

PORT=3000
http://localhost:3000/
Iniciar el servidor:
npm start


🧪 Testing
Se pueden realizar pruebas con Postman para verificar los endpoints.

🤝 Colaboradores
Fiorella Rodríguez - https://github.com/fiorellam
Constanza Riveros Ayala  - https://github.com/constanzagra
Ana Karen Prieto - https://github.com/kprieto
Gisele Rastenis - https://github.com/GegeRastenis
