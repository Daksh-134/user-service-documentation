import { ErrorTypeEnum } from "@/constants";

import { PermissionDAL } from "./permission.dal";
import { PermissionDto } from "./permission.dto";
import { createPermission, createPermissionSchema, getPermission } from "./permission.validation";

export class PermissionService {
  static async createPermission(createPermission: createPermission): Promise<getPermission> {
    const validPermissionData = createPermissionSchema.parse(createPermission);

    const isPermissionExist = await PermissionDAL.getPermissionByName(validPermissionData.name);

    if (isPermissionExist) throw new Error(ErrorTypeEnum.enum.PERMISSION_ALREADY_EXISTS);

    const createdPermission = await PermissionDAL.createPermission(validPermissionData);

    return PermissionDto(createdPermission).getPermission();
  }

  static async getPermissions(): Promise<getPermission[]> {
    const permissions = await PermissionDAL.getPermissions();
    return permissions.map((permission) => PermissionDto(permission).getPermission());
  }
}
