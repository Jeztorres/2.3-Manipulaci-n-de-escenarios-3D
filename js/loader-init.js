/* 
============================================================================
ARCHIVO: LOADER-INIT.JS - INICIALIZACIÓN CRÍTICA DEL LOADER
============================================================================

PROPÓSITO:
  Se ejecuta ANTES que cualquier CSS o contenido para detectar si el usuario
  viene desde una demo y debe saltarse la animación del loader.

¿POR QUÉ ES CRÍTICO?
  - Se ejecuta inline en el <head> antes del CSS
  - Evita el "flash" del loader cuando no es necesario
  - Mejora la UX al volver desde demos

FUNCIONAMIENTO:
  1. Lee parámetros URL al cargar la página
  2. Detecta si viene el parámetro ?from=demo
  3. Añade clase CSS para saltarse el loader
  4. El CSS oculta el loader si tiene esta clase

TÉCNICA:
  - IIFE (Immediately Invoked Function Expression) para encapsulación
  - try/catch para compatibilidad con navegadores antiguos
  - URLSearchParams para parsing moderno de parámetros

AUTOR: Jezrael Jared Gómez Torres
============================================================================
*/

// ========== DETECCIÓN TEMPRANA DE NAVEGACIÓN DESDE DEMO ==========
(function(){
  try {
    // Leer parámetros de la URL actual
    // URLSearchParams: API moderna para manejar query strings
    var params = new URLSearchParams(window.location.search);
    
    // Verificar si viene el parámetro ?from=demo
    // Esto indica que el usuario viene desde una demo y debe saltarse el loader
    if (params.get('from') === 'demo') {
      // Añadir clase al <html> ANTES de que cargue el CSS
      // Esta clase será detectada por los estilos para ocultar el loader
      document.documentElement.classList.add('skip-loader');
    }
  } catch (e) {
    // Silenciar errores en navegadores que no soporten URLSearchParams
    // Degradación graceful: si falla, simplemente mostrará el loader normal
  }
})();
