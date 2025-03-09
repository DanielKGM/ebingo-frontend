import { Routes } from '@angular/router';
import { gameResolver } from './resolvers/game.resolver';
import { userResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path: 'cadastro',
    loadComponent: () => {
      return import('./pages/cadastro/cadastro.component').then(
        (m) => m.CadastroComponent
      );
    },
  },
  {
    path: 'jogos',
    loadComponent: () => {
      return import('./pages/listagem/listagem.component').then(
        (m) => m.ListagemComponent
      );
    },
  },
  {
    path: 'jogos/form',
    loadComponent: () => {
      return import('./pages/formulario-jogo/formulario-jogo.component').then(
        (m) => m.FormularioJogoComponent
      );
    },
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
  },
];
