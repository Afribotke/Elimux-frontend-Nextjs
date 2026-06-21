export type UserRole =
  | "owner"
  | "admin"
  | "manager"
  | "editor"
  | "viewer";

export const ROLE_HIERARCHY: UserRole[] = [
  "viewer",
  "editor",
  "manager",
  "admin",
  "owner",
];

export interface RoleDefinition {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageStaff: boolean;
  canManageInstitution: boolean;
  canManagePayments: boolean;
  canManageEnrollments: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RoleDefinition> = {
  viewer: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canManageStaff: false,
    canManageInstitution: false,
    canManagePayments: false,
    canManageEnrollments: false,
  },

  editor: {
    canView: true,
    canEdit: true,
    canDelete: false,
    canManageStaff: false,
    canManageInstitution: false,
    canManagePayments: false,
    canManageEnrollments: true,
  },

  manager: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canManageStaff: false,
    canManageInstitution: false,
    canManagePayments: true,
    canManageEnrollments: true,
  },

  admin: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canManageStaff: true,
    canManageInstitution: true,
    canManagePayments: true,
    canManageEnrollments: true,
  },

  owner: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canManageStaff: true,
    canManageInstitution: true,
    canManagePayments: true,
    canManageEnrollments: true,
  },
};

