import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PROTECT, VISIT_ROLE } from '../enums/guard.enum';

@Injectable()
export class VisitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<number>(IS_PROTECT, context.getHandler());
    return VISIT_ROLE[IS_PROTECT] !== roles;
  }
}
