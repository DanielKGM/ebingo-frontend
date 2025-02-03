import { Routes } from '@angular/router';

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
    path: 'jogos/novo',
    loadComponent: () => {
      return import('./pages/formulario-jogo/formulario-jogo.component').then(
        (m) => m.FormularioJogoComponent
      );
    },
  },
  {
    path: 'perfil',
    loadComponent: () => {
      return import('./pages/perfil/perfil.component').then(
        (m) => m.PerfilComponent
      );
    },
  },
];
