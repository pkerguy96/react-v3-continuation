import { APIClient } from "./Http";

export interface Role {
  id: number;
  name: string;
}

export interface RoleResponse {
  status: string;
  message: string;
  data: Role[];
}

export interface NurseRole {
  id: number;
  name: number;
}
export interface NurseRoleResponse {
  status: string;
  message: string;
  data: NurseRole[];
}
export interface PermissionName {
  rolename: string;
}
export interface AddRoles {
  nurseid: number;
  rolename: string;
  permissions: PermissionName[];
}
export interface CreateRole {
  rolename: string;
}
export interface UserRoleData {
  id: number;
  rolename: string;
  created_at: string;
  patients: Patient[];
}

interface Patient {
  nom: string;
}
interface roleid {
  id: number;
}
export const RoleApiClient = new APIClient<RoleResponse>("/getRoles");
export const RoleNursesClient = new APIClient<NurseRoleResponse>(
  "/RolesNursesList"
);
export const getUsersWithRolesClient = new APIClient<UserRoleData>(
  "/getUsersViaRoles"
);
export const DeleteRoleApiClient = new APIClient<roleid>("/deleteRole");
export const AddRolesApiClient = new APIClient<AddRoles>("/grantAccess");
export const CreateRoleApiClient = new APIClient<CreateRole>("/createRole");
export const getRolespermissionsApiClient = new APIClient<any>(
  "/userPermissions"
);
