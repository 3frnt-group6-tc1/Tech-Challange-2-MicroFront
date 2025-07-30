import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const apiConfig = {
  // baseUrl: 'http://tech-challenge-2-alb-1096144064.us-east-1.elb.amazonaws.com',
  baseUrl: 'http://localhost:3000',
  usersEndpoint: '/users',
};

export const systemConfig: {
  version: string;
  company: string;
  year: number;
} = {
  version: '1.0.0',
  company: 'CDJMV',
  year: new Date().getFullYear(),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
