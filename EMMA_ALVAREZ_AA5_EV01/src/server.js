// GA7-220501096-AA5-EV01
// Servicio web de registro e inicio de sesión.
// Tecnologías: Node.js + Express + bcryptjs.
//
// NOTA: Para una aplicación real se recomienda utilizar una base de datos,
// variables de entorno, HTTPS y tokens/sesiones para mantener autenticación.
// En esta evidencia se utiliza un archivo JSON para mantener el ejemplo sencillo.

const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Permite recibir información en formato JSON desde las peticiones HTTP.
app.use(express.json());

const DATA_DIR = path.join(__dirname, "..", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Crea la carpeta y el archivo de usuarios si todavía no existen.
function initializeStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]", "utf8");
  }
}

// Lee todos los usuarios almacenados.
function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

// Guarda la lista actualizada de usuarios.
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

// Ruta de prueba para verificar que el servicio está funcionando.
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servicio web de autenticación funcionando correctamente.",
    endpoints: {
      registro: "POST /api/registro",
      inicioSesion: "POST /api/login"
    }
  });
});

// Endpoint para registrar un nuevo usuario.
// Recibe: { "usuario": "...", "contrasena": "..." }
app.post("/api/registro", async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validación básica de los datos recibidos.
    if (!usuario || !contrasena) {
      return res.status(400).json({
        mensaje: "El usuario y la contraseña son obligatorios."
      });
    }

    if (usuario.trim().length < 3) {
      return res.status(400).json({
        mensaje: "El usuario debe tener al menos 3 caracteres."
      });
    }

    if (contrasena.length < 6) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 6 caracteres."
      });
    }

    const users = readUsers();

    // Evita registrar dos veces el mismo usuario.
    const userExists = users.some(
      (item) => item.usuario.toLowerCase() === usuario.trim().toLowerCase()
    );

    if (userExists) {
      return res.status(409).json({
        mensaje: "El usuario ya se encuentra registrado."
      });
    }

    // Nunca se almacena la contraseña directamente.
    // bcrypt genera un hash para proteger la contraseña almacenada.
    const passwordHash = await bcrypt.hash(contrasena, 10);

    users.push({
      usuario: usuario.trim(),
      passwordHash
    });

    writeUsers(users);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente."
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({
      mensaje: "Error interno del servidor."
    });
  }
});

// Endpoint para iniciar sesión.
// Recibe: { "usuario": "...", "contrasena": "..." }
app.post("/api/login", async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validación de los datos recibidos.
    if (!usuario || !contrasena) {
      return res.status(400).json({
        mensaje: "El usuario y la contraseña son obligatorios."
      });
    }

    const users = readUsers();

    // Busca el usuario sin diferenciar mayúsculas y minúsculas.
    const user = users.find(
      (item) => item.usuario.toLowerCase() === usuario.trim().toLowerCase()
    );

    // Si no existe, se informa que la autenticación falló.
    if (!user) {
      return res.status(401).json({
        mensaje: "Error en la autenticación."
      });
    }

    // Compara la contraseña recibida con el hash almacenado.
    const passwordCorrect = await bcrypt.compare(
      contrasena,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        mensaje: "Error en la autenticación."
      });
    }

    // Autenticación correcta.
    return res.status(200).json({
      mensaje: "Autenticación satisfactoria."
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({
      mensaje: "Error interno del servidor."
    });
  }
});

initializeStorage();

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
