import { HubConnection } from "@microsoft/signalr";
import React from "react";


export interface WaiterContextInterface {
    connection: HubConnection | null;
    restaurantId: number;
}

const WaiterContext = React.createContext<WaiterContextInterface | null>(null);

export default WaiterContext;