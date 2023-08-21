import { applyDecorators, UseGuards } from '@nestjs/common';

import { LocalGuard } from '../guards/local.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';

export function LocalAuth() {
  return applyDecorators(UseGuards(LocalGuard));
}

export function Auth() {
  return applyDecorators(UseGuards(AccessTokenGuard));
}

export function Reauth() {
  return applyDecorators(UseGuards(RefreshTokenGuard));
}
