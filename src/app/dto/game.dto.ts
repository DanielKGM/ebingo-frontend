import { UserDTO } from './user.dto';

export interface GameDto {
  id?: string;
  roomName?: string;
  startTime?: Date;
  endTime?: string;
  prize?: string;
  manualFill?: boolean;
  drawnNumbers?: number[];
  players?: UserDTO[];
  winner?: UserDTO;
  cardSize?: number;
  status?: 'NAO_INICIADO' | 'INICIADO' | 'ENCERRADO' | 'CANCELADO';
}

export interface GameCardDto {
  id?: string;
  roomName?: string;
  startTime?: Date;
  endTime?: string;
  prize?: string;
  manualFill?: boolean;
  players?: number;
  cardSize?: number;
  status?: 'NAO_INICIADO' | 'INICIADO' | 'ENCERRADO' | 'CANCELADO';
}

export interface GameFilterDto {
  roomName?: string | null;
  status?: 'NAO_INICIADO' | 'INICIADO' | 'ENCERRADO' | 'CANCELADO' | null;
}

export interface GameAuditDto {
  nickname: string;
  game: GameDto;
  action: string;
  timestamp: Date;
}
