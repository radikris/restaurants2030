import React, { useState, useEffect, useReducer, useCallback } from "react";

import "react-multi-carousel/lib/styles.css";
import {
  Text,
  Wrap,
  Grid,
  GridItem
} from "@chakra-ui/react";
import TableCard from "./components/table_card";
import DoneOrderCard from "./components/done_order_card";
import { FaArrowAltCircleUp } from "react-icons/fa";
import SwipeableItem from "./components/swipeable_item";
import produce from "immer";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export enum ActionTypes {
  INITIAL = "Initial",
  ORDER_STATUS_CHANGED = "OrderStatusChanged"
}

export enum OrderStatus {
  InProgress = 0,
  Ready = 1,
  Served = 2
}

export interface Order {
  id: number;
  table: number;
  name: string;
  price: number;
  orderStatus: OrderStatus;
}

export type OrderAction = {
  type: ActionTypes;
  order?: Order;
  orders?: Order[];
}

export default function WaiterPage() {
  const [tableOrdersRemastered, tableOrdersRemasteredDispatch] = useReducer(produce((draft: Map<number, Order[]>, action: OrderAction) => {
    switch (action.type) {
      case ActionTypes.INITIAL: {
        if (action.orders !== undefined) {
          action.orders.forEach((order: Order) => {
            var table = draft.get(order.table);
            if (table !== undefined) {
              table.push(order);
            } else {
              draft.set(order.table, [order]);
            }
          });
        }
        break;
      }
      case ActionTypes.ORDER_STATUS_CHANGED: {
        if (action.order !== undefined) {
          var table = draft.get(action.order.table);
          if (table !== undefined) {
            var idx = table.findIndex(x => x.id === action.order?.id);
            table[idx] = action.order;
          }
        }
        break;
      }
    }
  }), new Map<number, Order[]>(), undefined);

  const handleChangeStatus = useCallback((order: Order) => {
    tableOrdersRemasteredDispatch({type: ActionTypes.ORDER_STATUS_CHANGED, order});
  }, []);

  const handleInitial = useCallback((allOrders: Order[]) => {
    tableOrdersRemasteredDispatch({type: ActionTypes.INITIAL, orders: allOrders})
  }, []);

  const [connection, setConnection] = useState<null | HubConnection>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/restauranthub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build();

    setConnection(connect);
  }, []);

  const handleChangeStatusInvoke = useCallback((order: Order, status: OrderStatus) => {
    connection?.invoke("UpdateOrderStatus", { Id: order.id, OrderStatus: status });
  }, [connection]);

  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        connection.on("AllOrders", (orders: Order[]) => {
          handleInitial(orders);
        });
        connection.on("OrderStatusUpdated", (order: Order) => {
          handleChangeStatus(order);
        });

        connection.invoke("GetAllOrders", { RestaurantId: 1 });
      }).catch((error) => console.log(error));
    }
  }, [connection, handleChangeStatus, handleInitial]);

  const [allPendingOrder, setAllPendingOrders] = useState<Order[]>([]);

  useEffect(() => {
    var returnArray: Order[] = [];
    tableOrdersRemastered.forEach((order, index) => (
      returnArray = returnArray.concat(order.filter(x => x.orderStatus === OrderStatus.InProgress || x.orderStatus === OrderStatus.Ready))
    ));
    setAllPendingOrders(returnArray);
  }, [tableOrdersRemastered]);

  

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem colSpan={4} bg="papayawhip" p={2}>
        <Wrap>
          {Array.from(tableOrdersRemastered).map((orders) => (
            <TableCard
              key={orders[0]}
              table={orders[1]}
              changeStatus={handleChangeStatusInvoke}
            />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
        {<SwipeableItem
              children={<DoneOrderCard />}
              swipeChild={<Text>DONE</Text>}
              icon={<FaArrowAltCircleUp />}
              list={allPendingOrder}
              onClick={function (orderAction: Order): void {
                handleChangeStatusInvoke(orderAction, OrderStatus.Served);
              }}
            />}
      </GridItem>
    </Grid>
  );
}
