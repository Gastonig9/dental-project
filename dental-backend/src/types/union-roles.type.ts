import { $Enums } from '@prisma/client';

export type UNION_ROLES =
  (typeof $Enums.EnumRoles)[keyof typeof $Enums.EnumRoles];
