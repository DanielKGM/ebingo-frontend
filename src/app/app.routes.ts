import { Routes } from '@angular/router';
import { gameResolver } from './resolvers/game.resolver';
import { userResolver } from './resolvers/user.resolver';
import { rolesGuard } from './guards/roles.guard';
import { anonGuard } from './guards/anon.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
    canActivate: [anonGuard],
  },
  {
    path: 'cadastro',
    loadComponent: () => {
      return import('./pages/cadastro/cadastro.component').then(
        (m) => m.CadastroComponent
      );
    },
    canActivate: [anonGuard],
  },
  {
    path: 'jogos',
    loadComponent: () => {
      return import('./pages/listagem/listagem.component').then(
        (m) => m.ListagemComponent
      );
    },
    canActivate: [rolesGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'jogos/form',
    loadComponent: () => {
      return import('./pages/formulario-jogo/formulario-jogo.component').then(
        (m) => m.FormularioJogoComponent
      );
    },
    canActivate: [rolesGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'jogos/form/:uuid',
    loadComponent: () => {
      return import('./pages/formulario-jogo/formulario-jogo.component').then(
        (m) => m.FormularioJogoComponent
      );
    },
    resolve: {
      game: gameResolver,
    },
    canActivate: [rolesGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'perfil',
    loadComponent: () => {
      return import('./pages/perfil/perfil.component').then(
        (m) => m.PerfilComponent
      );
    },
    resolve: {
      user: userResolver,
    },
    canActivate: [rolesGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'jogos/:uuid',
    loadComponent: () => {
      return import('./pages/partida/partida.component').then(
        (m) => m.PartidaComponent
      );
    },
    resolve: {
      game: gameResolver,
      user: userResolver,
    },
    canActivate: [rolesGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
