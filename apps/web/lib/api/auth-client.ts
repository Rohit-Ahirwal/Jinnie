import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "./client";


export async function apiRequest<T>(
    token: string,
    config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {

    return api<T>({
        ...config,

        headers: {
            ...config.headers,

            Authorization: `Bearer ${token}`,
        },
    });
}