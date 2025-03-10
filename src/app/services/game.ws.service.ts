import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GameWebsocketService {
  private stompClient!: Client;
  private readonly isConnected = new BehaviorSubject<boolean>(false); // 🔹 Estado da conexão
  gameUpdates$ = new BehaviorSubject<any>(null);
  private subscription: StompSubscription | null = null;

  constructor() {}

  connect() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${environment.apiUrl}/ws`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        this.isConnected.next(true); // 🔹 Atualiza estado da conexão
      },
      onDisconnect: () => {
        this.isConnected.next(false);
      },
      onStompError: (frame) => {
        console.error('Erro STOMP:', frame);
      },
    });

    this.stompClient.activate();
  }

  subscribeToGame(gameId: string) {
    this.isConnected.subscribe((connected) => {
      if (connected) {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }

        this.subscription = this.stompClient.subscribe(
          `/topic/game/${gameId}`,
          (message) => {
            const updatedGame = JSON.parse(message.body);
            this.gameUpdates$.next(updatedGame);
          }
        );
      }
    });
  }

  disconnect() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
    this.isConnected.next(false);
  }
}
