export interface CardDto {
  id: string;
  gameId: string;
  userId: string;
  numbers: number[]; // Números da cartela
  markedNumbers: number[]; // Números que foram marcados
}
