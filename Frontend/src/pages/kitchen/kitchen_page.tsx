import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { HubConnectionState } from "@microsoft/signalr";
import produce from "immer";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Order } from "../../models/order";
import { OrderStatus } from "../../models/order_status";
import ApiContext from "../../store/api_context";
import DoneOrderCard from "../waiter/components/done_order_card";
import SwipeableItem from "../waiter/components/swipeable_item";

export enum ActionTypes {
  INITIAL = "Initial",
  ORDER_STATUS_CHANGED = "OrderStatusChanged",
}

export type OrderAction = {
  type: ActionTypes;
  order?: Order;
  orders?: Order[];
};

export default function KitchenPage() {
  const [tableOrdersRemastered, tableOrdersRemasteredDispatch] = useReducer(
    produce((draft: Map<number, Order[]>, action: OrderAction) => {
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
              var idx = table.findIndex((x) => x.id === action.order?.id);
              table[idx] = action.order;
            }
          }
          break;
        }
      }
    }),
    new Map<number, Order[]>(),
    undefined
  );

  const handleChangeStatus = useCallback((order: Order) => {
    tableOrdersRemasteredDispatch({
      type: ActionTypes.ORDER_STATUS_CHANGED,
      order,
    });
  }, []);

  const handleInitial = useCallback((allOrders: Order[]) => {
    tableOrdersRemasteredDispatch({
      type: ActionTypes.INITIAL,
      orders: allOrders,
    });
  }, []);

  const apiContext = React.useContext(ApiContext);

  const handleChangeStatusInvoke = useCallback(
    (order: Order, status: OrderStatus) => {
      apiContext?.connection?.invoke("UpdateOrderStatus", {
        Id: order.id,
        OrderStatus: status,
      });
    },
    [apiContext]
  );
  useEffect(() => {
    if (apiContext?.connection) {
      if (apiContext?.connection.state !== HubConnectionState.Connected) {
        apiContext?.connection.start().then(() => {
          apiContext?.connection?.invoke("GetAllOrders");
        });
      } else {
        apiContext?.connection?.invoke("GetAllOrders");
      }

      apiContext?.connection.on("AllOrders", (orders: Order[]) => {
        handleInitial(orders);
      });

      apiContext?.connection.on("OrderStatusUpdated", (order: Order) => {
        handleChangeStatus(order);
      });
    }
  }, [apiContext?.connection, handleChangeStatus, handleInitial]);

  const [allPendingOrder, setAllPendingOrders] = useState<Order[]>([]);
  const [allPreparingOrder, setAllPreparingOrder] = useState<Order[]>([]);
  const [allFinishedOrder, setAllFinishedOrder] = useState<Order[]>([]);

  useEffect(() => {
    var returnArrayPending: Order[] = [];
    var returnArrayPreparing: Order[] = [];
    var returnArrayFinished: Order[] = [];
    tableOrdersRemastered.forEach((order, index) => {
      order.forEach((order) => {
        if (order.orderStatus === OrderStatus.InProgress) {
          returnArrayPending.push(order);
        } else if (order.orderStatus === OrderStatus.Preparing) {
          returnArrayPreparing.push(order);
        } else if (order.orderStatus === OrderStatus.Ready) {
          returnArrayFinished.push(order);
        }
      });
    });
    setAllPendingOrders(returnArrayPending);
    setAllPreparingOrder(returnArrayPreparing);
    setAllFinishedOrder(returnArrayFinished);
    console.log(returnArrayPending);
    console.log(returnArrayPreparing);
    console.log(returnArrayFinished);
  }, [tableOrdersRemastered]);

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={1} bg="tomato">
        <Center mx={1}>
          <Text
            my={3}
            mx={3}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={"grey.700"}
          >
            Pending orders
          </Text>
        </Center>
        <SwipeableItem
          children={(orderName, tableNum) => (
            <DoneOrderCard
              orderName={orderName}
              tableNum={tableNum}
              showTable={true}
              fontSize={"xl"}
            />
          )}
          trailingChild={<Text>PREPARING</Text>}
          trailingIcon={<FaArrowRight />}
          list={allPendingOrder}
          onClick={function (orderAction: Order): void {
            handleChangeStatusInvoke(orderAction, OrderStatus.Preparing);
          }}
        />
      </GridItem>
      <GridItem colSpan={1} bg="papayawhip">
        <Center mx={1}>
          <Text
            my={3}
            mx={3}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={"grey.700"}
          >
            Preparing
          </Text>
        </Center>
        <SwipeableItem
          children={(orderName, tableNum) => (
            <DoneOrderCard
              orderName={orderName}
              tableNum={tableNum}
              showTable={true}
              fontSize={"xl"}
            />
          )}
          trailingChild={<Text>FINISHED</Text>}
          trailingIcon={<FaArrowRight />}
          list={allPreparingOrder}
          leadingChild={<Text>IN PROGRESS</Text>}
          leadingIcon={<FaArrowLeft />}
          onClick={function (orderAction: Order): void {
            handleChangeStatusInvoke(orderAction, OrderStatus.Ready);
          }}
          onUndo={function (orderAction: Order): void {
            handleChangeStatusInvoke(orderAction, OrderStatus.InProgress);
          }}
        />
      </GridItem>
      <GridItem colSpan={1} bg="green.300">
        <Center mx={1}>
          <Text
            my={3}
            mx={3}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={"grey.700"}
          >
            Finished orders
          </Text>
        </Center>
        <SwipeableItem
          children={(orderName, tableNum) => (
            <DoneOrderCard
              orderName={orderName}
              tableNum={tableNum}
              showTable={true}
              fontSize={"xl"}
            />
          )}
          trailingChild={<Text>PREPARING</Text>}
          trailingIcon={<FaArrowLeft />}
          list={allFinishedOrder}
          onClick={function (orderAction: Order): void {
            handleChangeStatusInvoke(orderAction, OrderStatus.Preparing);
          }}
        />
      </GridItem>
    </Grid>
  );
}
