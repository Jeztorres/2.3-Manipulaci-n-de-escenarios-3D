# Three.js Demos Collection

Una colección interactiva de demos de Three.js con diferentes tipos de controles y técnicas 3D.

## 🚀 Características

- **Interfaz moderna** con Bootstrap 5 y UIverse
- **4 demos interactivas** con diferentes controles
- **Diseño responsivo** y animaciones suaves
- **Navegación modal** para cada demo
- **Recursos compartidos** optimizados

## 🎮 Demos Disponibles

### 1. Minecraft World
- Generación procedural de terrenos
- Controles de primera persona (FirstPersonControls)
- Texturas auténticas de Minecraft
- Navegación con mouse y teclado

**Controles:**
- Click izquierdo: Avanzar
- Click derecho: Retroceder
- WASD/Flechas: Movimiento
- R/F: Subir/Bajar
- Mouse: Mirar alrededor

### 2. Orbit Controls
- Controles orbitales suaves
- Ideal para visualización de modelos
- Navegación intuitiva alrededor de objetos
- Zoom y paneo

**Controles:**
- Click izquierdo + arrastrar: Rotar
- Rueda del mouse: Zoom
- Click derecho + arrastrar: Paneo

### 3. Pointer Lock Controls
- Experiencia inmersiva de primera persona
- Bloqueo del cursor para navegación natural
- Controles tipo FPS
- Física básica con gravedad y salto

**Controles:**
- WASD: Movimiento
- Espacio: Saltar
- Mouse: Mirar (cursor bloqueado)
- Click para activar

### 4. Map Controls
- Controles estilo mapa para navegación aérea
- Perfecto para visualización de terrenos
- Perspectiva cenital
- Controles invertidos para sensación de mapa

**Controles:**
- Click izquierdo + arrastrar: Paneo
- Rueda del mouse: Zoom
- Click derecho + arrastrar: Rotar

## 📁 Estructura del Proyecto

```
├── index.html                 # Página principal
├── demos/                     # Carpeta de demos
│   ├── minecraft-world/
│   │   └── index.html
│   ├── orbit-controls/
│   │   └── index.html
│   ├── pointer-lock/
│   │   └── index.html
│   └── map-controls/
│       └── index.html
├── build/                     # Three.js core
│   ├── three.core.js
│   └── three.module.js
├── jsm/                       # Módulos de Three.js
│   ├── controls/
│   │   ├── FirstPersonControls.js
│   │   ├── OrbitControls.js
│   │   ├── MapControls.js
│   │   └── PointerLockControls.js
│   ├── math/
│   │   └── ImprovedNoise.js
│   ├── utils/
│   │   └── BufferGeometryUtils.js
│   └── libs/
│       └── stats.module.js
└── textures/                  # Recursos de texturas
    └── minecraft/
        └── atlas.png
```

## 🛠️ Tecnologías Utilizadas

- **Three.js** - Biblioteca 3D para JavaScript
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías (Orbitron, Roboto)

## 🎨 Características de Diseño

- **Tema oscuro** con gradientes modernos
- **Animaciones suaves** y efectos de hover
- **Diseño responsivo** para todos los dispositivos
- **Carga con animación** para mejor UX
- **Navbar transparente** con efecto blur
- **Cards interactivas** con efectos 3D

## 🚀 Cómo Usar

1. Abre `index.html` en tu navegador
2. Navega por las diferentes demos usando el navbar
3. Haz clic en "Explorar Demos" o navega a la sección de demos
4. Selecciona cualquier demo para abrirla en modal
5. Cada demo se carga en un iframe con sus propios controles

## 📱 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles (con limitaciones en controles)

## 🔧 Personalización

Para agregar nuevas demos:

1. Crea una nueva carpeta en `demos/`
2. Agrega tu archivo `index.html`
3. Actualiza las rutas para apuntar a `../../` para recursos compartidos
4. Agrega la nueva demo al `index.html` principal

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Desarrollado con ❤️ usando Three.js y tecnologías web modernas**