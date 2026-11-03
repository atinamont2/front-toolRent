# 🛠️ ToolRent — Plataforma de Alquiler de Herramientas

Plataforma web colaborativa para el alquiler y publicación de herramientas de trabajo. Diseñada con **React 19**, **Vite** y conectada a un backend en **Spring Boot**, permite a los usuarios buscar herramientas, calcular presupuestos por día de alquiler, gestionar sus pedidos y publicar sus propias herramientas para ponerlas a disposición de otros usuarios.

---

## 🚀 Características Principales

### 🔐 Autenticación & Seguridad

- **Registro e Inicio de Sesión:** Creación de cuenta y login con almacenamiento de token JWT en `localStorage`.
- **Interceptors con Axios:** Inyección automática del header `Authorization: Bearer <token>` en cada petición y redirección automática al login en respuestas `401` / `403`.
- **Rutas Protegidas:** Componente `ProtectedRoute` para resguardar las vistas privadas.
- **Control de Roles:** Detección de roles (`ROLE_ADMIN`) decodificando el JWT para proteger el acceso a la administración de usuarios.

### 🧰 Catálogo y Búsqueda

- **Home interactiva:** Grilla responsive de herramientas disponibles para alquilar.
- **Búsqueda en tiempo real:** Búsqueda textual por nombre o descripción consumiendo `/api/products/search`.
- **Detalle de producto y cotizador:** Selección interactiva de rango de fechas con cálculo automático de días de alquiler y monto total estimado.

### 👤 Perfil y Publicación de Herramientas

- **Panel de usuario:** Visualización de los datos del usuario conectado (Nombre, Email, Rol).
- **Publicación de herramientas:** Formulario desplegable para publicar herramientas con nombre, descripción, precio diario y dirección de retiro. El backend asocia automáticamente el producto al usuario autenticado.
- **Gestión propia:** Listado de las herramientas publicadas exclusivamente por el usuario actual, con acción directa para **eliminar** cada publicación.

### 📦 Gestión de Pedidos (Órdenes)

- Listado de pedidos realizados con fecha de inicio, fin, resumen de ítems, estado del pedido (`PENDING`, `CONFIRMED`, `CANCELLED`) y monto total.
- Capacidad de cancelar pedidos activos directamente desde la interfaz.

### 👥 Administración de Usuarios (Exclusivo Administradores)

- Vista completa CRUD para crear, listar, inspeccionar y eliminar usuarios de la plataforma.

---

## 🏗️ Estructura del Proyecto

```text
src/
├── api/                   # Clientes HTTP y llamadas a endpoints
│   ├── auth.js            # Login, registro y manejo de errores
│   ├── client.js          # Instancia Axios con interceptores JWT
│   ├── errors.js          # Normalización de mensajes de error
│   ├── orders.js          # Endpoints de órdenes/pedidos
│   ├── products.js        # CRUD y búsqueda de productos
│   └── users.js           # Gestión de usuarios (Admin)
├── components/            # Componentes reutilizables de UI
│   ├── AuthForm/          # Formulario unificado de Login y Registro
│   ├── Navbar/            # Barra de navegación principal y sesión
│   ├── OrderList/         # Tarjetas y listado de pedidos
│   ├── ProductCard/       # Tarjeta de herramienta (Detalle / Eliminar)
│   ├── ProductForm/       # Formulario para publicar herramientas
│   ├── ProductGrid/       # Grilla adaptable de herramientas
│   ├── ProtectedRoute/    # Guard de rutas según autenticación
│   ├── RentalForm/        # Selector de fechas y cotizador de alquiler
│   ├── SearchBar/         # Barra de búsqueda con submit
│   └── UserList/          # Listado y tarjetas de administración de usuarios
├── constants/             # Constantes globales
│   ├── routes.js          # Definición de rutas de la app
│   └── storage.js         # Claves de almacenamiento local (TOKEN_KEY)
├── hooks/                 # Custom React Hooks
│   ├── useOrders.js       # Consumo reactivo de pedidos
│   ├── useProduct.js      # Detalle de un producto individual
│   ├── useProducts.js     # Catálogo completo
│   ├── useSearchProducts.js # Búsqueda filtrada con debounce/query
│   └── useUsers.js        # Gestión reactiva de usuarios
├── pages/                 # Vistas principales de React Router
│   ├── Home/              # Catálogo principal y buscador
│   ├── Login/             # Página de acceso
│   ├── Orders/            # Historial de pedidos
│   ├── ProductDetail/     # Ficha de herramienta y alquiler
│   ├── Profile/           # Mi perfil, publicar y eliminar mis herramientas
│   ├── Register/          # Alta de nuevo usuario
│   └── Users/             # Panel de administración de usuarios
├── utils/                 # Helpers y utilidades
│   ├── authHelpers.js     # Decodificación de token y chequeo de rol
│   └── dateHelpers.js     # Cálculo de días y fechas ISO
├── App.jsx                # Router y árbol de navegación principal
├── main.jsx               # Entrypoint de React con ReactDOM
└── index.css              # Variables CSS y estilos base del sistema
```

---

## 💻 Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** o **pnpm**
- Backend en **Spring Boot** activo (por defecto en `http://localhost:8080`)

## 🗺️ Mapa de Rutas

| Ruta            | Acceso      | Descripción                                             |
| --------------- | ----------- | ------------------------------------------------------- |
| `/login`        | Público     | Formulario de inicio de sesión                          |
| `/register`     | Público     | Formulario de registro de usuario                       |
| `/`             | Autenticado | Catálogo de herramientas y barra de búsqueda            |
| `/products/:id` | Autenticado | Detalle de herramienta y formulario de alquiler         |
| `/orders`       | Autenticado | Mis pedidos y estados de alquiler                       |
| `/profile`      | Autenticado | Mis datos personales, mis herramientas y publicar nueva |
| `/users`        | Solo Admin  | Administración de usuarios (CRUD)                       |
