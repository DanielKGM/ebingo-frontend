import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const anonGuard: CanActivateFn = (route, state) => {
  if (
    !localStorage.getItem('roles') ||
    localStorage.getItem('roles')?.length == 0
  ) {
    return true;
  }
  const router = inject(Router);
  const auth = inject(AuthService);
  return auth.getRoles().pipe(
    map((roles) => {
      let saia = roles.includes('ROLE_USER');
      if (saia) {
        router.navigate(['/jogos']);
      }
      return !saia;
    }),
    catchError(() => {
      router.navigate(['']);
      return of(true);
    })
  );
};
