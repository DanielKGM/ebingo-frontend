import { ResolveFn } from '@angular/router';
import { UserDTO } from '../dto/user.dto';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const userResolver: ResolveFn<UserDTO> = (route, state) => {
  let user = JSON.parse(localStorage.getItem('user')!);
  if (!user) {
    return inject(AuthService).getUser();
  }
  return user;
};
