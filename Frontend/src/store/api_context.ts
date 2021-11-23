import { HubConnection } from "@microsoft/signalr";
import React from "react";


export interface ApiContextInterface {
    connection: HubConnection | null;
    restaurantId: number;
}

const ApiContext = React.createContext<ApiContextInterface | null>(null);

export default ApiContext;