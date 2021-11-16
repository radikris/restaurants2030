export interface User {
    accessToken: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    restaurantName?: string;
}