import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({

    //todo: move this 
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export const login = async (data: {email: string; password: string}) => {
    return api.post("/api/v1/users/login",data);
}
export const register = async (data: {name: string; email: string; password: string}) => {
    return api.post("/api/v1/users/register",data);
}

export const getbooks = async () => {
    return api.get("/api/v1/books/list")
}

export const createBook = async (data: FormData) => {
    return api.post("/api/v1/books/create",data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}