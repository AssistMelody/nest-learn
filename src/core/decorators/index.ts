import { SetMetadata } from '@nestjs/common';
import { IS_PROTECT, VISIT_ROLE } from '../enums/guard.enum';

export const IsProtect = () => SetMetadata(IS_PROTECT, VISIT_ROLE[IS_PROTECT]);
