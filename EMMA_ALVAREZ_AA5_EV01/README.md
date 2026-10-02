# GA7-220501096-AA5-EV01 - Diseño y desarrollo de servicios web

## Datos del aprendiz

- **Nombre:** Emma Alvarez
- **Evidencia:** GA7-220501096-AA5-EV01
- **Tema:** Diseño y desarrollo de un servicio web para registro e inicio de sesión.

## Descripción

Este proyecto implementa un servicio web REST para registrar usuarios y validar el inicio de sesión.

La API recibe un usuario y una contraseña. Si las credenciales son correctas, devuelve:

`Autenticación satisfactoria.`

Si las credenciales son incorrectas, devuelve:

`Error en la autenticación.`

Las contraseñas no se almacenan en texto plano. Se utiliza `bcryptjs` para generar y comprobar un hash de contraseña.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- bcryptjs
- Git / GitHub

## Requisitos

1. Tener instalado Node.js y npm.
2. Tener Git instalado si se desea trabajar con el repositorio.
3. Opcionalmente, utilizar Postman, Insomnia o Thunder Client para probar la API.

## Instalación

Abrir una terminal dentro de la carpeta del proyecto y ejecutar:

```bash
npm install
```

## Ejecución

Para iniciar el servicio:

```bash
npm start
```

El servidor quedará disponible en:

```text
http://localhost:3000
```

## Endpoints

### 1. Verificar el servicio

**Método:** `GET`

**URL:**

```text
http://localhost:3000/
```

### 2. Registrar usuario

**Método:** `POST`

**URL:**

```text
http://localhost:3000/api/registro
```

**Body JSON:**

```json
{
  "usuario": "emma",
  "contrasena": "123456"
}
```

**Respuesta esperada:**

```json
{
  "mensaje": "Usuario registrado correctamente."
}
```

### 3. Iniciar sesión

**Método:** `POST`

**URL:**

```text
http://localhost:3000/api/login
```

**Body JSON:**

```json
{
  "usuario": "emma",
  "contrasena": "123456"
}
```

**Respuesta cuando las credenciales son correctas:**

```json
{
  "mensaje": "Autenticación satisfactoria."
}
```

**Respuesta cuando las credenciales son incorrectas:**

```json
{
  "mensaje": "Error en la autenticación."
}
```

## Prueba sugerida

1. Ejecutar `npm install`.
2. Ejecutar `npm start`.
3. En Postman, realizar un `POST` a `/api/registro`.
4. Registrar un usuario.
5. Realizar un `POST` a `/api/login` con la misma contraseña.
6. Comprobar el mensaje de autenticación satisfactoria.
7. Repetir el login con una contraseña incorrecta y comprobar el error de autenticación.

## Versionamiento con Git

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Entrega inicial GA7-220501096-AA5-EV01"
```

Para conectar el proyecto con un repositorio remoto de GitHub:

```bash
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

## Archivo del enlace del repositorio

El archivo `repositorio.txt` acompaña esta entrega. Después de crear el repositorio en GitHub, se debe reemplazar el texto de ejemplo por la URL real del repositorio.

## Estructura

```text
EMMA_ALVAREZ_AA5_EV01/
├── data/
│   └── users.json
├── src/
│   └── server.js
├── .gitignore
├── package.json
├── README.md
└── repositorio.txt
```

## Observación académica

La solución está diseñada para demostrar el funcionamiento básico de una API REST de autenticación. Para un sistema productivo se recomienda utilizar una base de datos, variables de entorno para secretos, HTTPS, gestión de sesiones o JWT, políticas de contraseña y controles adicionales de seguridad.
