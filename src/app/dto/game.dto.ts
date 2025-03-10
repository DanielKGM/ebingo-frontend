import { UserDTO } from './user.dto';

export interface GameDto {
  id?: string;
  roomName?: string;
  startTime?: Date;
  endTime?: Date;
  manualFill?: boolean;
  drawnNumbers?: number[];
  winner?: UserDTO;
  cardSize?: number;
  prize?: string;
  status?: 'NAO_INICIADO' | 'INICIADO' | 'ENCERRADO' | 'CANCELADO';
}

export interface GameCardDto {
  id?: string;
  roomName?: string;
  startTime?: Date;
  endTime?: string;
  prize?: boolean;
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
