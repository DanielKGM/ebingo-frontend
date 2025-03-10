import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const requiredRoles = route.data['roles'] as Array<string>;
  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.getRoles().pipe(
    map((roles) => {
      localStorage.setItem('roles', roles.toString());
      const hasRequiredRole = requiredRoles.some((role) =>
        roles.includes(role)
      );

      if (hasRequiredRole) {
        return true;
      } else {
        router.navigate([roles.includes('ROLE_USER') ? '/jogos' : '']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  );
};
