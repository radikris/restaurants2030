import React, { useState, useEffect, useReducer, useCallback } from "react";

import { Text, Wrap, Grid, GridItem, Center } from "@chakra-ui/react";
import TableCard from "./components/table_card";
import DoneOrderCard from "./components/done_order_card";
import { FaAngleDown, FaAngleUp, FaArrowAltCircleUp } from "react-icons/fa";
import SwipeableItem from "./components/swipeable_item";
import produce from "immer";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { OrderStatus } from "../../models/order_status";
import { Order } from "../../models/order";
import { FoodDrink } from "../../models/food_drink";

export enum ActionTypes {
  INITIAL = "Initial",
  ORDER_STATUS_CHANGED = "OrderStatusChanged",
  ADD_ORDER = "AddOrder",
}

export type OrderAction = {
  type: ActionTypes;
  order?: Order;
  orders?: Order[];
};

export default function WaiterPage() {
  const [restaurantFoodDrinks, setRestaurantFoodDrinks] = useState<FoodDrink[]>(
    []
  );

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
        case ActionTypes.ADD_ORDER: {
          if (action.order !== undefined) {
            table = draft.get(action.order.table);
            if (table !== undefined) {
              table.push(action.order);
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

  const handleAllFoodDrink = useCallback((allFoodDrinks: FoodDrink[]) => {
    setRestaurantFoodDrinks(allFoodDrinks);
  }, []);

  const handleAddOrder = useCallback((order: Order) => {
    tableOrdersRemasteredDispatch({
      type: ActionTypes.ADD_ORDER,
      order: order,
    });
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

  const handleChangeStatusInvoke = useCallback(
    (order: Order, status: OrderStatus) => {
      connection?.invoke("UpdateOrderStatus", {
        Id: order.id,
        OrderStatus: status,
      });
    },
    [connection]
  );

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("AllOrders", (orders: Order[]) => {
            handleInitial(orders);
          });

          connection.on("OrderStatusUpdated", (order: Order) => {
            handleChangeStatus(order);
          });

          connection.on("AllFoodDrinks", (foodDrinks: FoodDrink[]) => {
            handleAllFoodDrink(foodDrinks);
          });

          connection.invoke("GetAllOrders", { RestaurantId: 1 });
          connection.invoke("GetAllFoodDrink", { RestaurantId: 1 });
        })
        .catch((error) => console.log(error));
    }
  }, [connection, handleChangeStatus, handleInitial, handleAllFoodDrink]);

  const [allPendingOrder, setAllPendingOrders] = useState<Order[]>([]);
  const [isDescending, setIsDescending] = useState<boolean>(true);

  const handleSortList = () => {
    const retValue = isDescending ? 1 : -1;

    const sortedList = allPendingOrder.sort((a, b) =>
      a.table > b.table ? retValue : -1 * retValue
    );

    console.log(isDescending);
    setIsDescending(!isDescending);
    setAllPendingOrders(sortedList);
  };

  useEffect(() => {
    var returnArray: Order[] = [];
    tableOrdersRemastered.forEach(
      (order, index) =>
        (returnArray = returnArray.concat(
          order.filter(
            (x) =>
              x.orderStatus === OrderStatus.InProgress ||
              x.orderStatus === OrderStatus.Ready
          )
        ))
    );
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
              table={orders[1]} //TODO typo???
              tableNumber={orders[0]}
              foodDrinks={restaurantFoodDrinks}
              addOrder={handleAddOrder}
              changeStatus={handleChangeStatusInvoke}
            />
          ))}
        </Wrap>
      </GridItem>
      <GridItem colSpan={1} bg="tomato">
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
          {isDescending && <FaAngleUp onClick={handleSortList} />}
          {!isDescending && <FaAngleDown onClick={handleSortList} />}
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
          swipeChild={<Text>DONE</Text>}
          icon={<FaArrowAltCircleUp />}
          list={allPendingOrder}
          onClick={function (orderAction: Order): void {
            handleChangeStatusInvoke(orderAction, OrderStatus.Served);
          }}
        />
      </GridItem>
    </Grid>
  );
}
