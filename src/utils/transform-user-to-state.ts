import {UserRole} from "@/types";
import {TProtectUserData} from "@/services/auth/auth.types";

export type TUserDataState = {
    id: number
    role: UserRole
    isAdmin: boolean
    isLoggedIn: boolean
}

export const transformUserToState = (
    user: TProtectUserData
): TUserDataState | null => {
    return {
        ...user,
        isAdmin: user.role === UserRole.Admin,
        isLoggedIn: true
    }
}