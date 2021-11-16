import axios from "axios";
import { User, UserFormValues } from "../models/user";
import { history } from "../App";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
    const token = getToken();
    if (token)
        config!.headers!.Authorization = `Bearer ${token}`;

    return config;
});

export async function login(formValues: UserFormValues): Promise<User | null> {
    const response = await axios.post<User>("/account/login", formValues);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push("/");
        return response.data;
    }

    return null;
}

export async function register(formValues: UserFormValues): Promise<User | null> {
    const response = await axios.post<User>("/account/register", formValues);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push("/");
        return response.data;
    }

    return null;
}

export function logout(): void {
    localStorage.removeItem("user");
}

export function getToken(): string | null {
    const user = localStorage.getItem("user");
    if (user) {
        const obj: User = JSON.parse(user)
        return obj.accessToken;
    }

    return null;
}