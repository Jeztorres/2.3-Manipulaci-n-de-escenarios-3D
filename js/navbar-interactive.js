/**
 * ============================================================================
 * NAVBAR INTERACTIVO CON SCROLL TRACKING
 * ============================================================================
 * 
 * CARACTERÍSTICAS:
 *   - Navbar que sigue al usuario durante scroll
 *   - Indicador de progreso de scroll
 *   - Resaltado automático de sección activa
 *   - Smooth scroll entre secciones
 *   - Animaciones fluidas y responsivas
 * 
 * AUTOR: Jezrael Jared Gómez Torres
 * ============================================================================
 */

class InteractiveNavbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.scrollProgress = null;
    
    this.init();
  }

  init() {
    this.createScrollProgress();
    this.bindEvents();
    this.updateActiveSection();
  }

  /**
   * Crea la barra de progreso de scroll
   */
  createScrollProgress() {
    this.scrollProgress = document.createElement('div');
    this.scrollProgress.className = 'scroll-progress';
    document.body.appendChild(this.scrollProgress);
  }

  /**
   * Vincula todos los eventos necesarios
   */
  bindEvents() {
    // Evento de scroll optimizado con requestAnimationFrame
    let ticking = false;
    
    const handleScrollEvent = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    // Smooth scroll para enlaces de navegación
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          this.smoothScrollTo(targetSection);
        }
      });
    });

    // Actualizar en resize
    window.addEventListener('resize', () => {
      this.updateActiveSection();
    });

    // Inicializar estado del navbar
    this.handleScroll();
  }

  /**
   * Maneja el evento de scroll
   */
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Actualizar estado del navbar
    this.updateNavbarState(scrollTop);
    
    // Actualizar progreso de scroll
    this.updateScrollProgress(scrollTop, documentHeight);
    
    // Actualizar sección activa
    this.updateActiveSection();
    
    // Efecto de translucidez dinámico
    this.updateTranslucency(scrollTop);
  }

  /**
   * Actualiza el estado visual del navbar según el scroll
   */
  updateNavbarState(scrollTop) {
    if (scrollTop > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  /**
   * Actualiza la translucidez del navbar dinámicamente
   */
  updateTranslucency(scrollTop) {
    // Calcular opacidad basada en el scroll (más translúcido arriba, menos abajo)
    const maxScroll = 300;
    const minOpacity = 0.3;
    const maxOpacity = 0.8;
    
    let opacity = minOpacity + (scrollTop / maxScroll) * (maxOpacity - minOpacity);
    opacity = Math.min(Math.max(opacity, minOpacity), maxOpacity);
    
    // Aplicar la opacidad al fondo del navbar
    const bgColor = scrollTop > 50 ? 
      `rgba(10, 14, 39, ${opacity})` : 
      `rgba(10, 14, 39, ${opacity * 0.6})`;
    
    this.navbar.style.background = bgColor;
  }

  /**
   * Actualiza la barra de progreso de scroll
   */
  updateScrollProgress(scrollTop, documentHeight) {
    const progress = (scrollTop / documentHeight) * 100;
    this.scrollProgress.style.width = `${Math.min(progress, 100)}%`;
  }

  /**
   * Actualiza qué sección está activa en el viewport
   */
  updateActiveSection() {
    const scrollTop = window.pageYOffset;
    const offset = 100; // Offset para el navbar fijo
    
    let activeSection = null;
    
    // Encontrar la sección activa
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        activeSection = section;
      }
    });

    // Si estamos en la parte superior, activar la primera sección
    if (scrollTop < 200) {
      activeSection = this.sections[0];
    }

    // Actualizar enlaces activos
    this.updateActiveLinks(activeSection);
  }

  /**
   * Actualiza los enlaces activos en el navbar
   */
  updateActiveLinks(activeSection) {
    // Remover clase active de todos los enlaces
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Agregar clase active al enlace correspondiente
    if (activeSection) {
      const activeLink = document.querySelector(`.nav-link[href="#${activeSection.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }

  /**
   * Scroll suave hacia una sección
   */
  smoothScrollTo(target) {
    const targetPosition = target.offsetTop - 80; // Offset para el navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  /**
   * Función de easing para animación suave
   */
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

/**
 * ============================================================================
 * EFECTOS ADICIONALES DEL NAVBAR
 * ============================================================================
 */

class NavbarEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addMobileMenuEffects();
  }

  /**
   * Efectos de hover mejorados
   */
  addHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e.target, e);
      });
    });
  }

  /**
   * Crea efecto ripple en los enlaces
   */
  createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 0;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  /**
   * Efectos para el menú móvil
   */
  addMobileMenuEffects() {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');
    
    if (toggler && collapse) {
      toggler.addEventListener('click', () => {
        setTimeout(() => {
          if (collapse.classList.contains('show')) {
            collapse.style.animation = 'slideDown 0.3s ease';
          }
        }, 10);
      });
    }
  }
}

/**
 * ============================================================================
 * INICIALIZACIÓN
 * ============================================================================
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar navbar interactivo
  new InteractiveNavbar();
  
  // Inicializar efectos adicionales
  new NavbarEffects();
  
  console.log('🚀 Navbar interactivo inicializado correctamente');
});

// Agregar estilos CSS para el efecto ripple
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);