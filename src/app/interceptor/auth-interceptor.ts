import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {UserStore} from '../store/user-store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStore);
  const token = userStore.token();
  if(token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
}
