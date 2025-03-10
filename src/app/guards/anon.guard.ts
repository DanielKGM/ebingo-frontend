import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const anonGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  return auth.getRoles().pipe(
    map((roles) => {
      let ok = roles.length == 0;
      if (!ok) {
        router.navigate(['/jogos']);
      }
      return ok;
    }),
    catchError(() => {
      router.navigate(['']);
      return of(true);
    })
  );
};
