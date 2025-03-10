import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  GameAuditDto,
  GameCardDto,
  GameDto,
  GameFilterDto,
} from '../dto/game.dto';
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

  // Obter Lista Filtrada de Jogos
  getGames(filter: GameFilterDto): Observable<GameCardDto[]> {
    let params = new HttpParams();

    if (filter.roomName) {
      params = params.set('roomName', filter.roomName);
    }
    if (filter.status) {
      params = params.set('status', filter.status);
    }

    return this.http.get<GameCardDto[]>(this.apiUrl, { params });
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
        number: number,
      },
    });
  }

  // Auditoria
  getAudits(gameId: string): Observable<GameAuditDto[]> {
    return this.http.get<GameAuditDto[]>(`${this.apiUrl}/${gameId}/audit`);
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
