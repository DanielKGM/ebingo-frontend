import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RankingDTO } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class GameWebsocketService {
  private stompClient!: Client;
  private readonly isConnected = new BehaviorSubject<boolean>(false);
  gameUpdates$ = new BehaviorSubject<any>(null);
  rankingUpdates$ = new BehaviorSubject<any>(null);
  private readonly subscriptionG: StompSubscription | null = null;
  private readonly subscriptionR: StompSubscription | null = null;

  // Fila para armazenar assinaturas pendentes
  private pendingSubscriptions: {
    topic: string;
    callback: (message: any) => void;
  }[] = [];

  constructor() {}

  connect() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${environment.apiUrl}/ws`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        this.isConnected.next(true);
        this.pendingSubscriptions.forEach(({ topic, callback }) => {
          this.subscribe(topic, callback);
        });

        this.pendingSubscriptions = [];
      },
      onDisconnect: () => {
        this.isConnected.next(false);
      },
      onStompError: (frame) => {
        console.error('❌ Erro STOMP:', frame);
      },
    });

    this.stompClient.activate();
  }

  private subscribe(topic: string, callback: (message: any) => void) {
    if (this.stompClient.connected) {
      this.stompClient.subscribe(topic, callback);
    } else {
      console.warn(`📌 Assinatura pendente: ${topic}`);
      this.pendingSubscriptions.push({ topic, callback });
    }
  }

  subscribeToGame(gameId: string) {
    this.subscribe(`/topic/g/${gameId}`, (message) => {
      const updatedGame = JSON.parse(message.body);
      this.gameUpdates$.next(updatedGame);
    });
  }

  subscribeToRanking(gameId: string) {
    this.subscribe(`/topic/g/${gameId}/r`, (message) => {
      let updatedRanking: RankingDTO[] = JSON.parse(message.body);
      updatedRanking.sort((a, b) => b.marked - a.marked);
      this.rankingUpdates$.next(updatedRanking);
    });
  }

  disconnect() {
    if (this.subscriptionG) {
      this.subscriptionG.unsubscribe();
    }
    if (this.subscriptionR) {
      this.subscriptionR.unsubscribe();
    }
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
    this.isConnected.next(false);
  }
}
