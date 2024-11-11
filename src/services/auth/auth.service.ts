import {IAuthFormData, IUser} from "@/types";
import {axiosClassic, instance} from "@/api/axios";
import {removeFromStorage, saveTokenStorage} from "@/services/auth/auth.helper";

interface IAuthResponse {
    accessToken: string
    user: IUser
}

class AuthService {
    async main(type: 'login' | 'register', data: IAuthFormData) {
        const response = await axiosClassic.post<IAuthResponse>(
            `/auth/${type}`,
            data
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    }

    async getNewTokens() {
        const response = await axiosClassic.post<IAuthResponse>(
            `/auth/login/access-token`
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    }

    async getNewTokensByRefresh(refreshToken: string) {
        const response = await axiosClassic.post<IAuthResponse>(
            '/auth/login/access-token',
            {},
            {
                headers: {
                    Cookies: `refreshToken=${refreshToken}`
                }
            }
        )

        return response.data
    }

    async logout() {
        const response = await axiosClassic.post<boolean>('/auth/logout')

        if (response.data) removeFromStorage()

        return response
    }

    async profile() {
        return instance.get<IUser>(`/auth/profile`)
    }

    async users() {
        return instance.get<IUser[]>(`/auth/users`)
    }
}

export default new AuthService()