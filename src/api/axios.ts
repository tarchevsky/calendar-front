import axios, {CreateAxiosDefaults} from "axios";
import {API_URL} from "@/constants/main.constants";
import {errorCatch, getContentType} from "@/api/api.helper";
import {getAccessToken, removeFromStorage} from "@/services/auth/auth.helper";
import authService from "@/services/auth/auth.service";

const axiosOptions: CreateAxiosDefaults = {
    baseURL: API_URL,
    headers: getContentType(),
    withCredentials: true, // Чтобы cookies прокидывались прям внутри запроса как httpOnly cookie
}

export const axiosClassic = axios.create(axiosOptions) // axios для всех обычных запросов, удобно, потому что он использует настройки выше и не надо прописывать настройки путей руками

export const instance = axios.create(axiosOptions) // отвечающий за работу интерсепторов, чтобы refreshToken перезаписывался

instance.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

instance.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await authService.getNewTokens()
                return instance.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired' || errorCatch(error) === 'Refresh token not passed')
                    removeFromStorage()
            }
        }

        throw error
    }
)