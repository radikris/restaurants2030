import { HubConnection } from "@microsoft/signalr";
import React from "react";


export interface ManagementContextInterface {
    connection: HubConnection | null;
    restaurantId: number;
}

const ManagementContext = React.createContext<ManagementContextInterface | null>(null);

export default ManagementContext;