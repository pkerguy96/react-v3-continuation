import { create } from "zustand";

interface UserRoles {
  roles: string[];
  setRoles: (roles: string[]) => void;
  can: (permissions: string[]) => boolean;
}

const useUserRoles = create<UserRoles>((set, get) => ({
  roles: [], // Default empty roles
  setRoles: (roles: string[]) => set({ roles }), // Setter for roles

  can: (permissions: string[]) => {
    const currentRoles = get().roles; // Access the current state
    return permissions.some((permission) => currentRoles.includes(permission));
  },
}));

export default useUserRoles;
