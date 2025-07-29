export class NavigationUtil {
  static emitNavigationEvent(link: string): void {
    // Emite o evento para o host/container via postMessage (caso esteja em iframe)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'microfront:navigate', link }, '*');
    } else {
      // Fallback para contexto sem iframe
      const event = new CustomEvent('microfront:navigate', {
        detail: { link },
        bubbles: true,
        composed: true,
      });
      window.dispatchEvent(event);
    }
  }

  static scrollToSection(sectionId: string): void {
    const tryScroll = (attemptsLeft: number) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(attemptsLeft - 1), 100);
      }
    };
    tryScroll(10);
  }
}
