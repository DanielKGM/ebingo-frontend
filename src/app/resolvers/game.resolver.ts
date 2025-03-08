import { ResolveFn, Router } from '@angular/router';
import { GameDto } from '../dto/game.dto';
import { inject } from '@angular/core';
import { GameService } from '../services/game.service';

export const gameResolver: ResolveFn<GameDto> = (route, state) => {
  return inject(GameService).getGameById(route.paramMap.get('uuid')!);
};
