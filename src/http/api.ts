import axios from "axios";

const api = axios.create({

    //todo: move this 
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
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