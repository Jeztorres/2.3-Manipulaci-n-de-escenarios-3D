/* 
============================================================================
ARCHIVO: MAIN.JS - FUNCIONALIDAD PRINCIPAL DEL SITIO
============================================================================

PROPÓSITO:
  Controla toda la interactividad y efectos de la página principal,
  incluyendo audio, animaciones, loader, navegación y efectos visuales.

COMPONENTES PRINCIPALES:
  1. AudioManager: Sistema de sonidos UI interactivos
  2. Loader: Pantalla de carga con animación typewriter
  3. Efectos de scroll: Navbar dinámico y scroll suave
  4. Sistema de partículas: Efectos visuales de fondo
  5. Intersection Observer: Animaciones al entrar en viewport
  6. Event handlers: Interactividad de botones y navegación

TECNOLOGÍAS:
  - Web Audio API para efectos de sonido
  - Intersection Observer API para animaciones
  - CSS Transitions para efectos visuales
  - Event Listeners para interactividad

AUTOR: Jezrael Jared Gómez Torres
FECHA: 2025
============================================================================
*/

// ========== SISTEMA DE AUDIO INTERACTIVO ==========
/* 
Clase que maneja todos los efectos de sonido de la interfaz.
Utiliza Web Audio API para generar sonidos sintéticos en tiempo real.

BENEFICIOS:
- Mejora la experiencia de usuario con feedback auditivo
- No requiere archivos de audio externos
- Sonidos personalizados para cada tipo de interacción
*/
class AudioManager {
  constructor() {
    this.audioContext = null;        // Contexto de Web Audio API
    this.isInitialized = false;      // Estado de inicialización
    this.init();                     // Inicializar automáticamente
  }

  init() {
    try {
      // Crear contexto de audio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio no soportado en este navegador:', error);
    }
  }

  // Sonido para botones principales (click suave)
  playButtonClick() {
    if (!this.isInitialized) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Sonido para botones de demo (click más electrónico)
  playDemoClick() {
    if (!this.isInitialized) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.05);
    oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  // Sonido para hover (sonido muy sutil)
  playHoverSound() {
    if (!this.isInitialized) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  // Sonido para navegación (click de menú)
  playNavClick() {
    if (!this.isInitialized) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.08);
  }
}

// Instancia global del manejador de audio
const audioManager = new AudioManager();

// Función para inicializar audio en la primera interacción del usuario
function initializeAudioOnFirstInteraction() {
  const initAudio = () => {
    if (audioManager.audioContext && audioManager.audioContext.state === 'suspended') {
      audioManager.audioContext.resume();
    }
    // Remover listeners después de la primera interacción
    document.removeEventListener('click', initAudio);
    document.removeEventListener('keydown', initAudio);
    document.removeEventListener('touchstart', initAudio);
  };
  
  document.addEventListener('click', initAudio);
  document.addEventListener('keydown', initAudio);
  document.addEventListener('touchstart', initAudio);
}

// Inicializar audio en la primera interacción
initializeAudioOnFirstInteraction();

// ========== LOADER FUNCTIONALITY ==========
(function handleLoader(){
  const params = new URLSearchParams(window.location.search);
  const fromDemo = params.get('from') === 'demo';
  const loader = document.getElementById('app-loader');
  const skipLoader = document.documentElement.classList.contains('skip-loader');
  if (loader && !skipLoader) document.body.classList.add('has-loader');

    if (fromDemo || skipLoader) {
      // Omitir el loader al volver desde una demo
      if (loader) {
        loader.classList.add('is-hidden');
        document.body.classList.remove('has-loader');
      }
      // Limpiar el parámetro para no persistir el estado si el usuario recarga
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.delete('from');
        window.history.replaceState({}, document.title, url.toString());
      }
      // Bandera global para que otros scripts (typewriter) también omitan
      window.__SKIP_LOADER_ANIM__ = true;
      
      // Si viene con hash #demos, hacer scroll a la sección demos
      if (window.location.hash === '#demos') {
        setTimeout(() => {
          const demosSection = document.getElementById('demos');
          if (demosSection) {
            demosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
      return;
    }

        // Comportamiento normal: mostrar loader un mínimo de tiempo
        const MIN_VISIBLE = 2600; // ms
        const start = Date.now();
        function hide() {
          const elapsed = Date.now() - start;
          const wait = Math.max(0, MIN_VISIBLE - elapsed);
          setTimeout(() => {
            // Iniciar transición de desenfoque antes de ocultar completamente
            if (loader) {
              document.body.classList.add('loader-fading');
              loader.classList.add('fade-out');
              
              setTimeout(() => {
                loader.classList.add('is-hidden');
                document.body.classList.remove('has-loader', 'loader-fading');
                // Siempre ir al inicio después del loader
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }, 500); // Esperar a que termine la transición
            }
          }, wait);
        }
  window.addEventListener('load', hide);
  // Fallback en caso de que 'load' tarde demasiado
  setTimeout(() => hide(), 8000);
  
  // Asegurar que la página inicie en el top después del loader
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!fromDemo && !skipLoader) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 3000); // Después de que termine todo el proceso del loader
  });
})();

// ========== TYPEWRITER ANIMATION ==========
(function typeWriter(){
  if (window.__SKIP_LOADER_ANIM__) return; // Volvimos desde demo, no animar
  const el = document.getElementById('tw-title');
  if (!el) return;
  const text = 'Bienvenidos, explora demos 3D';
  const speed = 55; // ms por caracter
  let i = 0;
  function step(){
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
})();

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========== BUTTON FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
  const slideBtn = document.querySelector('.btn-slide');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (slideBtn) {
    // Sonido de hover para el botón principal
    slideBtn.addEventListener('mouseenter', function() {
      audioManager.playHoverSound();
    });
    
    slideBtn.addEventListener('click', function() {
      audioManager.playButtonClick();
      const demosSection = document.getElementById('demos');
      if (demosSection) {
        demosSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
  
  // Funcionalidad del indicador de scroll
  if (scrollIndicator) {
    scrollIndicator.addEventListener('mouseenter', function() {
      audioManager.playHoverSound();
    });
    
    scrollIndicator.addEventListener('click', function() {
      audioManager.playButtonClick();
      const demosSection = document.getElementById('demos');
      if (demosSection) {
        demosSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Agregar sonidos a todos los botones secundarios
  const secondaryButtons = document.querySelectorAll('.btn-secondary-custom');
  secondaryButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      audioManager.playHoverSound();
    });
    
    button.addEventListener('click', function() {
      audioManager.playButtonClick();
    });
  });

  // Agregar sonidos a los botones de demo
  const demoButtons = document.querySelectorAll('.btn-primary');
  demoButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      audioManager.playHoverSound();
    });
    
    button.addEventListener('click', function() {
      audioManager.playDemoClick();
    });
  });

  // Agregar sonidos a los iconos de demo
  const demoIcons = document.querySelectorAll('.demo-icon');
  demoIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      audioManager.playHoverSound();
    });
    
    icon.addEventListener('click', function() {
      audioManager.playDemoClick();
    });
  });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// ========== MOBILE MENU FUNCTIONALITY ==========
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.nav-link');

// Cerrar menú al hacer click en un enlace (móvil)
navLinks.forEach(link => {
  // Sonido de hover para enlaces de navegación
  link.addEventListener('mouseenter', function() {
    audioManager.playHoverSound();
  });
  
  link.addEventListener('click', () => {
    audioManager.playNavClick();
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click(); // Simula click en el toggler para cerrar
    }
  });
});

// Efecto de click en el toggler
if (navbarToggler) {
  navbarToggler.addEventListener('click', function() {
    audioManager.playNavClick();
    this.classList.toggle('active');
  });
}

// Cerrar menú al hacer scroll (móvil)
window.addEventListener('scroll', function() {
  if (navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
});

// ========== PARTICLE SYSTEM ==========
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// ========== INTERSECTION OBSERVER ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe demo cards
document.querySelectorAll(".fade-in-up").forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `all 0.8s ease ${index * 0.1}s`;
  observer.observe(el);
});

// ========== CLICK EFFECTS ==========
document
  .querySelectorAll(
    ".demo-card, .btn-primary-custom, .btn-secondary-custom"
  )
  .forEach((element) => {
    // Sonido de hover para tarjetas de demo
    if (element.classList.contains('demo-card')) {
      element.addEventListener("mouseenter", function () {
        audioManager.playHoverSound();
      });
    }
    
    element.addEventListener("click", function () {
      // Sonido específico para tarjetas de demo
      if (this.classList.contains('demo-card')) {
        audioManager.playDemoClick();
      } else {
        audioManager.playButtonClick();
      }
      
      // Add subtle click feedback
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 100);
    });
  });

// ========== FOOTER CREDIT ==========
(function addFooterCredit(){
  const footer = document.createElement('footer');
  footer.style.cssText = 'padding:20px 0; text-align:center; color: var(--gray-light); border-top: 1px solid rgba(255,255,255,0.06); background: transparent;';
  footer.innerHTML = '<small>Desarrollado por <strong style="color: var(--accent)">Jezrael Jared Gómez Torres</strong></small>';
  document.body.appendChild(footer);
})();