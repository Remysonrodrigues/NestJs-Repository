import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";

export const ROLES_KEy = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEy, roles);