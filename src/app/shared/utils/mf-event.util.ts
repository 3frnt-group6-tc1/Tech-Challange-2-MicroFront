import { LoginResponse } from '../services/Auth/auth.service';

export class MfEventUtil {
  static emitLoginEvent(authResult: LoginResponse): void {
    // Emite o evento para o host/container via postMessage (caso esteja em iframe)
    if (window.parent && window.parent !== window) {
      console.log({ type: 'microfront:login', authResult });

      window.parent.postMessage({ type: 'microfront:login', authResult }, '*');
    } else {
      // Fallback para contexto sem iframe
      const event = new CustomEvent('microfront:login', {
        detail: { authResult },
        bubbles: true,
        composed: true,
      });
      window.dispatchEvent(event);
    }
  }
}
