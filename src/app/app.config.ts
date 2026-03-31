import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject
} from '@angular/core';
import {ActivatedRoute, provideRouter, Router} from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {UserStore} from './store/user-store';
import {authInterceptor} from './interceptor/auth-interceptor';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

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
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideCharts(withDefaultRegisterables()),
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
