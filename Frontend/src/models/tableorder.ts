import { OrderModel } from "./order";

export type TableOrderModel = {
    table: number;
    pending: OrderModel[];
    finished: OrderModel[];
};
