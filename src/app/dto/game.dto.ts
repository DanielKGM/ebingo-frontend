import { UserDTO } from './user.dto';

export interface GameDto {
  id?: string;
  roomName: string;
  startTime: string;
  endTime?: string;
  prize?: string;
  manualFill: boolean;
  drawnNumbers?: number[];
  players?: UserDTO[];
  cardSize?: number;
  status: 'NAO_INICIADO' | 'INICIADO' | 'ENCERRADO' | 'CANCELADO';
}
