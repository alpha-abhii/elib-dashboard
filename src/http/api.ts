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