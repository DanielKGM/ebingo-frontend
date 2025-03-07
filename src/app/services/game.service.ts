import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GameDto } from '../dto/game.dto';
import { Observable } from 'rxjs';
import { CardDto } from '../dto/card.dto';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl = `${environment.apiUrl}/games`; // URL da API para jogos

  constructor(private readonly http: HttpClient) {}

  // Criar um novo jogo
  createGame(game: GameDto): Observable<GameDto> {
    return this.http.post<GameDto>(this.apiUrl, game);
  }

  // Atualizar um jogo existente
  updateGame(id: string, game: GameDto): Observable<GameDto> {
    return this.http.put<GameDto>(`${this.apiUrl}/${id}`, game);
  }

  // Filtrar jogos por nome da sala e status
  filterGames(roomName: string, status: string): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(`${this.apiUrl}/filter`, {
      params: {
        roomName: roomName,
        status: status,
      },
    });
  }

  // Obter todos os jogos
  getAllGames(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(this.apiUrl);
  }

  // Deletar um jogo
  deleteGame(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getGameById(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${gameId}`);
  }

  // Entrar no jogo e gerar cartela
  joinGame(gameId: string, userId: string): Observable<CardDto> {
    return this.http.post<CardDto>(`${this.apiUrl}/${gameId}/join`, null, {
      params: { userId },
    });
  }

  // Adicionar um número sorteado ao jogo
  drawNumber(gameId: string): Observable<GameDto> {
    return this.http.post<GameDto>(`${this.apiUrl}/${gameId}/draw`, null);
  }

  // Marcar um número na cartela
  markNumber(
    gameId: string,
    userId: string,
    number: number
  ): Observable<number[]> {
    return this.http.post<number[]>(`${this.apiUrl}/${gameId}/mark`, null, {
      params: {
        userId,
        number: number.toString(),
      },
    });
  }

  // Buscar o prêmio do jogo para um usuário específico
  getPrize(gameId: string, userId: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${gameId}/prize`, {
      params: { userId },
    });
  }

  getUserCard(gameId: string, userId: string): Observable<CardDto> {
    return this.http.get<CardDto>(`${this.apiUrl}/${gameId}/${userId}`);
  }
}
