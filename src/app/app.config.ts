import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  provideAppInitializer,
  inject
} from '@angular/core';
import {ActivatedRoute, provideRouter, Router} from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {UserStore} from './store/user-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: '.my-app-dark'
            }
        }
    }),
    provideHttpClient(),
    provideAppInitializer(() => {
      const userStore = inject(UserStore);
      const router = inject(Router);
      const route = inject(ActivatedRoute);
      userStore.loadUserFromStorage();
      const segments = route.snapshot.url;
      const last = segments[segments.length - 1]?.path
      if(userStore.authenticated() && (last === 'login' || last === 'register')) {
        router.navigate(['/dashboard']);
      }

    })
  ]
};
